Ext.define("Admin.view.chondulieu.wdChonVatTuModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.chondulieu-wdchonvattu",
    data: {
        rSelectedNhomVatTu: null,
        rSelectedVatTu: null,
        fnSauKhiChon: null,
        listNotIn: null
    },
    stores: {
        sNhomVatTu: { type: "skhonhomvattu" },
        sVatTu: { type: "skhovattu" }
    }
});

Ext.define("Admin.view.chondulieu.wdChonVatTu", {
    extend: "Ext.window.Window",
    requires: ["Admin.view.chondulieu.wdChonVatTuController", "Admin.view.chondulieu.wdChonVatTuModel"],
    controller: "chondulieu-wdchonvattu",
    viewModel: {
        type: "chondulieu-wdchonvattu"
    },

    //maximized: true,
    //width: window.innerWidth - 80,
    width: 1024,
    height: window.innerHeight - 30,
    modal: true,
    title: 'Danh sách vật tư',
    iconCls: 'x-fa fa-list-alt',
    layout: {
        type: "hbox",
        align: "stretch"
    },
    bodyStyle: { "background-color": "#f6f6f6" },
    items: [
        {
            xtype: "grid",
            title: 'Danh sách nhóm vật tư',
            reference: "gridNhomVatTu",
            flex: 1.2,
            padding: '0 5 0 0',
            ui: "light",
            iconCls: "x-fa fa-th-list",
            bind: {
                store: "{sNhomVatTu}",
                selection: "{rSelectedNhomVatTu}"
            },
            columns: [{
                xtype: 'rownumberer',
                text: '#',
                width: 35,
                align: 'center',
                sortable: true
            }, {
                xtype: "gridcolumn",
                header: 'Mã',
                dataIndex: "qrCode",
                flex: 1
            }, {
                xtype: "gridcolumn",
                header: 'Tên',
                dataIndex: "displayName",
                flex: 1.4
            }
            ],
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
                xtype: 'toolbar',
                dock: 'bottom',
                style: {
                    borderTop: 'solid 1px #d0d0d0 !important'
                },
                items: [{
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    bind: {
                        store: '{sNhomVatTu}'
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
                            var myProxy = this.store.getProxy();
                            myProxy.params = {
                                skipCount: 0,
                                maxResultCount: 0
                            };
                            myProxy.setExtraParam("skipCount", (currentPage - 1) * this.store.pageSize);
                            myProxy.setExtraParam("maxResultCount", this.store.pageSize);
                        }
                    }
                }]
            }
            ],
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
                type: "checkboxmodel"
                //checkOnly: true,
                //allowDeselect: false
            },
            columns: [
                {
                    xtype: "gridcolumn",
                    header: 'Mã',
                    dataIndex: "materialCode",
                    flex: 1
                },
                {
                    xtype: "gridcolumn",
                    header: 'Tên',
                    dataIndex: "displayName",
                    flex: 1.5
                }
            ],
            dockedItems: [
                {
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
                                var myProxy = this.store.getProxy();
                                myProxy.params = {
                                    skipCount: 0,
                                    maxResultCount: 0
                                };
                                myProxy.setExtraParam("skipCount", (currentPage - 1) * this.store.pageSize);
                                myProxy.setExtraParam("maxResultCount", this.store.pageSize);
                            }
                        }
                    }]
                },
                {
                    xtype: "toolbar",
                    dock: "top",
                    style: {
                        borderTop: 'solid 1px #d0d0d0 !important'
                    },
                    items: [
                        {
                            xtype: "textfield",
                            fieldLabel: 'Tìm',
                            emptyText: 'Tìm kiếm...',
                            name: "txtSearch",
                            reference: "txtSearch",
                            labelWidth: 60,
                            labelAlign: "right",
                            flex: 1
                        },
                        {
                            xtype: "combo",
                            name: "trangThai",
                            queryMode: "local",
                            displayField: "ten",
                            valueField: "ma",
                            store: Ext.create("Ext.data.Store", {
                                fields: ["ma", "ten"],
                                data: [
                                    { ma: 1, ten: 'Hoạt động' },
                                    { ma: 0, ten: 'Không hoạt động' }]
                            }),
                            value: "active",
                            flex: 0.5,
                            editable: false
                        },
                        {
                            xtype: "button",
                            reference: "btnTimKiem",
                            iconCls: "x-fa fa-search",
                            text: 'Tìm',
                            ui: "soft-blue",
                            width: 100,
                            cls: "EnterToTab",
                            handler: "onSearchVatTu"
                        }
                    ]
                }
            ]
        }
    ],
    buttons: [
        {
            text: 'Thực hiện',
            iconCls: "fa fa-download",
            ui: "soft-blue",
            reference: "btnSave",
            handler: "onChoiceDown"
        },
        {
            text: 'Huỷ bỏ',
            ui: "soft-red",
            handler: function () {
                this.up("window").close();
            },
            iconCls: "fa fa-times"
        }
    ],
    listeners: {
        afterRender: "onAfterrender",
        close: "onClose"
    }
});

Ext.define("Admin.view.chondulieu.wdChonVatTuController", {
    extend: "Ext.app.ViewController",
    alias: "controller.chondulieu-wdchonvattu",
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
        //me.fnSearchVatTu(me, '');
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

    fnSearchVatTu: function (me, id) {
        var txt = me.refs.txtSearch.getValue();
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

    onSelectNhomVatTu: function (grid, record) {
        var me = this;
        me.fnSearchVatTu(me, record.get("id"));
    },

    onSearchVatTu: function () {
        var me = this;
        var record = me.getViewModel().get("rSelectedNhomVatTu");
        var id = "";
        if (record) {
            id = record.get("id");
        }
        me.fnSearchVatTu(me, id);
    },

    onChoiceDown: function () {
        var me = this;
        var fnSauKhiChon = me.getViewModel().get("fnSauKhiChon");
        var gridVatTu = me.refs.gridVatTu;
        var records = gridVatTu.getSelectionModel().getSelection();
        if (records.length == 0) {
            toastr.warning("Chọn vật tư");
            return;
        }
        if (fnSauKhiChon) fnSauKhiChon(records);
        me.getView().doClose();
    },

    onClose: function () {
        var me = this;
    }
});
