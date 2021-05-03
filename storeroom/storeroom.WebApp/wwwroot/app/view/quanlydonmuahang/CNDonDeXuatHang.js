Ext.define('Admin.view.quanlydonmuahang.CNDonDeXuatHangModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.quanlydonmuahang-mcndondexuathang',
    data: {
        recordPhieu: null,
        fnSauKhiLoad: null,
        selectionPhieuChiTiet: null,
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
Ext.define('Admin.view.quanlydonmuahang.CNDonDeXuatHang', {
    extend: 'Ext.window.Window',
    requires: [
        'Admin.view.quanlydonmuahang.CNDonDeXuatHangController',
        'Admin.view.quanlydonmuahang.CNDonDeXuatHangModel',
        'Ext.tree.Panel',
        'Ext.data.TreeStore',
        'Ext.app.ViewModel',
        'Ext.grid.Panel'
    ],
    controller: 'quanlydonmuahang-ccndondexuathang',
    viewModel: {
        type: 'quanlydonmuahang-mcndondexuathang'
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
        items: [
            {
                xtype: 'form',
                flex: 1,
                reference: 'frmPhieuDeXuatMuaHang',
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
                        margin: '10 5 5 5',
                        xtype: 'combo',
                        readOnly: true,
                        reference: 'cbkho',
                        labelAlign: 'right',
                        bind: {
                            store: '{storeKhoNhap}',
                            value: '{recordPhieu.maKho}'
                        },
                        labelWidth: 140,
                        allowBlank: false,
                        fieldLabel: 'Kho' /*+ ' ' + app.gplatformconsts.var_required*/,
                        queryMode: 'local',
                        displayField: 'moTa',
                        blankText: 'Kho không được để trống',
                        valueField: 'id',
                        forceSelection: true,
                        editable: false,
                        flex: 1,
                        listeners: {
                            change: 'onChangeKho'
                        }
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
                                value: '{recordPhieu.soPhieu}'
                            },
                            labelWidth: 140,
                            reference: 'txtSoPhieu',
                            fieldLabel: 'Số phiếu' /*+ app.gplatformconsts.var_required*/,
                            allowBlank: false,
                            flex: 1,
                            blankText: 'Số phiếu không được để trống',
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
                        labelWidth: 129,
                        fieldLabel: 'Tên đơn hàng'/* + app.gplatformconsts.var_required*/,
                        bind: '{recordPhieu.moTa}',
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
                        xtype: 'textfield',
                        flex: 1,
                        labelAlign: 'right'
                    },
                    items: [{
                        xtype: 'datefield',
                        labelWidth: 140,
                        margin: '0 5 0 5',
                        fieldLabel: 'Ngày lên đơn' /*+ " " + app.gplatformconsts.var_required*/,
                        bind: '{recordPhieu.ngayDeXuat}',
                        allowBlank: false,
                        blankText: 'Ngày lên đơn không được để trống',
                        format: 'd/m/Y',
                        flex: 1,
                        value: new Date()
                    }, {
                        xtype: 'combo',
                        fieldLabel: 'Trạng thái phiếu',
                        margin: '0 5 0 2',
                        labelWidth: 127,
                        editable: false,
                        //readOnly: !abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Manager'),
                        displayField: 'name',
                        bind: '{recordPhieu.trangThai}',
                        flex: 1,
                        valueField: 'value',
                        store: Ext.create('Ext.data.Store',
                            {
                                fields: ['name', 'value'],
                                data: [
                                    { value: "0", name: 'Chờ duyệt' },
                                    { value: "1", name: 'Đã duyệt' },
                                    { value: "2", name: 'Từ chối' },
                                    { value: "3", name: 'Phiếu đóng' }]
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
                            fieldLabel: 'Người đề xuất' /*+ app.gplatformconsts.var_required*/,
                            labelAlign: 'right',
                            readOnly: true,
                            allowBlank: false,
                            blankText: 'Người đề xuất không được để trống',
                            margin: '0 5 0 5',
                            labelWidth: 140,
                            flex: 1,
                            bind: {
                                value: '{recordPhieu.tenNguoiDeXuat}'
                            }

                        }, {
                            margin: '0 0 0 0',
                            xtype: 'button',
                            tooltip: 'Chọn ngưuofi đề xuất',
                            bind: {
                                disabled: '{recordPhieu.trangThai==1}'
                            },
                            //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Edit') || abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Manager')),
                            handler: 'onLayNguoiDung',
                            text: '...'
                        }]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        margin: '5 5 0 5',
                        hidden: true,
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Người phê duyệt' /*+ app.gplatformconsts.var_required*/,
                            labelAlign: 'right',
                            allowBlank: false,
                            readOnly: true,
                            blankText: 'Người phê duyệt không được để trống',
                            margin: '0 5 0 5',
                            labelWidth: 125,
                            flex: 1,
                            bind: { value: '{recordPhieu.tenNguoiPheDuyet}' }
                        }, {
                            margin: '0 0 0 0',
                            xtype: 'button',
                            bind: {
                                disabled: '{recordPhieu.trangThai==1}'
                            },
                            tooltip: 'Chọn người phê duyệt',
                            //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Edit') || abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Manager')),
                            handler: 'onLayNguoiPheDuyet',
                            text: '...'
                        }]
                    }]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin: '5 10 0 0',
                    defaults: {
                        flex: 1,
                        labelAlign: 'right'
                    },
                    items: [{
                        xtype: "fieldcontainer",
                        layout: "hbox",
                        defaults: {
                            labelAlign: "right",
                            labelWidth: 140
                        },
                        items: [{
                            margin: '0 5 0 5',
                            xtype: "textfield",
                            fieldLabel: 'Loại chi phí',
                            bind: "{recordPhieu.tenKhoanChi}",
                            readOnly: true,
                            flex: 1
                        }, {
                            margin: '0 0 0 0',
                            xtype: "button",
                            handler: "onChonKhoanChi",
                            //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Edit') || abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Manager')),
                            text: '...'
                        }]
                    }, { xtype: 'component', flex: 1 }]
                },
                {
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
                        fieldLabel: 'Mã phiếu'
                    }, {
                        xtype: 'container',
                        flex: 1,
                        bind: {
                            disabled: ('{recordPhieu.id==0}' && '{recordPhieu.trangThai==1}')
                        },
                        layout: 'hbox',
                        margin: '0 0 0 100',
                        items: [{
                            width: 80,
                            height: 80,
                            margin: '0 0 0 5',
                            xtype: 'component',
                            html: '<div id="idqrcodeDXMH"></div>'
                        }]
                    }, {
                        xtype: 'displayfield',
                        labelAlign: 'top',
                        fieldCls: 'clsdisplayfield',
                        flex: 1,
                        margin: '5 0 5 5',
                        style: 'line-height: 24px;',
                        value: 'Nhập mã QRCode hoặc mã vật tư để tìm'
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
                                readOnly: '{recordPhieu.trangThai==1}'
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
                                hidden: '{recordPhieu.trangThai==1}'
                            },
                            iconCls: 'fa fa-search',
                            tooltip: 'Tìm vật tư',
                            handler: "onTimKiemVT"
                        }]
                    }]
                }]
            }]
    },
    {
        xtype: 'grid',
        ui: 'light',
        iconCls: 'x-fa fa-list-alt',
        style: 'border-top: 1px solid #d0d0d0;',
        reference: 'dsPhieuDonHangChiTiet',
        title: 'Danh sách vật tư',
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
        header: {
            padding: 3,
            items: [{
                xtype: 'button',
                text: 'Lịch sử trạng thái',
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Edit') || abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Manager')),
                handler: 'onLichSuThayDoiTrangThai',
                iconCls: 'x-fa fa-exchange',
                bind: {
                    disabled: '{!recordPhieu.id>0}'
                }
            }, {
                xtype: 'button',
                margin: '0 0 0 10',
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Edit') || abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Manager')),
                text: 'Thêm vật tư',
                bind: {
                    hidden: '{recordPhieu.trangThai==1}'
                },
                handler: 'onTimKiemvatTuNangCao',
                iconCls: 'x-fa fa-plus'
            }]
        },
        features: [{
            ftype: 'summary',
            dock: 'bottom'
        }],
        bind: {
            store: '{storeDonHangChiTiet}',
            selection: '{selectionPhieuChiTiet}'
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
            dataIndex: 'donViTinhThuc',
            border: 1,
            style: 'text-align:center',
            align: 'left',
            width: 110
        }, {
            text: 'Số lượng',
            columns: [{
                text: 'Đề xuất',
                dataIndex: 'soLuong',
                border: 1,
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
            }, {
                text: 'Phê duyệt',
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
            dataIndex: 'donGia',
            style: 'text-align:center',
            align: 'right',
            border: 1,
            width: 125,
            renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                if (value != undefined && value != null) {
                    //return app.gplatformutils.fnDinhDangSoThuc(value, 2);
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
            dataIndex: 'thanhTien',
            border: 1,
            style: 'text-align:center',
            align: 'right',
            width: 145,
            renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                if (value != undefined && value != null) {
                    //return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                }
            },
            summaryType: 'sum',
            summaryRenderer: function (value, summaryData, dataIndex) {
                if (value != undefined && value != null) {
                    //return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                }
            }
        }, {
            text: 'Ghi chú',
            dataIndex: 'ghiChu',
            border: 1,
            width: 145,
            editor: {
                xtype: 'textfield'
            }
        }, {
            xtype: 'actioncolumn',
            width: 40,
            align: 'center',
            bind: {
                hidden: '{recordPhieu.trangThai==1}'
            },
            items: [{
                xtype: 'button',
                cls: 'actionDelete',
                iconCls: 'x-fa fa-minus',
                reference: 'btnXoaLoaiVatTu',
                align: 'center',
                tooltip: 'Xoá vật tu khỏi phiếu',
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Edit') || abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Manager')),
                handler: "onXoaLoaiVatTu"
            }]
        }],
        viewConfig: {
            emptyText: 'Chưa có dữ liệu'
        }
    }, {
        xtype: 'grid',
        reference: 'dsChuyenTT',
        ui: 'light',
        height: 300,
        hidden: true,
        style: 'border-top: 1px solid #d0d0d0;',
        title: 'Danh sách trạng thái',
        iconCls: 'x-fa fa-exchange',
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
        columns: [
            {
                xtype: 'rownumberer',
                text: '#',
                width: 40,
                align: 'center'
            },
            {
                header: 'Người thực hiện',
                dataIndex: 'tenNguoiThucHien',
                width: 180
            },
            {
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
            },
            {
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
            },
            {
                xtype: 'datecolumn',
                text: 'Ngày thực hiện',
                dataIndex: 'creationTime',
                width: 110,
                align: 'center',
                style: 'text-align:center',
                format: 'd/m/Y H:i'
            },
            {
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
        bind: {
            hidden: '{recordPhieu.trangThai==1}'
        },
        iconCls: 'fa fa-floppy-o',
        ui: 'soft-blue',
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
        close: 'onDongWinDow'
    },
    listeners: {
        boxready: 'onAfterrender',
        close: 'onDongWinDow'
    }
});

Ext.define('Admin.view.quanlydonmuahang.CNDonDeXuatHangController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.quanlydonmuahang-ccndondexuathang',
    ref: null,
    recordPubSub: null,
    checkThayDoiChiTiet: false,
    storeinfo: null,
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
        //me.ref = me.getReferences();
        //me.storeinfo = me.getViewModel().storeInfo;
        //me.loadKho();
        //var record = me.getViewModel().data.recordPhieu;
        //if (record.get('id') == 0) {
        //    record.set("tenNguoiDeXuat", app.session.user.surname + " " + app.session.user.name);
        //    record.set("nguoiDeXuat", app.session.user.id);
        //    var dataVatTu = me.getViewModel().data.dataVatTu;
        //    me.storeinfo.storeDonHangChiTiet.loadData(dataVatTu);
        //} else {
        //    me.onloadChiTiet();
        //}
        //me.loadCT();
    },

    //onLichSuThayDoiTrangThai: function () {
    //    var me = this;
    //    me.ref.dsChuyenTT.setVisible(true);
    //    me.ref.dsPhieuDonHangChiTiet.setVisible(false);

    //},

    //onAn: function () {
    //    var me = this;
    //    me.ref.dsChuyenTT.setVisible(false);
    //    me.ref.dsPhieuDonHangChiTiet.setVisible(true);
    //},


    //loadCT: function (fnSauKhiLoad) {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    var store = me.storeinfo.storeChuyenTrangThai;
    //    var filter = [{ name: 'maPhieu', value: record.get('id') }, { name: 'phanLoai', value: record.get('phanLoai') }, { name: "sorting", value: "item.CreationTime DESC" }];
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


    //loadKho: function (fnSauKhiLoad) {
    //    var me = this;
    //    var store = me.storeinfo.storeKhoNhap;
    //    var storeKho = me.getViewModel().data.storeKho;
    //    if (storeKho != null) {
    //        store.loadRecords(storeKho.data.items);
    //        return;
    //    }
    //    var url = abp.appPath + "api/services/app/CMMSKho/GetPermission";
    //    store.proxy.api.read = url;
    //    store.load({
    //        scope: this,
    //        callback: function (records, operation, success) {
    //            me.getView().setLoading(false);
    //        }
    //    });
    //},

    //onChangeKho: function (combo, record, eOpts) {
    //    var me = this;
    //    me.onLaySoNhap();
    //},

    //onloadChiTiet: function () {
    //    var me = this;
    //    var filter = " 1=1";
    //    var record = me.getViewModel().data.recordPhieu;
    //    var filter = [{ name: 'maPhieu', value: record.get('id') }];
    //    var query = abp.utils.buildQueryString(filter);
    //    var url = abp.appPath + "api/services/app/CMMSKhoDeXuatMuaHangChiTiet/GetAll" + query;
    //    var store = me.storeinfo.storeDonHangChiTiet;
    //    store.proxy.api.read = url;
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
    //            if (records == null) {
    //                store.removeAll();
    //            }
    //        }
    //    });
    //},

    //blurMa: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    if (record.get('id') > 0) {
    //        return;
    //    }
    //    $("#idqrcodeDXMH").html('');
    //    var qrcode = new QRCode("idqrcodeDXMH", {
    //        width: 80,
    //        height: 80
    //    });
    //    if (qrcode == "") {
    //        return;
    //    }
    //    qrcode.makeCode(record.data.soPhieu);
    //},

    //onLaySoNhap: function (isNhap) {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    var nodesSelect = me.ref.cbkho.getSelectedRecord();
    //    if (record.get('id') == 0) {
    //        _cMMSKhoPhieuNhapXuat.laySoPhieu(nodesSelect.get('id'), nodesSelect.get('ma'), 'dondexuatmuahang').done(function (result) {
    //            record.set('soPhieu', result);
    //            $("#idqrcodeDXMH").html('');
    //            var qrcode = new QRCode("idqrcodeDXMH", {
    //                width: 80,
    //                height: 80
    //            });
    //            if (result == "") {
    //                return;
    //            }
    //            qrcode.makeCode(record.data.soPhieu);
    //            me.ref.txtSoPhieu.setValue(result);
    //        }).fail(function (data) {
    //        });
    //    } else {
    //        $("#idqrcodeDXMH").html('');
    //        var qrcode = new QRCode("idqrcodeDXMH", {
    //            width: 80,
    //            height: 80
    //        });
    //        qrcode.makeCode(record.data.soPhieu);
    //    }
    //},

    //specialkeyThemChungLoai: function (field, e) {
    //    var me = this;
    //    if (e.getKey() == e.ENTER) {
    //        me.onTimKiem();
    //    }
    //},

    //onLayNguoiDung: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    Ext.create("Admin.view.chondulieu.wdChonNguoiDung", {
    //        viewModel: {
    //            data: {
    //                fnSauKhiChon: function (result) {
    //                    record.set("tenNguoiDeXuat", result.get("surname") + " " + result.get("name"));
    //                    record.set("nguoiDeXuat", result.get("id"));
    //                }
    //            }
    //        }
    //    }).show();
    //},

    //onLayNguoiPheDuyet: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    Ext.create("Admin.view.chondulieu.wdChonNguoiDung", {
    //        viewModel: {
    //            data: {
    //                fnSauKhiChon: function (result) {
    //                    record.set("tenNguoiPheDuyet", result.get("surname") + " " + result.get("name"));
    //                    record.set("nguoiPheDuyet", result.get("id"));
    //                }
    //            }
    //        }
    //    }).show();
    //},

    //onTimKiemVT: function () {
    //    this.onTimKiem();
    //},

    //onTimKiem: function (dataPsub) {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    if (dataPsub && record.get('soPhieu') == dataPsub.maPhieu && (record.get('trangThai') == null || record.get('trangThai') == 0)) {
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
    //            var storeDonHangChiTiet = me.storeinfo.storeDonHangChiTiet;
    //            var recordIn = storeDonHangChiTiet.queryBy(function (records) {
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
    //                storeDonHangChiTiet.add(record);
    //            }
    //            abp.notify.info(app.localize('CMMSDMKhoDaThemmotVatTuVaoPhieu'));
    //        } else {
    //            me.ref.textNhapMaVatTu.focus(true, 200);
    //            abp.notify.warn(app.localize('CMMSDMKhoVatTuKhongTonTai'));
    //        }
    //    })
    //},

    //onTimKiemvatTuNangCao: function (btn) {
    //    var me = this;
    //    var notItem = me.storeinfo.storeDonHangChiTiet.data.items;
    //    var stringMaLoaiVatTu = "";
    //    for (var i = 0; i < notItem.length; i++) {
    //        if (stringMaLoaiVatTu != "") stringMaLoaiVatTu += ",";
    //        stringMaLoaiVatTu += notItem[i].get('maVatTu');
    //    }
    //    var recordPhieu = me.getViewModel().data.recordPhieu;
    //    var wnd = Ext.create('Admin.view.chondulieu.wdChonVatTu', {
    //        viewModel: {
    //            data: {
    //                rSelectedNhomVatTu: null,
    //                rSelectedVatTu: null,
    //                listNotIn: stringMaLoaiVatTu,
    //                maKho: recordPhieu.get('id'),
    //                stringMaLoaiVatTu: stringMaLoaiVatTu,
    //                fnSauKhiChon: function (recordVatTu) {
    //                    var storeDonHangChiTiet = me.storeinfo.storeDonHangChiTiet;
    //                    for (var i = 0; i < recordVatTu.length; i++) {
    //                        var check = me.onFnCheck(recordVatTu[i].get('id'))
    //                        if (check != false) {
    //                            var soLuong = check.get('soLuongThuc') + 1
    //                            check.set('soLuongThuc', soLuong)
    //                        }
    //                        if (check == false) {
    //                            var record = Ext.create('Admin.model.mDonHangChiTiet');
    //                            record.set('maVatTu', recordVatTu[i].get('id'));
    //                            record.set('vatTu', recordVatTu[i].get('ma'));
    //                            record.set('tenVatTu', recordVatTu[i].get('moTa'));
    //                            record.set('tenVatTu1', recordVatTu[i].get('ma') + "/" + recordVatTu[i].get('moTa'));
    //                            record.set('donGia', recordVatTu[i].get('giaTri'));
    //                            record.set('soLuongThuc', 1);
    //                            record.set('soLuong', 1);
    //                            var soluongthuc = record.get('soLuongThuc');
    //                            var dongia = record.get('donGia');
    //                            if (soluongthuc != 0 || soluongthuc != null) {
    //                                var tt = soluongthuc * dongia;
    //                                record.set('thanhTien', tt);
    //                            }
    //                            if (recordPhieu.get('id') > 0) {
    //                                record.set('maPhieu', recordPhieu.get('id'));
    //                            }
    //                            record.set('donViTinh', recordVatTu[i].donViPhatHanh);
    //                            record.set('donViTinhThuc', recordVatTu[i].get('donViPhatHanh'));
    //                            storeDonHangChiTiet.add(record);
    //                        }
    //                    }
    //                }
    //            }
    //        }
    //    });
    //    wnd.show();
    //},

    //onFnCheck: function (machungloai) {
    //    var me = this;
    //    var storeDonHangChiTiet = me.storeinfo.storeDonHangChiTiet;
    //    var record = storeDonHangChiTiet.data.items;
    //    for (var i = 0; i < record.length; i++) {
    //        if (record[i].get('maVatTu') == machungloai)
    //            return record[i]
    //    }
    //    return false;
    //},

    //onEditGrid: function (editor, context, eOpts) {
    //    var me = this;
    //    var record = context.record;
    //    if (record.dirty == false) {
    //        return;
    //    }
    //    var soluongthuc = record.get('soLuongThuc');
    //    var dongia = record.get('donGia');
    //    if (soluongthuc != 0 || soluongthuc != null) {
    //        var tt = soluongthuc * dongia;
    //        record.set('thanhTien', tt)
    //        record.commit();
    //    }
    //    me.checkThayDoiChiTiet = true;
    //},

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
    //                    _cMMSKhoPhieuDeXuatMuaHangChiTiet.delete({ id: selected.get('id') }).done(function (result) {
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

    //onThucHien: function (isNhap) {
    //    var me = this;
    //    var grid = me.ref.dsPhieuDonHangChiTiet;
    //    var rows = grid.getStore().getRange();
    //    var form = me.ref.frmPhieuDeXuatMuaHang;
    //    if (!form.getForm().isValid()) {
    //        abp.notify.warn(app.localize("TaiSan_isValid"));
    //        return;
    //    }
    //    if (rows.length == 0) {
    //        abp.notify.warn(app.localize("CMMSDMKhoVatTu_ThongBao"));
    //        return;
    //    }
    //    for (var i = 0; i < rows.length; i++) {
    //        if (rows[i].get('soLuongThuc') == null || rows[i].get('soLuongThuc') == 0) {
    //            abp.notify.info(app.localize('CMMSDMKhoSoLuongVatTuKhongDuocDeTrong'))
    //            return;
    //        }
    //    }
    //    var record = me.getViewModel().data.recordPhieu;
    //    record.data.ngayDeXuat = Ext.Date.format(new Date(record.get('ngayDeXuat')), "Y/m/d H:i:s");
    //    if (record.get('id') == 0) {
    //        me.getView().setLoading(true);
    //        _cMMSKhoPhieuDeXuatMuaHang.create(record.data).done(function (result) {
    //            me.getView().setLoading(false);
    //            record.set('id', result.id);
    //            me.onLuuChiTiet(rows, result.id);
    //            abp.notify.success(app.localize('SavedSuccessfully'));
    //        }).fail(function (data) {
    //            me.getView().setLoading(false);
    //        });
    //    }
    //    else if (record.dirty) {
    //        me.getView().setLoading(true);
    //        _cMMSKhoPhieuDeXuatMuaHang.update(record.data).done(function (result) {
    //            me.getView().setLoading(false);
    //            record.commit(record);
    //            me.onLuuChiTiet(rows, record.get('id'));
    //            abp.notify.success(app.localize('SavedSuccessfully'));
    //        }).fail(function (data) {
    //            me.getView().setLoading(false);
    //        });
    //    } else {
    //        me.onLuuChiTiet(rows, record.get('id'), true);
    //    }
    //},

    //onLuuChiTiet: function (rows, Id, thongbao) {
    //    var me = this;
    //    var lstphieuchitiet = [];

    //    for (var i = 0; i < rows.length; i++) {
    //        rows[i].data.maPhieu = Id;
    //        if (isNaN(rows[i].data.id) == true) {
    //            me.checkThayDoiChiTiet = true;
    //            rows[i].data.id = 0;
    //        }
    //        lstphieuchitiet.push(rows[i].data);
    //    }
    //    if (me.checkThayDoiChiTiet == false) {
    //        return
    //    }
    //    me.getView().setLoading(true);
    //    var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
    //    _cMMSKhoPhieuDeXuatMuaHangChiTiet.createList(lstphieuchitiet).done(function (result) {
    //        me.getView().setLoading(false);
    //        me.checkThayDoiChiTiet = false;
    //        if (thongbao) {
    //            abp.notify.success(app.localize('SavedSuccessfully'));
    //        }
    //        me.onloadChiTiet();
    //        if (fnSauKhiLoad)
    //            fnSauKhiLoad();
    //    }).fail(function (data) {
    //        if (fnSauKhiLoad)
    //            fnSauKhiLoad();
    //        me.getView().setLoading(false);
    //    });
    //},

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
        abp.event.off('abp.notifications.receivedEKGISData', me.pubSub);
        var record = me.getViewModel().data.recordPhieu;
        record.reject();
    }
});
