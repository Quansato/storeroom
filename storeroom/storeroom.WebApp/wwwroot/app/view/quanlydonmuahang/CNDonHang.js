Ext.define('Admin.view.quanlydonmuahang.CNDonHangModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.quanlydonmuahang-mcndonhang',
    data: {
        recordPhieu: null,
        fnSauKhiLoad: null,
        selectionPhieuNhapXuatChiTiet: null,
        storeKho: null,
        dataVatTu: []
    },
    stores: {
        storeKhoNhap: { type: 'skho', pageSize: 5000 },
        storeChuyenTrangThai: { type: 'skhochuyentrangthai' },
        storeNhaCungCap: { type: 'sdmnhacungcap' },
        storeDonHangChiTiet: { type: 'sdonhangchitiet' }
    }
});
Ext.define('Admin.view.quanlydonmuahang.CNDonHang', {
    extend: 'Ext.window.Window',
    requires: [
        'Admin.view.quanlydonmuahang.CNDonHangController',
        'Admin.view.quanlydonmuahang.CNDonHangModel',
        'Ext.tree.Panel',
        'Ext.data.TreeStore',
        'Ext.form.FieldSet',
        'Ext.app.ViewModel',
        'Ext.grid.Panel'
    ],
    controller: 'quanlydonmuahang-ccndonhang',
    viewModel: {
        type: 'quanlydonmuahang-mcndonhang'
    },
    width: 1150,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    iconCls: 'x-fa fa-shopping-cart',
    items: [{
        xtype: 'fieldcontainer',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        margin: '0 5 5 0',
        flex: 1,
        defaults: {
            xtype: 'textfield'
        },
        items: [{
            xtype: 'form',
            flex: 1,
            reference: 'frmPhieuMuaHang',
            bodyPadding: 0,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                padding: 0,
                margin: 0,
                items: [{
                    margin: '5 5 5 5',
                    xtype: 'combo',
                    //readOnly: true,
                    reference: 'cbkho',
                    labelAlign: 'right',
                    bind: {
                        store: '{storeKhoNhap}',
                        value: '{recordPhieu.storeroomId}'
                    },
                    labelWidth: 140,
                    allowBlank: false,
                    fieldLabel: 'Kho' /*+ ' ' + app.gplatformconsts.var_required*/,
                    queryMode: 'local',
                    displayField: 'displayName',
                    blankText: 'Kho không được để trống',
                    valueField: 'id',
                    forceSelection: true,
                    editable: false,
                    flex: 1,
                    //listeners: {
                    //    change: 'onChangeKho'
                    //}
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0 0 0 0',
                defaults: {
                    flex: 1
                },
                items: [{
                    xtype: 'fieldcontainer',
                    margin: '0 0 0 0',
                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',
                        labelAlign: 'right',
                        margin: '0 0 0 5',
                        bind: {
                            readOnly: '{!recordPhieu.id==0}',
                            value: '{recordPhieu.code}'
                        },
                        labelWidth: 140,
                        reference: 'txtSoPhieu',
                        fieldLabel: 'Số đơn hàng'/* + app.gplatformconsts.var_required*/,
                        allowBlank: false,
                        flex: 1,
                        blankText: 'Số đơn hàng không được để trống',
                        listeners: {
                            blur: "blurMa"
                        }
                    }, {
                        margin: '0 0 0 0',
                        xtype: 'button',
                        reference: 'btnLaySo',
                        bind: {
                            hidden: '{!recordPhieu.id==0}'
                        },
                        handler: 'onLaySoNhap',
                        text: 'Lấy số'
                    }]
                }, {
                    xtype: 'textfield',
                    margin: '0 5 0 5',
                    labelAlign: 'right',
                    labelWidth: 118,
                    fieldLabel: 'Tên đơn hàng'/* + app.gplatformconsts.var_required*/,
                    bind: '{recordPhieu.nameOfOrder}',
                    allowBlank: false,
                    flex: 1,
                    blankText: 'Tên đơn hàng không được để trống'
                }]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '5 0 0 0',
                defaults: {
                    flex: 1,
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'datefield',
                    labelWidth: 140,
                    margin: '0 5 0 5',
                    fieldLabel: 'Ngày lên đơn' /*+ " " + app.gplatformconsts.var_required*/,
                    bind: '{recordPhieu.date}',
                    allowBlank: false,
                    blankText: 'Ngày lên đơn không được để trống',
                    format: 'd/m/Y',
                    value: new Date()
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Tình trạng đơn',
                    margin: '0 5 0 2',
                    labelWidth: 115,
                    editable: false,
                    //readOnly: !abp.auth.hasPermission('CMMS.Inventory.MuaHang.Manager'),
                    displayField: 'name',
                    bind: '{recordPhieu.status}',
                    valueField: 'value',
                    store: Ext.create('Ext.data.Store',
                        {
                            fields: ['name', 'value'],
                            data: [{ value: "0", name: 'Chờ duyệt' },
                            { value: "1", name: 'Hoàn thành' },
                            { value: "2", name: 'Từ chối' },
                            { value: "3", name: 'Phiếu đóng' }
                            ]
                        }),
                    triggerAction: 'all',
                    queryMode: 'local'
                }]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0 0 0 0',
                defaults: {
                    flex: 1
                },
                items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin: '5 0 0 0',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Người mua' /*+ app.gplatformconsts.var_required*/,
                        labelAlign: 'right',
                        allowBlank: false,
                        blankText: 'Người mua không được để trống',
                        margin: '0 5 0 5',
                        labelWidth: 140,
                        flex: 1,
                        bind: {
                            value: '{recordPhieu.userName}'
                        }
                    }, {
                        margin: '0 0 0 0',
                        xtype: 'button',
                        bind: {
                            disabled: '{recordPhieu.status==1}'
                        },
                        tooltip: 'Chọn người mua',
                        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.MuaHang.Edit') || abp.auth.hasPermission('CMMS.Inventory.MuaHang.Manager')),
                        handler: 'onLayNguoiDung',
                        text: '...'
                    }]
                }, {
                    xtype: "fieldcontainer",
                    layout: "hbox",
                    margin: '5 0 0 5',
                    defaults: {
                        labelAlign: "right"
                    },
                    items: [{
                        margin: '0 5 0 0',
                        labelWidth: 115,
                        xtype: "textfield",
                        fieldLabel: 'Loại chi phí',
                        bind: "{recordPhieu.tenKhoanChi}",
                        readOnly: true,
                        flex: 1
                    }, {
                        margin: '0 5 0 0',
                        xtype: "button",
                        handler: "onChonKhoanChi",
                        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.MuaHang.Edit') || abp.auth.hasPermission('CMMS.Inventory.MuaHang.Manager')),
                        text: '...'
                    }]
                }]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '5 0 0 0',
                defaults: {
                    flex: 1,
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'combo',
                    editable: false,
                    fieldLabel: 'Đơn vị cung cấp',
                    margin: '0 5 0 5',
                    labelWidth: 140,
                    //displayField: 'moTa',
                    //valueField: 'id',
                    //bind: {
                    //    value: '{recordPhieu.suplierId}',
                    //    store: '{storeNhaCungCap}'
                    //},
                    //triggerAction: 'all',
                    //queryMode: 'local'

                    queryMode: "local",
                    displayField: "ten",
                    valueField: "ma",
                    bind: "{recordPhieu.suplierId}",
                    store: Ext.create("Ext.data.Store", {
                        fields: ["ma", "ten"],
                        data: [
                            { ma: 2, ten: 'NCC1' },
                        ]
                    })
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Mức độ ưu tiên',
                    margin: '0 5 0 2',
                    editable: false,
                    labelWidth: 115,
                    displayField: 'name',
                    bind: '{recordPhieu.priority}',
                    valueField: 'value',
                    store: Ext.create('Ext.data.Store',
                        {
                            fields: ['name', 'value'],
                            data: [{ value: '0', name: 'Ưu tiên thấp' },
                            { value: '1', name: 'Ưu tiên trung bình' },
                            { value: '2', name: 'Ưu tiên cao' }]
                        }),
                    triggerAction: 'all',
                    queryMode: 'local'
                }]
            }, {
                xtype: 'textfield',
                name: 'lydo',
                labelAlign: 'right',
                margin: '5 5 0 5',
                labelWidth: 140,
                bind: '{recordPhieu.lyDo}',
                fieldLabel: 'Lý do'
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: 0,
            width: 300,
            items: [{
                xtype: 'fieldset',
                title: 'Tìm kiếm vật tư',
                padding: '0 5 5 5',
                margin: 0,
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'displayfield',
                    labelAlign: 'top',
                    fieldCls: 'clsdisplayfield',
                    flex: 1,
                    fieldLabel: 'Mã phiếu(Đồng bộ mã phiếu trên di động để nhập vật tư'
                }, {
                    xtype: 'container',
                    flex: 1,
                    layout: 'hbox',
                    margin: '0 0 0 100',
                    items: [{
                        width: 80,
                        height: 80,
                        margin: '0 0 0 5',
                        xtype: 'component',
                        html: '<div id="idqrcodeDMH"></div>'
                    }]
                }, {
                    xtype: 'displayfield',
                    labelAlign: 'top',
                    fieldCls: 'clsdisplayfield',
                    flex: 1,
                    margin: '5 0 5 5',
                    style: 'line-height: 24px;',
                    value: 'Nhập mã QRcode hoặc mã vật tư để tìm kiếm'
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'displayfield',
                        labelAlign: 'top',
                        fieldCls: 'clsdisplayfield'
                    },
                    items: [{
                        flex: 1,
                        xtype: 'textfield',
                        bind: {
                            readOnly: '{recordPhieu.tinhTrangDon==1}'
                            // disabled: '{!recordPhieu.id>0}'
                        },
                        reference: 'textNhapMaChungLoaiXuatKho',
                        listeners: {
                            specialkey: 'specialkeyThemChungLoai'
                        }
                    }, {
                        xtype: 'button',
                        ui: 'soft-blue',
                        align: 'center',
                        margin: '0 0 0 5',
                        bind: {
                            //   disabled: '{recordPhieu.id==0}',
                            hidden: '{recordPhieu.tinhTrangDon==1}'
                        },
                        iconCls: 'fa fa-search',
                        tooltip: 'Tìm kiếm vật tư',
                        handler: "onTimKiemVT"
                    }]
                }]
            }]
        }
        ]
    }, {
        xtype: 'panel',
        style: 'border-top: 1px solid #d0d0d0;',
        title: 'Danh sách vật tư',
        iconCls: 'x-fa fa-list-alt',
        ui: 'light',
        reference: 'panlChiTietPhieu',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        header: {
            padding: 3,
            items: [{
                xtype: 'button',
                text: 'Lịch sử trạng thái',
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.MuaHang.Edit') || abp.auth.hasPermission('CMMS.Inventory.MuaHang.Manager')),
                handler: 'onLichSuThayDoiTrangThai',
                iconCls: 'x-fa fa-exchange',
                hidden: true,
                bind: {
                    disabled: '{!recordPhieu.id>0}'
                }
            }, {
                xtype: 'button',
                margin: '0 0 0 10',
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.MuaHang.Edit') || abp.auth.hasPermission('CMMS.Inventory.MuaHang.Manager')),
                text: 'Thêm vật tư',
                bind: {
                    hidden: '{recordPhieu.status==1}'
                },
                ui: 'soft-blue',
                handler: 'onTimKiemvatTuNangCao',
                iconCls: 'x-fa fa-plus'
            }]
        },
        items: [{
            xtype: 'grid',
            ui: 'light',
            style: 'border-top: 1px solid #d0d0d0;',
            reference: 'dsPhieuDonHangChiTiet',
            height: 300,
            cls: 'topGrid',
            plugins: [{
                ptype: 'cellediting',
                clicksToMoveEditor: 1,
                clicksToEdit: 1,
                listeners: {
                    edit: "onEditGrid"
                }
            }],
            features: [{
                ftype: 'summary',
                dock: 'bottom'
            }],
            bind: {
                store: '{storeDonHangChiTiet}',
                selection: '{selectionPhieuNhapXuatChiTiet}'
            },
            layout: 'fit',
            columns: [{
                xtype: 'rownumberer',
                text: '#',
                width: 40,
                align: 'center'
            }, {
                header: 'Mã - Tên',
                cellWrap: true,
                dataIndex: 'tenVatTu1',
                flex: 1,
                summaryType: 'count',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '(' + value + ' Vật tư)' : '(1 Vật tư)');
                }
            }, {
                text: 'Đơn vị tính',
                dataIndex: 'unit',
                border: 1,
                style: 'text-align:center',
                align: 'left',
                width: 110
            }, {
                text: 'Số lượng',
                columns: [{
                    text: 'Chứng từ',
                    dataIndex: 'quantity',
                    border: 1,
                    style: 'text-align:center',
                    align: 'right',
                    width: 100,
                    renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                        if (value != undefined && value != null) {
                            return app.mUtils.fnFormatCurrency(value, 2);
                        }
                    },
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;'
                    },
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        if (value != undefined && value != null) {
                            return app.mUtils.fnFormatCurrency(value, 2);
                        }
                    }
                }, {
                    text: 'Thực mua',
                    dataIndex: 'soLuongThuc',
                    border: 1,
                    reference: 'clsoluongthuc',
                    style: 'text-align:center',
                    align: 'right',
                    width: 100,
                    renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                        if (value != undefined && value != null) {
                            //return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                        }
                    },
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;'
                    },
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        if (value != undefined && value != null) {
                            //return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                        }
                    }
                }]
            }, {
                xtype: 'numbercolumn',
                text: 'Đơn giá',
                dataIndex: 'price',
                style: 'text-align:center',
                align: 'right',
                border: 1,
                width: 125,
                renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                    if (value != undefined && value != null) {
                        return app.mUtils.fnFormatCurrency(value, 2);
                    }
                },
                editor: {
                    xtype: 'currencyfield',
                    cls: 'EnterToTab',
                    fieldStyle: 'text-align: right;'
                }
            },
            {
                xtype: 'numbercolumn',
                text: 'Thành tiền',
                dataIndex: 'total',
                border: 1,
                style: 'text-align:center',
                align: 'right',
                width: 145,
                renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                    if (value != undefined && value != null) {
                        return app.mUtils.fnFormatCurrency(value, 2);
                    }
                },
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    if (value != undefined && value != null) {
                        return app.mUtils.fnFormatCurrency(value, 2);
                    }
                }
            }, {
                text: 'Ghi chú',
                dataIndex: 'description',
                border: 1,
                width: 145,
                editor: {
                    xtype: 'textfield'
                }
            }, {
                xtype: 'actioncolumn',
                width: 40,
                bind: {
                    hidden: '{recordPhieu.status==1}'
                },
                align: 'center',
                items: [{
                    xtype: 'button',
                    cls: 'actionDelete',
                    iconCls: 'x-fa fa-minus',
                    reference: 'btnXoaLoaiVatTu',
                    align: 'center',
                    tooltip: 'Xoá vật tư',
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.MuaHang.Edit') || abp.auth.hasPermission('CMMS.Inventory.MuaHang.Manager')),
                    handler: "onXoaLoaiVatTu"
                }]
            }],
            viewConfig: {
                emptyText: 'Chưa có dữ liệu'
            }
        }]
    }, {
        xtype: 'grid',
        reference: 'dsChuyenTT',
        ui: 'light',
        height: 300,
        style: 'border-top: 1px solid #d0d0d0;',
        title: 'Lịch sử trạng thái',
        iconCls: 'x-fa fa-exchange',
        hidden: true,
        flex: 1,
        header: {
            padding: 3,
            items: [{
                xtype: 'button',
                bind: {
                    disabled: '{!recordPhieu.id>0}'
                },
                text: 'Quay lại',
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.MuaHang.Edit') || abp.auth.hasPermission('CMMS.Inventory.MuaHang.Manager')),
                handler: 'onAn',
                iconCls: 'x-fa fa-reply'
            }]
        },
        cls: 'topGrid',
        bind: {
            store: '{storeChuyenTrangThai}'
        },
        flex: 1,
        layout: 'fit',
        columns: [{
            xtype: 'rownumberer',
            text: '#',
            width: 40,
            align: 'center'
        }, {
            header: 'Người thực hiện',
            dataIndex: 'tenNguoiThucHien',
            width: 180
        }, {
            header: 'Trạng thái cũ',
            align: 'center',
            dataIndex: 'trangThaiCu',
            width: 100,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                var text = value;
                if (value == 0) {
                    text = 'Chờ duyệt';
                } else if (value == 1) {
                    text = 'Đã duyệt';
                } else if (value == 2) {
                    text = 'Từ chối';
                } else if (value == 3) {
                    text = 'Phiếu đóng';
                }
                return text;
            }
        }, {
            header: 'Trạng thái mới',
            align: 'center',
            dataIndex: 'trangThaiMoi',
            width: 115,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                var text = 'Chờ duyệt';
                if (value == 0) {
                    text = 'Chờ duyệt';
                } else if (value == 1) {
                    text = 'Đã duyệt';
                } else if (value == 2) {
                    text = 'Từ chối';
                } else if (value == 3) {
                    text = 'Phiếu đóng';
                }
                return text;
            }
        }, {
            xtype: 'datecolumn',
            text: 'Ngày thực hiện',
            dataIndex: 'creationTime',
            width: 110,
            align: 'center',
            style: 'text-align:center',
            format: 'd/m/Y H:i'
        }, {
            text: 'Lý do',
            dataIndex: 'lyDo',
            border: 1,
            minWidth: 120,
            cellWrap: true,
            flex: 1
        }]
    }],
    buttons: [{
        xtype: 'panel',
        align: 'right',
        flex: 1,
        cls: 'panelThongBao',
        reference: 'panelThongBao'
    }, {
        text: 'Lưu thông tin',
        iconCls: 'fa fa-floppy-o',
        ui: 'soft-blue',
        bind: {
            hidden: '{recordPhieu.tinhTrangDon==1}'
        },
        reference: 'btnThucHien',
        handler: 'onThucHien'
    }, {
        text: 'Huỷ bỏ',
        ui: 'soft-red',
        handler: function () {
            this.up('window').close();
        },
        iconCls: 'fa fa-times'
    }],
    listeners: {
        boxready: 'onAfterrender',
        close: 'onDongWinDow'
    }
});

Ext.define('Admin.view.quanlydonmuahang.CNDonHangController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.quanlydonmuahang-ccndonhang',
    ref: null,
    recordPubSub: null,
    storeinfo: null,
    checkThayDoiChiTiet: false,
    init: function () {
        var me = this;
        me.callParent(arguments);

    },
    pubSub: null,

    onAfterrender: function () {
        var me = this;
        //me.pubSub = function (userNotification) {
        //    if (userNotification.type == "WareHouseQRCode") {
        //        var data = JSON.parse(userNotification.data);
        //        me.onTimKiem(data);
        //    }
        //};
        //abp.event.on('abp.notifications.receivedEKGISData', me.pubSub);
        me.ref = me.getReferences();
        me.storeinfo = me.getViewModel().storeInfo;
        me.loadKho();
        //me.onNhaCungCap();
        var record = me.getViewModel().data.recordPhieu;
        console.log(record);
        if (record.get('id') == 0) {
            //record.set("tenNguoiMua", app.session.user.surname + " " + app.session.user.name);
            //record.set("nguoiMua", app.session.user.id);
            //var dataVatTu = me.getViewModel().data.dataVatTu;
            //me.storeinfo.storeDonHangChiTiet.loadData(dataVatTu);
        } else {
            me.onloadChiTiet();
        }
        //me.loadChuyenTT();
    },

    //loadChuyenTT: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    var store = me.storeinfo.storeChuyenTrangThai;
    //    var filter = [{ name: 'maPhieu', value: record.get('id') }, { name: 'phanLoai', value: 'donmuahang' }, { name: "sorting", value: "item.CreationTime DESC" }];
    //    var query = abp.utils.buildQueryString(filter);
    //    var url = abp.appPath + "api/services/app/CMMSKhoChuyenTrangThai/GetAll" + query;
    //    store.proxy.api.read = url;
    //    store.pageSize = 1000;
    //    store.proxy.pageParam = undefined;
    //    store.proxy.limitParam = undefined;
    //    store.proxy.startParam = undefined;
    //    store.load({
    //        params: {
    //            skipCount: 0,
    //            maxResultCount: store.pageSize
    //        },
    //        scope: this,
    //        callback: function (records, operation, success) {
    //        }
    //    });
    //},

    loadKho: function (fnSauKhiLoad) {
        var me = this;
        var store = me.storeinfo.storeKhoNhap;
        var storeKho = me.getViewModel().data.storeKho;
        if (storeKho != null) {
            store.loadRecords(storeKho.data.items);
            return;
        }
        var url = "api/Storeroom?page=1&start=0&limit=25";
        store.proxy.api.read = url;
        store.pageSize = 500;
        store.proxy.pageParam = undefined;
        store.proxy.limitParam = undefined;
        store.proxy.startParam = undefined;
        store.load({
            params: {
                skipCount: 0,
                limit: store.pageSize
            },
            scope: this,
            callback: function (records, operation, success) {
                if (records == null) {
                    store.removeAll();
                }
            }
        });
    },

    //onNhaCungCap: function (fnSauKhiLoad) {
    //    var me = this;
    //    var store = me.storeinfo.storeNhaCungCap
    //    var url = abp.appPath + "api/services/app/CMMSDMNhaCungCap/GetAll";
    //    store.proxy.api.read = url;
    //    store.pageSize = 10000,
    //        store.load({
    //            params: {
    //                skipCount: 0,
    //                maxResultCount: store.pageSize
    //            },
    //            scope: this,
    //            callback: function (records, operation, success) {
    //                if (records == null) {
    //                    store.removeAll();
    //                }
    //            }
    //        });
    //},

    onChangeKho: function (combo, record, eOpts) {
        var me = this;
        me.onLaySoNhap();
    },

    onloadChiTiet: function () {
        var me = this;
        var record = me.getViewModel().data.recordPhieu;
        var url = "api/PurchaseOrder/PurchaseId?PurchaseId=" + record.get('id');
        var store = me.storeinfo.storeDonHangChiTiet;
        store.proxy.api.read = url;
        store.proxy.pageParam = undefined;
        store.proxy.limitParam = undefined;
        store.proxy.startParam = undefined;
        store.load({
            params: {
                skipCount: 0,
                maxResultCount: store.pageSize
            },
            scope: this,
            callback: function (records, operation, success) {
                if (records == null) {
                    store.removeAll();
                }
            }
        });
    },

    //blurMa: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    if (record.get('id') > 0) {
    //        return;
    //    }
    //    $("#idqrcodeDMH").html('');
    //    var qrcode = new QRCode("idqrcodeDMH", {
    //        width: 80,
    //        height: 80
    //    });
    //    if (qrcode == "") {
    //        return;
    //    }
    //    qrcode.makeCode(record.data.soDonHang);
    //},

    //onLaySoNhap: function (isNhap) {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    var nodesSelect = me.ref.cbkho.getSelectedRecord();
    //    if (record.get('id') == 0) {
    //        _cMMSKhoPhieuNhapXuat.laySoPhieu(nodesSelect.get('id'), nodesSelect.get('ma'), 'donmuahang').done(function (result) {
    //            record.set('soDonHang', result);
    //            $("#idqrcodeDMH").html('');
    //            var qrcode = new QRCode("idqrcodeDMH", {
    //                width: 80,
    //                height: 80
    //            });
    //            if (result == "") {
    //                return;
    //            }
    //            qrcode.makeCode(record.data.soDonHang);
    //            me.ref.txtSoPhieu.setValue(result);
    //        }).fail(function (data) {
    //        });
    //    } else {
    //        $("#idqrcodeDMH").html('');
    //        var qrcode = new QRCode("idqrcodeDMH", {
    //            width: 80,
    //            height: 80
    //        });
    //        qrcode.makeCode(record.data.soDonHang);
    //    }
    //},

    //specialkeyThemChungLoai: function (field, e) {
    //    var me = this;
    //    if (e.getKey() == e.ENTER) {
    //        me.onTimKiem();
    //    }
    //},

    onLayNguoiDung: function () {
        var me = this;
        var record = me.getViewModel().data.recordPhieu;
        Ext.create("Admin.view.chondulieu.wdChonNguoiDung", {
            viewModel: {
                data: {
                    fnSauKhiChon: function (result, idPhongBan) {
                        console.log(result)
                        console.log(record);
                        record.set("userName", result.get("tenNguoiDaiDien"));
                        record.set("userId", result.get("userId"));
                    }
                }
            }
        }).show();
    },

    //onTimKiemVT: function () {
    //    this.onTimKiem();
    //},

    //onTimKiem: function (dataPsub) {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    if (dataPsub && record.get('soDonHang') == dataPsub.maPhieu && (record.get('tinhtrangdon') == "" || record.get('tinhtrangdon') == 0)) {
    //        me.ref.textNhapMaVatTu.setValue(dataPsub.maVatTu);
    //    }
    //    //if (record.get('id') == 0) {
    //    //    abp.notify.info(app.localize('CMMSKhoThongBaoLuuDon'));
    //    //    return
    //    //}
    //    var filter = "";
    //    if (me.ref.textNhapMaVatTu.getValue() == "" || me.ref.textNhapMaVatTu.getValue() == null) {
    //        abp.notify.info(app.localize('CMMSDMKhoMuaHanhChuaNhapMa'));
    //        return;
    //    }
    //    var filter = [{ name: "MaVatTu", value: me.ref.textNhapMaVatTu.getValue() }];
    //    var query = abp.utils.buildQueryString(filter);
    //    var url = abp.appPath + "api/services/app/CMMSKhoVatTu/GetAll" + query;
    //    app.gplatformutils.fnGETAjax(url, function (data) {
    //        var ressult = data.result.items;
    //        if (ressult.length > 0) {
    //            var storePhieuNhapChiTiet = me.storeinfo.storeDonHangChiTiet;
    //            var recordIn = storePhieuNhapChiTiet.queryBy(function (records, id) {
    //                return (records.get('maVatTu') == ressult[0].id);
    //            });
    //            if (recordIn.items.length > 0) {
    //                for (var i = 0; i < recordIn.items.length; i++) {
    //                    var soLuong = recordIn.items[i].get('soLuongThuc') + 1
    //                    if (dataPsub != null) {
    //                        var soluongpub = parseInt(dataPsub.soLuong)
    //                        if (isNaN(soluongpub) == false) {
    //                            soLuong = recordIn.items[i].get('soLuongThuc') + soluongpub
    //                        } else {
    //                            soLuong = recordIn.items[i].get('soLuongThuc')
    //                        }
    //                    }
    //                    recordIn.items[i].set('soLuongThuc', soLuong);
    //                    recordIn.items[i].set('soLuong', soLuong);
    //                    var soluongthuc = recordIn.items[i].get('soLuongThuc');
    //                    var dongia = recordIn.items[i].get('donGia');
    //                    if (soluongthuc != 0 || soluongthuc != null && dongia && dongia != null) {
    //                        var tt = soluongthuc * dongia;
    //                        recordIn.items[i].set('thanhTien', tt);
    //                    }
    //                }
    //            } else {
    //                var record = Ext.create('Admin.model.mDonHangChiTiet');
    //                record.set('maVatTu', ressult[0].id);
    //                record.set('tenVatTu', ressult[0].moTa);
    //                record.set('vatTu', ressult[0].ma);
    //                record.set('tenVatTu1', ressult[0].ma + "-" + ressult[0].moTa);
    //                record.set('donGia', ressult[0].giaTri);
    //                record.set('soLuongThuc', 1);
    //                record.set('soLuong', 1);
    //                if (dataPsub != null) {
    //                    var soluongpub = parseInt(dataPsub.soLuong)
    //                    if (isNaN(soluongpub) == false) {
    //                        record.set('soLuongThuc', dataPsub.soLuong == 0 ? 1 : soluongpub);
    //                        record.set('soLuong', dataPsub.soLuong == 0 ? 1 : soluongpub);
    //                    }
    //                }
    //                var soluongthuc = record.get('soLuongThuc');
    //                var dongia = record.get('donGia');
    //                if (soluongthuc != 0 || soluongthuc != null) {
    //                    var tt = soluongthuc * dongia;
    //                    record.set('thanTien', tt);
    //                }
    //                record.set('donViTinh', ressult[0].donViPhatHanh);
    //                record.set('donViTinhThuc', ressult[0].donViPhatHanh);
    //                record.set('rotating', ressult[0].rotating);
    //                storePhieuNhapChiTiet.add(record);
    //            }
    //            abp.notify.info(app.localize('CMMSDMKhoDaThemmotVatTuVaoPhieu'));
    //        } else {
    //            me.ref.textNhapMaVatTu.focus(true, 200);
    //            abp.notify.warn(app.localize('CMMSDMKhoVatTuKhongTonTai'));
    //        }
    //    })
    //},

    //onLichSuThayDoiTrangThai: function () {
    //    var me = this;
    //    me.ref.dsChuyenTT.setVisible(true);
    //    me.ref.panlChiTietPhieu.setVisible(false);

    //},

    //onAn: function () {
    //    var me = this;
    //    me.ref.dsChuyenTT.setVisible(false);
    //    me.ref.panlChiTietPhieu.setVisible(true);
    //},

    onTimKiemvatTuNangCao: function (btn) {
        var me = this;
        var notItem = me.storeinfo.storeDonHangChiTiet.data.items;
        var stringMaLoaiVatTu = "";
        for (var i = 0; i < notItem.length; i++) {
            if (stringMaLoaiVatTu != "") stringMaLoaiVatTu += ",";
            stringMaLoaiVatTu += notItem[i].get('maVatTu');
        }
        var storePhieuNhapChiTiet = me.storeinfo.storeDonHangChiTiet;

        var recordPhieu = me.getViewModel().data.recordPhieu;
        var wnd = Ext.create('Admin.view.chondulieu.wdChonVatTu', {
            viewModel: {
                data: {
                    rSelectedNhomVatTu: null,
                    rSelectedVatTu: null,
                    listNotIn: stringMaLoaiVatTu,
                    maKho: recordPhieu.get('id'),
                    stringMaLoaiVatTu: stringMaLoaiVatTu,
                    fnSauKhiChon: function (recordVatTu) {
                        console.log(me.storeinfo.storeDonHangChiTiet)
                        for (var i = 0; i < recordVatTu.length; i++) {
                            var check = me.onFnCheck(recordVatTu[i].get('id'))
                            console.log(check)
                            if (check != false) {
                                var soLuong = check.get('quantity') + 1
                                check.set('quantity', soLuong)
                            }
                            if (check == false) {
                                var record = Ext.create('Admin.model.mDonHangChiTiet');
                                record.set('materialId', recordVatTu[i].get('id'));
                                record.set('materialCode', recordVatTu[i].get('materialCode'));
                                record.set('materialName', recordVatTu[i].get('displayName'));
                                record.set('tenVatTu1', recordVatTu[i].get('materialCode') + "/" + recordVatTu[i].get('materialName'));
                                record.set('price', recordVatTu[i].get('price'));
                                record.set('quantity', 1);
                                var soluongthuc = record.get('quantity');
                                var dongia = record.get('price');
                                if (soluongthuc != 0 || soluongthuc != null) {
                                    var tt = soluongthuc * dongia;
                                    record.set('total', tt);
                                }
                                if (recordPhieu.get('id') > 0) {
                                    record.set('id', recordPhieu.get('id'));
                                }
                                record.set('unit', recordVatTu[i].get('unitName'));
                                record.set('donViTinhThuc', recordVatTu[i].get('donViPhatHanh'));
                                console.log(record);
                                storePhieuNhapChiTiet.add(record);
                            }
                        }
                    }
                }
            }
        });
        wnd.show();
    },

    onFnCheck: function (machungloai) {
        var me = this;
        var storeDonHangChiTiet = me.storeinfo.storeDonHangChiTiet;
        var record = storeDonHangChiTiet.data.items;
        for (var i = 0; i < record.length; i++) {
            if (record[i].get('materialId') == machungloai)
                return record[i]
        }
        return false;
    },

    onEditGrid: function (editor, context, eOpts) {
        var me = this;
        var record = context.record;
        if (record.dirty == false) {
            return;
        }
        var soluongthuc = record.get('quantity');
        var dongia = record.get('price');
        if (soluongthuc != 0 || soluongthuc != null) {
            var tt = soluongthuc * dongia;
            record.set('total', tt)
            record.commit();
        }
        me.checkThayDoiChiTiet = true;
    },

    //onXoaLoaiVatTu: function (grid, rowIndex, colIndex) {
    //    var me = this;
    //    var selected = grid.getStore().getAt(rowIndex);
    //    var store = me.storeinfo.storeDonHangChiTiet
    //    var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
    //    if (isNaN(selected.data.id) == true) {
    //        abp.message.confirm(
    //            app.localize('CMMSKhoThongBaoVatTu') + " " + selected.data.tenVatTu1,
    //            app.localize('ExtgDataManagerAreYouSure'),
    //            function (isConfirmed) {
    //                if (isConfirmed) {
    //                    store.remove(selected);
    //                }
    //            }
    //        );
    //    } else {
    //        abp.message.confirm(
    //            app.localize('CMMSKhoThongBaoVatTu') + " " + selected.data.tenVatTu1,
    //            app.localize('ExtgDataManagerAreYouSure'),
    //            function (isConfirmed) {
    //                if (isConfirmed) {
    //                    store.remove(selected);
    //                    _cMMSKhoDonMuaHangChiTiet.delete({ id: selected.get('id') }).done(function (result) {
    //                        me.getView().setLoading(false);
    //                        abp.notify.success(app.localize('SavedSuccessfully'));
    //                        if (fnSauKhiLoad)
    //                            fnSauKhiLoad(result);
    //                    }).fail(function (data) {
    //                        me.getView().setLoading(false);
    //                    });
    //                }
    //            }
    //        );
    //    }
    //},

    onThucHien: function (isNhap) {
        var me = this;
        var form = me.ref.frmPhieuMuaHang;
        var grid = me.ref.dsPhieuDonHangChiTiet;
        var rows = grid.getStore().getRange();
        //if (!form.getForm().isValid()) {
        //    abp.notify.warn(app.localize("TaiSan_isValid"));
        //    return;
        //}
        //if (rows.length == 0) {
        //    abp.notify.info(app.localize('CMMSDMKhoVatTu_ThongBao'));
        //    return;
        //}
        //for (var i = 0; i < rows.length; i++) {
        //    if (rows[i].get('quantity') == null || rows[i].get('quantity') == 0) {
        //        abp.notify.info(app.localize('CMMSDMKhoSoLuongVatTuKhongDuocDeTrong'))
        //        return;
        //    }
        //}
        var record = me.getViewModel().data.recordPhieu;
        var data = record.data;
        var rowMaterial = [];
        rows.forEach(function (element) {
            rowMaterial.push(element.data)
        })
        //record.data.thoiGian = Ext.Date.format(new Date(record.get('thoiGian')), "Y/m/d H:i:s");
        //record.data.ngayGiao = Ext.Date.format(new Date(record.get('ngayGiao')), "Y/m/d H:i:s");
        //record.data.phanLoai = 'donhang'
        if (record.get('id') == 0) {
            var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
            var url = "/api/PurchaseOrder";
            data.materialPuchaseOrder = rowMaterial
            console.log(data)
            me.getView().setLoading(true);
            app.mUtils.fnPOSTAjax(url, data, function (res) {
                toastr.success("Thêm mới dl thành công!");
                console.log(res)
                me.getView().setLoading(false);
                fnSauKhiLoad();
                me.getView().doClose();
            })
        }
        else if (record.dirty) {
            var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
            var url = "/api/PurchaseOrder";
            me.getView().setLoading(true);
            app.mUtils.fnPUTAjax(url, data, function (res) {
                console.log(res)
                me.getView().setLoading(false);
                me.onLuuChiTiet(rows, record.get('id'));
                toastr.success("Cập nhật dữ liệu thành công");
                fnSauKhiLoad();
                me.getView().doClose();
            })
        } else {
            me.onLuuChiTiet(rows, record.get('id'));
        }
    },

    onLuuChiTiet: function (rows, Id, thongbao) {
        var me = this;
        var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;

        var lstphieuchitiet = [];
        var url = "/api/PurchaseOrder/detail";

        for (var i = 0; i < rows.length; i++) {
            rows[i].data.unit = undefined;
            app.mUtils.fnPUTAjax(url, rows[i].data, function (res) {
                console.log(res)
                fnSauKhiLoad();
                me.getView().setLoading(false);
            })
        }

        //for (var i = 0; i < rows.length; i++) {
        //    rows[i].data.maPhieu = Id;
        //    if (isNaN(rows[i].data.id) == true) {
        //        me.checkThayDoiChiTiet = true;
        //        rows[i].data.id = 0;
        //    }
        //    lstphieuchitiet.push(rows[i].data);
        //}
        //if (me.checkThayDoiChiTiet == false) {
        //    return
        //}
        //me.getView().setLoading(true);

    },

    //onChonKhoanChi: function () {
    //    var me = this;
    //    var record = me.getViewModel().get("recordPhieu");
    //    Ext.create("Admin.view.chondulieu.wdChonDMKhoanChi", {
    //        viewModel: {
    //            data: {
    //                fnSauKhiChon: function (result) {
    //                    record.set("khoanChi", result.get("id"));
    //                    record.set("tenKhoanChi", result.get("moTa"));
    //                }
    //            }
    //        }
    //    }).show();
    //},

    onDongWinDow: function () {
        var me = this;
        //abp.event.off('abp.notifications.receivedEKGISData', me.pubSub);
        var record = me.getViewModel().data.recordPhieu;
        record.reject();
    }
});
