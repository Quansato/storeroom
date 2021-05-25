Ext.define('Admin.view.danhmuckho.quanLyDinhMucVatTuModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.quanlydinhmucvattu',
    data: {
        recordKho: null,
        selectionChungLoai: null,
        selectionChungLoaiTS: null
    },

    stores: {
        storeChungLoai: { type: 'skhonhomvattu' },
        storeKhoVatTu: { type: 'skhoinventory' },
        storeKho: { type: 'skho' }
    }
});
Ext.define('Admin.view.danhmuckho.CNQuanLyDinhMucVatTu', {
    extend: 'Ext.window.Window',
    requires: [
        'Admin.view.danhmuckho.quanLyDinhMucVatTuController',
        'Admin.view.danhmuckho.quanLyDinhMucVatTuModel'
    ],
    controller: 'quanlydinhmucvattu',
    viewModel: {
        type: 'quanlydinhmucvattu'
    },
    width: 1224,
    maxWidth: window.innerWidth - 100,
    height: 600,
    iconCls: 'x-fa fa-recycle',
    modal: true,
    margin: '0 0 0 0',
    padding: '0 0 0 0',
    maKho: null,
    layout: 'fit',
    items: [{
        xtype: 'quanLyDinhMucVatTu',
        reference: 'quanLyDinhMucVatTu',
        cls: 'quanLyDinhMucVatTu',
        layout: {
            type: 'hbox',
            align: 'stretch'
        }
    }],
    buttons: [
        //{
        //    text: app.localize("Save"),
        //    handler: 'clickThucHien',
        //    hidden: true,
        //    reference: 'btnLuu',
        //    iconCls: 'x-fa fa-floppy-o'
        //},
        {
            text: "Huỷ bỏ",
            handler: function () {
                this.up('window').close();
            },
            ui: 'soft-red',
            iconCls: 'fa fa-times'
        }],
    listeners: {
        afterRender: 'onAfterrender',
        close: 'onDongWinDow'
    }
});
Ext.define('Admin.view.danhmuckho.quanLyDinhMucVatTu', {
    extend: 'Ext.panel.Panel',
    xtype: 'quanLyDinhMucVatTu',
    requires: [
        'Admin.view.danhmuckho.quanLyDinhMucVatTuController',
        'Admin.view.danhmuckho.quanLyDinhMucVatTuModel'
    ],
    bodyStyle: { 'background-color': '#f6f6f6', 'padding': '0px 0px 0px 0px' },
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'gridpanel',
            width: 350,
            title: "Nhóm vật tư",
            reference: 'gridNhomVatTu',
            iconCls: 'x-fa fa-th-list',
            ui: 'light',
            border: true,
            bind: {
                store: '{storeChungLoai}',
                selection: '{selectionChungLoai}'
            },
            padding: '0 5 0 0',
            layout: 'fit',
            minWidth: 180,
            columns: [
                {
                    xtype: "rownumberer",
                    text: "#",
                    width: 35,
                    align: "center",
                    sortable: false
                },
                {
                    xtype: 'gridcolumn',
                    text: "Mã",
                    sortable: true,
                    dataIndex: 'qrCode',
                    flex: 0.6
                },
                {
                    xtype: 'gridcolumn',
                    text: "Tên",
                    flex: 1,
                    sortable: true,
                    dataIndex: 'displayName'
                }],
            viewConfig: {
                emptyText: "Không có dữ liệu"
            },
            listeners: {
                select: 'onChangeNhomTS'
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                style: {
                    borderTop: 'solid 1px #d0d0d0 !important'
                },
                items: [{
                    xtype: 'textfield',
                    emptyText: "Tìm kiếm",
                    reference: 'txtSeachNhomVatTu',
                    flex: 1,
                    listeners: {
                        specialkey: 'onChangeTextSearchNhomVT'
                    }
                }]
            }, {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [{ xtype: 'tbfill' }, {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    bind: {
                        store: '{storeChungLoai}'
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
            }]
        }, {
            xtype: 'gridpanel',
            ui: 'light',
            title: 'Danh sách vật tư trong kho',
            iconCls: 'x-fa fa-list-alt',
            layout: 'fit',
            filter: '',
            flex: 1,
            bind: {
                store: '{storeKhoVatTu}',
                selection: '{selectionChungLoaiTS}'
            },
            plugins: {
                ptype: 'cellediting',
                clicksToEdit: 1,
                listeners: {
                    edit: 'onEdited'
                }
            },
            selModel: {
                type: 'cellmodel'
            },
            columns: [
                {
                    xtype: 'rownumberer',
                    text: '#',
                    width: 40,
                    style: 'text-align:center',
                    align: 'center',
                    sortable: true
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'materialCode',
                    style: 'text-align:center',
                    width: 120,
                    text: 'Mã vật tư',
                    sortable: true
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'displayName',
                    style: 'text-align:center',
                    flex: 1,
                    minWidth: 120,
                    sortable: true,
                    text: 'Tên vật tư'
                },
                {
                    text: 'Đơn vị tính',
                    dataIndex: 'unitName',
                    align: 'left',
                    border: 1,
                    style: 'text-align:center',
                    width: 110
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'quantity',
                    width: 100,
                    align: 'right',
                    style: 'text-align:center',
                    sortable: true,
                    text: 'Số lượng',
                    renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                        if (value != undefined && value != null) {
                            return app.mUtils.fnFormatCurrency(value, 2);
                        }
                    }
                },
                {
                    text: 'Định mức',
                    columns: [{
                        text: 'Min',
                        align: 'right',
                        dataIndex: 'quantityMin',
                        width: 80,
                        renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                            if (value != undefined && value != null) {
                                return app.mUtils.fnFormatCurrency(value, 2);
                            }
                        },
                        editor: {
                            xtype: 'currencyfield',
                            fieldStyle: 'text-align: right;'
                        }
                    },
                    {
                        text: 'Max',
                        align: 'right',
                        dataIndex: 'quantityMax',
                        width: 80,
                        renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                            if (value != undefined && value != null) {
                                return app.mUtils.fnFormatCurrency(value, 2);
                            }
                        },
                        editor: {
                            xtype: 'currencyfield',
                            fieldStyle: 'text-align: right;'
                        }
                    }]
                },
                {
                    text: 'Ngăn',
                    dataIndex: 'compartment',
                    align: 'left',
                    border: 1,
                    style: 'text-align:center',
                    width: 70,
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    text: 'Kệ',
                    dataIndex: 'rack',
                    align: 'left',
                    border: 1,
                    style: 'text-align:center',
                    width: 70,
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    text: 'Dãy',
                    dataIndex: 'row',
                    align: 'left',
                    border: 1,
                    style: 'text-align:center',
                    width: 70,
                    editor: {
                        xtype: 'textfield'
                    }
                }],
            viewConfig: {
                emptyText: 'Không có dữ liệu'
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                style: {
                    borderTop: 'solid 1px #d0d0d0 !important'
                },
                items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    flex: 1,
                    combineErrors: true,
                    items: [{
                        xtype: 'textfield',
                        labelWidth: 45,
                        labelAlign: 'right',
                        reference: 'materialCode',
                        fieldLabel: 'Mã vật tư',
                        margin: '0 5 0 5',
                        flex: 1
                    }, {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        labelWidth: 45,
                        reference: 'displayName',
                        fieldLabel: 'Tên vật tư',
                        margin: '0 5 0 5',
                        flex: 1
                    }, {
                        margin: '5 5 0 5',
                        xtype: 'button',
                        text: 'Tìm kiếm',
                        ui: 'soft-blue',
                        iconCls: 'fa fa-search',
                        handler: 'onTimKiem'
                    }]
                }]
            }, {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [{ xtype: 'tbfill' }, {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    bind: {
                        store: '{storeKhoVatTu}'
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
            }]
        }];
        this.callParent(arguments);
    }
});

Ext.define('Admin.view.danhmuckho.quanLyDinhMucVatTuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.quanlydinhmucvattu',
    ref: null,
    storeinfo: null,
    dataFields: null,
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

    onChangeTextSearchNhomVT: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.loadChungLoai();
        }
    },

    loadChungLoai: function (fnSauKhiLoad) {
        var me = this;
        var sNhomVatTu = me.storeinfo.storeChungLoai;
        var txtSearch = me.ref.txtSeachNhomVatTu.getValue();
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
                setTimeout(function () {
                    if (me.ref.txtSeachNhomVatTu.getValue() == "") {
                        var rTatCa = Ext.create("Admin.model.mKhoNhomVatTu", {
                            id: 0,
                            qrCode: "Tất cả",
                            displayName: "Tất cả"
                        });
                        sNhomVatTu.insert(0, rTatCa);
                    }
                    if (records.length > 0) {
                        me.ref.gridNhomVatTu.getSelectionModel().select(0);
                    }
                }, 500);
            }
        });
    },

    onEdited: function (editor, e) {
        var me = this;
        var record = e.record;
        var quantityMin = null;
        if (record.get('quantityMin') == "") {
            quantityMin = null;
        } else quantityMin = record.get('quantityMin');
        var quantityMax = null;
        if (record.get('quantityMax') == "") {
            quantityMax = null;
        } else quantityMax = record.get('quantityMax')
        if (record.get('quantityMin') > record.get('quantityMax')) {
            toastr.warning("Định mức min phải bé hơn định mức max");
            return;
        }
        var url = "api/Material/materialStoreroom/dinhMuc";
        if (record.dirty) {
            var obj = {
                storeroomId: me.getViewModel().data.recordKho.get('id'),
                materialId: record.get('materialId'),
                quantityMin: quantityMin == null ? 0 : quantityMin,
                quantityMax: quantityMax == null ? 0 : quantityMax,
                ViTriKho: "",
                Ngan: record.get('compartment'),
                Ke: record.get('rack'),
                Day: record.get('row')
            }
            app.mUtils.fnPUTAjax(url, obj, function (result) {
                me.getView().setLoading(false);
                record.commit();
                toastr.success("Cập nhật thành công");
            })
        }
    },

    onTimKiem: function () {
        var me = this;
        me.onloadDanhSachVatTu();
    },

    fnGetNhomId: function () {
        var me = this;
        var gridNhomVatTu = me.ref.gridNhomVatTu;
        var records = gridNhomVatTu.getSelectionModel().getSelection();
        var record = records && records.length > 0 ? records[0] : null;
        if (record) return record.get("id");
    },

    fnGetTxtSearch: function () {
        var me = this;
        return me.ref.txtSearch.getValue();
    },

    onloadDanhSachVatTu: function (id) {
        var me = this;
        var id = me.fnGetNhomId();
        //var filter = [{ name: "maNhomVatTu", value: id == 0 ? null : id },
        //    { name: "maKho", value: me.getViewModel().data.recordKho.get('id') }];
        var filter = {}
        filter.materialGroupId = id == 0 ? "" : id;
        filter.storeroomId = me.getViewModel().data.recordKho.get('id');
        if (me.ref.materialCode.getValue()) {
            filter.materialCode = me.ref.materialCode.getValue()
        }
        if (me.ref.displayName.getValue()) {
            filter.displayName = me.ref.displayName.getValue();
        }
        var query = app.mUtils.fnBuildQueryString(filter);
        var store = me.storeinfo.storeKhoVatTu;
        var url = "api/Material/materialStoreroom/paging?page=1&start=0&limit=25&" + query;
        store.proxy.api.read = url;
        store.pageSize = 25;
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

    onChangeNhomTS: function (obj, records, eOpts) {
        var me = this;
        me.onloadDanhSachVatTu(records.get('id'));
    },

    onDongWinDow: function () {
        var me = this;
    }
});
