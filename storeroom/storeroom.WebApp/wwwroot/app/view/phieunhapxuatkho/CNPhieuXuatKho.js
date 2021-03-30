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
                        value: '{recordPhieu.maKhoXuat}'
                    },
                    labelWidth: 120,
                    fieldLabel: 'Kho' /*+ ' ' + app.gplatformconsts.var_required*/,
                    allowBlank: false,
                    blankText: 'Kho không được để trống',
                    queryMode: 'local',
                    displayField: 'moTa',
                    valueField: 'id',
                    forceSelection: true,
                    editable: false,
                    listeners: {
                        change: 'onChangeKho'
                    },
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
                            value: '{recordPhieu.tenNguoiDeXuat}'
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
                            value: '{recordPhieu.soPhieu}'
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
                    displayField: 'moTa',
                    bind: {
                        store: '{storeLoaiPhieu}',
                        value: '{recordPhieu.loaiPhieu}'
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
                    bind: '{recordPhieu.ngayHachToan}',
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
                    bind: '{recordPhieu.ngayChungTu}',
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
                    bind: '{recordPhieu.donViNhan}',
                    allowBlank: false,
                    blankText: 'Đơn vị nhận không được để trống'
                }, {
                    xtype: 'textfield',
                    reference: 'textNguoiNhan',
                    bind: '{recordPhieu.nguoiNhan}',
                    fieldLabel: 'Người nhận',
                    margin: '5 5 0 0',
                    labelWidth: 113
                }]
            }, {
                //xtype: 'combo',
                //margin: '5 5 0 5',
                //reference: 'cbkhonhan',
                //labelAlign: 'right',
                //bind: {
                //    store: '{storeKhoNhap}',
                //    value: '{recordPhieu.maKhoNhap}'
                //},
                //labelWidth: 115,
                //fieldLabel: app.localize('CMMSDMKhoKhoNhan') + ' ' + app.gplatformconsts.var_required,
                //queryMode: 'local',
                //displayField: 'moTa',
                //valueField: 'id',
                //forceSelection: true,
                //hidden: true,
                //editable: false,
                //allowBlank: false,
                //blankText: app.localize('CMMSDMKhChuaChon') + ' ' + app.localize("CMMSDMKhoKhoNhan").toLocaleLowerCase(),
                //flex: 1
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
            dataIndex: 'donViTinhThuc',
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
                dataIndex: 'soLuong',
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
            dataIndex: 'donGia',
            style: 'text-align:center',
            align: 'right',
            border: 1,
            width: 100,
            renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                if (value != undefined && value != null) {
                    //return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                }
            },
            editor: {
                xtype: 'currencyfield',
                fieldStyle: 'text-align: right;'
            }
        }, {
            xtype: 'numbercolumn',
            text: 'Thành tiền',
            dataIndex: 'thanhTien',
            border: 1,
            style: 'text-align:center',
            align: 'right',
            width: 110,
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
        //storeLoaiPhieu.loadData([{ id: -1, moTa: app.localize("CMMSDMKhoPhanLoaiDChuyen") }])
        //me.pubSub = function (userNotification) {
        //    if (userNotification.type == "WareHouseQRCode") {
        //        var data = JSON.parse(userNotification.data);
        //        me.onTimKiem(data);
        //    }
        //};
        //abp.event.on('abp.notifications.receivedEKGISData', me.pubSub);
        //me.loadKho();
        //var record = me.getViewModel().data.recordPhieu;
        //if (me.getViewModel().data.textThongBao != "") {
        //    me.ref.displayThongBao.setVisible(true);
        //    var html = '<p style="color:red;padding-top: 5px;padding: 0px;margin: 0px;">' + app.localize('CMMSDMKhoThongBaoSoLuongVatTuTrongKhoNhoHonSoLuongDeXuat') + ' ' + me.getViewModel().data.textThongBao + '</p>'
        //    me.ref.displayThongBao.setHtml(html);
        //}
        //if ((record.get('loaiPhieu') == -1 || me.getViewModel().data.dieuchuyen)) {
        //    me.ref.textNguoiNhan.setMargin('5 5 0 7')
        //    me.ref.textDonViNhan.setVisible(false);
        //    me.ref.cbkhonhan.setVisible(true);
        //    me.ref.textDonViNhan.allowBlank = true;
        //    me.ref.phanLoai.setReadOnly(true);
        //} else {
        //    me.loadLoaiPhieu();
        //    me.ref.textDonViNhan.setVisible(true);
        //    me.ref.cbkhonhan.allowBlank = true;
        //}

        //if (record.get('id') == 0) {
        //    record.set("tenNguoiDeXuat", app.session.user.surname + " " + app.session.user.name);
        //    record.set("nguoiDeXuat", app.session.user.id);
        //    // var dataVatTu = me.getViewModel().data.dataVatTu;
        //    // me.storeinfo.storePhieuXuatChiTiet.loadData(dataVatTu);
        //} else {
        //    me.onloadChiTiet();
        //    if (record.get('loaiPhieu') == -1) {
        //        me.ref.textNhapMaVatTu.setDisabled(true);
        //        me.ref.btnTimKiemVT.setDisabled(true);
        //        me.ref.btnThemVatTu.setDisabled(true);
        //        me.ref.btnThucHien.setDisabled(true);
        //        me.ref.btnLayNguoiDung.setDisabled(true);
        //        me.ref.btnXoaLoaiVatTu.setVisible(false);
        //        me.ref.btnLaySoPhieu.setDisabled(true);
        //    }
        //}
    },

    //onChangeKho: function (combo, newValue, oldValue, eOpts) {
    //    var me = this;
    //    me.onLaySoNhap();
    //    var record = me.getViewModel().data.recordPhieu;
    //    if (record.get('id') == 0) {
    //        var dataVatTu = me.getViewModel().data.dataVatTu;
    //        if (dataVatTu) {
    //            var listIdVT = ""
    //            for (var i = 0; i < dataVatTu.length; i++) {
    //                if (listIdVT != "") listIdVT += ","
    //                listIdVT += dataVatTu[i].maVatTu
    //            }
    //            var url = abp.appPath + 'api/services/app/CMMSKhoInventory/GetVatTuCoTrongKho' + abp.utils.buildQueryString([{ name: 'maKho', value: record.get('maKhoXuat') }, { name: 'ListIdNotIn', value: listIdVT }]);
    //            app.gplatformutils.fnGETAjax(url, function (data) {
    //                var listID = data.result.split(',');
    //                for (var i = 0; i < dataVatTu.length; i++) {
    //                    if (listID.indexOf(dataVatTu[i].maVatTu.toString()) == -1) {
    //                        dataVatTu[i]['color'] = 'red'
    //                    }
    //                }
    //                me.storeinfo.storePhieuXuatChiTiet.loadData(dataVatTu);
    //            });
    //        }
    //    }
    //},

    //loadKho: function () {
    //    var me = this;

    //    var store = me.storeinfo.storeKhoXuat;
    //    var storeKho = me.getViewModel().data.storeKho;
    //    if (storeKho != null) {
    //        var data = [];
    //        store.loadRecords(storeKho.data.items);
    //        var record = me.getViewModel().data.recordPhieu;
    //        for (var i = 0; i < storeKho.data.items.length; i++) {
    //            if (storeKho.data.items[i].get('id') != record.get('maKhoXuat')) {
    //                data.push(storeKho.data.items[i]);
    //            }
    //        }
    //        me.storeinfo.storeKhoNhap.loadRecords(data)
    //        return;
    //    }
    //    var url = abp.appPath + "api/services/app/CMMSKho/GetPermission";
    //    store.proxy.api.read = url;
    //    store.load({
    //        scope: this,
    //        callback: function (records, operation, success) {
    //            var data = [];
    //            var record = me.getViewModel().data.recordPhieu;
    //            for (var i = 0; i < records.length; i++) {
    //                if (records[i].get('id') != record.get('maKhoXuat')) {
    //                    data.push(records[i]);
    //                }
    //            }
    //            me.storeinfo.storeKhoNhap.loadRecords(data)
    //            me.getView().setLoading(false);
    //        }
    //    });
    //},

    //loadLoaiPhieu: function () {
    //    var me = this;
    //    var store = me.storeinfo.storeLoaiPhieu;
    //    var url = abp.appPath + "api/services/app/CMMSDMLoaiPhieu/GetAll?PhanLoai=xuatkho";
    //    store.proxy.api.read = url;
    //    store.load({
    //        scope: this,
    //        callback: function (records, operation, success) {
    //        }
    //    });
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

    //onloadChiTiet: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    var filter = [{ name: 'maPhieu', value: record.get('id') }];
    //    var query = abp.utils.buildQueryString(filter);
    //    var url = abp.appPath + "api/services/app/CMMSKhoPhieuNhapXuatChiTiet/GetAllByMaPhieu" + query;
    //    var store = me.storeinfo.storePhieuXuatChiTiet;
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

    //onFnCheck: function (machungloai) {
    //    var me = this;
    //    var storePhieuXuatChiTiet = me.storeinfo.storePhieuXuatChiTiet;
    //    var record = storePhieuXuatChiTiet.data.items;
    //    for (var i = 0; i < record.length; i++) {
    //        if (record[i].get('maVatTu') == machungloai)
    //            return record[i]
    //    }
    //    return false;
    //},

    //onTimKiemvatTuNangCao: function (btn) {
    //    var me = this;
    //    var notItem = me.storeinfo.storePhieuXuatChiTiet.data.items;
    //    var stringMaLoaiVatTu = "";
    //    for (var i = 0; i < notItem.length; i++) {
    //        if (stringMaLoaiVatTu != "") stringMaLoaiVatTu += ",";
    //        stringMaLoaiVatTu += notItem[i].get('maVatTu');
    //    }
    //    var recordPhieu = me.getViewModel().data.recordPhieu;
    //    var wnd = Ext.create('Admin.view.phieunhapxuatkho.cnThemChungLoaiVaoPhieu', {
    //        viewModel: {
    //            data: {
    //                rSelectedNhomVatTu: null,
    //                rSelectedVatTu: null,
    //                listNotIn: stringMaLoaiVatTu,
    //                maKho: recordPhieu.get('maKhoXuat'),
    //                stringMaLoaiVatTu: stringMaLoaiVatTu,
    //                fnSauKhiChon: function (recordVatTu) {
    //                    var storePhieuXuatChiTiet = me.storeinfo.storePhieuXuatChiTiet;
    //                    for (var i = 0; i < recordVatTu.length; i++) {
    //                        var check = me.onFnCheck(recordVatTu[i].get('id'))
    //                        if (check != false) {
    //                            var soluong = check.get('soLuongThuc') + 1
    //                            check.set('soLuongThuc', soluong)
    //                        }
    //                        if (check == false) {
    //                            var record = Ext.create('Admin.model.mPhieuNhapXuatChiTiet');
    //                            record.set('maVatTu', recordVatTu[i].get('id'));
    //                            record.set('vatTu', recordVatTu[i].get('ma'));
    //                            record.set('tenVatTu', recordVatTu[i].get('moTa'));
    //                            record.set('tenVatTu1', recordVatTu[i].get('ma') + "/" + recordVatTu[i].get('moTa'));
    //                            record.set('donGia', recordVatTu[i].get('giaTri'));
    //                            record.set('soLuongThuc', 1);
    //                            record.set('soLuongTrongKho', recordVatTu[i].get('soLuongTrongKho'));
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
    //                            record.set('donViTinh', recordVatTu[i].get('donViPhatHanh'));
    //                            record.set('donViTinhThuc', recordVatTu[i].get('donViPhatHanh'));
    //                            storePhieuXuatChiTiet.add(record);
    //                        }
    //                    }
    //                }
    //            }
    //        }
    //    });
    //    wnd.show();
    //},

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

    //beforeedit: function (editor, context, eOpts) {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    if (record.get('id') > 0 && record.get('loaiPhieu') == '-1') {
    //        return false
    //    }
    //},

    //onXoaLoaiVatTu: function (grid, rowIndex, colIndex) {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    var selected = grid.getStore().getAt(rowIndex);
    //    if (record.get('id') > 0 && me.getViewModel().data.dieuchuyen == true) {
    //        abp.notify.success(app.localize('ExtgDataManagerPhieuDieuChuyen'));
    //        return
    //    }
    //    var store = me.storeinfo.storePhieuXuatChiTiet
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
    //                    _cMMSKhoPhieuNhapXuatChiTiet.xoaChiTietPhieu({ id: selected.get('id') }, record.get('maKhoXuat'), 'xuatkho').done(function (result) {
    //                        me.getView().setLoading(false);
    //                        abp.notify.success(app.localize('SavedSuccessfully'));
    //                        (fnSauKhiLoad)
    //                        fnSauKhiLoad(result);
    //                    }).fail(function (data) {
    //                        me.getView().setLoading(false);
    //                    });
    //                }
    //            })
    //    }
    //},

    //onThucHien: function () {
    //    var me = this;
    //    me.recordPubSub;
    //    var form = me.ref.frmPhieuXuatKho;
    //    if (!form.getForm().isValid()) {
    //        abp.notify.warn(app.localize("TaiSan_isValid"));
    //        return;
    //    }
    //    var grid = me.ref.dsPhieuXuatKhoChiTiet;
    //    var rows = grid.getStore().getRange();
    //    if (rows.length == 0) {
    //        abp.notify.warn(app.localize("CMMSDMKhoVatTu_ThongBao"));
    //        return;
    //    }
    //    for (var i = 0; i < rows.length; i++) {
    //        if (rows[i].get('soLuongThuc') == null || rows[i].get('soLuongThuc') == 0) {
    //            abp.notify.info(app.localize('CMMSDMKhoSoLuongVatTuKhongDuocDeTrong'))
    //            me.getView().setLoading(true)
    //            return;
    //        } else if (rows[i].get('color') && rows[i].get('color') == 'red') {
    //            abp.notify.info(app.localize('CongViec_VatTu_CapNhat_lblVatTu') + " '" + rows[i].get('tenVatTu') + "' " + app.localize('CMMSDMKhoSoLuongVatTuKhongCoTrongKho'))
    //            return;
    //        }
    //    }
    //    var record = me.getViewModel().data.recordPhieu;
    //    var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
    //    record.data.thoiGian = Ext.Date.format(new Date(record.get('ngayHachToan')), "Y/m/d H:i:s");
    //    record.data.ngayHachToan = Ext.Date.format(new Date(record.get('ngayHachToan')), "Y/m/d H:i:s");
    //    record.data.ngayChungTu = Ext.Date.format(new Date(record.get('ngayChungTu')), "Y/m/d H:i:s");
    //    record.data.phanLoai = 'xuatkho'
    //    var dieuchuyen = me.getViewModel().data.dieuchuyen;
    //    if (rows.length == 0 && dieuchuyen) {
    //        abp.notify.info(app.localize('CMMSDMKhoPhaiCoVatTuNhapKho'));
    //        me.getView().setLoading(false)
    //        return;
    //    }
    //    //check số lượng trong kho so với số lượng xuất hay điều chuyển
    //    var listid = "";
    //    for (var i = 0; i < rows.length; i++) {
    //        if (listid != "") listid += ","
    //        listid += rows[i].data.maVatTu;
    //    }
    //    var store = me.storeinfo.storePhieuXuatChiTiet;
    //    var filter = [{ name: 'maKho', value: record.get('maKhoXuat') }, { name: 'maxResultCount', value: 200 }];
    //    var query = abp.utils.buildQueryString(filter);
    //    var url = abp.appPath + "api/services/app/CMMSKhoInventory/GetAll" + query + "&ListIdNotIn=" + listid;
    //    var textThongBao = "";
    //    app.gplatformutils.fnGETAjax(url, function (resultData) {
    //        for (var i = 0; i < resultData.result.items.length; i++) {
    //            var recordIn = store.queryBy(function (records, id) {
    //                return (records.get('soLuongThuc') > resultData.result.items[i].soLuong);
    //            });
    //            if (recordIn.items.length > 0) {
    //                textThongBao = app.localize('CMMSDMKhoVatTu') + " " + resultData.result.items[i].tenVatTu + " " + app.localize('CMMSDMKhoSoLuongVatTuXuatLonHonSoLuongTrongKho')
    //                break;
    //            }
    //        }
    //    });
    //    if (textThongBao != "") {
    //        abp.notify.info(textThongBao)
    //        return;
    //    }

    //    if (record.get('id') == 0) {
    //        me.getView().setLoading(true);
    //        //Tạo phiếu xuất
    //        _cMMSKhoPhieuNhapXuat.create(record.data).done(function (result) {
    //            me.getView().setLoading(false);
    //            record.set('id', result.id);
    //            me.onLuuChiTiet(rows, record, false, fnSauKhiLoad, 'xuat');
    //            //Lưu phiếu điều chuyển
    //            if (dieuchuyen) {
    //                record.data.maPhieuCha = result.id;
    //                record.data.maKhoXuat = "";
    //                var selectKhoNhan = me.ref.cbkhonhan.getSelection();
    //                _cMMSKhoPhieuNhapXuat.laySoPhieu(selectKhoNhan.data.id, selectKhoNhan.data.ma, '').done(function (resultSpP) {
    //                    //Tạo phiếu nhập
    //                    record.set('phanLoai', 'nhapkho');
    //                    record.data.soPhieu = resultSpP;
    //                    record.data.donViGiao = me.ref.cbkhoXuatVT.getRawValue();
    //                    record.data.nguoiGiao = record.data.tenNguoiDeXuat;
    //                    _cMMSKhoPhieuNhapXuat.create(record.data).done(function (result) {
    //                        record.set('id', result.id);
    //                        for (var i = 0; i < rows.length; i++) {
    //                            if (rows[i].get('soLuongThuc') == null || rows[i].get('soLuongThuc') == 0) {
    //                                abp.notify.info(app.localize('CMMSDMKhoSoLuongVatTuKhongDuocDeTrong'))
    //                                me.getView().setLoading(false)
    //                                return;
    //                            }
    //                        }
    //                        if (record.get('loaiPhieu') == -1) {
    //                            me.ref.textNhapMaVatTu.setDisabled(true);
    //                            me.ref.btnTimKiemVT.setDisabled(true);
    //                            me.ref.btnThemVatTu.setDisabled(true);
    //                            me.ref.btnThucHien.setDisabled(true);
    //                            me.ref.btnLayNguoiDung.setDisabled(true);
    //                        }
    //                        me.onLuuChiTiet(rows, record, dieuchuyen, fnSauKhiLoad, 'nhap');
    //                    }).fail(function (data) {
    //                        me.getView().setLoading(false);
    //                    });
    //                }).fail(function (data) {
    //                });
    //            }
    //            abp.notify.success(app.localize('SavedSuccessfully'));
    //        }).fail(function (data) {
    //            me.getView().setLoading(false);
    //        });
    //    }
    //    else if (record.dirty) {
    //        me.getView().setLoading(true);
    //        _cMMSKhoPhieuNhapXuat.update(record.data).done(function (result) {
    //            me.ref.btnThemVatTu.setDisabled(false);
    //            record.commit(record);
    //            me.getView().setLoading(false);
    //            me.onLuuChiTiet(rows, record, dieuchuyen, fnSauKhiLoad, 'xuat');
    //            abp.notify.success(app.localize('SavedSuccessfully'));
    //        }).fail(function (data) {
    //            me.getView().setLoading(false);
    //        });
    //    }
    //    else {
    //        me.onLuuChiTiet(rows, record, dieuchuyen, fnSauKhiLoad, 'xuat');
    //    }
    //},

    //onLuuChiTiet: function (rows, record, dieuchuyen, fnSauKhiLoad, phanloai) {
    //    var me = this;
    //    var lstphieuchitiet = [];

    //    for (var i = 0; i < rows.length; i++) {
    //        rows[i].data.maPhieu = record.get('id');
    //        if (isNaN(rows[i].data.id) == true) {
    //            me.checkThayDoiChiTiet = true;
    //            rows[i].data.id = 0;
    //        }
    //        lstphieuchitiet.push(rows[i].data);
    //    }
    //    if (me.checkThayDoiChiTiet == false) {
    //        return
    //    }
    //    var dieuchuyen = me.getViewModel().data.dieuchuyen;
    //    me.getView().setLoading(true);
    //    if (phanloai == 'nhap') {
    //        if (dieuchuyen)
    //            _cMMSKhoPhieuNhapXuatChiTiet.chiTietPhieuNhap(lstphieuchitiet, record.get('maKhoNhap')).done(function (result) {
    //                if (!dieuchuyen)
    //                    me.checkThayDoiChiTiet = false;
    //                me.getView().setLoading(false);
    //                if (fnSauKhiLoad)
    //                    fnSauKhiLoad();
    //            }).fail(function (data) {
    //                me.getView().setLoading(false);
    //            });
    //    } else {
    //        _cMMSKhoPhieuNhapXuatChiTiet.chiTietPhieuXuat(lstphieuchitiet, record.get('maKhoXuat')).done(function (result) {
    //            if (!dieuchuyen)
    //                me.checkThayDoiChiTiet = false;
    //            me.getView().setLoading(false);
    //            me.onloadChiTiet();
    //            if (fnSauKhiLoad)
    //                fnSauKhiLoad();
    //        }).fail(function (data) {
    //            me.getView().setLoading(false);
    //        });
    //    }
    //},

    //onDongWinDow: function () {
    //    var me = this;
    //    abp.event.off('abp.notifications.receivedEKGISData', me.pubSub);
    //    var record = me.getViewModel().data.recordPhieu;
    //    record.reject();
    //}
});
