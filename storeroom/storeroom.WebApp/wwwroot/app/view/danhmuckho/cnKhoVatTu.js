Ext.define("Admin.view.danhmuckho.cnKhoVatTuModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.danhmuckho-cnkhovattu",
    data: {
        record: null,
        rThayThe: null,
        fnSauKhiSave: null
    },
    stores: {
        sVatTu: { type: "skhovattu" },
        sNuocSanXuat: { type: "sdmnuocsanxuat" },
        sHangSanXuat: { type: "sdmhangsanxuat" },
        //sPhuTung: { type: 'staisanphutung' },
        storeQuanLyKhoVatTu: { type: 'skhoinventory' }
    }
});

Ext.define("Admin.view.danhmuckho.cnKhoVatTu", {
    extend: "Ext.window.Window",
    requires: ["Admin.view.danhmuckho.cnKhoVatTuController", "Admin.view.danhmuckho.cnKhoVatTuModel"],
    controller: "danhmuckho-cnkhovattu",
    viewModel: {
        type: "danhmuckho-cnkhovattu"
    },
    maximized: true,
    modal: true,
    scrollable: true,
    iconCls: 'x-fa fa-th-list',
    items: [{
        xtype: "panel",
        layout: {
            type: "vbox",
            align: "stretch"
        },
        items: [{
            xtype: "form",
            reference: "frmKhoVatTu",
            bodyPadding: 0,
            layout: {
                type: "hbox",
                align: "stretch",
                labelAlign: "right"
            },
            items: [{
                xtype: "panel",
                border: false,
                margin: "5 5 0 5",
                layout: {
                    type: "vbox",
                    align: "stretch"
                },
                flex: 2,
                items: [{
                    xtype: "fieldcontainer",
                    layout: "hbox",
                    defaults: {
                        labelAlign: "right",
                        labelWidth: 150
                    },
                    items: [
                        {
                            xtype: "fieldcontainer",
                            layout: "hbox",
                            flex: 1,
                            defaults: {
                                labelAlign: "right",
                                labelWidth: 150
                            },
                            items: [{
                                xtype: "textfield",
                                fieldLabel: 'Nhóm vật tư' /*+ app.gplatformconsts.var_required*/,
                                bind: "{record.tenNhom}",
                                readOnly: true,
                                allowBlank: false,
                                flex: 1
                            }, {
                                xtype: "button",
                                handler: "onChonNhom",
                                iconCls: "fa fa-search"
                            }]
                        },
                        {
                            xtype: "fieldcontainer",
                            layout: "hbox",
                            flex: 1,
                            defaults: {
                                xtype: "textfield",
                                labelWidth: 130,
                                labelAlign: "right",
                                flex: 1
                            },
                            items: [
                                {
                                    fieldLabel: 'Mã vật tư' /*+ app.gplatformconsts.var_required*/,
                                    reference: "maNhom",
                                    flex: 0.5,
                                    bind: {
                                        value: "{record.maNhom}",
                                        hidden: "{record.id != 0}"
                                    }
                                },
                                {
                                    name: "ma",
                                    margin: "0 0 0 5",
                                    flex: 0.5,
                                    allowBlank: false,
                                    bind: {
                                        value: "{record.ma}",
                                        hidden: "{record.id != 0}"
                                    },
                                    listeners: {
                                        blur: "blurMa"
                                    }
                                },
                                {
                                    fieldLabel: 'Mã vật tư' /*+ app.gplatformconsts.var_required*/,
                                    bind: {
                                        value: "{record.ma}",
                                        hidden: "{record.id == 0}"
                                    }
                                }]
                        }
                    ]
                }, {
                    xtype: "fieldcontainer",
                    layout: "hbox",
                    defaults: {
                        xtype: "textfield",
                        labelWidth: 150,
                        labelAlign: "right",
                        flex: 1
                    },
                    items: [
                        {
                            xtype: "textfield",
                            fieldLabel: 'Mô tả' /*+ app.gplatformconsts.var_required*/,
                            allowBlank: false,
                            name: "moTa",
                            bind: "{record.moTa}"
                        }]
                }, {
                    xtype: "fieldcontainer",
                    layout: "hbox",
                    defaults: {
                        labelWidth: 150,
                        labelAlign: "right",
                        flex: 1
                    },
                    items: [{
                        xtype: "currencyfield",
                        name: "giaTri",
                        fieldLabel: 'Đơn giá',
                        bind: "{record.giaTri}"
                    }, {
                        xtype: "textfield",
                        fieldLabel: 'Năm sản xuất',
                        name: "namSanXuat",
                        bind: "{record.namSanXuat}"
                    }]
                }, {
                    xtype: "fieldcontainer",
                    layout: "hbox",
                    defaults: {
                        xtype: "textfield",
                        labelWidth: 150,
                        labelAlign: "right",
                        flex: 1
                    },
                    items: [{
                        fieldLabel: 'Đơn vị tính',
                        name: "donViXuatKho",
                        bind: "{record.donViPhatHanh}"
                    }, {
                        fieldLabel: 'Đơn vị đặt hàng',
                        name: "donViDatHang",
                        bind: "{record.donViDatHang}"
                    }]
                }, {
                    xtype: "fieldcontainer",
                    layout: "hbox",
                    defaults: {
                        xtype: "combo",
                        labelWidth: 150,
                        labelAlign: "right",
                        flex: 1
                    },
                    items: [{
                        name: "nuocSanXuat",
                        fieldLabel:'Nước sản xuất',
                        queryMode: "local",
                        displayField: "moTa",
                        valueField: "id",
                        bind: {
                            store: "{sNuocSanXuat}",
                            value: "{record.nuocSanXuat}"
                        }
                    }, {
                        name: "hangSanXuat",
                        fieldLabel: 'Hãng sản xuất',
                        queryMode: "local",
                        displayField: "moTa",
                        valueField: "id",
                        bind: {
                            store: "{sHangSanXuat}",
                            value: "{record.hangSanXuat}"
                        }
                    }]
                }, {
                    xtype: "fieldcontainer",
                    layout: "hbox",
                    defaults: {
                        labelWidth: 150,
                        labelAlign: "right",
                        flex: 1
                    },
                    items: [{
                        xtype: "textfield",
                        name: "hanSuDung",
                        bind: "{record.hanSuDung}",
                        fieldLabel: 'Hạn sử dụng'
                    }, {
                        xtype: "combo",
                        name: "trangThai",
                        fieldLabel: 'Trạng thái',
                        queryMode: "local",
                        displayField: "ten",
                        valueField: "ma",
                        editable: false,
                        bind: {
                            value: "{record.trangThai}"
                        },
                        store: Ext.create("Ext.data.Store", {
                            fields: ["ma", "ten"],
                            data: [
                                { ma: "active", ten: 'Hoạt động' },
                                { ma: "pending", ten: 'Không hoạt động' }
                            ]
                        })
                    }]
                }, {
                    xtype: "fieldcontainer",
                    layout: "hbox",
                    defaults: {
                        xtype: "checkbox",
                        labelWidth: 150,
                        labelAlign: "right",
                        flex: 1
                    },
                    items: [{
                        xtype: "fieldcontainer",
                        layout: "hbox",
                        flex: 2,
                        defaults: {
                            xtype: "checkbox",
                            labelWidth: 150,
                            labelAlign: "right"
                        },
                        items: [{
                            xtype: "textfield",
                            fieldLabel: 'Mã QR',
                            name: "qrCode",
                            flex: 1,
                            bind: "{record.qrCode}",
                            listeners: {
                                blur: "blurQACode"
                            }
                        }, {
                            width: 80,
                            xtype: 'component',
                            margin: '0 0 0 25',
                            height: 80,
                            html: '<div id="idqrcodeVT"></div>'
                        }]
                    }, {
                        bind: "{record.phuTung}",
                        fieldLabel: 'Phụ tùng',
                        name: "phuTung"
                    }, {
                        bind: "{record.rotating}",
                        fieldLabel: 'Thiết bị',
                        name: "rotating"
                    }]
                }, {
                    xtype: "grid",
                    ui: 'light',
                    iconCls: "x-fa fa-retweet",
                    title: 'Danh sách vật tư thay thế',
                    style: {
                        borderTop: "solid 1px #d0d0d0 !important"
                    },
                    header: {
                        padding: 3,
                        items: [{
                            xtype: "button",
                            iconCls: "fa fa-plus",
                            reference: "btnAdd",
                            text: 'Thêm',
                            ui: "soft-blue",
                            //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
                            tooltip: 'Thêm dữ liệu',
                            handler: "onThemThayThe",
                            bind: {
                                disabled: "{record.id == 0}"
                            }
                        }]
                    },
                    reference: "gridThayThe",
                    height: 300 ,
                    layout: "fit",
                    bind: {
                        store: "{sVatTu}",
                        selection: "{rThayThe}"
                    },
                    columns: [{
                        xtype: "rownumberer",
                        header: "#",
                        width: 30,
                        align: "center",
                        sortable: false
                    }, {
                        xtype: "gridcolumn",
                        header: 'Mã',
                        dataIndex: "ma",
                        width: 150,
                        readOnly: true
                    }, {
                        xtype: "gridcolumn",
                        header: 'Tên',
                        dataIndex: "moTa",
                        minWidth: 150,
                        flex: 1,
                        readOnly: true
                    }, {
                        text: 'Đơn vị tính',
                        dataIndex: 'donViDatHang',
                        align: 'left',
                        border: 1,
                        style: 'text-align:center',
                        width: 110
                    }, {
                        xtype: 'numbercolumn',
                        text: 'Đơn giá',
                        dataIndex: 'giaTri',
                        style: 'text-align:center',
                        align: 'right',
                        border: 1,
                        width: 125,
                        renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                            if (value != undefined && value != null) {
                                //return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                            }
                        }
                    }, {
                        xtype: "gridcolumn",
                        dataIndex: "trangThai",
                        header: 'Trạng thái',
                        readOnly: true,
                        width: 150,
                        renderer: function (value) {
                            if (value == "active") return 'Hoạt động'
                            if (value == "pending") return 'Không hoạt động'
                        }
                    }, {
                        xtype: "gridcolumn",
                        header: 'QRCode',
                        dataIndex: "qrCode",
                        width: 105
                    }, {
                        header: "#",
                        width: 35,
                        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
                        align: "center",
                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                            //return (
                            //    '<a title="' + app.localize("KhoVatTu_XoaVTThayThe") + '" ><span style="cursor: pointer; color:red" class="fa fa-minus-circle"></span></a>'
                            //);
                        }
                    }],
                    listeners: {
                        cellclick: "cellClick"
                    }
                }]
            }, {
                xtype: "panel",
                layout: {
                    type: "vbox",
                    align: "stretch"
                },
                padding: "0 0 0 5",
                title: 'Thông số kỹ thuật',
                ui: "light",
                iconCls: 'fa fa-list',
                width: 380,
                items: [{
                    xtype: "htmleditor",
                    flex: 1,
                    padding: "0 5 0 0",
                    reference: "txtTSKT",
                    bind: {
                        value: "{record.thongSoKyThuat}"
                    },
                    enableColors: false,
                    enableAlignments: false
                }, {
                    xtype: "panel",
                    ui: 'light',
                    title: 'Hình ảnh đính kèm',
                    style: {
                        borderTop: "solid 1px #d0d0d0 !important"
                    },
                    header: {
                        padding: 7,
                        style: {
                            borderBottom: "solid 1px #d0d0d0 !important"
                        },
                        items: [{
                            xtype: "box",
                            disabled: true,
                            //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
                            bind: { disabled: "{record.id==0}" },
                            html: '<a style="color:blue; cursor: pointer;"><u>' + 'Tải tệp lên' + "</u></a>",
                            listeners: {
                                click: "onClickTaiLieu",
                                element: "el",
                                delegate: "a"
                            }
                        }]
                    },
                    margin: "0 0 5 0",
                    iconCls: "x-fa fa-picture-o",
                    layout: "fit",
                    height: 150,
                    items: [{
                        xtype: "dataview",
                        reference: "dtvHinhAnh",
                        cls: "images-view-80",
                        trackOver: true,
                        overItemCls: "x-item-over",
                        itemSelector: "div.tt-thumb-wrap",
                        itemTpl: [
                            '<tpl for=".">' +
                            '<div class="tt-thumb-wrap">' +
                            '<div class="tt-thumb"><img src="{url}" title="{fullname:htmlEncode}"></div>' +
                            '<span>{name:htmlEncode}</span>' +
                            '</div>' +
                            '</tpl>'
                        ],
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'fullname', 'url', 'pathFile']
                        }),
                        listeners: {
                            select: "onSelectTaiLieu"
                        }
                    }]
                }]
            }]
        }, {
            //xtype: 'tabpanel',
            //cls: "tabMain",
            //flex: 1,
            //layout: {
            //    type: 'vbox',
            //    align: 'stretch'
            //},
            //items: [{
            //    xtype: 'grid',
            //    layout: 'fit',
            //    ui: 'light',
            //    minHeight: 220,
            //    title: app.localize('CMMSKhoDSVatTuTrongKho'),
            //    iconCls: 'x-fa fa-puzzle-piece',
            //    style: 'border-top: 1px solid #d0d0d0;',
            //    bind: {
            //        store: '{storeQuanLyKhoVatTu}'
            //    },
            //    columns: [{
            //        xtype: 'rownumberer',
            //        text: '#',
            //        width: 40,
            //        style: 'text-align:center',
            //        align: 'center'
            //    }, {
            //        xtype: 'gridcolumn',
            //        dataIndex: 'tenKho',
            //        style: 'text-align:center',
            //        flex: 1,
            //        text: app.localize('CMMSDMKhoKhoDeXuatXuat')
            //    }, {
            //        xtype: 'gridcolumn',
            //        dataIndex: 'donViTinh',
            //        align: 'center',
            //        width: 120,
            //        style: 'text-align:center',
            //        text: app.localize('CMMSDMKhoDonViTinh')
            //    }, {
            //        xtype: 'numbercolumn',
            //        dataIndex: 'soLuong',
            //        width: 100,
            //        align: 'right',
            //        style: 'text-align:center',
            //        text: app.localize('CMMSKhoSoLuong'),
            //        renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
            //            if (value != undefined && value != null) {
            //                return app.gplatformutils.fnDinhDangSoThuc(value, 2);
            //            }
            //        }
            //    }, {
            //        xtype: 'gridcolumn',
            //        width: 120,
            //        align: 'center',
            //        style: 'text-align:center',
            //        text: app.localize('CMMSDMKhoDinhMuc'),
            //        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
            //            var min = record.data.dinhMucTonMin;
            //            var max = record.data.dinhMucTonMax;
            //            if (min == null) min = "";
            //            if (max == null) max = "";
            //            if (min == "" && max == "") {
            //                return "";
            //            }
            //            return app.gplatformutils.fnDinhDangSoThuc(min, 2) + " - " + app.gplatformutils.fnDinhDangSoThuc(max, 2);
            //        }
            //    }, {
            //        xtype: 'gridcolumn',
            //        dataIndex: 'ngan',
            //        align: 'center',
            //        width: 120,
            //        text: app.localize('CMMSKhoNgan')
            //    }, {
            //        xtype: 'gridcolumn',
            //        dataIndex: 'ke',
            //        align: 'center',
            //        width: 120,
            //        text: app.localize('CMMSKhoKe')
            //    }, {
            //        xtype: 'gridcolumn',
            //        dataIndex: 'day',
            //        align: 'center',
            //        width: 120,
            //        text: app.localize('CMMSKhoDay')
            //    }],
            //    viewConfig: {
            //        emptyText: app.localize('ExtNoData')
            //    }
            //}, {
            //    xtype: 'grid',
            //    layout: 'fit',
            //    ui: 'light',
            //    minHeight: 220,
            //    title: app.localize('CMMSDMKhoTaiSanSuDung'),
            //    iconCls: 'x-fa fa-cube',
            //    style: 'border-top: 1px solid #d0d0d0;',
            //    bind: {
            //        store: '{sPhuTung}'
            //    },
            //    columns: [{
            //        xtype: 'rownumberer',
            //        text: '#',
            //        width: 30,
            //        align: 'center',
            //        sortable: false
            //    }, {
            //        text: app.localize("CMMSTaiSan_MaTenTaiSan"),
            //        flex: 1,
            //        cellWrap: true,
            //        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
            //            return record.get('maTaiSan') + " - " + record.get('tenTaiSan')
            //        }
            //    }, {
            //        xtype: 'numbercolumn',
            //        text: app.localize('CMMSTaiSan_SoLuong'),
            //        dataIndex: 'soLuong',
            //        style: 'text-align:center',
            //        align: 'right',
            //        border: 1,
            //        width: 150,
            //        renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
            //            if (value != undefined && value != null) {
            //                return app.gplatformutils.fnDinhDangSoThuc(value, 2);
            //            }
            //        }
            //    }, {
            //        text: app.localize('CMMSTaiSan_MoTa'),
            //        dataIndex: 'ghiChu',
            //        flex: 1
            //    }],
            //    viewConfig: {
            //        emptyText: app.localize("ExtNoData")
            //    }
            //}]
        }]
    }],
    buttons: [{
        text: 'Lưu và thêm mới',
        iconCls: "fa fa-floppy-o",
        ui: "soft-green",
        reference: "btnSaveAndNew",
        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
        handler: "onSaveAndNew"
    }, {
        text: 'Lưu',
        iconCls: "fa fa-floppy-o",
        ui: "soft-blue",
        reference: "btnSave",
        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
        handler: "onSave"
    }, {
        text: 'Huỷ bỏ',
        ui: "soft-red",
        handler: function () {
            this.up("window").close();
        },
        iconCls: "fa fa-times"
    }],
    listeners: {
        afterRender: "onAfterrender",
        close: "onClose"
    }
});

Ext.define("Admin.view.danhmuckho.cnKhoVatTuController", {
    extend: "Ext.app.ViewController",
    alias: "controller.danhmuckho-cnkhovattu",
    storeInfo: null,
    refs: null,

    init: function () {
        var me = this;
        me.callParent(arguments);
    },

    onAfterrender: function () {
        var me = this;
        me.refs = me.getReferences();
        me.storeInfo = me.getViewModel().storeInfo;
        //me.fnLoadHangSanXuat();
        //me.fnLoadNuocSanXuat();
        //me.fnLoadVatTuTT();
        //me.refs.dtvHinhAnh.getStore().loadData([]);
        //me.onLoadFile();
        //var record = me.getViewModel().get("record");
        //if (record.get('id') > 0) {
        //    var qrcode = new QRCode("idqrcodeVT", {
        //        width: 80,
        //        height: 80
        //    });
        //    qrcode.clear();
        //    if (record.get('qrCode') == "") {
        //        return;
        //    }
        //    qrcode.makeCode(record.get('qrCode'));

        //}
        //me.onTimKiemTaiSan();
        //me.onTimKiemKho();
    },

    //fnLoadHangSanXuat: function () {
    //    var me = this;
    //    var store = me.storeInfo.sHangSanXuat;
    //    var url = abp.appPath + "api/services/app/CMMSDMHangSanXuat/GetAll";
    //    store.proxy.api.read = url;
    //    store.proxy.pageParam = undefined;
    //    store.proxy.limitParam = undefined;
    //    store.proxy.startParam = undefined;
    //    store.pageSize = 1000;
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

    //fnLoadNuocSanXuat: function () {
    //    var me = this;
    //    var store = me.storeInfo.sNuocSanXuat;
    //    var url = abp.appPath + "api/services/app/CMMSDMNuocSanXuat/GetAll";
    //    store.proxy.api.read = url;
    //    store.proxy.pageParam = undefined;
    //    store.proxy.limitParam = undefined;
    //    store.proxy.startParam = undefined;
    //    store.pageSize = 1000;
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
    //    var record = me.getViewModel().get("record");
    //    var ma = app.gplatformutils.BoDauBoKhoangTrangGiuNguyenHoaThuong(record.get("ma"));
    //    record.set("ma", ma);
    //    if (record.get("id") == 0) {
    //        var qcode = record.get("maNhom") + app.gplatformutils.BoDauBoKhoangTrangGiuNguyenHoaThuong(record.get('ma'));
    //        record.set('qrCode', qcode);
    //        document.getElementById("idqrcodeVT").innerHTML = "";
    //        var qrcode = new QRCode("idqrcodeVT", {
    //            width: 80,
    //            height: 80
    //        });
    //        if (qcode == "") {
    //            return;
    //        }
    //        qrcode.makeCode(qcode);
    //    }
    //},

    //fnLoadVatTuTT: function () {
    //    var me = this;
    //    var record = me.getViewModel().get("record");
    //    if (record.get("id") == 0) return;
    //    var query = abp.utils.buildQueryString([
    //        { name: "maVatTu", value: record.get("id") }
    //    ]);
    //    var url = abp.appPath + "api/services/app/CMMSKhoVatTu/GetVatTuThayThe" + query;
    //    var grid = me.refs.gridThayThe;
    //    grid.setLoading(true);
    //    var store = me.storeInfo.sVatTu;
    //    store.proxy.api.read = url;
    //    store.pageSize = 500;
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
    //            grid.setLoading(false);
    //            if (records == null) {
    //                store.removeAll();
    //            }
    //        }
    //    });
    //},

    //onChonNhom: function () {
    //    var me = this;
    //    var record = me.getViewModel().get("record");
    //    Ext.create("Admin.view.chondulieu.wdChonNhomVatTu", {
    //        viewModel: {
    //            data: {
    //                fnSauKhiChon: function (result) {
    //                    record.set("maNhomVatTu", result.get("id"));
    //                    record.set("maNhom", result.get("ma"));
    //                    record.set("tenNhom", result.get("moTa"));
    //                }
    //            }
    //        }
    //    }).show();
    //},

    //onSaveAndNew: function () {
    //    var me = this;
    //    me.fnSave(me.fnNewRecord);
    //},

    //onLoadFile: function () {
    //    var me = this;
    //    var dataStoreImg = [];
    //    var storeImage = me.refs.dtvHinhAnh.getStore();
    //    var record = me.getViewModel().get("record");
    //    if (record.get("id") == 0) {
    //        dataStoreImg.push({
    //            name: 'no-image',
    //            fullname: 'no-image.png',
    //            url: '/gPlatform/Resources/images/no-image-available.png',
    //            path: ''
    //        });
    //        storeImage.loadData(dataStoreImg);
    //        return
    //    };
    //    var pathFolder = 'khodata/CMMSKhoVatTu/' + record.get('id') + '/tailieu';
    //    if (record.get("taiLieu") && record.get("taiLieu") != "") {
    //        pathFolder = record.get("taiLieu");
    //    }
    //    abp.services.app.fileManager.getFileInFolder({ path: pathFolder }
    //    ).done(function (result) {
    //        dataStoreImg = [];
    //        var lstFile = result.items;
    //        var arrTypeImg = ['.PNG', '.JPG', '.GIF', ".JPEG", ".TIFF", ".BMP"];
    //        var j = 0;
    //        for (var i = 0; i < lstFile.length; i++) {
    //            recordimg = lstFile[i];
    //            if (j == 4) break;
    //            if (arrTypeImg.indexOf(recordimg.fileType.toUpperCase()) != -1) {
    //                j++;
    //                dataStoreImg.push({
    //                    name: recordimg.name,
    //                    fullname: recordimg.fullName,
    //                    url: app.gplatformconsts.URLFileStatics + recordimg.path,
    //                    path: recordimg.path
    //                });
    //            }
    //            else if (recordimg.fileType.toUpperCase() == ".DOC" || recordimg.fileType.toUpperCase() == ".DOCX") {
    //                j++;
    //                dataStoreImg.push({
    //                    name: recordimg.name,
    //                    fullname: recordimg.fullName,
    //                    url: '/gPlatform/Resources/images/word.png',
    //                    path: recordimg.path
    //                });
    //            }
    //            else if (recordimg.fileType.toUpperCase() == ".XLS" || recordimg.fileType.toUpperCase() == ".XLSX") {
    //                j++;
    //                dataStoreImg.push({
    //                    name: recordimg.name,
    //                    fullname: recordimg.fullName,
    //                    url: '/gPlatform/Resources/images/excel.png',
    //                    path: recordimg.path
    //                });
    //            }
    //            else if (recordimg.fileType.toUpperCase() == ".PDF") {
    //                j++;
    //                dataStoreImg.push({
    //                    name: recordimg.name,
    //                    fullname: recordimg.fullName,
    //                    url: '/gPlatform/Resources/images/pdf.png',
    //                    path: recordimg.path
    //                });
    //            }
    //            else {
    //                j++;
    //                dataStoreImg.push({
    //                    name: recordimg.name,
    //                    fullname: recordimg.fullName,
    //                    url: '/gPlatform/Resources/images/filedoc.png',
    //                    path: recordimg.path
    //                });
    //            }
    //        }
    //        if (dataStoreImg.length == 0) {
    //            dataStoreImg.push({
    //                name: 'no-image',
    //                fullname: 'no-image.png',
    //                url: '/gPlatform/Resources/images/no-image-available.png',
    //                path: ''
    //            });
    //        }
    //        storeImage.loadData(dataStoreImg);
    //    });
    //},

    //fnNewRecord: function (me) {
    //    var record = me.getViewModel().get("record");
    //    var sVatTu = me.storeInfo.sVatTu;
    //    var newRecord = Ext.create("Admin.model.mKhoVatTu", {
    //        id: 0,
    //        maNhomVatTu: record.get("maNhomVatTu"),
    //        maNhom: record.get("maNhom"),
    //        tenNhom: record.get("tenNhom")
    //    });
    //    me.getViewModel().set("record", newRecord);
    //    sVatTu.removeAll();
    //    me.onLoadFile();
    //},

    //onSave: function () {
    //    this.fnSave();
    //},

    //fnSave: function (callback) {
    //    var me = this;
    //    var form = me.refs.frmKhoVatTu;
    //    if (!form.getForm().isValid()) {
    //        abp.notify.warn(app.localize("TaiSan_isValid"));
    //        return;
    //    }
    //    var record = me.getViewModel().get("record");
    //    var ma = record.get("ma");
    //    var maNhom = record.get("maNhom");
    //    //Ko cần xử lý
    //    //if (maNhom != undefined && !ma.includes(maNhom)) {
    //    //    record.set("ma", maNhom + "." + ma);
    //    //}
    //    var tsKyThuat = me.refs.txtTSKT.getValue();
    //    record.set("thongSoKyThuat", tsKyThuat);

    //    var fnSauKhiSave = me.getViewModel().get("fnSauKhiSave");
    //    var view = me.getView();
    //    view.setLoading(true);
    //    if (record.data.id == 0) {
    //        _vatTuServices
    //            .create(record.data)
    //            .done(function (data) {
    //                abp.notify.success(app.localize('SavedSuccessfully'));
    //                record.set("id", data.id);
    //                if (fnSauKhiSave) fnSauKhiSave();
    //                if (callback) callback(me);
    //            })
    //            .always(function () {
    //                view.setLoading(false);
    //            });
    //    } else {
    //        _vatTuServices
    //            .update(record.data)
    //            .done(function () {
    //                abp.notify.success(app.localize('SavedSuccessfully'));
    //                if (fnSauKhiSave) fnSauKhiSave();
    //                if (callback) callback(me);
    //            })
    //            .always(function () {
    //                view.setLoading(false);
    //            });
    //    }
    //},

    //onClickTaiLieu: function () {
    //    var me = this;
    //    var record = me.getViewModel().get("record");
    //    var pathDinhKem = 'khodata/CMMSKhoVatTu/' + record.get('id') + '/tailieu';
    //    Ext.create("Admin.view.utils.cnFileManager", {
    //        title: app.localize("FileManager_ListFile"),
    //        viewModel: {
    //            data: {
    //                pathFolder: pathDinhKem,
    //                isEdit: (abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
    //                fnCallBack: function (records) {
    //                    me.onLoadFile();
    //                }
    //            }
    //        }
    //    }).show();
    //},

    //onSelectTaiLieu: function () {
    //    var me = this;
    //    var record = me.getViewModel().get("record");
    //    if (record.data.id == 0) return;
    //    me.onClickTaiLieu();
    //    var rows = me.refs.dtvHinhAnh.getStore().getRange();
    //    if (rows.length > 0) {
    //        for (var i = 0; i < rows.length; i++) {
    //            me.refs.dtvHinhAnh.deselect(rows[i]);
    //        }
    //    }
    //},

    //onThemThayThe: function () {
    //    var me = this;
    //    var listNotIn = [];
    //    // truyen mavattu
    //    var record = me.getViewModel().get("record");
    //    listNotIn.push(record.get("id"));
    //    // danh sach mavattu thay the
    //    var store = me.storeInfo.sVatTu;
    //    var records = store.getData().items;
    //    records.forEach(function (item) {
    //        listNotIn.push(item.get("id"));
    //    });
    //    Ext.create("Admin.view.danhmuckho.wdChonVatTuThayThe", {
    //        title: app.localize("Kho_ChonVatTuThayThe"),
    //        viewModel: {
    //            data: {
    //                record: me.fnGetRecord(),
    //                listNotIn: listNotIn,
    //                fnSauKhiChon: function (records) {
    //                    if (records && records.length > 0) {
    //                        var store = me.storeInfo.sVatTu;
    //                        store.add(records);
    //                        store.commitChanges();
    //                        var record = me.getViewModel().get("record");
    //                        var maVatTu = record.get("id");
    //                        var lstData = [];
    //                        records.forEach(function (r) {
    //                            lstData.push({
    //                                maVatTu: maVatTu,
    //                                maThayThe: r.get("id")
    //                            });
    //                        });
    //                        me.fnCreateLstThayThe(lstData);
    //                    }
    //                }
    //            }
    //        }
    //    }).show();
    //},

    //fnCreateLstThayThe: function (lstData) {
    //    _vatTuTTServices
    //        .createList(lstData)
    //        .done(function (data) { })
    //        .always(function () { });
    //},

    //fnGetRecord: function () {
    //    var me = this;
    //    return me.getViewModel().get("record");
    //},

    //blurQACode: function () {
    //    var me = this;
    //    var record = me.getViewModel().get("record");
    //    var qcode = app.gplatformutils.BoDauBoKhoangTrangGiuNguyenHoaThuong(record.get("qrCode"));
    //    record.set("qrCode", qcode);
    //    document.getElementById("idqrcodeVT").innerHTML = "";
    //    var qrcode = new QRCode("idqrcodeVT", {
    //        width: 80,
    //        height: 80
    //    });
    //    if (qcode == "") {
    //        return;
    //    }
    //    qrcode.makeCode(qcode);
    //},

    //cellClick: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    //    var me = this;
    //    var store = me.storeInfo.sVatTu;
    //    var recordVatTu = me.getViewModel().get("record");
    //    if (e.target.className == 'fa fa-minus-circle') {
    //        if (record != undefined && record != null) {
    //            abp.message.confirm(
    //                app.localize("DanhMuc_DeleteMessage", app.localize("Kho_VatTu_HeaderTitle"), record.data.ma),
    //                app.localize("AreYouSure"),
    //                function (isConfirmed) {
    //                    if (isConfirmed) {
    //                        _vatTuTTServices
    //                            .deleteByMaVatTu({ maVatTu: recordVatTu.get("id"), maThayThe: record.get("id") })
    //                            .done(function () {
    //                                store.remove(record);
    //                                abp.notify.success(app.localize("SuccessfullyDeleted"));
    //                            });
    //                    }
    //                }
    //            );
    //        }
    //    }
    //},

    //onTimKiemTaiSan: function () {
    //    var me = this;
    //    var filter = [];
    //    var recordVatTu = me.getViewModel().get("record");
    //    if (recordVatTu.get("id") == 0) return;
    //    filter.push({ name: "MaPhuTung", value: recordVatTu.get('id') });
    //    var query = abp.utils.buildQueryString(filter);
    //    var store = me.storeInfo.sPhuTung;
    //    var url = abp.appPath + "api/services/app/CMMSTaiSanPhuTung/GetAll" + query;
    //    store.proxy.api.read = url;
    //    store.pageSize = 500;
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

    //onTimKiemKho: function () {
    //    var me = this;
    //    var filter = [];
    //    var recordVatTu = me.getViewModel().get("record");
    //    if (recordVatTu.get("id") == 0) return;
    //    filter.push({ name: "IdVatTu", value: recordVatTu.get('id') });
    //    var query = abp.utils.buildQueryString(filter);
    //    var store = me.storeInfo.storeQuanLyKhoVatTu;
    //    var url = abp.appPath + "api/services/app/CMMSKhoInventory/GetAll" + query;
    //    store.proxy.api.read = url;
    //    store.pageSize = 500;
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

    onClose: function () {
        var me = this;
        var record = me.getViewModel().get("record");
        record.reject();
    }
});
