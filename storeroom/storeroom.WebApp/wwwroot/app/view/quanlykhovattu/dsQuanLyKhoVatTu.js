Ext.define('Admin.view.quanlykhovattu.dsQuanLyKhoVatTuModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mquanlykhovattu',
    data: {
        recordTK: Ext.create('Ext.data.Model', {
        }),
        selectionNhomVatTu: null,
        selectionVatTu: null
    },
    stores: {
        storeNhomVatTu: { type: 'skhonhomvattu' },
        storeQuanLyKhoVatTu: { type: 'skhoinventory' },
        storeKho: { type: 'skho' }
    }
});
//var _cMMSKho = abp.services.app.cMMSKho;
//var _cMMSKhoNguoiDung = abp.services.app.cMMSKhoNguoiDung;
//var _cMMSKhoVatTu = abp.services.app.cMMSKhoVatTu;
//var _cMMSKhoNhomVatTu = abp.services.app.cMMSKhoNhomVatTu;
//var _cMMSKhoInventory = abp.services.app.cMMSKhoInventory;
Ext.define('Admin.view.quanlykhovattu.dsQuanLyKhoVatTu', {
    extend: 'Ext.panel.Panel',
    xtype: 'dsCMMSKhoVatTu',
    requires: [
        'Admin.view.quanlykhovattu.dsQuanLyKhoVatTuController',
        'Admin.view.quanlykhovattu.dsQuanLyKhoVatTuModel'
    ],
    controller: 'cquanlykhovattu',
    viewModel: {
        type: 'mquanlykhovattu'
    },
    bodyStyle: { 'background-color': '#f6f6f6', 'padding': '0px 0px 0px 5px' },
    height: window.innerHeight - 65,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'gridpanel',
        width: 350,
        title: 'Nhóm vật tư',
        reference: 'gridNhomVatTu',
        iconCls: 'x-fa fa-object-group',
        ui: 'light',
        bind: {
            store: '{storeNhomVatTu}',
            selection: '{selectionNhomVatTu}'
        },
        padding: '0 5 0 0',
        layout: 'fit',
        minWidth: 180,
        columns: [{
            xtype: "rownumberer",
            text: "#",
            width: 35,
            align: "center",
            sortable: false
        }, {
            xtype: 'gridcolumn',
            text: 'Mã',
            sortable: true,
            dataIndex: 'qrCode',
            flex: 0.6
        }, {
            xtype: 'gridcolumn',
            text: 'Tên nhóm',
            flex: 1,
            sortable: true,
            dataIndex: 'displayName'
        }],
        viewConfig: {
            emptyText: 'Không có dữ liệu'
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
                emptyText: 'Nhập tên, mã nhóm vật tư',
                reference: 'txtSeachNhomVatTu',
                flex: 1,
                listeners: {
                    specialkey: 'onChangeTextSearchNhomVT'
                }
            }]
        },
            //{
            //    xtype: 'toolbar',
            //    dock: 'bottom',
            //    items: [{
            //        xtype: "pagingtoolbar",
            //        displayInfo: true,
            //        bind: {
            //            store: "{storeNhomVatTu}"
            //        },
            //        style: "padding: 0px !important",
            //        lastText: app.localize("ExtLastText"),
            //        prevText: app.localize("ExtPrevText"),
            //        firstText: app.localize("ExtFirstText"),
            //        nextText: app.localize("ExtNextText"),
            //        refreshText: app.localize("ExtRefreshText"),
            //        beforePageText: app.localize("ExtBeforePageText"),
            //        afterPageText: app.localize("ExtAfterPageText"),
            //        displayMsg: app.localize("ExtDisplayMsg"),
            //        emptyMsg: app.localize("ExtEmptyMsg"),
            //        listeners: {
            //            beforechange: function (page, currentPage) {
            //                //--- Get Proxy ------//
            //                var myProxy = this.store.getProxy();
            //                //--- Define Your Parameter for send to server ----//
            //                myProxy.params = {
            //                    skipCount: 0,
            //                    maxResultCount: 0
            //                };
            //                //--- Set value to your parameter  ----//
            //                myProxy.setExtraParam("skipCount", (currentPage - 1) * this.store.pageSize);
            //                myProxy.setExtraParam("maxResultCount", this.store.pageSize);
            //            }
            //        }
            //    }]
            //    }
        ]
    }, {
        xtype: 'panel',
        title: 'Danh sách vật tư trong kho',
        iconCls: 'x-fa fa-puzzle-piece',
        ui: 'light',
        flex: 1,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            flex: 1,
            items: [{
                xtype: 'grid',
                layout: 'fit',
                ui: 'light',
                flex: 1,
                reference: 'grvDSChungLoaiTaiSan',
                bind: {
                    store: '{storeQuanLyKhoVatTu}',
                    selection: '{selectionVatTu}'
                },
                columns: [{
                    xtype: 'rownumberer',
                    text: '#',
                    width: 40,
                    style: 'text-align:center',
                    align: 'center'
                }, {
                    text: '',
                    width: 20,
                    align: 'center',
                    menuDisabled: true,
                    //renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    //    return '<a style="cursor: pointer;" title="' + app.localize('ViewTooltip') + '"><span class="fa fa-eye"></a>';
                    //}
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'materialCode',
                    cellWrap: true,
                    style: 'text-align:center',
                    width: 120,
                    text: 'Mã vật tư'
                }, {
                    text: '',
                    width: 25,
                    align: 'center',
                    menuDisabled: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                        if (record.get('quantityMax') && record.get('quantity') > record.get('quantityMax')) {
                            return '<a style="cursor: pointer;" title="' + "Số lượng trong kho lớn hơn định mức tồn" + '"><span style="color: red" class="fa fa-exclamation-triangle"></a>';
                        } else if (record.get('quantityMin') && record.get('quantity') < record.get('quantityMin')) {
                            return '<a style="cursor: pointer;" title="' + "Số lượng trong kho thấp hơn định mức tồn" + '"><span style="color: orange" class="fa fa-exclamation-triangle"></a>';
                        } else {
                            return '<a style="cursor: pointer;" title="' + "Số lượng trong kho trong định mức tồn" + '"><span style="color: green" class="fa fa-check-circle-o"></a>';
                        }
                        return "";
                    }
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'displayName',
                    style: 'text-align:center',
                    cellWrap: true,
                    minWidth: 200,
                    flex: 1,
                    text: 'Tên vật tư'
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'storeroomName',
                    style: 'text-align:center',
                    width: 220,
                    text: 'Kho'
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'unitName',
                    width: 120,
                    style: 'text-align:center',
                    text: 'Đơn vị tính'
                }, {
                    xtype: 'numbercolumn',
                    dataIndex: 'quantity',
                    width: 100,
                    align: 'right',
                    style: 'text-align:center',
                    text: 'Số lượng',
                    renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                        if (value != undefined && value != null) {
                            return app.mUtils.fnFormatCurrency(value, 2);
                        }
                    }
                }, {
                    xtype: 'gridcolumn',
                    width: 120,
                    align: 'center',
                    style: 'text-align:center',
                    text: 'Định mức tồn',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                        var min = record.data.quantityMin;
                        var max = record.data.quantityMax;
                        if (min == null) min = "";
                        if (max == null) max = "";
                        if (min == "" && max == "") {
                            return "";
                        }
                        return app.mUtils.fnFormatCurrency(min, 2) + " - " + app.mUtils.fnFormatCurrency(max, 2);
                    }
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'compartment',
                    align: 'center',
                    width: 120,
                    text: 'Ngăn'
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'rack',
                    align: 'center',
                    width: 120,
                    text: 'Kệ'
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'row',
                    align: 'center',
                    width: 120,
                    text: 'Dãy'
                }],
                viewConfig: {
                    emptyText: 'Không có dữ liệu'
                },
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    style: {
                        borderTop: 'solid 1px #d0d0d0 !important',
                        paddingBottom: "0px"
                    },
                    items: [{
                        xtype: 'container',
                        flex: 1,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [{
                            xtype: 'fieldcontainer',
                            flex: 1,
                            layout: 'hbox',
                            combineErrors: true,
                            defaults: {
                                labelAlign: 'right'
                            },
                            items: [{
                                xtype: 'combo',
                                reference: 'cbkho',
                                margin: '0 5 0 0',
                                bind: {
                                    store: '{storeKho}',
                                    value: '{recordTK.storeroomId}'
                                },
                                labelWidth: 95,
                                flex: 1,
                                fieldLabel: 'Kho',
                                queryMode: 'local',
                                displayField: 'displayName',
                                valueField: 'id',
                                forceSelection: true,
                                editable: false,
                                listeners: {
                                    change: 'onChangeKho'
                                }
                            }, {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                combineErrors: true,
                                defaults: {
                                    margin: '0 0 0 0',
                                    labelAlign: 'right'
                                },
                                items: [{
                                    xtype: 'combo',
                                    reference: 'cbCongThuc',
                                    bind: {
                                        value: '{recordTK.congthuc}'
                                    },
                                    labelWidth: 60,
                                    width: 120,
                                    fieldLabel: 'Số lượng',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['text', 'value'],
                                        data: [
                                            { text: '>', value: '>' },
                                            { text: '>=', value: '>=' },
                                            { text: '<', value: '<' },
                                            { text: '<=', value: '<=' },
                                            { text: '=', value: '=' }
                                        ]
                                    }),
                                    queryMode: 'local',
                                    displayField: 'text',
                                    valueField: 'value',
                                    forceSelection: true,
                                    editable: false
                                }, {
                                    xtype: 'numberfield',
                                    bind: '{recordTK.quantity}',
                                    margin: '0 0 0 5',
                                    emptyText: 'Số lượng',
                                    width: 150
                                }]
                            }]
                        }, {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            flex: 1,
                            padding: 0,
                            combineErrors: true,
                            defaults: {
                                margin: '0 5 0 0',
                                labelAlign: 'right'
                            },
                            items: [{
                                xtype: 'textfield',
                                labelWidth: 95,
                                fieldLabel: 'Mã vật tư',
                                emptyText: 'Mã vật tư',
                                bind: '{recordTK.materialCode}',
                                flex: 1,
                                listeners: {
                                    specialkey: 'onChangeTextSearch'
                                }
                            }, {
                                xtype: 'textfield',
                                labelWidth: 95,
                                fieldLabel: 'Tên vật tư',
                                bind: '{recordTK.materialName}',
                                emptyText: 'Tên vật tư',
                                flex: 1,
                                listeners: {
                                    specialkey: 'onChangeTextSearch'
                                }
                            }, {
                                margin: '0 5 0 0',
                                xtype: 'button',
                                ui: 'soft-green',
                                text: 'Tìm mới',
                                iconCls: 'x-fa fa-refresh',
                                handler: 'onTimMoi'
                            }, {
                                margin: '0 0 0 0',
                                xtype: 'button',
                                ui: 'soft-blue',
                                text: 'Tìm',
                                iconCls: 'x-fa fa-search',
                                handler: 'onTimKiem'
                            }]
                        }]
                    }]
                }, {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                        xtype: 'button',
                        iconCls: 'fa fa-puzzle-piece',
                        text: 'Tiện ích',
                        ui: 'soft-blue',
                        tooltip: 'Tiện ích',
                        menu: new Ext.menu.Menu({
                            items: [
                                {
                                    iconCls: 'x-fa fa-plus-square',
                                    reference: 'btnThemChungLoai',
                                    text: 'Thêm vật tư vào kho',
                                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.Manager') || abp.auth.hasPermission('CMMS.Inventory.Edit')),
                                    //disabled: true,
                                    ui: 'blue',
                                    handler: 'clickThemChungLoai',
                                    tooltip: 'Click thêm nhóm vật tư'
                                },
                                {
                                    reference: 'btnTonKho',
                                    text: 'Quản lý tồn kho',
                                    //hidden: !abp.auth.hasPermission('CMMS.Inventory.Manager'),
                                    iconCls: 'x-fa fa-cog',
                                    ui: 'blue',
                                    //disabled: true,
                                    handler: "onQuanlyTonKho"
                                },
                                {
                                    reference: 'btnQuanLyDinhMuc',
                                    text: 'Quản lý định mức',
                                    //hidden: !abp.auth.hasPermission('CMMS.Inventory.Manager'),
                                    iconCls: 'x-fa fa-recycle',
                                    ui: 'blue',
                                    disabled: true,
                                    handler: "onQuanLyDinhMuc"
                                },
                                {
                                    reference: 'btnXoaKho',
                                    text: 'Xoá',
                                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.Manager') || abp.auth.hasPermission('CMMS.Inventory.Edit')),
                                    bind: { disabled: '{!selectionVatTu}' },
                                    iconCls: 'x-fa fa-minus-circle',
                                    ui: 'soft-red',
                                    handler: "onXoa"
                                }]
                        })
                    }, {
                        iconMask: true,
                        iconCls: 'fa fa-exclamation-triangle vuotNguong',
                        style: 'border-color: #ffffff;font-size: 16px;color:orange',
                        padding: '7 0',
                        tooltip: 'Số vật tư hiện tại lớn hơn định mức tồn max'
                    }, {
                        iconMask: true,
                        iconCls: 'fa fa-exclamation-triangle duoiNguong',
                        style: 'border-color: #ffffff;font-size: 16px;',
                        padding: '7 0',
                        tooltip: 'Số vật tư hiện tại nhỏ hơn định mức tồn min'
                    }, {
                        iconMask: true,
                        iconCls: 'fa fa-check-circle-o trongNguong',
                        style: 'border-color: #ffffff;font-size: 16px;',
                        padding: '7 0',
                        tooltip: 'Số vật tư hiện tại nằm trong định mức tồn'
                    }, { xtype: 'tbfill' }, {
                        xtype: "pagingtoolbar",
                        displayInfo: true,
                        //bind: {
                        //    store: "{storeQuanLyKhoVatTu}"
                        //},
                        //style: "padding: 0px !important",
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
                    }]
                }],
                listeners: {
                    //cellclick: 'onCellClick'
                }
            },
            {
                layout: 'fit',
                reference: 'pnlMap',
                hidden: true,
                flex: 1,
                html: '<div id="mapsodokho" style="width:100%;height:100%"></div>',
                title: 'Map',
                listeners: {
                    resize: function (panel, width, height, oldWidth, oldHeight, eOpts) {
                        if (map == undefined || map == null) return;
                        map.updateSize();
                    }
                },
                preventHeader: true
            }]
        }]
    }],
    listeners: {
        afterrender: 'onAfterrender'
    }
});

Ext.define('Admin.view.quanlykhovattu.dsQuanLyKhoVatTuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cquanlykhovattu',
    references: null,
    storeinfo: null,
    dataFields: null,
    init: function () {
        var me = this;
        me.callParent(arguments);
    },

    onAfterrender: function () {
        var me = this;
        me.references = me.getReferences();
        me.storeinfo = me.getViewModel().storeInfo;
        var recordTK = me.getViewModel().data.recordTK;
        recordTK.set('congthuc', '');
        me.loadKho();
    },

    loadKho: function () {
        var me = this;
        var recordTK = me.getViewModel().data.recordTK;
        var store = me.storeinfo.storeKho;
        var url = "api/Storeroom?page=1&start=0&limit=25";
        store.proxy.api.read = url;
        store.load({
            scope: this,
            callback: function (records, operation, success) {
                if (records.length > 0) {
                    var idUrl = app.mUtils.getUrlVars()["storeroomCode"];
                    if (idUrl && idUrl != "") {
                        var maKho = idUrl.split("#");
                        me.references.cbkho.setValue(maKho);
                        recordTK.set('storeroomId', maKho);
                    }
                    else
                        recordTK.set('storeroomId', records[0].get('id'));
                    me.references.btnQuanLyDinhMuc.setDisabled(false);
                    me.references.btnTonKho.setDisabled(false);
                    me.loadChungLoai(true);
                }
            }
        });
    },

    loadChungLoai: function (loaddata) {
        var me = this;
        //Lấy các loại vật tư
        var filter = [];
        //if (me.references.txtSeachNhomVatTu.getValue()) {
        //    filter.push({ name: "filter", value: me.references.txtSeachNhomVatTu.getValue() });
        //}
        var txtSearch = me.references.txtSeachNhomVatTu.getValue();
        //var query = abp.utils.buildQueryString(filter);
        var store = me.storeinfo.storeNhomVatTu;
        var url = "api/MaterialGroup?page=1&start=0&limit=25&keyword=" + txtSearch;

        store.proxy.api.read = url;
        store.proxy.pageParam = undefined;
        store.proxy.limitParam = undefined;
        store.proxy.startParam = undefined;
        me.getView().setLoading(true);
        store.load({
            params: {
                skipCount: 0,
                maxResultCount: store.pageSize
            },
            scope: this,
            callback: function (records, operation, success) {
                if (records.length > 0) {
                    me.getView().setLoading(false);
                    var data = {
                        id: 0,
                        qrCode: "Tất cả",
                        displayName: "Tất cả"
                    };
                    store.insert(0, data);
                    if (loaddata) {
                        setTimeout(function () {
                            me.references.gridNhomVatTu.getSelectionModel().select(0);
                            me.onTimKiem();
                        }, 500);
                    }
                }
            }
        });
    },

    onChangeTextSearchNhomVT: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.loadChungLoai(false);
        }
    },

    onXoa: function () {
        var me = this;
        var storeKho = me.storeinfo.storeQuanLyKhoVatTu;
        var rowselect = me.references.grvDSChungLoaiTaiSan.getSelection();
        if (rowselect.length == 0) return;
        if (rowselect[0].get('quantity') > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Không thể xoá vật tư này',
            });
            return
        }

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
                me.references.grvDSChungLoaiTaiSan.setLoading(true);
                var url = "api/Material/materialStoreroom?storeroomId=" + rowselect[0].get('storeroomId') + "&materialId=" + rowselect[0].get('materialId');
                app.mUtils.fnDELETEAjax(url, function (response) {
                    if (response == 1) {
                        Swal.fire(
                            'Deleted!',
                            '"Xoá dữ liệu thành công',
                            'success'
                        )
                        me.references.grvDSChungLoaiTaiSan.setLoading(false);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Xoá dữ liệu thất bại!',
                        })
                        me.references.grvDSChungLoaiTaiSan.setLoading(false);
                    }
                    me.onTimKiem()
                })
            }
        })

    },

    //onCellClick: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    //    if (e.target.className == 'fa fa-info-circle') {
    //        if (record.get('soluong') == null || record.get('soluong') == 0) {
    //            $.toast({ heading: app.localize('Notifications'), text: app.localize('KhoVatTu_SoLuongPhai') + ' > 0.', position: 'top-center', icon: 'info', hideAfter: 2400, stack: 6 });
    //            return;
    //        }
    //        var wnd = Ext.create('Admin.view.quanlykhovattu.CNChiTietVatTu', {
    //            title: app.localize("KhoVatTu_DanhSachChiTietVatTu") + ' - <b style="font-size: 14px;">' + record.get('tenchungloaitaisan') + '</b>',
    //            viewModel: {
    //                data: {
    //                    recordVatTu: record,
    //                    fnSauKhiChon: function (listChiTietVatTu) {
    //                    }
    //                }
    //            }
    //        });
    //        wnd.show();
    //    } else if (e.target.className == 'fa fa-eye') {
    //        var wnd = Ext.create('Admin.view.quanlykhovattu.cnLichSuVatTuTrongKho', {
    //            title: app.localize("KhoVatTu_LichSuVatTu") + ': <b style="font-size: 14px;">' + record.get('vatTu') + "/" + record.get('tenVatTu') + '-(' + record.get('tenKho') + ')</b>',
    //            viewModel: {
    //                data: {
    //                    recordVatTu: record,
    //                    fnSauKhiChon: function (listChiTietVatTu) {
    //                    }
    //                }
    //            }
    //        });
    //        wnd.show();
    //    }
    //},

    clickThemChungLoai: function () {
        var me = this;
        var record = me.references.gridNhomVatTu.getSelectionModel().getSelection();
        var dsKho = me.references.cbkho;
        var rowselect = dsKho.getSelection();
        console.log(rowselect)
        var makho = rowselect.data.id;
        var wnd = Ext.create('Admin.view.quanlykhovattu.cnThemChungLoaiVaoKho', {
            title: 'Thêm chủng loại vào' + ' ' + rowselect.data.displayName,
            viewModel: {
                data: {
                    store: me.storeinfo.storeQuanLyKhoVatTu,
                    gridDSChungLoai: dsKho,
                    makho: makho,
                    recordNhomCL: record,
                    recordSekecKho: dsKho.getSelection(),
                    fnSauKhiLoad: function (record) {
                        me.onloadDanhSachVatTu();
                    }
                }
            }
        });
        wnd.show();
    },

    onQuanlyTonKho: function () {
        var me = this;
        var recordKho = me.references.cbkho.getSelection();
        var wnd = Ext.create('Admin.view.danhmuckho.DSTonKho', {
            title: "Quản lý tồn kho" + ": " + recordKho.get('displayName'),
            viewModel: {
                data: {
                    recordKho: recordKho,
                    fnSauKhiLoad: function () {
                    }
                }
            }
        });
        wnd.show();
    },

    onQuanLyDinhMuc: function () {
        var me = this;
        var recordKho = me.references.cbkho.getSelection();
        var wnd = Ext.create('Admin.view.danhmuckho.CNQuanLyDinhMucVatTu', {
            title: "Quản lý định mức" + ' <b style="font-size: 15px;">' + recordKho.get('displayName') + "</b>",
            maKho: recordKho.data.makho,
            viewModel: {
                data: {
                    recordKho: recordKho,
                    fnSauKhiLoad: function () {
                    }
                }
            }
        });
        wnd.show();
    },

    onChangeTextSearch: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onTimKiem();
        }
    },

    onTimKiem: function () {
        var me = this;
        me.onloadDanhSachVatTu();
    },

    onloadDanhSachVatTu: function () {
        var me = this;
        var filter = {};
        var gridNhomVatTu = me.references.gridNhomVatTu;
        var selectNhom = gridNhomVatTu.getSelectionModel().getSelection();
        var recordTK = me.getViewModel().data.recordTK;
        var recordKho = me.references.cbkho.getSelection();
        if (recordKho.data.id != null) {
            filter.storeroomId= recordKho.get('id');
        }
        if (selectNhom.length > 0 && selectNhom[0].get('id') > 0) {
            filter.materialGroupId = selectNhom[0].get('id') 
        }
        if (recordTK.get('materialCode')) {
            filter.materialCode = recordTK.get('materialCode');
        }
        if (recordTK.get('displayName')) {
            filter.displayName = recordTK.get('displayName');
        }
        if (recordTK.get('quantity')) {
            filter.quantity = recordTK.get('Quantity');
        }
        if (recordTK.get('congthuc')) {
            filter.operator = recordTK.get('congthuc');
        }
        //if (recordTK.get('congthuc')) {
        //    filter.push({ name: "paramValue", value: recordTK.get('congthuc') });
        //}
        //if (recordTK.get('soluong')) {
        //    filter.push({ name: "soLuong", value: recordTK.get('soluong') });
        //}
        var store = me.storeinfo.storeQuanLyKhoVatTu;
        var query = app.mUtils.fnBuildQueryString(filter);
        var url = "api/Material/materialStoreroom/paging?page=1&start=0&limit=25&" + query;
        me.getView().setLoading(true);
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
                me.getView().setLoading(false);
                if (records == null) {
                    store.removeAll();
                }
            }
        });
    },

    onTimMoi: function () {
        var me = this;
        var recordTK = me.getViewModel().data.recordTK;
        recordTK.set('maVatTu', "")
        recordTK.set('tenVatTu', "")
        //recordTK.kho
        var cbkho = me.references.cbkho.getStore();
        var dataItem = cbkho.data.items;
        if (dataItem.length > 0) {
            recordTK.set('kho', dataItem[0].get('id'));
        }
        me.references.cbCongThuc.setValue("");
        recordTK.set('soluong', null);
        me.onloadDanhSachVatTu();
    },

    onChangeNhomTS: function (obj, records, eOpts) {
        var me = this;
        me.onloadDanhSachVatTu(records.get('id'));
        var record = me.references.gridNhomVatTu.getSelectionModel().getSelection();
        var recordKho = me.references.cbkho.getSelection();
        me.references.btnThemChungLoai.setDisabled(true);
        if (recordKho.data.id != null && record[0].data.id != 0) {
            me.references.btnThemChungLoai.setDisabled(false);
        }
    },

    onChangeKho: function (obj, newValue, oldValue, eOpts) {
        var me = this;
        if (oldValue != null) {
            me.onTimKiem();
        }
    }
});
