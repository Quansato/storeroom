Ext.define('Admin.view.chondulieu.wdChonNhomVatTuModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.chondulieu-wdchonnhomvattu',
    data: {
        rSelected: null,
        fnSauKhiChon: null
    },
    stores: {
        sNhomVatTu: { type: "skhonhomvattu" }
    }
});

Ext.define('Admin.view.chondulieu.wdChonNhomVatTu', {
    extend: 'Ext.window.Window',
    requires: [
        'Admin.view.chondulieu.wdChonNhomVatTuController',
        'Admin.view.chondulieu.wdChonNhomVatTuModel'
    ],

    controller: 'chondulieu-wdchonnhomvattu',
    viewModel: {
        type: 'chondulieu-wdchonnhomvattu'
    },

    width: 700,
    height: 500,
    modal: true,
    layout: 'fit',
    iconCls: "x-fa fa-tags",
    title: "Chọn nhóm vật tư",
    items: [{
        xtype: "grid",
        title: "Nhóm vật tư",
        reference: "gridNhomVatTu",
        flex: 1.2,
        padding: '0 5 0 0',
        ui: "light",
        iconCls: "x-fa fa-th-list",
        bind: {
            store: "{sNhomVatTu}",
            selection: "{rSelected}"
        },
        columns: [{
            xtype: 'rownumberer',
            text: '#',
            width: 35,
            align: 'center',
            sortable: true
        }, {
            xtype: "gridcolumn",
            header: "Mã",
            dataIndex: "qrCode",
            flex: 1
        }, {
            xtype: "gridcolumn",
            header: "Mô tả",
            dataIndex: "displayName",
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
                text: "Tìm kiếm",
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
        }]
    }],
    buttons: [{
        text: "Thực hiện",
        iconCls: "fa fa-floppy-o",
        ui: "soft-blue",
        reference: "btnSaveAndNew",
        handler: "onSelectDown"
    }, {
        text:"Huỷ bỏ",
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
Ext.define('Admin.view.chondulieu.wdChonNhomVatTuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chondulieu-wdchonnhomvattu',
    refs: null,
    storeInfo: null,

    init: function () {
        var me = this;
        me.callParent(arguments);
    },

    onAfterrender: function () {
        var me = this;
        me.refs = me.getReferences();
        me.storeInfo = me.getViewModel().storeInfo;
        me.onSearchNhom();
    },

    specialkey: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onSearchNhom();
        }
    },

    onSearchNhom: function () {
        var me = this;
        var txt = me.refs.txtFilter.getValue();
        //var query = abp.utils.buildQueryString([{ name: "filter", value: txt }]);
        var url = "api/MaterialGroup?page=1&start=0&limit=25&keyword=" + txt;
        var store = me.getViewModel().get("sNhomVatTu");
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

    onSelectDown: function () {
        var me = this;
        var record = me.getViewModel().get("rSelected");
        var fnSauKhiChon = me.getViewModel().get("fnSauKhiChon");
        if (fnSauKhiChon) fnSauKhiChon(record);
        me.getView().close();
    }
});
