Ext.define('Admin.view.danhmuckho.DSTonKhoModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.danhmuckho-mdstonkho',
    data: {
        fnSauKhiLoad: null,
        selectionTonKho: null,
        recordKho: null
    },
    stores: {
        storeTonDauKy: { type: 'stondauky' }
    }
});

Ext.define('Admin.view.danhmuckho.DSTonKho', {
    extend: 'Ext.window.Window',
    requires: [
        'Admin.view.danhmuckho.DSTonKhoController',
        'Admin.view.danhmuckho.DSTonKhoModel'
    ],
    controller: 'danhmuckho-cdstonkho',
    viewModel: {
        type: 'danhmuckho-mdstonkho'
    },
    width: 1224,
    maxWidth: window.innerWidth - 100,
    height: 600,
    modal: true,
    title: 'Quản lý tồn kho',
    iconCls: 'x-fa fa-list',
    layout: 'fit',
    items: [{
        xtype: 'panel',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'grid',
            reference: 'dsChotKyKho',
            border: true,
            ui: 'light',
            flex: 1,
            bind: {
                store: '{storeTonDauKy}',
                selection: '{selectionTonKho}'
            },
            columns: [{
                xtype: 'rownumberer',
                text: '#',
                width: 40,
                align: 'center',
                style: {
                    borderRight: '1px solid #CCCCCC'
                }
            }, {
                xtype: 'gridcolumn',
                sortable: false,
                //hidden: !abp.auth.hasPermission('CMMS.Inventory.Kho.Manager'),
                align: 'center',
                width: 30,
                //renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                //    return '<a class="tepdinhkem" title="' + app.localize('CMMSDMKhoChotTonLaiDauKy') + '" style="color:blue;cursor: pointer;"><span class="fa fa-recycle"></span></a>';
                //}
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'materialCode',
                cellWrap: true,
                width: 100,
                text: 'Mã',
                filter: {
                    xtype: 'textfield'
                }
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'materialName',
                cellWrap: true,
                width: 200,
                text: 'Tên',
                filter: {
                    xtype: 'textfield'
                }
            }, {
                xtype: 'datecolumn',
                text: 'Thời điểm',
                dataIndex: 'date',
                style: 'text-align:center',
                align: 'center',
                width: 120,
                format: 'd/m/Y',
                filter: {
                    xtype: 'datefield',
                    format: 'd/m/Y'
                }
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'unitName',
                width: 100,
                text: 'Đơn vị tính'
            }, {
                text: 'Số lượng',
                columns: [{
                    text: 'Lý thuyết',
                    dataIndex: 'quantityLT',
                    border: 1,
                    style: 'text-align:center',
                    align: 'right',
                    width: 120,
                    renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                        if (value != undefined && value != null) {
                            return app.mUtils.fnFormatCurrency(value, 2);
                        }
                    }
                }, {
                    text: 'Thực tế',
                    dataIndex: 'quantityTT',
                    border: 1,
                    reference: 'clsoluongthuc',
                    style: 'text-align:center',
                    align: 'right',
                    width: 110,
                    renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                        if (value != undefined && value != null) {
                            return app.mUtils.fnFormatCurrency(value, 2);
                        }
                    }
                }]
            }, {
                xtype: 'gridcolumn',
                text: 'Lý do',
                filter: {
                    xtype: 'textfield'
                },
                dataIndex: 'description',
                sortable: true,
                flex: 1
            }],
            listeners: {
                cellclick: 'cellKho'
            },
            viewConfig: {
                emptyText: 'Chưa có dữ liệu'
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                style: {
                    margin: '5 0 0 0'
                },
                items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    flex: 1,
                    items: [{
                        xtype: 'datefield',
                        reference: 'cbNam',
                        fieldLabel: 'Chọn kỳ',
                        labelWidth: 100,
                        labelAlign: 'right',
                        flex: 1,
                        listeners: {
                            change: 'onChangeKho'
                        }
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Nhập mã, tên kho',
                        reference: 'txtMaTen',
                        labelWidth: 130,
                        labelAlign: 'right',
                        emptyText: 'Nhập mã, tên kho',
                        flex: 1,
                        cls: "EnterToTab",
                        listeners: {
                            specialkey: 'specialkey'
                        }
                    }, { xtype: 'tbfill', flex: 1 }, {
                        xtype: 'button',
                        ui: 'soft-blue',
                        name: 'btnTimKiemCK',
                        iconCls: 'x-fa fa-search',
                        text: 'Tìm',
                        handler: 'clickTimKiemCK'
                    }]
                }]
            }, {
                xtype: 'toolbar',
                dock: 'bottom',
                style: {
                    padding: 0
                },
                items: [{
                    name: 'btnThemChotKho',
                    iconCls: 'fa fa-plus',
                    text: 'Chốt tồn đầu kỳ',
                    tooltip: 'Chốt tồn đầu kỳ',
                    ui: 'soft-blue',
                    margin: '0 5 0 5',
                    //hidden: !abp.auth.hasPermission('CMMS.Inventory.Kho.Manager'),
                    handler: 'onThemChotKho'
                }, {
                    text: 'Nhập tồn kho từ Excel',
                    iconCls: 'x-fa fa-database',
                    ui: 'soft-blue',
                    tooltip: 'Nhập tồn kho từ Excel',
                    //handler: 'onImportDanhSach'
                }, {
                    xtype: 'button',
                    iconCls: 'fa fa-pencil',
                    name: 'btnInPhieuTonKho',
                    text: 'In phiếu',
                    tooltip: 'In phiếu',
                    hidden: true
                }, {
                    xtype: 'tbfill'
                }, {
                    xtype: 'pagingtoolbar',
                    //bind: {
                    //    store: '{storeTonDauKy}'
                    //},
                    displayInfo: true,
                    border: false,
                    //lastText: app.localize("ExtLastText"),
                    //prevText: app.localize("ExtPrevText"),
                    //firstText: app.localize("ExtFirstText"),
                    //nextText: app.localize("ExtNextText"),
                    //refreshText: app.localize("ExtRefreshText"),
                    //beforePageText: app.localize("ExtBeforePageText"),
                    //afterPageText: app.localize("ExtAfterPageText"),
                    //displayMsg: app.localize("ExtDisplayMsg"),
                    //emptyMsg: app.localize("ExtEmptyMsg"),
                    //listeners: {
                    //    beforechange: function (page, currentPage) {
                    //        //--- Get Proxy ------//
                    //        var myProxy = this.store.getProxy();
                    //        //--- Define Your Parameter for send to server ----//
                    //        myProxy.params = {
                    //            skipCount: 0,
                    //            maxResultCount: 0
                    //        };
                    //        //--- Set value to your parameter  ----//
                    //        myProxy.setExtraParam("skipCount", (currentPage - 1) * this.store.pageSize);
                    //        myProxy.setExtraParam("maxResultCount", this.store.pageSize);
                    //    }
                    //}
                }, {
                    xtype: 'button',
                    text: 'Huỷ bỏ',
                    handler: function () {
                        this.up('window').close();
                    },
                    ui: 'soft-red',
                    iconCls: 'fa fa-times'
                }]
            }]
        }]
    }],
    listeners: {
        afterRender: 'onAfterrender'
    }
});

Ext.define('Admin.view.danhmuckho.DSTonKhoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.danhmuckho-cdstonkho',
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
        var nam = new Date();
        var dataNam = [];
        for (var i = nam.getFullYear() + 1; i >= 2009; i--) {
            dataNam.push({ "text": i, "value": i });
        }
        //var store = me.ref.cbNam.getStore();
        //store.loadData(dataNam);
        me.ref.cbNam.setValue(new Date());
        me.clickTimKiemCK();
    },

    clickTimKiemCK: function () {
        this.loadDataTonKho();
    },

    onChangeKho: function (combo, record, eOpts) {
        var me = this;
        me.loadDataTonKho();
    },


    specialkey: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.loadDataTonKho();
        }
    },


    //cellKho: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    //    var me = this;
    //    if (e.target.className == 'fa fa-recycle') {
    //        var url = abp.appPath + 'api/services/app/CMMSKhoTonDauKy/GetAll' + abp.utils.buildQueryString([{ name: 'maKho', value: record.data.maKho }, { name: 'maVatTu', value: record.data.maVatTu }, { name: 'sorting', value: "item.ThoiDiem desc" }, { name: 'skipCount', value: 0 }, { name: 'maxResultCount', value: 2 }]);
    //        app.gplatformutils.fnGETAjax(url, function (data) {
    //            if (data.result.items.length > 0) {
    //                var strtDt = new Date(data.result.items[0].thoiDiem);
    //                if ((record.data.thoiDiem - strtDt) == 0) {
    //                    var wnd = Ext.create('Admin.view.danhmuckho.cnChotTonLai', {
    //                        viewModel: {
    //                            data: {
    //                                nam: me.ref.cbNam.getValue(),
    //                                record: record,
    //                                fnSauKhiLoad: function () {
    //                                    me.loadDataTonKho();
    //                                }
    //                            }
    //                        }
    //                    });
    //                    wnd.show();
    //                } else {
    //                    abp.notify.info(app.localize('CMMSDMKho_ThongBaoChotTon') + " " + app.localize('CMMSDMKho_ThongBaoChotTonThoiDiemGanNhat') + ":(" + strtDt.getFullYear() + ")");
    //                }
    //            }
    //        })
    //    }
    //},

    loadDataTonKho: function (fnSauKhiLoad) {
        var me = this;
        var record = me.getViewModel().data.recordKho;
        var filter = {}
        var store = me.storeinfo.storeTonDauKy;
        //var txtMaTen = me.ref.txtMaTen.getValue();
        //if (txtMaTen != "") {
        //    filter.push({ name: "Filter", value: txtMaTen });
        //}
        filter.storeroomId = record.get('id');
        filter.date = Ext.Date.format(me.ref.cbNam.getValue(), "Y-m-d") || me.ref.cbNam.getValue();
        var query = app.mUtils.fnBuildQueryString(filter)
        var url = "Inventory?" + query;
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
                console.log(store)
                if (records == null) {
                    store.removeAll();
                }
            }
        });
    },

    onThemChotKho: function () {
        var me = this;
        var nodesSelect = me.getViewModel().data.recordKho;
        var wnd = Ext.create('Admin.view.danhmuckho.CNFormChotTon', {
            title: 'Chốt tồn đầu kỳ' + ": " + nodesSelect.data.moTa,
            viewModel: {
                data: {
                    nam: me.ref.cbNam.getValue(),
                    recordKho: nodesSelect,
                    fnSauKhiLoad: function () {
                        me.loadDataTonKho();
                    }
                }
            }
        });
        wnd.show();
    },

    //onImportDanhSach: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.recordKho;
    //    var store = me.storeinfo.storeTonDauKy
    //    var wnd = Ext.create('Admin.view.danhmuckho.CNNhapVatTuChotTonExcel', {
    //        title: app.localize('KhoVatTu_NhapVatTuExcel'),
    //        viewModel: {
    //            data: {
    //                maKho: record.get('id'),
    //                fnSauKhiSave: function (dataExcel, storeAX) {
    //                    var nodesSelect = me.getViewModel().data.recordKho;
    //                    var wnd = Ext.create('Admin.view.danhmuckho.CNFormChotTon', {
    //                        title: app.localize("CMMSDMKhoChotTonDauKy") + ": " + nodesSelect.data.moTa,
    //                        viewModel: {
    //                            data: {
    //                                dataExcel: dataExcel,
    //                                nam: me.ref.cbNam.getValue(),
    //                                recordKho: nodesSelect,
    //                                fnSauKhiLoad: function () {
    //                                    me.loadDataTonKho();
    //                                }
    //                            }
    //                        }
    //                    });
    //                    wnd.show();
    //                    return;
    //                    for (var i = 0; i < dataExcel.length; i++) {
    //                        var recordsCL = store.queryBy(function (record, id) {
    //                            return (record.get('vatTu') == dataExcel[i].ma);
    //                        });
    //                        if (recordsCL.items.length > 0) {
    //                            var r = recordsCL.items[0];
    //                            r.data['soLuongTonKhoThuc'] = dataExcel[i].soLuongTon;
    //                            r.commit(r);
    //                        }
    //                    }
    //                    me.ref.dsChotKyKho.getView().refresh();
    //                }
    //            }
    //        }
    //    });
    //    wnd.show();
    //}
});
