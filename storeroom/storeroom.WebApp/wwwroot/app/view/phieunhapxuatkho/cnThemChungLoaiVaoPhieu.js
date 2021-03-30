Ext.define("Admin.view.phieunhapxuatkho.cnThemChungLoaiVaoPhieuModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.phieunhapxuatkho-wdchonvattuthaythe",
    data: {
        rSelectedNhomVatTu: null,
        rSelectedVatTu: null,
        fnSauKhiChon: null,
        selectVatTuChon: null,
        listNotIn: null,
        maKho: null
    },
    stores: {
        sNhomVatTu: { type: "skhonhomvattu" },
        sVatTu: { type: "skhovattu" },
        sChonVatTu: { type: "skhovattu" }
    }
});

Ext.define("Admin.view.phieunhapxuatkho.cnThemChungLoaiVaoPhieu", {
    extend: "Ext.window.Window",
    requires: ["Admin.view.phieunhapxuatkho.cnThemChungLoaiVaoPhieuController", "Admin.view.phieunhapxuatkho.cnThemChungLoaiVaoPhieuModel"],
    controller: "phieunhapxuatkho-wdchonvattuthaythe",
    viewModel: {
        type: "phieunhapxuatkho-wdchonvattuthaythe"
    },
    maximized: true,
    modal: true,
    layout: {
        type: "hbox",
        align: "stretch"
    },
    bodyStyle: { "background-color": "#f6f6f6" },
    items: [{
        xtype: "grid",
        title: 'Danh sách nhóm vât tư',
        reference: "gridNhomVatTu",
        flex: 1,
        padding: '0 5 0 0',
        ui: "light",
        iconCls: "x-fa fa-th-list",
        bind: {
            store: "{sNhomVatTu}",
            selection: "{rSelectedNhomVatTu}"
        },
        columns: [{
            xtype: "gridcolumn",
            header: 'Mã',
            dataIndex: "ma",
            flex: 1
        }, {
            xtype: "gridcolumn",
            header: 'Tên',
            dataIndex: "moTa",
            flex: 1
        }],
        dockedItems: [{
            xtype: "toolbar",
            dock: "top",
            style: {
                borderTop: 'solid 1px #d0d0d0 !important'
            },
            items: [{
                xtype: "textfield",
                reference: "txtFilter",
                tabIndex: 1,
                flex: 1,
                cls: "EnterToTab",
                listeners: {
                    specialkey: 'specialkey'
                }
            }, {
                xtype: "button",
                iconCls: "x-fa fa-search",
                text: 'Tìm',
                ui: "soft-blue",
                width: 100,
                cls: "EnterToTab",
                handler: "onSearchNhom"
            }]
        }, {
            xtype: "toolbar",
            dock: "bottom",
            items: [{
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
        reference: "gridVatTu",
        flex: 2,
        padding: '0 5 0 0',
        ui: "light",
        iconCls: "x-fa fa-list-alt",
        bind: {
            store: "{sVatTu}",
            selection: "{rSelectedVatTu}"
        },
        selModel: {
            type: "checkboxmodel",
            checkOnly: true,
            allowDeselect: false
        },
        columns: [{
            xtype: "gridcolumn",
            header: 'Mã',
            dataIndex: "ma",
            flex: 1
        }, {
            xtype: "gridcolumn",
            header: 'Tên',
            dataIndex: "moTa",
            flex: 1
        }],
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{
                xtype: 'pagingtoolbar',
                displayInfo: true,
                bind: {
                    store: '{sVatTu}'
                },
                style: 'padding: 0px !important',
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
        }, {
            xtype: "toolbar",
            dock: "top",
            style: {
                borderTop: 'solid 1px #d0d0d0 !important'
            },
            items: [{
                xtype: "textfield",
                fieldLabel: 'Tìm',
                emptyText: 'Tìm kiếm...',
                name: "txtSearch",
                reference: "txtSearch",
                labelWidth: 60,
                labelAlign: "right",
                cls: "EnterToTab",
                listeners: {
                    specialkey: 'specialkeyVT'
                },
                flex: 1
            }, {
                xtype: "combo",
                name: "trangThai",
                queryMode: "local",
                displayField: "ten",
                valueField: "ma",
                store: Ext.create("Ext.data.Store", {
                    fields: ["ma", "ten"],
                    data: [
                        { ma: "active", ten: 'Hoạt động' },
                        { ma: "pending", ten: 'Không hoạt động' }]
                }),
                value: "active",
                flex: 0.5,
                editable: false
            }, {
                xtype: "button",
                reference: "btnTimKiem",
                iconCls: "x-fa fa-search",
                text: 'Tìm',
                ui: "soft-blue",
                width: 100,
                cls: "EnterToTab",
                handler: "onSearchVatTu"
            }]
        }, {
            xtype: "toolbar",
            dock: "right",
            items: [{
                xtype: "button",
                iconCls: "fa fa-chevron-right",
                bind: { disabled: '{!rSelectedVatTu}' },
                ui: "soft-blue",
                handler: "onChoice"
            }, {
                xtype: "button",
                bind: { disabled: '{!selectVatTuChon}' },
                iconCls: "fa fa-chevron-left",
                ui: "soft-blue",
                handler: "onUnchoice"
            }]
        }]
    }, {
        xtype: "grid",
        title: 'Danh sách vật tư được chọn',
        reference: "gridChonVatTu",
        flex: 1.5,
        padding: 0,
        ui: "light",
        iconCls: "x-fa fa-check-square-o",
        bind: {
            store: "{sChonVatTu}",
            selection: "{selectVatTuChon}"
        },
        columns: [{
            xtype: "gridcolumn",
            header: 'Mã',
            dataIndex: "ma",
            flex: 1,
            readOnly: true
        }, {
            xtype: "gridcolumn",
            header: 'Tên',
            dataIndex: "moTa",
            flex: 1,
            readOnly: true
        }]
    }],
    buttons: [{
        text: 'Thực hiện',
        iconCls: "fa fa-download",
        ui: "soft-blue",
        reference: "btnSave",
        handler: "onChoiceDown"
    }, {
        text: 'Huỷ bỏ',
        ui: "soft-red",
        handler: function () {
            this.up("window").close();
        },
        iconCls: "fa fa-times"
    }],
    listeners: {
        afterRender: "onAfterrender"
    }
});

Ext.define("Admin.view.phieunhapxuatkho.cnThemChungLoaiVaoPhieuController", {
    extend: "Ext.app.ViewController",
    alias: "controller.phieunhapxuatkho-wdchonvattuthaythe",
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
        //me.onSearchNhom();
        //me.fnSearchVatTu();
    },
    //specialkey: function (field, e) {
    //    var me = this;
    //    if (e.getKey() == e.ENTER) {
    //        me.onSearchNhom();
    //    }
    //},

    //onSearchNhom: function () {
    //    var me = this;
    //    var store = me.storeInfo.sNhomVatTu;
    //    var txtSearch = me.refs.txtFilter.getValue();
    //    var query = abp.utils.buildQueryString([{ name: "filter", value: txtSearch }]);
    //    var url = abp.appPath + "api/services/app/CMMSKhoNhomVatTu/GetAll" + query;
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
    //            var dataLCV = { id: 0, ma: app.localize('All'), moTa: app.localize('All') };
    //            store.insert(0, dataLCV);
    //        }
    //    });
    //},

    //specialkeyVT: function (field, e) {
    //    var me = this;
    //    if (e.getKey() == e.ENTER) {
    //        me.fnSearchVatTu();
    //    }
    //},

    //fnSearchVatTu: function (id) {
    //    var me = this;
    //    var txt = me.refs.txtSearch.getValue();
    //    var listNotIn = me.getViewModel().get("listNotIn");
    //    var filter = [{ name: "laKho", value: true }];
    //    if (me.getViewModel().get("maKho")) {
    //        filter.push({ name: 'maKho', value: me.getViewModel().get("maKho") })
    //    }
    //    if (txt != "") {
    //        filter.push({ name: "filter", value: txt })
    //    }
    //    if (id != 0) {
    //        filter.push({ name: "maNhomVatTu", value: id })
    //    }
    //    var query = abp.utils.buildQueryString(filter);
    //    var url = abp.appPath + "api/services/app/CMMSKhoVatTu/GetVatTuPhieuNhapXuat" + query + "&ListIdNotIn=" + listNotIn;
    //    var store = me.storeInfo.sVatTu;
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
    //        callback: function (records, operation, success) { }
    //    });
    //},

    //onChoice: function () {
    //    var me = this;
    //    var sChonVatTu = me.storeInfo.sChonVatTu;
    //    var gridVatTu = me.refs.gridVatTu;
    //    var records = gridVatTu.getSelectionModel().getSelection();
    //    records.forEach(function (record) {
    //        var index = sChonVatTu.find("id", record.get("id"));
    //        if (index && index < 0) sChonVatTu.insert(0, record);
    //    });
    //},

    //onUnchoice: function () {
    //    var me = this;
    //    var gridChonVatTu = me.refs.gridChonVatTu;
    //    var removeRecords = gridChonVatTu.getSelectionModel().getSelection();
    //    var store = me.storeInfo.sChonVatTu;
    //    store.remove(removeRecords);
    //},

    //onSelectNhomVatTu: function (grid, record) {
    //    var me = this;
    //    me.fnSearchVatTu(record.get("id"));
    //},

    //onSearchVatTu: function () {
    //    var me = this;
    //    var record = me.getViewModel().get("rSelectedNhomVatTu");
    //    var id = "";
    //    if (record) {
    //        id = record.get("id");
    //    }
    //    me.fnSearchVatTu(id);
    //},

    //onChoiceDown: function () {
    //    var me = this;
    //    var fnSauKhiChon = me.getViewModel().get("fnSauKhiChon");
    //    var gridChonVatTu = me.refs.gridChonVatTu;
    //    var store = gridChonVatTu.getStore();
    //    var records = store.data.items;
    //    if (records.length == 0) {
    //        abp.notify.warn(app.localize("DanhMuc_MoiChonDoiTuong"));
    //        return;
    //    }
    //    if (fnSauKhiChon) fnSauKhiChon(records);
    //    me.getView().doClose();
    //}
});
