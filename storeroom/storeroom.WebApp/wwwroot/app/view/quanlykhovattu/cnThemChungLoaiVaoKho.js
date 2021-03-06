Ext.define('Admin.view.quanlykhovattu.CNcnThemChungLoaiVaoKhoModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.quanlykhovattu-mcnthemcungloaivaokho',
    data: {
        makho: null,
        fnSauKhiLoad: null,
        selectVatTu: null,
        recordNhomCL: null,
        recordTK: Ext.create('Ext.data.Model', {
        })
    },
    stores: {
        storeKhoVatTu: { type: 'skhovattu' },
        storeNhomVatTu: { type: 'skhonhomvattu' }
    }
});

Ext.define('Admin.view.quanlykhovattu.cnThemChungLoaiVaoKho', {
    extend: 'Ext.window.Window',
    requires: [
        'Admin.view.quanlykhovattu.CNcnThemChungLoaiVaoKhoController',
        'Admin.view.quanlykhovattu.CNcnThemChungLoaiVaoKhoModel'
    ],
    controller: 'quanlykhovattu-ccnthemchungloaivaokho',
    viewModel: {
        type: 'quanlykhovattu-mcnthemcungloaivaokho'
    },
    width: 800,
    height: 480,
    iconCls: 'x-fa fa-list',
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'panel',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'fieldcontainer',
            layout: 'hbox',
            combineErrors: true,
            defaults: {
                margin: '5 0 0 0',
                labelAlign: 'right'
            },
            items: [{
                xtype: 'combo',
                reference: 'cbkho',
                margin: '5 5 0 5',
                bind: {
                    store: '{storeNhomVatTu}',
                    value: '{recordTK.nhomvattu}'
                },
                labelWidth: 105,
                fieldLabel: '',
                queryMode: 'local',
                displayField: 'displayName',
                valueField: 'id',
                forceSelection: true,
                editable: false
            }, {
                xtype: 'textfield',
                labelWidth: 75,
                fieldLabel: 'Tìm',
                emptyText: 'Mã, Tên vật tư',
                margin: '5 5 0 0',
                bind: '{recordTK.maTenVatTu}',
                flex: 1
            }, {
                margin: '5 5 0 0',
                xtype: 'button',
                ui: 'soft-blue',
                text: 'Tìm',
                iconCls: 'fa fa-search',
                handler: 'onTimKiem'
            }]
        }]
    }, {
        xtype: 'grid',
        flex: 1,
        reference: 'gridKhoVatTu',
        style: {
            borderTop: "solid 1px #d0d0d0 !important"
        },
        bind: {
            store: '{storeKhoVatTu}',
            selection: '{selectVatTu}'
        },
        selModel: {
            selType: 'checkboxmodel',
            checkOnly: 'true',
            allowDeselect: false
        },
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'materialCode',
            width: 120,
            text: 'Mã vật tư'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'displayName',
            flex: 1,
            text: 'Tên vật tư'
        }],
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{ xtype: 'tbfill' }, {
                xtype: "pagingtoolbar",
                displayInfo: true,
                bind: {
                    store: "{storeKhoVatTu}"
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
    buttons: [{
        text: 'Lưu thông tin',
        handler: 'onLuu',
        ui: 'soft-blue',
        bind: { disabled: '{!selectVatTu}' },
        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.Manager') || abp.auth.hasPermission('CMMS.Inventory.Edit')),
        reference: 'btnLuu',
        iconCls: 'x-fa fa-floppy-o'
    }, {
        text: 'Huỷ bỏ',
        ui: 'soft-red',
        handler: function () {
            this.up('window').close();
        },
        iconCls: 'fa fa-times'
    }],
    listeners: {
        afterRender: 'onAfterrender'
    }
});

Ext.define('Admin.view.quanlykhovattu.CNcnThemChungLoaiVaoKhoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.quanlykhovattu-ccnthemchungloaivaokho',
    ref: null,
    storeinfo: null,
    init: function () {
        var me = this;
        me.callParent(arguments);
    },
    onAfterrender: function () {
        var me = this;
        me.ref = me.getReferences();
        me.storeinfo = me.getViewModel().storeInfo;
        me.loadChungLoai();
    },

    loadChungLoai: function (fnSauKhiLoad) {
        var me = this;
        //Lấy các loại vật tư
        var recordNhomCL = me.getViewModel().data.recordNhomCL;
        var store = me.storeinfo.storeNhomVatTu;
        var url = "api/MaterialGroup?page=1&start=0&limit=25"
        app.mUtils.fnGETAjax(url, function (response) {
            var dataResult = response.items
            var dataLCV = {
                id: 0,
                qrCode: "Tất cả",
                displayName: "Tất cả"
            };
            dataResult.splice(0, 0, dataLCV);
            store.loadData(dataResult);
            setTimeout(function () {
                var recordTK = me.getViewModel().data.recordTK;
                if (recordNhomCL && recordNhomCL.length > 0) {
                    recordTK.set('nhomvattu', recordNhomCL[0].get('id'));
                } else {
                    recordTK.set('nhomvattu', 0);
                }
                me.onTimKiem();
            }, 500);
        })
    },

    onTimKiem: function () {
        var me = this;
        me.onloadDanhSachVatTu();
    },

    onloadDanhSachVatTu: function (malienket) {
        var me = this;
        var filter = [{ name: "laKho", value: false }];
        var makho = me.getViewModel().data.makho;
        var recordTK = me.getViewModel().data.recordTK;
        //if (makho) {
        //    filter.push({ name: "maKho", value: makho });
        //}
        //if (recordTK.get('maTenVatTu')) {
        //    filter.push({ name: "filter", value: recordTK.get('maTenVatTu') });
        //}
        //if (recordTK.get('nhomvattu') != 0) {
        //    filter.push({ name: "maNhomVatTu", value: recordTK.get('nhomvattu') });
        //}
        var store = me.storeinfo.storeKhoVatTu;
        //var query = abp.utils.buildQueryString(filter);
        if (recordTK.get('nhomvattu') == 0) {
            var url = "api/Material/GetMaterialToAdd?page=1&start=0&limit=25&StoreroomId=" + makho ;
        }
        else var url = "api/Material/GetMaterialToAdd?page=1&start=0&limit=25&StoreroomId=" + makho + "&MaterialGroupId=" + recordTK.get('nhomvattu');
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

    //onThemTuExcel: function () {
    //    var me = this;
    //},

    //onTaiExcel: function () {
    //    var me = this;
    //},

    onLuu: function (button) {
        var me = this;
        var ListVatTu = [];
        var gridND = me.ref.gridKhoVatTu;
        var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
        var selected = gridND.getSelectionModel().getSelection();
        var makho = me.getViewModel().data.makho;
        var url = "/api/Material/materialStoreroom";
        for (var i = 0; i < selected.length; i++) {
            var rotating = 0;
            if (selected[i].data.rotating == true) {
                rotating = 1;
            }
            ListVatTu.push({
                materialId: selected[i].get('id'),
                storeroomId: makho,
                //materialGroupId: selected[i].get('materialGroupId'),
                quantity: 0,
            });
        }

        ListVatTu.forEach(function (item) {
            app.mUtils.fnPOSTAjax(url, item)
            console.log(1)
        })

        toastr.success("Thêm mới vật tư vào kho thành công")
        if (fnSauKhiLoad) fnSauKhiLoad();
        me.getView().close();
    }
});
