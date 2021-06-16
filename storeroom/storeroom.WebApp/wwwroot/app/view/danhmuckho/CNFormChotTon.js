Ext.define('Admin.view.danhmuckho.CNFormChotTonModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.danhmuckho-mcnformchotton',
    data: {
        selectionChuaChot: null,
        fnSauKhiLoad: null,
        name: null,
        recordKho: null,
        dataExcel: null
    },
    stores: {
        storeChuaChot: { type: 'stondauky' },
        storeChotTonKho: { type: 'stondauky' }
    }
});

Ext.define('Admin.view.danhmuckho.CNFormChotTon', {
    extend: 'Ext.window.Window',
    requires: [
        'Admin.view.danhmuckho.CNFormChotTonController',
        'Admin.view.danhmuckho.CNFormChotTonModel'
    ],
    controller: 'danhmuckho-ccnformchotton',
    viewModel: {
        type: 'danhmuckho-mcnformchotton'
    },
    width: 1050,
    height: 500,
    modal: true,
    title: 'Chốt tồn đầu kỳ',
    iconCls: 'x-fa fa-list',
    layout: 'fit',
    items: [{
        xtype: 'panel',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'tabpanel',
            reference: 'tabDSTonKho',
            ui: 'light',
            flex: 1,
            items: [{
                xtype: 'grid',
                reference: 'gridChuaChotTonKho',
                bind: {
                    store: '{storeChuaChot}',
                    selection: '{selectionChuaChot}'
                },
                flex: 1,
                plugins: [{
                    ptype: 'cellediting',
                    clicksToMoveEditor: 1,
                    autoCancel: false
                }],
                selModel: {
                    selType: 'checkboxmodel'
                },
                ui: 'light',
                title: 'Chốt tồn đầu kỳ',
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
                    dataIndex: 'materialCode',
                    cellWrap: true,
                    width: 120,
                    text: 'Mã',
                    readOnly: true
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'displayName',
                    width: 200,
                    cellWrap: true,
                    text: 'Tên',
                    readOnly: true
                }, {
                    xtype: 'datecolumn',
                    text: 'Thời điểm',
                    dataIndex: 'date',
                    style: 'text-align:center',
                    align: 'center',
                    width: 100,
                    format: 'd/m/Y',
                    editor: {
                        xtype: 'datefield',
                        name: 'thoidiem',
                        format: 'd/m/Y',
                        allowBlank: false
                    }
                }, {
                    xtype: 'gridcolumn',
                    text: 'Giá trị',
                    dataIndex: 'price',
                    style: 'text-align:center',
                    align: 'right',
                    sortable: true,
                    renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                        if (value != undefined && value != null) {
                            return app.mUtils.fnFormatCurrency(value, 2);
                        }
                    },
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;'
                    },
                    width: 110
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'unitName',
                    width: 100,
                    text: 'Đơn vị tính'
                }, {
                    text: 'Số lượng',
                    columns: [{
                        xtype: 'gridcolumn',
                        text: 'Lý thuyết',
                        dataIndex: 'quantity',
                        style: 'text-align:center',
                        align: 'right',
                        sortable: true,
                        width: 120,
                        renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                            if (value != undefined && value != null) {
                                return app.mUtils.fnFormatCurrency(value, 2);
                            }
                        }
                    }, {
                        xtype: 'gridcolumn',
                        text: 'Thực tế',
                        dataIndex: 'quantityReal',
                        style: 'text-align:center',
                        align: 'right',
                        sortable: true,
                        renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                            if (value != undefined && value != null) {
                                return app.mUtils.fnFormatCurrency(value, 2);
                            }
                        },
                        editor: {
                            xtype: 'currencyfield',
                            fieldStyle: 'text-align: right;'
                        },
                        width: 110
                    }]
                }, {
                    xtype: 'gridcolumn',
                    text: 'Lý do',
                    editor: {
                        xtype: 'textfield'
                    },
                    dataIndex: 'description',
                    sortable: true,
                    flex: 1
                }, {
                    xtype: 'actioncolumn',
                    header: '',
                    align: 'center',
                    hidden: true,
                    width: 40,
                    items: [{
                        icon: '/gCitywork/gFM/images/delete1.gif',
                        tooltip: 'Xóa',
                        handler: function (grid, rowIndex, colIndex, item, e, record) {
                            if (!confirm(app.localize('CMMSKho_ChotTonXoaVT'))) return;
                            grid.store.remove(record);
                            var store = grid.getStore();
                            grid.getStore().loadData(store.data.items);
                        }
                    }]
                }],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 100
                        },
                        items: [{
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            flex: 1,
                            defaults: {
                                xtype: 'textfield',
                                labelWidth: 100,
                                margin: '0 0 2 0'
                            },
                            items: [{
                                fieldLabel: 'Chọn kỳ',
                                xtype: 'datefield',
                                format: 'd/m/Y',
                                labelAlign: 'right',

                                value: new Date(),
                                reference: 'dateNam',
                                labelWidth: 100,
                                labelAlign: 'right'

                            }, {
                                xtype: 'combo',
                                queryMode: 'local',
                                displayField: 'text',
                                valueField: 'value',
                                hidden: true,
                                reference: 'cbNam',
                                fieldLabel: 'chọnkyf',
                                lableAlign: 'right',
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['text', 'value']
                                }),
                                flex: 2
                            }, {
                                xtype: 'button',
                                name: 'btnXemTonDauKy',
                                ui: 'soft-blue',
                                iconCls: 'fa fa-search-plus',
                                margin: '0 5 0 5',
                                text: 'Xem tồn đầu kỳ',
                                handler: 'onXemTonDauKy'
                            }]
                        }, {
                            xtype: 'component',
                            flex: 1
                        }]
                    }, {
                        xtype: 'textfield',
                        emptyText: 'Nhập tên vật tư, mã vật tư',
                        reference: 'txtSeach',
                        flex: 1,
                        listeners: {
                            change: 'onChangeTextSearch'
                        }
                    }]
                }],
                viewConfig: {
                    emptyText: 'Không co sduwx liệu'
                },
                buttons: [{
                    name: 'btnFromExcel',
                    reference: 'btnFromExcel',
                    iconCls: 'fa fa-file-excel-o',
                    hidden: true,
                    text: 'Nhập từ Excel',
                    //disabled: false,
                    tooltip: 'Nhập tồn từ excel',
                    handler: 'onNhapExcel'
                }, {
                    reference: 'btnDownloadExcelMau',
                    iconCls: 'fa fa-download',
                    hidden: true,
                    text: 'Tải file mẫu',
                    tooltip: 'Tải file mẫu excel',
                    handler: 'onDownloadExcel'
                }, {
                    xtype: 'tbfill'
                }, {
                    text: 'Xoá nhiều',
                    handler: 'onXoaNhieu',
                    iconCls: 'fa fa-minus-circle',
                    ui: 'soft-red',
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.Kho.Edit') || abp.auth.hasPermission('CMMS.Inventory.Kho.Manager')),
                    reference: 'onXoaNhieu',
                    bind: { disabled: '{!selectionChuaChot}' },
                    iconCls: 'fa fa-minus-circle'
                }, {
                    text: 'Lưu thông tin',
                    handler: 'clickThucHienChotKho',
                    ui: 'soft-blue',
                    reference: 'btnLuu',
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.Kho.Edit') || abp.auth.hasPermission('CMMS.Inventory.Kho.Manager')),
                    bind: { disabled: '{!selectionChuaChot}' },
                    iconCls: 'x-fa fa-floppy-o'
                }, {
                    text: 'Huỷ bỏ',
                    ui: 'soft-blue',
                    handler: function () {
                        this.up('window').close();
                    },
                    iconCls: 'fa fa-times'
                }]
            }],
            listeners: {
                tabchange: "onTabChange"
            }
        }]
    }],
    listeners: {
        afterRender: 'onAfterrender'
    }
});

Ext.define('Admin.view.danhmuckho.CNFormChotTonController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.danhmuckho-ccnformchotton',
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
        me.ref.dateNam.setValue(new Date(me.getViewModel().data.nam));
        //var dataNam = [];
        //for (var i = nam.getFullYear() + 1; i >= 2009; i--) {
        //    dataNam.push({ "text": i, "value": i });
        //}
        //var store = me.ref.cbNam.getStore();
        //store.loadData(dataNam);
        //me.ref.cbNam.setValue(me.getViewModel().data.nam);
        me.onXemTonDauKy();
    },

    onXemTonDauKy: function () {
        this.fnTonDauKy();
    },

    onXoaNhieu: function () {
        var me = this;
        var tabacrtive = me.ref.tabDSTonKho.getActiveTab();
        if (tabacrtive.reference == "gridChuaChotTonKho") {
            abp.message.confirm(
                "Những vật tư đã chọn",
                app.localize('ExtgDataManagerAreYouSure'),
                function (isConfirmed) {
                    if (isConfirmed) {
                        var selectDSChuaChotTon = tabacrtive.getSelection();
                        for (var i = 0; i < selectDSChuaChotTon.length; i++) {
                            me.storeinfo.storeChuaChot.remove(selectDSChuaChotTon[i])
                        }
                    }
                }
            );
        }
    },

    onTabChange: function (obj, newTab, oldTab) { },

    fnTonDauKy: function () {
        var me = this;
        var nodesSelect = me.getViewModel().data.recordKho;
        var store = me.storeinfo.storeChuaChot;
        // store.loadData(dataDSCHungLoai);
        store.on('datachanged', function (store) {
            me.ref.btnFromExcel.setDisabled(store.getRange().length == 0);
        });
        var dataExcel = me.getViewModel().data.dataExcel;
        //  storeDC.loadData(dataDSCHungLoai);
        /*  var filter = []
          filter.push({ name: "maKho", value: nodesSelect.get('id') });
          filter.push({ name: "thoiDiem", value: Ext.Date.format(me.ref.dateNam.getValue(), 'Y/m/d') });
          var query = abp.utils.buildQueryString(filter);*/
        var url = "api/Material/materialStoreroom/paging?page=1&start=0&limit=25&storeroomId=" + nodesSelect.get('id');
        store.proxy.api.read = url;
        store.pageSize = 10005;
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
                } else {
                    console.log(store.data.items)
                    for (var record of store.data.items) {
                        console.log(record);
                        record.set('date', Ext.Date.format(me.ref.dateNam.getValue(), 'Y/m/d'))
                        record.set('quantityReal', record.get('quantity'))
                    }
                    if (dataExcel)
                        for (var i = 0; i < dataExcel.length; i++) {
                            var recordsCL = store.queryBy(function (record, id) {
                                return (record.get('materialCode') == dataExcel[i].ma);
                            });
                            if (recordsCL.items.length > 0) {
                                var r = recordsCL.items[0];
                                r.data['quantityReal'] = dataExcel[i].soLuongTon;
                                r.commit(r);
                            }
                        }
                    me.ref.gridChuaChotTonKho.getView().refresh();
                }
            }
        });
    },

    clickThucHienChotKho: function () {
        var me = this;
        var resultDataCT = me.ref.gridChuaChotTonKho.getSelection();
        var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
        var arrValue = [];
        var data = {};
        var checkGiaTri = "";
        for (var i = 0; i < resultDataCT.length; i++) {
            //if (resultDataCT[i].get('giaTri') == null) {
            //    if (checkGiaTri != "") checkGiaTri += ","
            //    checkGiaTri += resultDataCT[i].get('tenVatTu');
            //    continue;
            //}
            var dataObj = {
                MaKho: resultDataCT[i].get('maKho'),
                GiaTri: resultDataCT[i].get('giaTri'),
                materialId: resultDataCT[i].get('materialId'),
                materialCode: resultDataCT[i].get('materialCode'),
                ThoiDiem: Ext.Date.format(new Date(resultDataCT[i].get('thoiDiem')), "Y/m/d H:i:s"),
                quantityLT: resultDataCT[i].get('quantity'),
                quantityTT: resultDataCT[i].get('quantityReal'),
                description: resultDataCT[i].get('description')
            }
            arrValue.push(dataObj)
        }
        //if (checkGiaTri != "") {
        //    abp.notify.info(app.localize('KhoVatTu_TonThongBaoGia', checkGiaTri));
        //    return
        //}
        data.storeroomId = me.getViewModel().data.recordKho.get('id');
        data.date = Ext.Date.format(me.ref.dateNam.getValue(), "Y-m-d") || me.ref.dateNam.getValue();
        data.createdBy = 'Quản trị';
        data.inventoryDetails = arrValue;
        me.getView().setLoading(true);
        var url = "api/Storeroom/Inventory"
        app.mUtils.fnPOSTAjax(url, data, function (response) {
            me.getView().setLoading(false);
            if (response == -1) {
                Swal.fire({
                    icon: 'info',
                    title: 'Thông báo',
                    text: 'Ngày hôm nay đã chốt tồn kho, không thể chốt tồn thêm!',
                })
                return;
            }
            toastr.success('Chốt tồn kho thành công');
            if (fnSauKhiLoad)
                fnSauKhiLoad()
            me.getView().close();
        })

    },

    onChangeTextSearch: function (button) {
        var me = this;
        var text = me.ref.txtSeach.getValue();
        var store = me.storeinfo.storeChuaChot;
        store.clearFilter();
        store.filter([{
            filterFn: function (record) {
                var tenvattu = app.gplatformutils.FormatString(record.get('tenVatTu').toLowerCase());
                var mavattu = app.gplatformutils.FormatString(record.get('vatTu').toLowerCase());
                var newValueF = app.gplatformutils.FormatString(text.toLowerCase());
                if (tenvattu.indexOf(newValueF) >= 0 || mavattu.indexOf(newValueF) >= 0)
                    return true;
                else return false;
            },
            anyMatch: true,
            caseSensitive: false
        }]);
    },

    onNhapExcel: function () {
        var me = this;
        var wd = Ext.create('Admin.view.danhmuckho.CNNhapSoLuongTonExcel', {
            hideColCheck: true,
            fnSauKhiSave: function (dataExcel, storeAX) {
                var rows = storeAX.getRange();
                var fieldAXMaChungLoai = '', fieldAXSLLyThuyet = '', fieldAXSLThuc = '';
                for (var i = 0; i < rows.length; i++) {
                    var truongNguon = rows[i].data.truongnguon;
                    if (truongNguon == app.localize('KhoVatTu_MaVatTu'))
                        fieldAXMaChungLoai = rows[i].data.truongdich;
                    if (truongNguon == app.localize('KhoVatTu_SLTonLyThuyet'))
                        fieldAXSLLyThuyet = rows[i].data.truongdich;
                    if (truongNguon == app.localize('KhoVatTu_SLTonThuc'))
                        fieldAXSLThuc = rows[i].data.truongdich;
                };
                var storeExcel = Ext.create('Ext.data.Store', {
                    fields: [fieldAXMaChungLoai, fieldAXSLLyThuyet, fieldAXSLThuc],
                    data: dataExcel
                })
                var rowChuaChot = me.ref.gridChuaChotTonKho.getStore().getRange();
                for (var i = 0; i < rowChuaChot.length; i++) {
                    var maCL = rowChuaChot[i].data.machungloaitaisan;
                    var recordsCL = storeExcel.queryBy(function (record, id) {
                        return (record.get(fieldAXMaChungLoai) == maCL);
                    });
                    if (recordsCL.items.length > 0) {
                        var r = recordsCL.items[0];
                        rowChuaChot[i].data.machungloaitaisan = r.data[fieldAXMaChungLoai];
                        rowChuaChot[i].data.soluongtonkholt = r.data[fieldAXSLLyThuyet];
                        rowChuaChot[i].data.soluongtonkhothuc = r.data[fieldAXSLThuc];
                    }
                }
                me.ref.gridChuaChotTonKho.getView().refresh();
                $.toast({ heading: 'Thông báo', text: 'Đã cập nhật thành công số lượng chủng loại tồn tại trong kho!', position: 'top-center', icon: 'info', hideAfter: 5400, stack: 20 });
                wd.close();
            }
        });
        wd.show();
    },

    onDownloadExcel: function () {
        window.open("gCitywork/gEAM/gEAMInventorry/resources/excel/01_ChotTonKho.xls", "_blank")
    }
});