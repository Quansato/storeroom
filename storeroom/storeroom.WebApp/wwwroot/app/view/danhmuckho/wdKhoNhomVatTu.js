Ext.define("Admin.view.danhmuckho.wdKhoNhomVatTuModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.danhmuckho-wdkhonhomvattu",
    data: {
        rSelected: null,
        fnSauKhiSave: null,
        fnSync: null
    },
    stores: {
        store: { type: "skhonhomvattu" }
    }
});

Ext.define("Admin.view.danhmuckho.wdKhoNhomVatTu", {
    extend: "Ext.window.Window",
    requires: ["Admin.view.danhmuckho.wdKhoNhomVatTuController", "Admin.view.danhmuckho.wdKhoNhomVatTuModel"],
    controller: "danhmuckho-wdkhonhomvattu",
    viewModel: {
        type: "danhmuckho-wdkhonhomvattu"
    },
    modal: true,
    width: 850,
    height: 600,
    layout: "fit",
    items: [{
        xtype: "grid",
        reference: "gridNhomVatTu",
        ui: "light",
        bind: {
            selection: "{rSelected}",
            store: "{store}"
        },
        columns: [
            {
                xtype: "rownumberer",
                text: "#",
                width: 35,
                align: "center",
                sortable: false
            },
            {
                xtype: "gridcolumn",
                header: 'Mã',
                width: 120,
                dataIndex: "qrCode"
            },
            {
                xtype: "gridcolumn",
                header: 'Tên',
                minWidth: 120,
                flex: 1,
                dataIndex: "displayName"
            },
            {
                xtype: "gridcolumn",
                header: 'QRCode',
                minWidth: 120,
                flex: 1,
                dataIndex: "qrCode"
            }],
        dockedItems: [{
            xtype: "toolbar",
            border: false,
            layout: "fit",
            style: {
                borderTop: "solid 1px #d0d0d0 !important",
                paddingBottom: "0px",
                paddingTop: "2px"
            },
            items: [{
                xtype: "panel",
                border: 0,
                border: false,
                layout: {
                    type: "vbox",
                    align: "stretch"
                },
                items: [{
                    xtype: "fieldcontainer",
                    layout: "hbox",
                    combineErrors: true,
                    defaultType: "textfield",
                    defaults: {
                        labelWidth: 60,
                        labelAlign: "right",
                        margin: "5 0 0 0"
                    },
                    items: [{
                        xtype: "textfield",
                        fieldLabel: 'Tìm',
                        reference: "txtSearch",
                        emptyText: 'Tìm kiếm...',
                        tabIndex: 1,
                        flex: 1,
                        cls: "EnterToTab",
                        listeners: {
                            specialkey: 'specialkey'
                        }
                    }, {
                        xtype: "button",
                        reference: "btnLocNhomVatTu",
                        iconCls: "x-fa fa-search",
                        text: 'Tìm',
                        tabIndex: 12,
                        cls: "EnterToTab",
                        ui: "soft-blue",
                        handler: "onSearch"
                    }]
                }]
            }]
        }, {
            xtype: "toolbar",
            dock: "bottom",
            items: [{
                xtype: "button",
                iconCls: "fa fa-plus",
                reference: "btnAdd",
                text: 'Thêm',
                ui: "soft-blue",
                tooltip: 'Thêm mới dữ liệu',
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
                handler: "onAdd"
            }, {
                xtype: "button",
                iconCls: "fa fa-pencil",
                reference: "btnUpdate",
                bind: { disabled: "{!rSelected}" },
                text: 'Sửa',
                ui: "soft-blue",
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
                tooltip: 'Chỉnh sửa dữ liệu',
                handler: "onUpdate"
            }, {
                xtype: "button",
                iconCls: "fa fa-minus",
                reference: "btnDelete",
                bind: { disabled: "{!rSelected}" },
                text: 'Xoá',
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
                ui: "soft-red",
                tooltip: 'Xoá dữ liệu',
                handler: "onDelete"
            }, {
                xtype: 'button',
                iconCls: 'fa fa-file-excel-o',
                text: 'Xuất Excel',
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
                ui: 'soft-blue',
                //menu: new Ext.menu.Menu({
                //    items: [{
                //        iconCls: "x-fa fa-file-excel-o",
                //        text: app.localize("CMMSTaiSan_XuatExcelDSTaiSan"),
                //        ui: 'blue',
                //        hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
                //        handler: "onXuatExcel"
                //    }, {
                //        iconCls: "x-fa fa-file-excel-o",
                //        text: app.localize("CMMSTaiSan_XuatExcelDSTaiSanQR"),
                //        ui: "soft-blue",
                //        hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
                //        handler: "onXuatExcelQR"
                //    }]
                //})
            }, "->", {
                xtype: "pagingtoolbar",
                displayInfo: true,
                bind: {
                    store: "{store}"
                },
                style: "padding: 0px !important",
                //lastText: app.localize("ExtLastText"),
                //prevText: app.localize("ExtPrevText"),
                //firstText: app.localize("ExtFirstText"),
                //nextText: app.localize("ExtNextText"),
                //refreshText: app.localize("ExtRefreshText"),
                //beforePageText: app.localize("ExtBeforePageText"),
                //afterPageText: app.localize("ExtAfterPageText"),
                //displayMsg: app.localize("ExtDisplayMsg"),
                //emptyMsg: app.localize("ExtEmptyMsg"),
                listeners: {
                    beforechange: function (page, currentPage) {
                        //--- Get Proxy ------//
                        var myProxy = this.store.getProxy();
                        //--- Define Your Parameter for send to server ----//
                        myProxy.params = {
                            skipCount: 0,
                            maxResultCount: 0
                        };
                        //--- Set value to your parameter  ----//
                        myProxy.setExtraParam("skipCount", (currentPage - 1) * this.store.pageSize);
                        myProxy.setExtraParam("maxResultCount", this.store.pageSize);
                    }
                }
            }]
        }]
    }],
    listeners: {
        afterRender: "onAfterrender",
        close: "onClose"
    }
});

Ext.define("Admin.view.danhmuckho.wdKhoNhomVatTuController", {
    extend: "Ext.app.ViewController",
    alias: "controller.danhmuckho-wdkhonhomvattu",
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
        me.onSearch();
    },

    specialkey: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onSearch();
        }
    },

    onSearch: function () {
        var me = this;
        var txt = me.refs.txtSearch.getValue();
        //var query = abp.utils.buildQueryString([{ name: "filter", value: txt }]);
        var url = "api/MaterialGroup?page=1&start=0&limit=25&keyword=" + txt;
        var store = me.getViewModel().get("store");
        var view = me.getView();
        view.setLoading(true);
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
                view.setLoading(false);
                if (records == null) {
                    store.removeAll();
                }
            }
        });
    },

    onAdd: function () {
        var me = this;
        var record = Ext.create("Admin.model.mKhoNhomVatTu", { id: 0 });
        Ext.create("Admin.view.danhmuckho.cnNhomVatTu", {
            title: 'Thêm mới vật tư',
            viewModel: {
                data: {
                    record: record,
                    fnSauKhiSave: function () {
                        me.onSearch();
                    }
                }
            }
        }).show();
    },

    onUpdate: function () {
        var me = this;
        var record = me.getViewModel().get("rSelected");
        Ext.create("Admin.view.danhmuckho.cnNhomVatTu", {
            title: "Cập nhật nhóm vật tư",
            viewModel: {
                data: {
                    record: record,
                    fnSauKhiSave: function () {
                        me.onSearch();
                    }
                }
            }
        }).show();
    },

    onDelete: function () {
        var me = this;
        var record = this.getViewModel().get("rSelected");
        console.log(record)
        if (record != undefined && record != null) {
            Swal.fire({
                title: 'Bạn có chắc chắn?',
                text: "Bạn có muốn xoá dữ liệu này?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText:'Huỷ bỏ',
                confirmButtonText: 'Đồng ý'
            }).then((result) => {
                if (result.isConfirmed) {
                    var url = "api/MaterialGroup/" + record.data.id
                    app.mUtils.fnDELETEAjax(url, function (response) {
                        if (response == 1) {
                            Swal.fire(
                                'Deleted!',
                                '"Xoá dữ liệu thành công',
                                'success'
                            )
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Xoá dữ liệu thất bại!',
                            })
                        }
                        me.onSearch()
                    })
                }
            })

        }
    },

    //onXuatExcel: function () {
    //    var me = this;
    //    var txt = me.refs.txtSearch.getValue();
    //    var query = abp.utils.buildQueryString([{ name: "filter", value: txt }]);
    //    var url = abp.appPath + "CMMSImportExport/GetDSNhomVatTu" + query;
    //    window.location.href = url;
    //},

    //onXuatExcelQR: function () {
    //    var me = this;
    //    var txt = me.refs.txtSearch.getValue();
    //    var query = abp.utils.buildQueryString([{ name: "filter", value: txt }]);
    //    var url = abp.appPath + "CMMSImportExport/GetDSNhomVatTuQRCode" + query;
    //    window.location.href = url;
    //},

    //onClose: function () {
    //    var fnSync = this.getViewModel().get("fnSync");
    //    if (fnSync) fnSync();
    //}
});
