Ext.define('Admin.view.phieunhapxuatkho.CNPhieuXuatKhoModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.phieunhapxuatkho-mcnphieuxuatkho',
    data: {
        recordPhieu: null,
        fnSauKhiLoad: null,
        selectionPhieuNhapXuatChiTiet: null,
        dieuchuyen: false,
        dataVatTu: [],
        storeKho: null,
        textThongBao: ""
    },
    stores: {
        storeKhoXuat: { type: 'skho', pageSize: 1000 },
        storeKhoNhap: { type: 'skho', pageSize: 1000 },
        storeLoaiPhieu: { type: 'sdmloaiphieu', pageSize: 500 },
        storePhieuXuatChiTiet: { type: 'sphieunhapxuatchitiet' }
    }
});

Ext.define('Admin.view.phieunhapxuatkho.CNPhieuXuatKho', {
    extend: 'Ext.window.Window',
    requires: [
        'Admin.view.phieunhapxuatkho.CNPhieuXuatKhoController',
        'Admin.view.phieunhapxuatkho.CNPhieuXuatKhoModel',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.plugin.Editing'
    ],
    controller: 'phieunhapxuatkho-ccnphieuxuatkho',
    viewModel: {
        type: 'phieunhapxuatkho-mcnphieuxuatkho'
    },
    width: 1150,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    iconCls: 'x-fa fa-cloud-upload',
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
            reference: 'frmPhieuXuatKho',
            bodyPadding: 0,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0',
                defaults: {
                    xtype: 'textfield',
                    flex: 1,
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'combo',
                    reference: 'cbkhoXuatVT',
                    margin: '5 5 0 0',
                    readOnly: true,
                    bind: {
                        store: '{storeKhoXuat}',
                        value: '{recordPhieu.storeroomId}'
                    },
                    labelWidth: 120,
                    fieldLabel: 'Kho' /*+ ' ' + app.gplatformconsts.var_required*/,
                    allowBlank: false,
                    blankText: 'Kho không được để trống',
                    queryMode: 'local',
                    displayField: 'displayName',
                    valueField: 'id',
                    forceSelection: true,
                    editable: false,
                    //listeners: {
                    //    change: 'onChangeKho'
                    //},
                    flex: 1
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    padding: 0,
                    margin: 0,
                    items: [{
                        xtype: 'textfield',
                        labelAlign: 'right',
                        fieldLabel: 'Người xuất' /*+ ' ' + app.gplatformconsts.var_required*/,
                        allowBlank: false,
                        readOnly: true,
                        blankText: 'Chưa chọn người xuất',
                        margin: '5 5 0 0',
                        labelWidth: 112,
                        flex: 1,
                        bind: {
                            value: '{recordPhieu.userName}'
                        }
                    }, {
                        margin: '5 5 0 0',
                        xtype: 'button',
                        reference: 'btnLayNguoiDung',
                        tooltip: 'Chọn người xuất',
                        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
                        handler: 'onLayNguoiDung',
                        text: '...'
                    }]
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0',
                defaults: {
                    flex: 1
                },
                items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',
                        labelAlign: 'right',
                        margin: '5 0 0 5',
                        labelWidth: 115,
                        bind: {
                            readOnly: '{recordPhieu.id>0}',
                            value: '{recordPhieu.outputCode}'
                        },
                        reference: 'txtSoPhieu',
                        fieldLabel: 'Số phiếu' /*+ ' ' + app.gplatformconsts.var_required*/,
                        allowBlank: false,
                        flex: 1,
                        blankText: 'Số phiếu không được để trống',
                        listeners: {
                            blur: "blurMa"
                        }
                    }, {
                        margin: '5 0 0 5',
                        xtype: 'button',
                        bind: {
                            hidden: '{!recordPhieu.id==0}'
                        },
                        reference: 'btnLaySoPhieu',
                        handler: 'onLaySoNhap',
                        text: 'Lấy số'
                    }]
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Phân loại',
                    margin: '5 5 0 0',
                    queryMode: 'local',
                    labelAlign: 'right',
                    labelWidth: 118,
                    editable: false,
                    reference: 'phanLoai',
                    displayField: 'displayName',
                    bind: {
                        store: '{storeLoaiPhieu}',
                        value: '{recordPhieu.type}'
                    },
                    forceSelection: true,
                    editable: false,
                    valueField: 'id'
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0',
                defaults: {
                    flex: 1,
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'datefield',
                    labelWidth: 115,
                    margin: '5 5 0 5',
                    name: 'ngayhachtoan',
                    fieldLabel: 'Ngày xuất kho' /*+ ' ' + app.gplatformconsts.var_required*/,
                    bind: '{recordPhieu.dateOutput}',
                    format: 'd/m/Y',
                    editable: false,
                    allowBlank: false,
                    blankText: 'Chưa chọn ngày xuất kho',
                    value: new Date()
                }, {
                    xtype: 'datefield',
                    name: 'ngaychungtu',
                    margin: '5 5 0 0',
                    format: 'd/m/Y',
                    editable: false,
                    labelWidth: 113,
                    fieldLabel: 'Ngày chứng từ',
                    bind: '{recordPhieu.dateDocument}',
                    value: new Date()
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0',
                defaults: {
                    flex: 1,
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'textfield',
                    reference: 'textDonViNhan',
                    margin: '5 5 0 5',
                    labelWidth: 115,
                    fieldLabel: 'Đơn vị nhận' /*+ ' ' + app.gplatformconsts.var_required*/,
                    bind: '{recordPhieu.recipient}',
                    allowBlank: false,
                    blankText: 'Đơn vị nhận không được để trống'
                }, {
                    xtype: 'textfield',
                    reference: 'textNguoiNhan',
                    bind: '{recordPhieu.userRecipient}',
                    fieldLabel: 'Người nhận',
                    margin: '5 5 0 0',
                    labelWidth: 113
                }]
            }, {
                xtype: 'combo',
                margin: '5 5 0 5',
                reference: 'cbkhonhan',
                labelAlign: 'right',
                bind: {
                    store: '{storeKhoNhap}',
                    value: '{recordPhieu.storeroomReceiveId}'
                },
                labelWidth: 115,
                fieldLabel: "Kho nhận"/* + ' ' + app.gplatformconsts.var_required*/,
                queryMode: 'local',
                displayField: 'displayName',
                valueField: 'id',
                forceSelection: true,
                hidden: true,
                editable: false,
                allowBlank: false,
                blankText: "Chưa chọn kho nhận" /*+ ' ' + app.localize("CMMSDMKhoKhoNhan").toLocaleLowerCase()*/,
                flex: 1
            }, {
                xtype: 'textareafield',
                name: 'lydo',
                margin: '5 5 0 5',
                flex: 1,
                labelAlign: 'right',
                labelWidth: 115,
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
                    fieldLabel: 'Mã phiếu(Đồng bộ mã phiếu trên di động để tìm vật tư)'
                }, {
                    width: 80,
                    height: 80,
                    margin: '0 0 0 100',
                    xtype: 'component',
                    html: '<div id="idqrcodeXK"></div>'
                }, {
                    margin: '5 0 5 5',
                    xtype: 'displayfield',
                    labelAlign: 'top',
                    fieldCls: 'clsdisplayfield',
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
                            hidden: '{phieuDieuChuyen}'
                        },
                        reference: 'textNhapMaVatTu',
                        listeners: {
                            specialkey: 'specialkeyThemChungLoai'
                        }
                    }, {
                        xtype: 'button',
                        ui: 'soft-blue',
                        bind: {
                            //disabled: '{!recordPhieu.id>0}',
                            hidden: '{phieuDieuChuyen}'
                        },
                        align: 'center',
                        reference: 'btnTimKiemVT',
                        margin: '0 0 0 5',
                        iconCls: 'fa fa-search',
                        tooltip: 'Tìm kiếm vật tư',
                        handler: "onTimKiemVT"
                    }]
                }]
            }]
        }]
    }, {
        xtype: 'grid',
        ui: 'light',
        title: 'Danh sách vật tư',
        border: true,
        header: {
            padding: 3,
            items: [{
                xtype: 'button',
                text: 'Thêm vật tư',
                reference: 'btnThemVatTu',
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
                handler: 'onTimKiemvatTuNangCao',
                iconCls: 'x-fa fa-plus'
            }]
        },
        reference: 'dsPhieuXuatKhoChiTiet',
        iconCls: 'x-fa fa-list-alt',
        height: 300,
        cls: 'topGrid',
        plugins: [{
            ptype: 'cellediting',
            clicksToMoveEditor: 1,
            clicksToEdit: 1,
            autoCancel: false,
            listeners: {
                edit: "onEditGrid",
                beforeedit: 'beforeedit'
            }
        }],
        bind: {
            store: '{storePhieuXuatChiTiet}',
            selection: '{selectionPhieuNhapXuatChiTiet}'
        },
        features: [{
            ftype: 'summary',
            dock: 'bottom'
        }],
        layout: 'fit',
        columns: [{
            xtype: 'rownumberer',
            text: '#',
            width: 40,
            align: 'center'
        }, {
            header: 'Mã-Tên',
            cellWrap: true,
            style: 'text-align:center',
            dataIndex: 'tenVatTu1',
            minWidth: 200,
            flex: 1,
            summaryType: 'count',
            summaryRenderer: function (value, summaryData, dataIndex) {
                //return ((value === 0 || value > 1) ? '(' + value + ' ' + app.localize('CMMSDMKhoVatTu') + ')' : '(1 ' + app.localize('CMMSDMKhoVatTu') + ')');
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
                text: 'Tồn kho',
                dataIndex: 'soLuongTrongKho',
                border: 1,
                hidden: true,
                style: 'text-align:center',
                align: 'right',
                width: 90
            }, {
                text: 'Chứng từ',
                dataIndex: 'quantity',
                border: 1,
                style: 'text-align:center',
                align: 'right',
                width: 120,
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
                        //return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                    }
                }
            }, {
                text: 'Thực xuất',
                dataIndex: 'soLuongThuc',
                border: 1,
                style: 'text-align:center',
                align: 'right',
                width: 120,
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
            width: 100,
            renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                if (value != undefined && value != null) {
                    return app.mUtils.fnFormatCurrency(value, 2);
                }
            },
            editor: {
                xtype: 'currencyfield',
                fieldStyle: 'text-align: right;'
            }
        }, {
            xtype: 'numbercolumn',
            text: 'Thành tiền',
            dataIndex: 'total',
            border: 1,
            style: 'text-align:center',
            align: 'right',
            width: 110,
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
            width: 115,
            editor: {
                xtype: 'textfield'
            }
        }, {
            xtype: 'actioncolumn',
            width: 40,
            reference: 'btnXoaLoaiVatTu',
            align: 'center',
            items: [{
                xtype: 'button',
                cls: 'actionDelete',
                iconCls: 'x-fa fa-minus',
                align: 'center',
                tooltip: 'Xoá vật tư khỏi phiếu',
                handler: "onXoaLoaiVatTu"
            }]
        }],
        viewConfig: {
            emptyText: 'Chưa có dữ liệu',
            getRowClass: function (record, index, rowParams, ds) {
                if (record.get('color') && record.get('color') == 'red') {
                    return 'trangThaiPhieuDeXuatHuy';
                } else {
                    return 'trangThaiPhieuCho';
                }
            }
        }
    }, {
        xtype: 'displayfield',
        reference: 'displayThongBao',
        cls: 'displayfieldcss',
        style: {
            color: 'red',
            marginRight: '10px'
        },
        hidden: true
    }],
    buttons: [{
        text: 'Lưu thông tin',
        iconCls: 'fa fa-floppy-o',
        ui: 'soft-blue',
        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
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


Ext.define('Admin.view.phieunhapxuatkho.CNPhieuXuatKhoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.phieunhapxuatkho-ccnphieuxuatkho',
    ref: null,
    storeinfo: null,
    recordPubSub: null,
    checkThayDoiChiTiet: false,
    init: function () {
        var me = this;
        me.callParent(arguments);
    },
    pubSub: null,
    onAfterrender: function () {
        var me = this;
        me.ref = me.getReferences();
        me.storeinfo = me.getViewModel().storeInfo;
        var storeLoaiPhieu = me.storeinfo.storeLoaiPhieu;
        storeLoaiPhieu.loadData([{ id: -1, displayName: "Điều chuyển" }])
        //me.pubSub = function (userNotification) {
        //    if (userNotification.type == "WareHouseQRCode") {
        //        var data = JSON.parse(userNotification.data);
        //        me.onTimKiem(data);
        //    }
        //};
        //abp.event.on('abp.notifications.receivedEKGISData', me.pubSub);
        me.loadKho();
        var record = me.getViewModel().data.recordPhieu;
        if (me.getViewModel().data.textThongBao != "") {
            me.ref.displayThongBao.setVisible(true);
            var html = '<p style="color:red;padding-top: 5px;padding: 0px;margin: 0px;">' + app.localize('CMMSDMKhoThongBaoSoLuongVatTuTrongKhoNhoHonSoLuongDeXuat') + ' ' + me.getViewModel().data.textThongBao + '</p>'
            me.ref.displayThongBao.setHtml(html);
        }
        if ((record.get('type') == -1 || me.getViewModel().data.dieuchuyen)) {
            me.ref.textNguoiNhan.setMargin('5 5 0 7')
            me.ref.textDonViNhan.setVisible(false);
            me.ref.cbkhonhan.setVisible(true);
            me.ref.textDonViNhan.allowBlank = true;
            me.ref.phanLoai.setReadOnly(true);
        } else {
            me.loadLoaiPhieu();
            me.ref.textDonViNhan.setVisible(true);
            me.ref.cbkhonhan.allowBlank = true;
        }

        if (record.get('id') == 0) {
            //record.set("tenNguoiDeXuat", app.session.user.surname + " " + app.session.user.name);
            //record.set("nguoiDeXuat", app.session.user.id);
            var dataVatTu = me.getViewModel().data.dataVatTu;
            me.storeinfo.storePhieuXuatChiTiet.loadData(dataVatTu);
        } else {
            me.onloadChiTiet();
            if (record.get('type') == -1) {
                me.ref.textNhapMaVatTu.setDisabled(true);
                me.ref.btnTimKiemVT.setDisabled(true);
                me.ref.btnThemVatTu.setDisabled(true);
                me.ref.btnThucHien.setDisabled(true);
                me.ref.btnLayNguoiDung.setDisabled(true);
                me.ref.btnXoaLoaiVatTu.setVisible(false);
                me.ref.btnLaySoPhieu.setDisabled(true);
            }
        }
    },

    onChangeKho: function (combo, newValue, oldValue, eOpts) {
        var me = this;
        me.onLaySoNhap();
        var record = me.getViewModel().data.recordPhieu;
        if (record.get('id') == 0) {
            var dataVatTu = me.getViewModel().data.dataVatTu;
            if (dataVatTu) {
                var listIdVT = ""
                for (var i = 0; i < dataVatTu.length; i++) {
                    if (listIdVT != "") listIdVT += ","
                    listIdVT += dataVatTu[i].maVatTu
                }
                var url = abp.appPath + 'api/services/app/CMMSKhoInventory/GetVatTuCoTrongKho' + abp.utils.buildQueryString([{ name: 'maKho', value: record.get('maKhoXuat') }, { name: 'ListIdNotIn', value: listIdVT }]);
                app.gplatformutils.fnGETAjax(url, function (data) {
                    var listID = data.result.split(',');
                    for (var i = 0; i < dataVatTu.length; i++) {
                        if (listID.indexOf(dataVatTu[i].maVatTu.toString()) == -1) {
                            dataVatTu[i]['color'] = 'red'
                        }
                    }
                    me.storeinfo.storePhieuXuatChiTiet.loadData(dataVatTu);
                });
            }
        }
    },

    loadKho: function () {
        var me = this;

        var store = me.storeinfo.storeKhoXuat;
        var storeKho = me.getViewModel().data.storeKho;
        if (storeKho != null) {
            var data = [];
            store.loadRecords(storeKho.data.items);
            var record = me.getViewModel().data.recordPhieu;
            for (var i = 0; i < storeKho.data.items.length; i++) {
                if (storeKho.data.items[i].get('id') != record.get('storeroomId')) {
                    data.push(storeKho.data.items[i]);
                }
            }
            me.storeinfo.storeKhoNhap.loadRecords(data)
            return;
        }
        var url = "api/Storeroom?page=1&start=0&limit=25";
        store.proxy.api.read = url;
        store.load({
            scope: this,
            callback: function (records, operation, success) {
                var data = [];
                var record = me.getViewModel().data.recordPhieu;
                for (var i = 0; i < records.length; i++) {
                    if (records[i].get('id') != record.get('storeroomId')) {
                        data.push(records[i]);
                    }
                }
                me.storeinfo.storeKhoNhap.loadRecords(data)
                me.getView().setLoading(false);
            }
        });
    },

    loadLoaiPhieu: function () {
        var me = this;
        var store = me.storeinfo.storeLoaiPhieu;
        store.loadData([
            {
                id: -1,
                displayName: "Điều chuyển"
            }, {
                id: 0,
                displayName: "Xuất kho"
            }
        ])
    },

    onLayNguoiDung: function () {
        var me = this;
        var record = me.getViewModel().data.recordPhieu;
        Ext.create("Admin.view.chondulieu.wdChonNguoiDung", {
            viewModel: {
                data: {
                    fnSauKhiChon: function (result) {
                        record.set("userName", result.get("tenNguoiDaiDien"));
                        record.set("userId", result.get("userId"));

                    }
                }
            }
        }).show();
    },

    onloadChiTiet: function () {
        var me = this;
        var record = me.getViewModel().data.recordPhieu;
        //var filter = [{ name: 'maPhieu', value: record.get('id') }];
        //var query = abp.utils.buildQueryString(filter);
        var url = "api/Output/OutputId?OutputId=" + record.get('id');
        var store = me.storeinfo.storePhieuXuatChiTiet;
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
    //    $("#idqrcodeXK").html('');
    //    var qrcode = new QRCode("idqrcodeXK", {
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
    //    var nodesSelect = me.ref.cbkhoXuatVT.getSelectedRecord();
    //    var phanloai = 'phieuxuat';
    //    if (record.get('id') == 0) {
    //        me.getView().setLoading(true);
    //        _cMMSKhoPhieuNhapXuat.laySoPhieu(nodesSelect.get('id'), nodesSelect.get('ma'), phanloai).done(function (result) {
    //            record.set('soPhieu', result);
    //            $("#idqrcodeXK").html('');
    //            var qrcode = new QRCode('idqrcodeXK', {
    //                width: 80,
    //                height: 80
    //            });
    //            if (result == "") {
    //                return;
    //            }
    //            if (qrcode == "") {
    //                return;
    //            }
    //            qrcode.makeCode(record.data.soPhieu);
    //            me.ref.txtSoPhieu.setValue(result);
    //            me.getView().setLoading(false);
    //        }).fail(function (data) {
    //            me.getView().setLoading(false);
    //        });
    //    } else {
    //        $("#idqrcodeXK").html('');
    //        var qrcode = new QRCode('idqrcodeXK', {
    //            width: 80,
    //            height: 80
    //        });
    //        if (qrcode == "") {
    //            return;
    //        }
    //        qrcode.makeCode(record.data.soPhieu);
    //    }
    //},

    //onSelectLoaiVatTu: function (combo, records) {
    //    var me = this;
    //    var txtdonvitinhthuc = me.ref.dsPhieuXuatKhoChiTiet.getPlugin().editor.down('[name=donvitinhthuc]');
    //    txtdonvitinhthuc.setValue(records.data.donvidathang);
    //    var dongia = me.ref.dsPhieuXuatKhoChiTiet.getPlugin().editor.down('[name=dongia]');
    //    dongia.setValue(records.data.giatri);
    //},

    //specialkeyThemChungLoai: function (field, e) {
    //    var me = this;
    //    if (e.getKey() == e.ENTER) {
    //        me.onTimKiem();
    //    }
    //},

    //onTimKiemVT: function () {
    //    this.onTimKiem();
    //},

    //onTimKiem: function (dataPsub) {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    if (dataPsub && record.get('soPhieu') == dataPsub.maPhieu) {
    //        me.ref.textNhapMaVatTu.setValue(dataPsub.maVatTu);
    //    }
    //    var filter = "";
    //    if (me.ref.textNhapMaVatTu.getValue() == "" || me.ref.textNhapMaVatTu.getValue() == null) {
    //        abp.notify.info(app.localize('CMMSDMKhoMuaHanhChuaNhapMa'));
    //        return;
    //    }
    //    var filter = [{ name: "laKho", value: true }, { name: "MaVatTu", value: me.ref.textNhapMaVatTu.getValue() }, { name: "MaKho", value: record.get('maKhoXuat') }];
    //    var query = abp.utils.buildQueryString(filter);
    //    var url = abp.appPath + "api/services/app/CMMSKhoVatTu/GetVatTuPhieuNhapXuat" + query;
    //    app.gplatformutils.fnGETAjax(url, function (data) {
    //        var ressult = data.result.items;
    //        if (ressult.length > 0) {
    //            var storePhieuXuatChiTiet = me.storeinfo.storePhieuXuatChiTiet;
    //            var recordIn = storePhieuXuatChiTiet.queryBy(function (records, id) {
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
    //                var record = Ext.create('Admin.model.mPhieuNhapXuatChiTiet');
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
    //                    record.set('thanhtien', tt);
    //                }
    //                record.set('donViTinh', ressult[0].donViPhatHanh);
    //                record.set('donViTinhThuc', ressult[0].donViPhatHanh);
    //                record.set('rotating', ressult[0].rotating);
    //                storePhieuXuatChiTiet.add(record);
    //            }
    //            abp.notify.success(app.localize("CMMSDMKhoDaThemmotVatTuVaoPhieu"));
    //        } else {
    //            abp.notify.warn(app.localize("CMMSDMKhoVatTuKhongTonTai"));
    //        }
    //    })
    //},

    onFnCheck: function (machungloai) {
        var me = this;
        var storePhieuXuatChiTiet = me.storeinfo.storePhieuXuatChiTiet;
        var record = storePhieuXuatChiTiet.data.items;
        for (var i = 0; i < record.length; i++) {
            if (record[i].get('materialId') == machungloai)
                return record[i]
        }
        return false;
    },

    onTimKiemvatTuNangCao: function (btn) {
        var me = this;
        var notItem = me.storeinfo.storePhieuXuatChiTiet.data.items;
        var stringMaLoaiVatTu = "";
        for (var i = 0; i < notItem.length; i++) {
            if (stringMaLoaiVatTu != "") stringMaLoaiVatTu += ",";
            stringMaLoaiVatTu += notItem[i].get('maVatTu');
        }
        var recordPhieu = me.getViewModel().data.recordPhieu;
        var wnd = Ext.create('Admin.view.chondulieu.wdChonVatTu', {
            viewModel: {
                data: {
                    rSelectedNhomVatTu: null,
                    rSelectedVatTu: null,
                    listNotIn: stringMaLoaiVatTu,
                    maKho: recordPhieu.get('storeroomId'),
                    stringMaLoaiVatTu: stringMaLoaiVatTu,
                    fnSauKhiChon: async function (recordVatTu) {
                        var storePhieuXuatChiTiet = me.storeinfo.storePhieuXuatChiTiet;
                        for (var rVT of recordVatTu) {

                            var check = me.onFnCheck(rVT.get('id'))
                            if (check != false) {
                                var soluong = check.get('quantity') + 1;
                                check.set('quantity', soluong);
                            }
                            if (check == false) {
                                var record = Ext.create('Admin.model.mPhieuNhapXuatChiTiet');
                                var url = "api/Input/CheckMaterialIsExistInStoreroom?StoreroomId=" + recordPhieu.data.storeroomId + "&Id=" + rVT.get('id')
                                const isExist = await app.mUtils.fnGETAjaxV2(url);
                                if (!isExist) record.set("color", "red");
                                if (me.getViewModel().data.dieuchuyen) {
                                    var urlK2 = "api/Input/CheckMaterialIsExistInStoreroom?StoreroomId=" + recordPhieu.data.storeroomReceiveId + "&Id=" + rVT.get('id')
                                    const isExistK2 = await app.mUtils.fnGETAjaxV2(urlK2)
                                    if (!isExistK2) record.set("colorK2", "red");
                                }
                                var URL = "api/Material/GetQuantity?materialId=" + rVT.get('id') + "&storeroomId=" + recordPhieu.data.storeroomId
                                const qMS = await app.mUtils.fnGETAjaxV2(URL)
                                console.log(qMS);
                                if (qMS != -1) record.set("quantityMS", qMS);
                                record.set('materialId', rVT.get('id'));
                                record.set('materialCode', rVT.get('materialCode'));
                                record.set('materialName', rVT.get('displayName'));
                                record.set('tenVatTu1', rVT.get('materialCode') + "/" + rVT.get('materialName'));
                                record.set('price', rVT.get('price'));
                                record.set('quantity', 1);
                                var soluongthuc = record.get('quantity');
                                var dongia = record.get('price');
                                if (soluongthuc != 0 || soluongthuc != null) {
                                    var tt = soluongthuc * dongia;
                                    record.set('total', tt);
                                }
                                record.set('unit', rVT.get('unitName'));
                                record.set('donViTinhThuc', rVT.get('donViPhatHanh'));
                                storePhieuXuatChiTiet.add(record);
                            }
                        };
                        console.log(storePhieuXuatChiTiet);
                    }
                }
            }
        });
        wnd.show();
    },

    //onEditGrid: function (editor, context, eOpts) {
    //    var me = this;
    //    var record = context.record;
    //    if (me.getViewModel().data.dataVatTu.length > 0) {
    //        var dongia = record.get('donGia');
    //        if (record.get('soLuongThuc') != 0 || record.get('soLuongThuc') != null) {
    //            var tt = record.get('soLuongThuc') * dongia;
    //            record.set('thanhtien', tt)
    //            record.commit();

    //        }
    //        return;
    //    }
    //    var dongia = record.get('donGia');
    //    if (record.get('soLuongThuc') != 0 || record.get('soLuongThuc') != null) {
    //        var tt = record.get('soLuongThuc') * dongia;
    //        record.set('thanhTien', tt)
    //        record.commit();
    //    }
    //    me.checkThayDoiChiTiet = true;
    //},

    beforeedit: function (editor, context, eOpts) {
        var me = this;
        var record = me.getViewModel().data.recordPhieu;
        if (record.get('id') > 0 && record.get('loaiPhieu') == '-1') {
            return false
        }
    },

    onXoaLoaiVatTu: function (grid, rowIndex, colIndex) {
        var me = this;
        var record = me.getViewModel().data.recordPhieu;
        var selected = grid.getStore().getAt(rowIndex);
        if (record.get('id') > 0 && me.getViewModel().data.dieuchuyen == true) {
            abp.notify.success(app.localize('ExtgDataManagerPhieuDieuChuyen'));
            return
        }
        store.remove(selected);
        return;
        var store = me.storeinfo.storePhieuXuatChiTiet
        var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
        if (isNaN(selected.data.id) == true) {
            abp.message.confirm(
                app.localize('CMMSKhoThongBaoVatTu') + " " + selected.data.tenVatTu1,
                app.localize('ExtgDataManagerAreYouSure'),
                function (isConfirmed) {
                    if (isConfirmed) {
                        store.remove(selected);
                    }
                }
            );
        } else {
            abp.message.confirm(
                app.localize('CMMSKhoThongBaoVatTu') + " " + selected.data.tenVatTu1,
                app.localize('ExtgDataManagerAreYouSure'),
                function (isConfirmed) {
                    if (isConfirmed) {
                        store.remove(selected);
                        _cMMSKhoPhieuNhapXuatChiTiet.xoaChiTietPhieu({ id: selected.get('id') }, record.get('maKhoXuat'), 'xuatkho').done(function (result) {
                            me.getView().setLoading(false);
                            abp.notify.success(app.localize('SavedSuccessfully'));
                            (fnSauKhiLoad)
                            fnSauKhiLoad(result);
                        }).fail(function (data) {
                            me.getView().setLoading(false);
                        });
                    }
                })
        }
    },

    onThucHien: function () {
        var me = this;
        me.recordPubSub;
        var form = me.ref.frmPhieuXuatKho;
        if (!form.getForm().isValid()) {
            toastr.warning("Nhập đầy đủ thông tin yêu cầu!");
            return;
        }
        var grid = me.ref.dsPhieuXuatKhoChiTiet;
        var rows = grid.getStore().getRange();
        console.log(rows);
        var record = me.getViewModel().data.recordPhieu;
        var obj = [];
        var objInput = [];
        if (rows.length == 0) {
            toastr.warning("Vật tư không được để trống")
            return;
        }
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].get('quantity') == null || rows[i].get('quantity') == 0 || rows[i].get('quantity') < 0) {
                toastr.warning("Số lượng vật tư không hợp lệ")
                me.getView().setLoading(true)
                return;
            } else if (rows[i].get('color') && rows[i].get('color') == 'red') {
                toastr.warning('Vật tư' + " '" + rows[i].get('materialName') + "' " + 'không có trong kho')
                return;
            } else if (rows[i].get('colorK2') && rows[i].get('colorK2') == 'red') {
                toastr.warning('Vật tư' + " '" + rows[i].get('materialName') + "' " + 'không có trong kho ' + record.data.storeroomReceiveId)
                return;
            }
            else if (rows[i].get('quantity') > rows[i].get('quantityMS')) {
                toastr.warning('Vật tư' + " '" + rows[i].get('materialName') + "' " + 'trong kho đang không đủ để xuất kho!')
                return;
            } else {
                obj.push({ storeroomId: record.data.storeroomId, materialId: rows[i].get('materialId'), quantity: -rows[i].get('quantity') })
                if (record.data.type = -1)
                    objInput.push({ storeroomId: record.data.storeroomReceiveId, materialId: rows[i].get('materialId'), quantity: rows[i].get('quantity') })

            }
        }
        var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
        record.data.thoiGian = Ext.Date.format(new Date(record.get('ngayHachToan')), "Y/m/d H:i:s");
        record.data.ngayHachToan = Ext.Date.format(new Date(record.get('ngayHachToan')), "Y/m/d H:i:s");
        record.data.ngayChungTu = Ext.Date.format(new Date(record.get('ngayChungTu')), "Y/m/d H:i:s");
        record.data.phanLoai = 'xuatkho'
        var dieuchuyen = me.getViewModel().data.dieuchuyen;
        if (rows.length == 0 && dieuchuyen) {
            abp.notify.info(app.localize('CMMSDMKhoPhaiCoVatTuNhapKho'));
            me.getView().setLoading(false)
            return;
        }
        //check số lượng trong kho so với số lượng xuất hay điều chuyển
        var store = me.storeinfo.storePhieuXuatChiTiet;
        //if (textThongBao != "") {
        //    abp.notify.info(textThongBao)
        //    return;
        //}
        var rowMaterial = [];
        rows.forEach(function (element) {
            rowMaterial.push(element.data)
        })
        if (record.get('id') == 0) {
            me.getView().setLoading(true);
            //Tạo phiếu xuất
            var url = "/api/Output";
            record.data.materialOutput = rowMaterial
            console.log(record.data)
            me.getView().setLoading(true);
            app.mUtils.fnPOSTAjax(url, record.data, function (res) {
                toastr.success("Thêm mới dữ liệu thành công!");
                me.getView().setLoading(false);
                fnSauKhiLoad();
                // cập nhật số lượng
                obj.forEach(function (el) {
                    var url = "/api/Material/materialStoreroom/quantity"
                    app.mUtils.fnPUTAjax(url, el, function (response) {
                        console.log(response)
                    })
                })

                //Tạo phiếu nhập
                if (dieuchuyen) {
                    record.data.inputCode = record.get('outputCode');
                    record.data.description = "Phiếu điều chuyển";
                    record.data.materialInput = rowMaterial;
                    record.data.storeroomId = record.get('storeroomReceiveId');
                    record.data.dateInput = record.get('dateOutput')
                    record.data.dateStatus = record.get('dateOutput')
                    record.data.deliveryUnit = "Điều chuyển"
                    record.data.shipper = record.get('userName')
                    var urlK2 = "/api/Input";
                    record.data.materialInput = rowMaterial
                    app.mUtils.fnPOSTAjax(urlK2, record.data, function (res) {
                        //
                        objInput.forEach(function (el) {
                            var url = "/api/Material/materialStoreroom/quantity"
                            app.mUtils.fnPUTAjax(url, el, function (response) {
                                console.log(response)
                            })
                        })
                        me.getView().doClose();
                    });
                }
            });

        }
        else if (record.dirty) {
            me.getView().setLoading(true);
            _cMMSKhoPhieuNhapXuat.update(record.data).done(function (result) {
                me.ref.btnThemVatTu.setDisabled(false);
                record.commit(record);
                me.getView().setLoading(false);
                me.onLuuChiTiet(rows, record, dieuchuyen, fnSauKhiLoad, 'xuat');
                abp.notify.success(app.localize('SavedSuccessfully'));
            }).fail(function (data) {
                me.getView().setLoading(false);
            });
        }
        else {
            me.onLuuChiTiet(rows, record, dieuchuyen, fnSauKhiLoad, 'xuat');
        }
    },

    onLuuChiTiet: function (rows, record, dieuchuyen, fnSauKhiLoad, phanloai) {
        var me = this;
        var lstphieuchitiet = [];

        for (var i = 0; i < rows.length; i++) {
            rows[i].data.maPhieu = record.get('id');
            if (isNaN(rows[i].data.id) == true) {
                me.checkThayDoiChiTiet = true;
                rows[i].data.id = 0;
            }
            lstphieuchitiet.push(rows[i].data);
        }
        if (me.checkThayDoiChiTiet == false) {
            return
        }
        var dieuchuyen = me.getViewModel().data.dieuchuyen;
        me.getView().setLoading(true);
        if (phanloai == 'nhap') {
            if (dieuchuyen)
                _cMMSKhoPhieuNhapXuatChiTiet.chiTietPhieuNhap(lstphieuchitiet, record.get('maKhoNhap')).done(function (result) {
                    if (!dieuchuyen)
                        me.checkThayDoiChiTiet = false;
                    me.getView().setLoading(false);
                    if (fnSauKhiLoad)
                        fnSauKhiLoad();
                }).fail(function (data) {
                    me.getView().setLoading(false);
                });
        } else {
            _cMMSKhoPhieuNhapXuatChiTiet.chiTietPhieuXuat(lstphieuchitiet, record.get('maKhoXuat')).done(function (result) {
                if (!dieuchuyen)
                    me.checkThayDoiChiTiet = false;
                me.getView().setLoading(false);
                me.onloadChiTiet();
                if (fnSauKhiLoad)
                    fnSauKhiLoad();
            }).fail(function (data) {
                me.getView().setLoading(false);
            });
        }
    },

    //onDongWinDow: function () {
    //    var me = this;
    //    abp.event.off('abp.notifications.receivedEKGISData', me.pubSub);
    //    var record = me.getViewModel().data.recordPhieu;
    //    record.reject();
    //}
});
