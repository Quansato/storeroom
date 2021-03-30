Ext.define('Admin.view.phieunhapxuatkho.cnPhieuNhapKhoModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.phieunhapxuatkho-mcnphieunhapkho',
    data: {
        recordPhieu: null,
        //storeCongTrinh: null,
        fnSauKhiLoad: null,
        selectionPhieuNhapXuatChiTiet: null,
        storeKho: null,
        recordTK: false,
        dataVatTu: [],
        donmuahang: false
    },
    stores: {
        storeKhoNhap: { type: 'skho', pageSize: 1000 },
        storeLoaiPhieu: { type: 'sdmloaiphieu', pageSize: 500 },
        storePhieuNhapChiTiet: { type: 'sphieunhapxuatchitiet' }
    }
});

Ext.define('Admin.view.phieunhapxuatkho.cnPhieuNhapKho', {
    extend: 'Ext.window.Window',
    requires: [
        'Admin.view.phieunhapxuatkho.cnPhieuNhapKhoController',
        'Admin.view.phieunhapxuatkho.cnPhieuNhapKhoModel',
        'Ext.grid.Panel',
        'Ext.data.Store',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.plugin.Editing'
    ],
    controller: 'phieunhapxuatkho-ccnphieunhapkho',
    viewModel: {
        type: 'phieunhapxuatkho-mcnphieunhapkho'
    },
    width: 1150,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    iconCls: 'x-fa fa-cloud-download',
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
                align: 'stretch',
                labelAlign: 'right'
            },
            items: [{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                padding: 0,
                margin: 0,
                items: [{
                    xtype: 'combo',
                    reference: 'cbkho',
                    margin: '5 5 0 0',
                    labelAlign: 'right',
                    bind: {
                        store: '{storeKhoNhap}',
                        value: '{recordPhieu.maKhoNhap}',
                        readOnly: '{recordPhieu.id>0}'
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
                    flex: 1,
                    padding: 0,
                    margin: 0,
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Người nhận' /*+ ' ' + app.gplatformconsts.var_required*/,
                        padding: 0,
                        readOnly: true,
                        allowBlank: false,
                        labelAlign: 'right',
                        blankText: 'Chưa chọn người nhận',
                        margin: '5 0 0 0',
                        labelWidth: 115,
                        flex: 1,
                        bind: {
                            value: '{recordPhieu.tenNguoiPheDuyet}'
                        }
                    }, {
                        margin: '5 5 0 0',
                        xtype: 'button',
                        reference: 'btnLayNguoiDung',
                        tooltip: 'Chọn người nhận',
                        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
                        handler: 'onLayNguoiDung',
                        text: '...'
                    }]
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0',
                padding: 0,
                items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    padding: 0,
                    margin: '0',
                    flex: 1,
                    items: [{
                        xtype: 'textfield',
                        labelAlign: 'right',
                        margin: '5 0 0 5',
                        labelWidth: 115,
                        bind: {
                            readOnly: '{!recordPhieu.id==0}',
                            value: '{recordPhieu.soPhieu}'
                        },
                        reference: 'txtSoPhieu',
                        fieldLabel: 'Số phiếu' /*+ ' ' + app.gplatformconsts.var_required*/,
                        allowBlank: false,
                        blankText: 'Số phiếu không được để trống',
                        flex: 1,
                        listeners: {
                            blur: "blurMa"
                        }
                    }, {
                        margin: '5 0 0 0',
                        xtype: 'button',
                        reference: 'btnLaySoPhieu',
                        bind: {
                            hidden: '{!recordPhieu.id==0}'
                        },
                        handler: 'onLaySoNhap',
                        text: 'Lấy số'
                    }]
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Phân loại',
                    flex: 1,
                    margin: '5 5 0 0',
                    queryMode: 'local',
                    editable: false,
                    labelAlign: 'right',
                    labelWidth: 120,
                    reference: 'cbophanLoai',
                    displayField: 'moTa',
                    bind: {
                        store: '{storeLoaiPhieu}',
                        value: '{recordPhieu.loaiPhieu}'
                    },
                    valueField: 'id',
                    listeners: {
                        change: 'onChangePhanLoai'
                    }
                }]
            }, {
                xtype: 'fieldcontainer',
                margin: 0,
                padding: 0,
                layout: 'hbox',
                items: [{
                    xtype: 'datefield',
                    labelAlign: 'right',
                    labelWidth: 115,
                    margin: '5 5 0 5',
                    allowBlank: false,
                    blankText: 'Chưa chọn ngày nhập kho',
                    name: 'ngayhachtoan',
                    fieldLabel: 'Ngày nhập kho' /*+ ' ' + app.gplatformconsts.var_required*/,
                    bind: '{recordPhieu.ngayHachToan}',
                    format: 'd/m/Y',
                    flex: 1
                }, {
                    xtype: 'datefield',
                    name: 'ngaychungtu',
                    margin: '5 5 0 0',
                    labelAlign: 'right',
                    editable: false,
                    blankText: 'Ngày chứng từ',
                    labelWidth: 115,
                    format: 'd/m/Y',
                    fieldLabel: 'Ngày chứng từ',
                    bind: '{recordPhieu.ngayChungTu}',
                    flex: 1
                }]
            }, {
                xtype: 'fieldcontainer',
                margin: '0',
                layout: 'hbox',
                defaults: {
                    xtype: 'textfield',
                    flex: 1,
                    labelAlign: 'right'
                },
                items: [{
                    margin: '5 5 0 5',
                    labelWidth: 115,
                    bind: '{recordPhieu.donViGiao}',
                    fieldLabel: 'Đơn vị giao'
                }, {
                    margin: '5 5 0 0',
                    labelWidth: 115,
                    bind: '{recordPhieu.nguoiGiao}',
                    fieldLabel: 'Người giao hàng'
                }]
            }, {
                xtype: 'textareafield',
                name: 'lydo',
                margin: '5 5 0 5',
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
                    html: '<div id="idqrcodeXNK"></div>'
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
                        reference: 'textNhapMaVatTu',
                        listeners: {
                            specialkey: 'specialkeyThemChungLoai'
                        }
                    }, {
                        xtype: 'button',
                        ui: 'soft-blue',
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
        reference: 'dsPhieuNhapKhoChiTiet',
        cls: 'topGrid',
        ui: 'light',
        iconCls: 'x-fa fa-list-alt',
        border: true,
        height: 300,
        title: 'Danh sách vật tư',
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
        features: [{
            ftype: 'summary',
            dock: 'bottom'
        }],
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
        bind: {
            store: '{storePhieuNhapChiTiet}',
            selection: '{selectionPhieuNhapXuatChiTiet}'
        },
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
            style: 'text-align:center',
            border: 1,
            align: 'left',
            width: 110
        }, {
            text: 'Số lượng',
            columns: [{
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
            },
            {
                text: 'Thực nhập',
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
            }, {
                //text: app.localize('CMMSDMKhoSoLuongHong'),
                //dataIndex: 'soLuongHong',
                //reference: 'coluonSoLuongHong',
                //border: 1,
                //hidden: true,
                //style: 'text-align:center',
                //align: 'right',
                //width: 100,
                //renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                //    if (value != undefined && value != null) {
                //        return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                //    }
                //},
                //editor: {
                //    xtype: 'currencyfield',
                //    fieldStyle: 'text-align: right;'
                //},
                //summaryType: 'sum',
                //summaryRenderer: function (value, summaryData, dataIndex) {
                //    if (value != undefined && value != null) {
                //        return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                //    }
                //}
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
            style: 'text-align:center',
            border: 1,
            width: 120,
            editor: {
                xtype: 'textfield'
            }
        }, {
            xtype: 'actioncolumn',
            width: 40,
            align: 'center',
            reference: 'btnXoaLoaiVatTu',
            bind: {
                disabled: '{!selectionPhieuNhapXuatChiTiet}'
            },
            items: [{
                xtype: 'button',
                iconCls: 'x-fa fa-minus',
                align: 'center',
                text: '',
                tooltip: 'Xoá vật tư khỏi phiếu',
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
                handler: "onXoaLoaiVatTu"
            }]
        }]
    }],
    buttons: [{
        text: 'Lưu thông tin',
        ui: 'soft-blue',
        iconCls: 'fa fa-floppy-o',
        reference: 'btnThucHien',
        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
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
        afterRender: 'onAfterrender',
        close: 'onDongWinDow'
    }
});

Ext.define('Admin.view.phieunhapxuatkho.cnPhieuNhapKhoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.phieunhapxuatkho-ccnphieunhapkho',
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
        //me.pubSub = function (userNotification) {
        //    if (userNotification.type == "WareHouseQRCode") {
        //        var data = JSON.parse(userNotification.data);
        //        me.onTimKiem(data);
        //    }
        //};
        //abp.event.on('abp.notifications.receivedEKGISData', me.pubSub);
        //me.loadKho();
        //var record = me.getViewModel().data.recordPhieu;
        //if (record.get('id') == 0) {
        //    record.set("tenNguoiPheDuyet", app.session.user.surname + " " + app.session.user.name);
        //    record.set("nguoiPheDuyet", app.session.user.id);
        //    me.loadLoaiPhieu();
        //    var dataVatTu = me.getViewModel().data.dataVatTu;
        //    if (dataVatTu) {
        //        me.storeinfo.storePhieuNhapChiTiet.loadData(dataVatTu);
        //    }
        //} else {
        //    me.onloadChiTiet();
        //    var storeLoaiPhieu = me.storeinfo.storeLoaiPhieu;
        //    storeLoaiPhieu.loadData([{ id: -1, moTa: app.localize("CMMSDMKhoPhanLoaiDChuyen") }])
        //    if (record.get('loaiPhieu') == -1) {
        //        me.ref.textNhapMaVatTu.setDisabled(true);
        //        me.ref.btnTimKiemVT.setDisabled(true);
        //        me.ref.btnThemVatTu.setDisabled(true);
        //        me.ref.btnThucHien.setDisabled(true);
        //        me.ref.btnLayNguoiDung.setDisabled(true);
        //        setTimeout(function () {
        //            me.ref.cbophanLoai.setReadOnly(true);
        //        }, 300);
        //        me.ref.btnXoaLoaiVatTu.setVisible(false);
        //    } else {
        //        me.loadLoaiPhieu();
        //    }
        //}
        //setTimeout(function () {
        //    if (me.getViewModel().data.donmuahang)
        //        me.ref.cbkho.setReadOnly(me.getViewModel().data.donmuahang);
        //}, 300);
    },

    //onLayNguoiDung: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    Ext.create("Admin.view.chondulieu.wdChonNguoiDung", {
    //        viewModel: {
    //            data: {
    //                fnSauKhiChon: function (result, idPhongBan) {
    //                    record.set("nguoiPheDuyet", result.get("id"));
    //                    record.set("tenNguoiPheDuyet", result.get("surname") + " " + result.get("name"));
    //                }
    //            }
    //        }
    //    }).show();
    //},

    //loadKho: function () {
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

    //loadLoaiPhieu: function () {
    //    var me = this;
    //    var store = me.storeinfo.storeLoaiPhieu;
    //    var url = abp.appPath + "api/services/app/CMMSDMLoaiPhieu/GetAll?PhanLoai=nhapkho";
    //    store.proxy.api.read = url;
    //    store.load({
    //        scope: this,
    //        callback: function (records, operation, success) {
    //        }
    //    });
    //},

    //blurMa: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    if (record.get('id') > 0) {
    //        return;
    //    }
    //    $("#idqrcodeXNK").html('');
    //    var qrcode = new QRCode("idqrcodeXNK", {
    //        width: 80,
    //        height: 80
    //    });
    //    if (qrcode == "") {
    //        return;
    //    }
    //    qrcode.makeCode(record.data.soPhieu);
    //},

    //onLaySoNhap: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    var nodesSelect = me.ref.cbkho.getSelectedRecord();
    //    if (record.get('id') == 0) {
    //        _cMMSKhoPhieuNhapXuat.laySoPhieu(nodesSelect.get('id'), nodesSelect.get('ma'), '').done(function (result) {
    //            record.set('soPhieu', result);
    //            $("#idqrcodeXNK").html('');
    //            var qrcode = new QRCode('idqrcodeXNK', {
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
    //        }).fail(function (data) {
    //        });
    //    } else {
    //        $("#idqrcodeXK").html('');
    //        var qrcode = new QRCode('idqrcodeXNK', {
    //            width: 80,
    //            height: 80
    //        });
    //        qrcode.makeCode(record.data.soPhieu);
    //    }
    //},

    //onChangeKho: function (combo, record, eOpts) {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    me.onLaySoNhap();
    //    if (combo.getSelection().get('phanLoai') == app.localize('CMMSKhoVatTu') || combo.getSelection().get('phanLoai') == "") {
    //        // record.set('loaiPhieu', app.localize('CMMSDMKhoPhanLoaiDD'));
    //        me.ref.cbophanLoai.setReadOnly(false);
    //    } else {
    //        // record.set('loaiPhieu', app.localize("CMMSDMKhoPhanLoaiThuHoi"));
    //        me.ref.cbophanLoai.setReadOnly(true);
    //    }
    //    if (record.get('id') == 0) {
    //        me.getView().setTitle(app.localize('CMMSDMKhoBtnPhieuNhapKho') + ': ' + combo.getRawValue());
    //    }
    //},

    //onChangePhanLoai: function (obj, newValue, oldValue, eOpts) {
    //    var me = this;
    //    if (obj.getValue() == app.localize("CMMSDMKhoPhanLoaiThuHoi")) {
    //        me.ref.coluonSoLuongHong.setVisible(true);
    //    } else {
    //        me.ref.coluonSoLuongHong.setVisible(false);
    //    }
    //},

    //onloadChiTiet: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    var filter = [{ name: 'maPhieu', value: record.get('id') }];
    //    var query = abp.utils.buildQueryString(filter);
    //    var url = abp.appPath + "api/services/app/CMMSKhoPhieuNhapXuatChiTiet/GetAllByMaPhieu" + query;
    //    var store = me.storeinfo.storePhieuNhapChiTiet;
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
    //    //if (record.get('id') == 0) {
    //    //    abp.notify.info(app.localize('CMMSKhoThongBaoLuuPhieu'));
    //    //    return
    //    //}
    //    if (me.ref.textNhapMaVatTu.getValue() == "" || me.ref.textNhapMaVatTu.getValue() == null) {
    //        abp.notify.info(app.localize('CMMSDMKhoMuaHanhChuaNhapMa'));
    //        return;
    //    }
    //    var filter = [{ name: "laKho", value: true }, { name: "MaVatTu", value: me.ref.textNhapMaVatTu.getValue() }, { name: "MaKho", value: record.get('maKhoNhap') }];
    //    var query = abp.utils.buildQueryString(filter);
    //    var url = abp.appPath + "api/services/app/CMMSKhoVatTu/GetVatTuKho" + query;
    //    app.gplatformutils.fnGETAjax(url, function (data) {
    //        var ressult = data.result.items;
    //        if (ressult.length > 0) {
    //            var storePhieuNhapChiTiet = me.storeinfo.storePhieuNhapChiTiet;
    //            var recordIn = storePhieuNhapChiTiet.queryBy(function (records, id) {
    //                return (records.get('maVatTu') == ressult[0].id);
    //            });
    //            if (recordIn.items.length > 0) {
    //                for (var i = 0; i < recordIn.items.length; i++) {
    //                    var soLuong = recordIn.items[i].get('soLuongThuc') + 1
    //                    if (dataPsub != null) {
    //                        var soluongpub = parseInt(dataPsub.soLuong);
    //                        if (isNaN(soluongpub) == false) {
    //                            soLuong = recordIn.items[i].get('soLuongThuc') + soluongpub
    //                        } else {
    //                            soLuong = recordIn.items[i].get('soLuongThuc');
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
    //                if ((soluongthuc != 0 || soluongthuc != null) && dongia != null) {
    //                    var tt = soluongthuc * dongia;
    //                    record.set('thanhTien', tt);
    //                }
    //                record.set('donViTinh', ressult[0].donViPhatHanh);
    //                record.set('donViTinhThuc', ressult[0].donViPhatHanh);
    //                record.set('rotating', ressult[0].rotating);
    //                storePhieuNhapChiTiet.add(record);
    //            }
    //            me.ref.textNhapMaVatTu.setValue("");
    //            abp.notify.success(app.localize('CMMSDMKhoDaThemmotVatTuVaoPhieu'));
    //        } else {
    //            abp.notify.warn(app.localize('CMMSDMKhoVatTuKhongTonTai'));
    //        }
    //    })
    //},

    //onFnCheck: function (machungloai) {
    //    var me = this;
    //    var storePhieuNhapChiTiet = me.storeinfo.storePhieuNhapChiTiet;
    //    var record = storePhieuNhapChiTiet.data.items;
    //    for (var i = 0; i < record.length; i++) {
    //        if (record[i].get('maVatTu') == machungloai)
    //            return record[i]
    //    }
    //    return false;
    //},

    //onTimKiemvatTuNangCao: function (btn) {
    //    var me = this;
    //    var notItem = me.storeinfo.storePhieuNhapChiTiet.data.items;
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
    //                maKho: recordPhieu.get('maKhoNhap'),
    //                stringMaLoaiVatTu: stringMaLoaiVatTu,
    //                fnSauKhiChon: function (recordVatTu) {
    //                    var storePhieuNhapChiTiet = me.storeinfo.storePhieuNhapChiTiet;
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
    //                            record.set('tenVatTu1', recordVatTu[i].get('ma') + "-" + recordVatTu[i].get('moTa'));
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
    //                            record.set('donViTinh', recordVatTu[i].get('donViPhatHanh'));
    //                            record.set('donViTinhThuc', recordVatTu[i].get('donViPhatHanh'));
    //                            storePhieuNhapChiTiet.add(record);
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
    //    var soluongthuc = record.get('soLuongThuc');
    //    var dongia = record.get('donGia');
    //    if (soluongthuc != 0 || soluongthuc != null) {
    //        var tt = soluongthuc * dongia;
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
    //    if (record.get('loaiPhieu') == app.localize("CMMSDMKhoPhanLoaiDChuyen"))
    //        return;
    //    var store = me.storeinfo.storePhieuNhapChiTiet
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
    //                    _cMMSKhoPhieuNhapXuatChiTiet.xoaChiTietPhieu({ id: selected.get('id') }, record.get('maKhoNhap'), 'nhapkho').done(function (result) {
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
    //    var form = me.ref.frmPhieuXuatKho;
    //    if (!form.getForm().isValid()) {
    //        abp.notify.warn(app.localize("TaiSan_isValid"));
    //        return;
    //    }
    //    var grid = me.ref.dsPhieuNhapKhoChiTiet;
    //    var rows = grid.getStore().getRange();
    //    if (rows.length == 0) {
    //        abp.notify.info(app.localize('CMMSDMKhoVatTu_ThongBao'));
    //        return;
    //    }
    //    for (var i = 0; i < rows.length; i++) {
    //        if (rows[i].get('soLuongThuc') == null || rows[i].get('soLuongThuc') == 0) {
    //            abp.notify.info(app.localize('CMMSDMKhoSoLuongVatTuKhongDuocDeTrong'))
    //            return;
    //        }
    //    }
    //    var record = me.getViewModel().data.recordPhieu;
    //    record.data.thoiGian = Ext.Date.format(new Date(record.get('ngayHachToan')), "Y/m/d H:i:s");
    //    record.data.ngayHachToan = Ext.Date.format(new Date(record.get('ngayHachToan')), "Y/m/d H:i:s");
    //    record.data.ngayChungTu = Ext.Date.format(new Date(record.get('ngayChungTu')), "Y/m/d H:i:s");
    //    record.data.phanLoai = 'nhapkho'
    //    if (record.get('id') == 0) {
    //        me.getView().setLoading(true);
    //        _cMMSKhoPhieuNhapXuat.create(record.data).done(function (result) {
    //            me.getView().setLoading(false);
    //            record.set('id', result.id);
    //            me.onLuuChiTiet(rows, record);
    //            abp.notify.success(app.localize('SavedSuccessfully'));
    //        }).fail(function (data) {
    //            me.getView().setLoading(false);
    //        });
    //    }
    //    else if (record.dirty) {
    //        me.getView().setLoading(true);
    //        _cMMSKhoPhieuNhapXuat.update(record.data).done(function (result) {
    //            me.getView().setLoading(false);
    //            record.commit(record);
    //            abp.notify.success(app.localize('SavedSuccessfully'));
    //            me.onLuuChiTiet(rows, record);
    //        }).fail(function (data) {
    //            me.getView().setLoading(false);
    //        });
    //    } else {
    //        me.onLuuChiTiet(rows, record, true);
    //    }
    //},

    //onLuuChiTiet: function (rows, record, thongbao) {
    //    var me = this;
    //    var lstphieuchitiet = [];
    //    var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
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
    //    _cMMSKhoPhieuNhapXuatChiTiet.chiTietPhieuNhap(lstphieuchitiet, record.get('maKhoNhap')).done(function (result) {
    //        me.checkThayDoiChiTiet = false;
    //        me.onloadChiTiet();
    //        if (thongbao == true) {
    //            abp.notify.success(app.localize('SavedSuccessfully'));
    //        }
    //        if (fnSauKhiLoad)
    //            fnSauKhiLoad();
    //    }).fail(function (data) {
    //    });
    //},

    //onDongWinDow: function () {
    //    var me = this;
    //    abp.event.off('abp.notifications.receivedEKGISData', me.pubSub);
    //    var record = me.getViewModel().data.recordPhieu;
    //    record.reject();
    //}
});
