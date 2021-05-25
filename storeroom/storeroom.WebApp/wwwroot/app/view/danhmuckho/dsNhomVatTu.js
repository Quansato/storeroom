//var _nhomVatTuServices = abp.services.app.cMMSKhoNhomVatTu;
//var _vatTuServices = abp.services.app.cMMSKhoVatTu;
//var _vatTuTTServices = abp.services.app.cMMSKhoVatTuThayThe;
Ext.define("Admin.view.danhmuckho.dsNhomVatTuModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.danhmuckho-dsnhomvattu",
    data: {
        rSelectNhomVatTu: null,
        rSelectVatTu: null
    },
    stores: {
        sNhomVatTu: { type: "skhonhomvattu" },
        sVatTu: { type: "skhovattu" }

    }
});

Ext.define("Admin.view.danhmuckho.dsNhomVatTu", {
    extend: "Ext.panel.Panel",
    alias: "widget.dsCMMSKhoDMVatTu",
    requires: ["Admin.view.danhmuckho.dsNhomVatTuController", "Admin.view.danhmuckho.dsNhomVatTuModel"],
    controller: "danhmuckho-dsnhomvattu",
    viewModel: {
        type: "danhmuckho-dsnhomvattu"
    },
    bodyStyle: { "background-color": "#f6f6f6", padding: "0px 0px 0px 5px" },
    height: window.innerHeight - 65,
    layout: {
        type: "hbox",
        align: "stretch"
    },
    items: [
        {
            xtype: "grid",
            title: 'Nhóm vật tư',
            reference: "gridNhomVatTu",
            iconCls: "x-fa fa-th-list",
            ui: "light",
            width: 400,
            layout: "fit",
            padding: "0 5 0 0",
            bind: {
                store: "{sNhomVatTu}",
                selection: "{rSelectNhomVatTu}"
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
                    dataIndex: "qrCode",
                    header: 'Mã',
                    width: 120
                },
                {
                    xtype: "gridcolumn",
                    header: 'Tên',
                    flex: 1,
                    dataIndex: "displayName"
                }],
            dockedItems: [{
                xtype: "toolbar",
                dock: "top",
                padding: 0,
                style: {
                    borderTop: "solid 1px #d0d0d0 !important"
                },
                items: [{
                    xtype: "fieldcontainer",
                    layout: "hbox",
                    flex: 1,
                    combineErrors: true,
                    defaultType: "textfield",
                    defaults: {
                        labelAlign: "right",
                        margin: "5 0 5 5"
                    },
                    items: [{
                        xtype: "textfield",
                        reference: "txtFilter",
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
                        ui: "soft-blue",
                        cls: "EnterToTab",
                        handler: "onSearchNhom"
                    }, {
                        xtype: "button",
                        iconCls: "fa fa-cog",
                        reference: "btnQuanLyNhomVatTu",
                        tooltip: 'Quản lý nhóm vật tư',
                        ui: "soft-blue",
                        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
                        handler: "onQuanLyNhomVatTu"
                    }]
                }]
            }, {
                xtype: "toolbar",
                dock: "bottom",
                items: ["->", {
                    xtype: "pagingtoolbar",
                    displayInfo: true,
                    bind: {
                        store: "{sNhomVatTu}"
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
            }],
            listeners: {
                select: "onSelectNhomVatTu"
            }
        }, {
            xtype: "grid",
            title: 'Danh sách vật tư',
            iconCls: "x-fa fa-list-alt",
            ui: "light",
            flex: 1,
            layout: "fit",
            bind: {
                store: "{sVatTu}",
                selection: "{rSelectVatTu}"
            },
            columns: [{
                xtype: "rownumberer",
                text: "#",
                width: 40,
                align: "center",
                sortable: false
            }, {
                xtype: "gridcolumn",
                header: 'Mã',
                dataIndex: "materialCode",
                width: 120
            }, {
                xtype: "gridcolumn",
                header: 'Tên',
                dataIndex: "displayName",
                minWidth: 180,
                flex: 1
            },
            //Thêm tên nhóm
            {
                xtype: "gridcolumn",
                header: 'Nhóm vật tư',
                dataIndex: "materialGroupName",
                minWidth: 160
            },
            {
                text: 'Đơn vị tính',
                dataIndex: 'unitName',
                align: 'left',
                border: 1,
                style: 'text-align:center',
                width: 110
            }, {
                xtype: 'numbercolumn',
                text: 'Đơn giá',
                dataIndex: 'price',
                style: 'text-align:center',
                align: 'right',
                border: 1,
                width: 125,
                //renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                //    if (value != undefined && value != null) {
                //        //return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                //    }
                //}   
            }, {
                xtype: "gridcolumn",
                header: 'Trạng thái',
                dataIndex: "status",
                width: 110,
                renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                    var text = value;
                    if (value == true) {
                        text = 'Hoạt động';
                    } else if (value == false) {
                        text = 'Không hoạt động';
                    }
                    return text;
                }
            }, {
                xtype: "gridcolumn",
                hidden: true,
                header: 'Năm sản xuất',
                dataIndex: "yearManufacture",
                width: 110
            }, {
                xtype: "gridcolumn",
                header: 'QRcode',
                dataIndex: "qrCode",
                width: 105
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'taiLieu',
                sortable: false,
                align: 'center',
                bind: {
                    hidden: "{readOnly}"
                },
                width: 80,
                text: 'Đính kèm',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return '<a class="tepdinhkem" style="color:blue;cursor: pointer;"><span class="fa fa-picture-o"></span></a>';
                }
            }],
            viewConfig: {
                emptyText: 'Chưa có dữ liệu'
            },
            listeners: {
                //cellclick: "cellVatTu"
            },
            dockedItems: [{
                xtype: "toolbar",
                dock: "top",
                padding: 0,
                style: {
                    borderTop: "solid 1px #d0d0d0 !important"
                },
                items: [{
                    xtype: "fieldcontainer",
                    layout: "hbox",
                    flex: 1,
                    combineErrors: true,
                    defaultType: "textfield",
                    defaults: {
                        labelWidth: 60,
                        labelAlign: "right",
                        margin: "5 0 5 5"
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
                            specialkey: 'specialkeyVT'
                        }
                    }, {
                        xtype: "button",
                        reference: "btnTimKiem",
                        iconCls: "x-fa fa-search",
                        text: 'Tìm',
                        tabIndex: 12,
                        cls: "EnterToTab",
                        ui: 'soft-blue',
                        handler: "onSearch"
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
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
                    tooltip: 'Thêm',
                    handler: "onAdd"
                }, {
                    xtype: "button",
                    iconCls: "fa fa-pencil",
                    reference: "btnUpdate",
                    bind: { disabled: "{!rSelectVatTu}" },
                    text: 'Sửa',
                    ui: "soft-blue",
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
                    tooltip: 'Sửa',
                    handler: "onUpdate"
                }, {
                    xtype: "button",
                    iconCls: "fa fa-minus",
                    reference: "btnDelete",
                    bind: { disabled: "{!rSelectVatTu}" },
                    text: 'Xoá',
                    ui: "soft-red",
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
                    tooltip: 'Xoá',
                    handler: "onDelete"
                }, {
                    xtype: 'button',
                    iconCls: 'fa fa-file-excel-o',
                    text: 'Xuất Excel',
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
                    ui: 'soft-blue',
                    tooltip: 'Xuất Excel',
                    menu: new Ext.menu.Menu({
                        items: [{
                            iconCls: "x-fa fa-file-excel-o",
                            text: 'Xuất danh sách',
                            ui: 'blue',
                            //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
                            handler: "onXuatExcel"
                        }, {
                            iconCls: "x-fa fa-file-excel-o",
                            text: 'Xuất danh sách mã QR',
                            ui: "soft-blue",
                            //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
                            handler: "onXuatExcelQR"
                        }, {
                            xtype: 'menuseparator'
                        }, {
                            text: 'Nhập vật tư từ excel',
                            iconCls: 'x-fa fa-database',
                            ui: 'blue',
                            handler: 'onImportDanhSach'
                        }]
                    })
                }, "->", {
                    xtype: "pagingtoolbar",
                    displayInfo: true,
                    bind: {
                        store: "{sVatTu}"
                    },
                    style: "padding: 0px !important",
                    beforePageText: "Trang",
                    //afterPageText: "của {0}",
                    displayMsg: "{0} - {1} của {2}",
                    //emptyMsg: app.localize("ExtEmptyMsg"),

                }]
            }]
        }],
    listeners: {
        afterRender: "onAfterrender"
    }
});
Ext.define("Admin.view.danhmuckho.dsNhomVatTuController", {
    extend: "Ext.app.ViewController",
    alias: "controller.danhmuckho-dsnhomvattu",
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
        me.onSearchNhom();
        me.onSearch();
    },
    // #region param
    fnGetTxtSearch: function () {
        var me = this;
        return me.refs.txtSearch.getValue();
    },

    fnGetNhomId: function () {
        var me = this;
        var gridNhomVatTu = me.refs.gridNhomVatTu;
        var records = gridNhomVatTu.getSelectionModel().getSelection();
        var record = records && records.length > 0 ? records[0] : null;
        if (record) {
            if (record.get("id") == 0)
                return ""
            else
                return record.get("id");
        }
    },
    //// #region VatTu

    specialkeyVT: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onSearch();
        }
    },

    onSearch: function () {
        var me = this;
        var id = "" || me.fnGetNhomId();
        var txt = me.fnGetTxtSearch();
        //var query = abp.utils.buildQueryString([
        //    { name: "filter", value: txt },
        //    { name: "maNhomVatTu", value: id == 0 ? null : id }
        //]);
        var url = "api/Material?page=1&start=0&limit=25&keyword=" + txt + "&MaterialGroupId=" + id;
        var store = me.storeInfo.sVatTu;
        store.proxy.api.read = url;
        store.proxy.pageParam = undefined;
        store.proxy.limitParam = undefined;
        store.proxy.startParam = undefined;
        store.load({
            scope: this,
            callback: function (records, operation, success) {
                if (records == null) {
                    store.removeAll();
                }
            }
        });
    },

    onAdd: function () {
        var me = this;
        //swal("Good job!", "You clicked the button!", "success");
        var rSelectNhomVatTu = me.getViewModel().get("rSelectNhomVatTu");
        //if (!rSelectNhomVatTu) return;
        //if (rSelectNhomVatTu.get("ma") == app.localize("DanhMuc_TatCa")) {
        //    abp.notify.warn(app.localize("BanGhiTatCa"));
        //    return;
        //}
        var maNhomVatTu = rSelectNhomVatTu && rSelectNhomVatTu.get("id") ? rSelectNhomVatTu.get("id") : null;
        var maNhom = rSelectNhomVatTu && rSelectNhomVatTu.get("ma") ? rSelectNhomVatTu.get("ma") : null;
        var tenNhom = rSelectNhomVatTu && rSelectNhomVatTu.get("moTa") ? rSelectNhomVatTu.get("moTa") : null;
        var record = Ext.create("Admin.model.mKhoVatTu", {
            id: 0,
            maNhomVatTu: maNhomVatTu,
            maNhom: maNhom,
            tenNhom: tenNhom,
            trangThai: 'active'
        });
        Ext.create("Admin.view.danhmuckho.cnKhoVatTu", {
            title: 'Thêm mới vật tư',
            viewModel: {
                data: {
                    record: record,
                    fnSauKhiSave: function () {
                        //me.onSearch();
                    }
                }
            }
        }).show();
    },

    onUpdate: function () {
        var me = this;
        var record = me.getViewModel().get("rSelectVatTu");
        console.log(record)
        Ext.create("Admin.view.danhmuckho.cnKhoVatTu", {
            title: "Cập nhật vật tư",
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
        var record = this.getViewModel().get("rSelectVatTu");
        if (record != undefined && record != null) {
            Swal.fire({
                title: 'Bạn có chắc chắn?',
                text: "Bạn có muốn xoá dữ liệu này?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Huỷ bỏ',
                confirmButtonText: 'Đồng ý'
            }).then(function (result) {
                if (result.isConfirmed) {
                    var url = "api/Material/" + record.data.id
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

    //cellVatTu: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    //    var me = this;
    //    if (e.target.className == 'fa fa-picture-o') {
    //        var pathDinhKem = "khodata/CMMSKhoVatTu/" + record.get("id") + "/tailieu";
    //        Ext.create("Admin.view.utils.cnFileManager", {
    //            title: app.localize("FileManager_ListFile"),
    //            viewModel: {
    //                data: {
    //                    pathFolder: pathDinhKem,
    //                    isEdit: (abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
    //                    fnCallBack: function (records) {
    //                    }
    //                }
    //            }
    //        }).show();
    //    }
    //},
    //// #endregion

    //// #region NhomVatTu
    onQuanLyNhomVatTu: function () {
        var me = this;
        Ext.create("Admin.view.danhmuckho.wdKhoNhomVatTu", {
            title: 'Danh sách nhóm vật tư',
            viewModel: {
                data: {
                    fnSauKhiSave: function () {
                        //me.onSearchNhom();
                    },
                    fnSync: function () {
                        //me.onSearchNhom();
                    }
                }
            }
        }).show();
    },

    specialkey: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onSearchNhom();
        }
    },

    onSearchNhom: function () {
        var me = this;
        var sNhomVatTu = me.storeInfo.sNhomVatTu;
        var txtSearch = me.refs.txtFilter.getValue();
        //var query = abp.utils.buildQueryString([{ name: "filter", value: txtSearch }]);
        var url = "api/MaterialGroup?page=1&start=0&limit=25&keyword=" + txtSearch;
        sNhomVatTu.proxy.api.read = url;
        sNhomVatTu.proxy.pageParam = undefined;
        sNhomVatTu.proxy.limitParam = undefined;
        sNhomVatTu.proxy.startParam = undefined;
        sNhomVatTu.load({
            params: {
                skipCount: 0,
                maxResultCount: sNhomVatTu.pageSize
            },
            scope: this,
            callback: function (records, operation, success) {
                if (records == null) {
                    sNhomVatTu.removeAll();
                }
                if (me.refs.txtSearch.getValue() == "") {
                    var rTatCa = Ext.create("Admin.model.mKhoNhomVatTu", {
                        id: 0,
                        qrCode: "Tất cả",
                        displayName: "Tất cả"
                    });
                    sNhomVatTu.insert(0, rTatCa);
                }
                if (records.length > 0) me.refs.gridNhomVatTu.getSelectionModel().select(0);
            }
        });
    },

    onSelectNhomVatTu: function (grid, record) {
        var me = this;
        me.refs.btnAdd.setDisabled(false)
        if (record.get('ma') == "Tất cả") {
            me.refs.btnAdd.setDisabled(true)
        }
        me.onSearch();
    },

    onXuatExcel: function () {
        var me = this;
        //var id = me.fnGetNhomId();
        //var txt = me.fnGetTxtSearch();
        //var query = abp.utils.buildQueryString([
        //    { name: "filter", value: txt },
        //    { name: "maNhomVatTu", value: id == 0 ? null : id }
        //]);
        var url = "api/Material/exportv2";
        window.location.href = url;
    },

    //onXuatExcelQR: function () {
    //    var me = this;
    //    var id = me.fnGetNhomId();
    //    var txt = me.fnGetTxtSearch();
    //    var query = abp.utils.buildQueryString([
    //        { name: "filter", value: txt },
    //        { name: "maNhomVatTu", value: id == 0 ? null : id }
    //    ]);
    //    var url = abp.appPath + "CMMSImportExport/GetDSVatTuQRCode" + query;
    //    window.location.href = url;
    //},

    //onImportDanhSach: function () {
    //    var me = this;
    //    var wnd = Ext.create('Admin.view.danhmuckho.cnVatTuImport', {
    //        title: app.localize('CMMSKho_NhapVatTuExcel'),
    //        viewModel: {
    //            data: {
    //                fnSauKhiLoad: function () {
    //                    me.onSearch();
    //                }
    //            }
    //        }
    //    });
    //    wnd.show();
    //}
});
