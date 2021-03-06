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
                        value: '{recordPhieu.storeroomId}',
                        readOnly: '{recordPhieu.id>0}'
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
                            value: '{recordPhieu.userName}'
                        }
                    }, {
                        margin: '5 5 0 0',
                        xtype: 'button',
                        reference: 'btnLayNguoiDung',
                        tooltip: 'Chọn người nhận',
                        ui: "soft-blue",
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
                            value: '{recordPhieu.inputCode}'
                        },
                        reference: 'txtSoPhieu',
                        fieldLabel: 'Số phiếu' /*+ ' ' + app.gplatformconsts.var_required*/,
                        allowBlank: false,
                        blankText: 'Số phiếu không được để trống',
                        flex: 1,
                        listeners: {
                            blur: "blurMa"
                        }
                    },/* {
                        margin: '5 0 0 0',
                        xtype: 'button',
                        reference: 'btnLaySoPhieu',
                        bind: {
                            hidden: '{!recordPhieu.id==0}'
                        },
                        handler: 'onLaySoNhap',
                        ui: "soft-blue",
                        text: 'Lấy số'
                    }*/]
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
                    bind: '{recordPhieu.dateInput}',
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
                    bind: '{recordPhieu.dateStatus}',
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
                    bind: '{recordPhieu.deliveryUnit}',
                    fieldLabel: 'Đơn vị giao'
                }, {
                    margin: '5 5 0 0',
                    labelWidth: 115,
                    bind: '{recordPhieu.shipper}',
                    fieldLabel: 'Người giao hàng'
                }]
            }, {
                xtype: 'textareafield',
                name: 'lydo',
                margin: '5 5 0 5',
                labelAlign: 'right',
                labelWidth: 115,
                bind: '{recordPhieu.description}',
                fieldLabel: 'Lý do'
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            //margin: '-10 0 10 0',
            width: 300,
            items: [{
                xtype: 'fieldset',
                title: 'Tìm kiếm vật tư',
                padding: '0 5 5 5',
                margin: '-10 0 0 0',
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
                ui: "soft-blue",
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
                handler: 'onTimKiemvatTuNangCao',
                iconCls: 'x-fa fa-plus',
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
                // hidden: '{recordPhieu.status==1}'
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
        me.loadKho();
        var record = me.getViewModel().data.recordPhieu;
        if (record.get('id') == 0) {
            //record.set("tenNguoiPheDuyet", app.session.user.surname + " " + app.session.user.name);
            //record.set("nguoiPheDuyet", app.session.user.id);
            //me.loadLoaiPhieu();
            var dataVatTu = me.getViewModel().data.dataVatTu;
            if (dataVatTu) {
                me.storeinfo.storePhieuNhapChiTiet.loadData(dataVatTu);
            }
        } else {
            me.onloadChiTiet();
            var storeLoaiPhieu = me.storeinfo.storeLoaiPhieu;
            //storeLoaiPhieu.loadData([{ id: -1, moTa: app.localize("CMMSDMKhoPhanLoaiDChuyen") }])
            //if (record.get('loaiPhieu') == -1) {
            //me.ref.textNhapMaVatTu.setDisabled(true);
            //me.ref.btnTimKiemVT.setDisabled(true);
            //me.ref.btnThemVatTu.setDisabled(true);
            //me.ref.btnThucHien.setDisabled(true);
            //me.ref.btnLayNguoiDung.setDisabled(true);
            //setTimeout(function () {
            //    me.ref.cbophanLoai.setReadOnly(true);
            //}, 300);
            //me.ref.btnXoaLoaiVatTu.setVisible(false);
            //} else {
            //    me.loadLoaiPhieu();
            //}
        }
        setTimeout(function () {
            if (me.getViewModel().data.donmuahang)
                me.ref.cbkho.setReadOnly(me.getViewModel().data.donmuahang);
        }, 300);
    },

    onLayNguoiDung: function () {
        var me = this;
        var record = me.getViewModel().data.recordPhieu;
        Ext.create("Admin.view.chondulieu.wdChonNguoiDung", {
            viewModel: {
                data: {
                    fnSauKhiChon: function (result, idPhongBan) {
                        console.log(result);
                        record.set("userId", result.get("userId"));
                        record.set("userName", result.get("tenNguoiDaiDien"));
                        console.log(record);
                    }
                }
            }
        }).show();
    },

    loadKho: function () {
        var me = this;
        var store = me.storeinfo.storeKhoNhap;
        var storeKho = me.getViewModel().data.storeKho;
        console.log(storeKho);
        if (storeKho != null) {
            store.loadRecords(storeKho.data.items);
            return;
        }
        var url = "api/Storeroom?page=1&start=0&limit=25";
        store.proxy.api.read = url;
        store.load({
            scope: this,
            callback: function (records, operation, success) {
                me.getView().setLoading(false);
            }
        });
    },

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

    onloadChiTiet: function () {
        var me = this;
        var record = me.getViewModel().data.recordPhieu;
        var url = "api/Input/InputId?InputId=" + record.get('id');
        var store = me.storeinfo.storePhieuNhapChiTiet;
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

    specialkeyThemChungLoai: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onTimKiem();
        }
    },

    onTimKiemVT: function () {
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Tính năng này đang phát triển',
        })
        //this.onTimKiem();
    },

    onFnCheck: function (machungloai) {
        var me = this;
        var storePhieuNhapChiTiet = me.storeinfo.storePhieuNhapChiTiet;
        var record = storePhieuNhapChiTiet.data.items;
        for (var i = 0; i < record.length; i++) {
            if (record[i].get('materialId') == machungloai)
                return record[i]
        }
        return false;
    },

    onTimKiemvatTuNangCao: function (btn) {
        var me = this;
        var notItem = me.storeinfo.storePhieuNhapChiTiet.data.items;
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
                    maKho: recordPhieu.get('maKhoNhap'),
                    stringMaLoaiVatTu: stringMaLoaiVatTu,
                    fnSauKhiChon: function (recordVatTu) {
                        var storePhieuNhapChiTiet = me.storeinfo.storePhieuNhapChiTiet;
                        for (var i = 0; i < recordVatTu.length; i++) {
                            var check = me.onFnCheck(recordVatTu[i].get('id'))
                            if (check != false) {
                                var soLuong = check.get('quantity') + 1
                                check.set('quantity', soLuong)
                            }
                            if (check == false) {
                                var record = Ext.create('Admin.model.mPhieuNhapXuatChiTiet');
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
                                //if (recordPhieu.get('id') > 0) {
                                //    record.set('id', recordPhieu.get('id'));
                                //}
                                record.set('unit', recordVatTu[i].get('unitName'));
                                record.set('donViTinhThuc', recordVatTu[i].get('donViPhatHanh'));
                                storePhieuNhapChiTiet.add(record);
                            }
                        }
                    }
                }
            }
        });
        wnd.show();
    },

    onEditGrid: function (editor, context, eOpts) {
        var me = this;
        var quantity = context.value - context.originalValue;
        var obj = {};
        console.log(editor)
        console.log(context)
        var record = context.record;
        if (me.getViewModel().data.recordPhieu.get('id') == 0) {
            return
        }
        var soluongthuc = record.get('quantity');
        var dongia = record.get('price');
        if (soluongthuc != 0 || soluongthuc != null) {
            var tt = soluongthuc * dongia;
            record.set('total', tt)
            record.commit();
        }

        obj.storeroomId = me.getViewModel().data.recordPhieu.data.storeroomId;
        obj.materialId = record.get('materialId');
        obj.quantity = quantity;
        var url = "/api/Material/materialStoreroom/quantity"

        app.mUtils.fnPUTAjax(url, obj, function (response) {
            console.log(response)
        })
        me.checkThayDoiChiTiet = true;
    },

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
        //if (record.get('loaiPhieu') == app.localize("CMMSDMKhoPhanLoaiDChuyen"))
        //    return;
        var store = me.storeinfo.storePhieuNhapChiTiet
        var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
        store.remove(selected);
        return;
        if (isNaN(selected.data.id) == true) {
            abp.message.confirm(
                app.localize('CMMSKhoThongBaoVatTu') + " " + selected.data.tenVatTu1,
                app.localize('ExtgDataManagerAreYouSure'),
                function (isConfirmed) {
                    if (isConfirmed) {
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
                        _cMMSKhoPhieuNhapXuatChiTiet.xoaChiTietPhieu({ id: selected.get('id') }, record.get('maKhoNhap'), 'nhapkho').done(function (result) {
                            me.getView().setLoading(false);
                            abp.notify.success(app.localize('SavedSuccessfully'));
                            if (fnSauKhiLoad)
                                fnSauKhiLoad(result);
                        }).fail(function (data) {
                            me.getView().setLoading(false);
                        });
                    }
                }
            );
        }
    },

    onThucHien: async function (isNhap) {
        var me = this;
        var form = me.ref.frmPhieuXuatKho;
        if (!form.getForm().isValid()) {
            toastr.warning("Nhập đầy đủ thông tin yêu cầu!");
            return;
        }
        var grid = me.ref.dsPhieuNhapKhoChiTiet;
        var rows = grid.getStore().getRange();
        if (rows.length == 0) {
            toastr.warning("VT không được để trống");
            return;
        }
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].get('quantity') == null || rows[i].get('quantity') == 0 || rows[i].get('quantity') < 0) {
                toastr.warning("Số lượng VT không hợp lệ")
                return;
            }
        }
        var record = me.getViewModel().data.recordPhieu;
        var data = record.data;
        var rowMaterial = [];
        var obj = [];
        rows.forEach(function (element) {
            rowMaterial.push(element.data)
        })
        var fl = 0;
        await rowMaterial.forEach(function (el) {
            var url = "api/Input/CheckMaterialIsExistInStoreroom?StoreroomId=" + data.storeroomId + "&Id=" + el.materialId
            app.mUtils.fnGETAjax(url, function (response) {
                console.log(response)
                if (!response) {
                    fl += 1;
                    toastr.warning("Vật tư " + el.materialCode + " chưa tồn tại trong kho!")
                } else {
                    obj.push({ storeroomId: data.storeroomId, materialId: el.materialId, quantity: el.quantity })
                }
            })
        })

        /**
         * Lỗi async
         * */
        setTimeout(function () {
            console.log(fl);
            if (fl > 0) return;
            record.data.phanLoai = 'nhapkho'
            if (record.get('id') == 0) {
                var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
                me.getView().setLoading(true);
                var url = "/api/Input";
                data.materialInput = rowMaterial
                console.log(data)
                me.getView().setLoading(true);
                app.mUtils.fnPOSTAjax(url, data, function (res) {
                    if (res == -1) {
                        Swal.fire({
                            icon: 'info',
                            title: 'Oops...',
                            text: 'Mã phiếu đã tồn tại!',
                        })
                        me.getView().setLoading(false);
                        return;
                    }
                    me.getView().setLoading(false);
                    fnSauKhiLoad();
                    me.getView().doClose();
                    //
                    obj.forEach(function (el) {
                        var url = "/api/Material/materialStoreroom/quantity"
                        app.mUtils.fnPUTAjax(url, el, function (response) {
                            console.log(response)
                        })
                    })
                });
            }
            else if (record.dirty) {
                var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
                me.getView().setLoading(true);
                var url = "/api/Input";
                app.mUtils.fnPUTAjax(url, data, function (res) {
                    console.log(res)
                    me.getView().setLoading(false);
                    me.onLuuChiTiet(rowMaterial, record.get('id'));
                    toastr.success("Cập nhật dữ liệu thành công");
                    fnSauKhiLoad();
                    me.getView().doClose();
                })
            } else {
                me.onLuuChiTiet(rowMaterial, record.get('id'), true);
                toastr.success("Cập nhật dữ liệu thành công");
                me.getView().doClose();
            }
        }, 200)
        //record.data.thoiGian = Ext.Date.format(new Date(record.get('ngayHachToan')), "Y/m/d H:i:s");
        //record.data.ngayHachToan = Ext.Date.format(new Date(record.get('ngayHachToan')), "Y/m/d H:i:s");
        //record.data.ngayChungTu = Ext.Date.format(new Date(record.get('ngayChungTu')), "Y/m/d H:i:s");
    },

    onLuuChiTiet: function (rows, id, thongbao) {
        var me = this;
        var lstphieuchitiet = [];
        var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
        app.mUtils.fnDELETEAjax("api/Input/deleteMultiple/" + id, function () {
            var url = "/api/Input/detail";
            for (var i = 0; i < rows.length; i++) {
                rows[i].unit = undefined;
                rows[i].inputId = id
                app.mUtils.fnPUTAjax(url, rows[i], function (res) {
                    fnSauKhiLoad();
                })
            }

        })

    },

    onDongWinDow: function () {
        var me = this;
        //abp.event.off('abp.notifications.receivedEKGISData', me.pubSub);
        var record = me.getViewModel().data.recordPhieu;
        record.reject();
    }
});
