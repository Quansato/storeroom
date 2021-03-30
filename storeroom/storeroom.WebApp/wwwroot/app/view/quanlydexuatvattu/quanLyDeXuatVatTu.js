Ext.define('Admin.view.quanlydexuatvattu.quanLyDeXuatVatTuModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.quanlydexuatvattu',
    data: {
        recordTKXK: Ext.create('Ext.data.Model', {}),
        selectionDeXuat: null
    },
    stores: {
        storeKhoNhap: { type: 'skho', pageSize: 1000 },
        storePhieuXuatKho: { type: 'sphieunhapxuat' },
        storePhieuXuatChiTiet: { type: 'sphieunhapxuatchitiet' }
    }
});

Ext.define('Admin.view.quanlydexuatvattu.quanLyDeXuatVatTu', {
    extend: 'Ext.panel.Panel',
    xtype: 'quanLyDeXuatVatTu',
    requires: [
        'Admin.view.quanlydexuatvattu.quanLyDeXuatVatTuController',
        'Admin.view.quanlydexuatvattu.quanLyDeXuatVatTuModel',
        'Ext.grid.feature.Summary'
    ],
    controller: 'quanlydexuatvattu',
    viewModel: {
        type: 'quanlydexuatvattu'
    },
    bodyStyle: { 'background-color': '#f6f6f6', 'padding': '0px 0px 0px 5px' },
    height: window.innerHeight - 65,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'panel',
        flex: 1,
        title: 'Phiếu đề xuất vật tư',
        iconCls: 'fa fa-th-list',
        ui: 'light',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'grid',
            layout: 'fit',
            ui: 'light',
            reference: 'dsPhieuXuatKho',
            flex: 1,
            bind: {
                store: '{storePhieuXuatKho}',
                selection: '{selectionDeXuat}'
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
                align: 'center',
                width: 40,
                //renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                //    if (record.get('soLuongXuatKho') > 0) {
                //        return '<a style="color:blue;cursor: pointer;" title="' + app.localize('CMMSDMKhoThongTinPhieuXuat') + '"><span class="fa fa-eye"></span></a>';
                //    }
                //    return "";
                //}
            }, {
                xtype: 'datecolumn',
                text: 'Ngày đề xuất',
                dataIndex: 'ngayHachToan',
                width: 120,
                align: 'center',
                style: 'text-align:center',
                format: 'd/m/Y'
            }, {
                xtype: 'gridcolumn',
                text: 'Số phiếu',
                dataIndex: 'soPhieu',
                width: 150
            }, {
                xtype: 'gridcolumn',
                text: 'Người đề xuất',
                dataIndex: 'tenNguoiDeXuat',
                width: 180
            },
            {
                xtype: 'gridcolumn',
                text: 'Người duyệt',
                dataIndex: 'tenNguoiPheDuyet',
                width: 180
            }, {
                xtype: 'gridcolumn',
                text: 'Lý do',
                dataIndex: 'lyDo',
                flex: 1
            }, {
                header: 'Trạng thái',
                dataIndex: 'trangThai',
                style: 'text-align:center',
                width: 100,
                //renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                //    if (value == null || value == 0) {
                //        return '<div style="float: none;min-width:90px;" class="status assignment metadata-cell unassigned">' + app.localize('CMMSDMKhoTrangThaiDuyetChoDuyet') + '</div>'
                //    } else if (value == 1) {
                //        return '<div style="float: none;min-width:90px;" class="status assignment metadata-cell completed">' + app.localize('CMMSDMKhoTrangThaiDuyetDaDuyet') + '</div>'
                //    } else if (value == 2) {
                //        return '<div style="float: none;min-width:90px;" class="status assignment metadata-cell khongduyet">' + app.localize('CMMSDMKhoTrangThaiDuyetKhongDuyet') + '</div>'
                //    } else if (value == 3) {
                //        return '<div style="float: none;min-width:90px;" class="status assignment metadata-cell dong">' + app.localize('CMMSDMKhoTrangThaiPhieuDong') + '</div>'
                //    }
                //}
            }],
            viewConfig: {
                emptyText: 'Chưa có dữ liệu'
            },
            //listeners: {
            //    selectionchange: 'onChangeGridPhieuXuat',
            //    cellclick: 'cellKho'
            //},
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                padding: 0,
                style: {
                    borderTop: 'solid 1px #d0d0d0 !important'
                },
                items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    flex: 1,
                    combineErrors: true,
                    defaults: {
                        margin: '5 0 0 0',
                        labelAlign: 'right'
                    },
                    items: [{
                        xtype: 'combo',
                        reference: 'cbkhoDX',
                        bind: {
                            store: '{storeKhoNhap}',
                            value: '{recordTKXK.kho}'
                        },
                        labelWidth: 110,
                        fieldLabel: 'Kho',
                        queryMode: 'local',
                        displayField: 'moTa',
                        valueField: 'id',
                        forceSelection: true,
                        editable: false,
                        flex: 1
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Số phiếu',
                        bind: '{recordTKXK.sophieu}',
                        labelWidth: 100,
                        flex: 1,
                        cls: "EnterToTab",
                        listeners: {
                            specialkey: 'specialkey'
                        }
                    }, {
                        xtype: 'combo',
                        fieldLabel: 'Trạng thái',
                        labelWidth: 105,
                        width: 245,
                        displayField: 'name',
                        bind: '{recordTKXK.trangthai}',
                        valueField: 'value',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [{ value: "tatca", name: 'Tất cả' },
                            { value: "0", name: 'Chờ duyệt' },
                            { value: "1", name: 'Đã duyệt' },
                            { value: "2", name: 'Từ chối' }]
                        }),
                        triggerAction: 'all',
                        queryMode: 'local',
                        editable: false
                    }, {
                        //margin: '5 0 0 5',
                        //width: 200,
                        //xtype: 'component',
                        //bodyStyle: { 'background-color': '#f6f6f6' },
                        //html: '<table  id="DeXuatVatTu_tbldaterange" class="ID-view _GAux" style="margin-top:0px;margin-bottom:5px;width:100%">' +
                        //    '	<tbody>' +
                        //    '    <tr>' +
                        //    '        <td class="_GAGO">' +
                        //    '           <div id="DeXuatVatTu_reportrange" style="background: #fff; cursor: pointer; padding: 0px 10px;" class="pull-right"><i class="glyphicon glyphicon-calendar fa fa-calendar" style="margin-right: 5px;"></i><span></span></div>' +
                        //    '         </td>' +
                        //    '    </tr>' +
                        //    ' </tbody>' +
                        //    '</table>',
                        //border: false
                        xtype: 'component',
                        html: '<div id="reportrange" style="background: #fff; cursor: pointer; padding: 8px 10px; border: 1px solid #ccc; width: 200px;height:30px">' +
                            '<i class="fa fa-calendar"></i>&nbsp;' +
                            '<span></span>' +
                            '</div>',
                        margin: '5 0 0 5',
                        listeners: {
                            afterRender: 'onRenderPicker'
                        }
                    }, {
                        margin: '5 0 5 5',
                        xtype: 'button',
                        text: 'Tìm',
                        iconCls: 'x-fa fa-search',
                        handler: 'onTimKiemXuatKho'
                    }]
                }]
            }]
        }, {
            xtype: 'grid',
            title: 'Danh sách vật tư',
            iconCls: 'fa fa-list-alt',
            ui: 'light',
            style: 'border-top: 1px solid #d0d0d0;',
            flex: 1,
            features: [{
                ftype: 'summary',
                dock: 'bottom'
            }],
            bind: {
                store: '{storePhieuXuatChiTiet}',
                selection: '{selectionPhieuNhapXuatChiTiet}'
            },
            layout: 'fit',
            columns: [{
                xtype: 'rownumberer',
                text: '#',
                width: 40,
                align: 'center'
            }, {
                header: 'Mã- Tên',
                dataIndex: 'tenVatTu1',
                cellWrap: true,
                minWidth: 180,
                flex: 1,
                summaryType: 'count',
                //summaryRenderer: function (value, summaryData, dataIndex) {
                //    return ((value === 0 || value > 1) ? '(' + value + ' ' + app.localize('KhoVatTu_VatTu') + ')' : '(1 ' + app.localize('KhoVatTu_VatTu') + ')');
                //}
            }, {
                text: 'Đơn vị tính',
                dataIndex: 'donViTinh',
                align: 'left',
                border: 1,
                style: 'text-align:center',
                width: 110
            }, {
                text: 'Số lượng',
                columns: [{
                    text: 'Đề xuất',
                    dataIndex: 'soLuong',
                    border: 1,
                    style: 'text-align:center',
                    align: 'right',
                    width: 100,
                    renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                        if (value != undefined && value != null) {
                            return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                        }
                    },
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        if (value != undefined && value != null) {
                            return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                        }
                    }
                }, {
                    text: 'Phê duyệt',
                    dataIndex: 'soLuongThuc',
                    border: 1,
                    style: 'text-align:center',
                    align: 'right',
                    width: 105,
                    renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                        if (value != undefined && value != null) {
                            //return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                        }
                    },
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        if (value != undefined && value != null) {
                            //return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                        }
                    }
                }]
            }, {
                xtype: 'numbercolumn',
                text: 'Đơn giá',
                dataIndex: 'donGia',
                style: 'text-align:center',
                align: 'right',
                border: 1,
                width: 100,
                renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                    if (value != undefined && value != null) {
                        //return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                    }
                }
            }, {
                xtype: 'numbercolumn',
                text: 'Thành tiền',
                dataIndex: 'thanhTien',
                border: 1,
                style: 'text-align:center',
                align: 'right',
                width: 110,
                renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                    if (value != undefined && value != null) {
                        return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                    }
                },
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    if (value != undefined && value != null) {
                        return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                    }
                }
            }, {
                text: 'Ghi chú',
                dataIndex: 'ghiChu',
                border: 1,
                width: 220
            }],
            viewConfig: {
                emptyText: 'Chưa có dữ liệu'
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                style: {
                    borderTop: 'solid 1px #d0d0d0 !important'
                },
                items: [{
                    xtype: 'button',
                    iconCls: 'fa fa-plus',
                    text: 'Thêm',
                    ui: 'soft-blue',
                    tooltip: 'Thêm',
                    handler: 'onThemPhieuDeXuat',
                    //bind: {
                    //    disabled: '{!recordTKXK.kho>0}'
                    //},
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.DeXuat.Manager'))
                }, {
                    xtype: 'button',
                    iconCls: 'fa fa-pencil',
                    reference: 'btnSuaPhieuDeXuat',
                    text: 'Sửa',
                    ui: 'soft-blue',
                    tooltip: 'Sửa',
                    handler: 'onSuaPhieuDeXuat',
                    //bind: {
                    //    disabled: ('{!selectionDeXuat}' && '{!recordTKXK.kho>0}')
                    //},
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.DeXuat.Manager'))
                }, {
                    xtype: 'button',
                    iconCls: 'fa fa-minus',
                    reference: 'btnHuyPhieuDeXuat',
                    text: 'Xoá',
                    //bind: {
                    //    disabled: '{!selectionDeXuat}'
                    //},
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.DeXuat.Manager')),
                    ui: 'soft-red',
                    tooltip: 'Xoá',
                    handler: 'onHuyPhieuDeXuat'
                }, {
                    xtype: 'button',
                    iconCls: 'fa fa-puzzle-piece',
                    text: 'Tiện ích',
                    ui: 'blue',
                    tooltip: 'Tiện ích',
                    menu: new Ext.menu.Menu({
                        items: [{
                            text: 'Chuyển trạng thái',
                            reference: 'btnChuyenTrangThaiDXVT',
                            iconCls: 'x-fa fa-plus',
                            //bind: {
                            //    hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuat.Manager'))
                            //},
                            ui: 'blue',
                            tooltip: 'Chuyển trạng thái',
                            handler: 'onChuyenTrangThai'
                        }, {
                            text: 'Phiếu xuất kho',
                            iconCls: 'x-fa fa-check-circle-o',
                            ui: 'blue',
                            bind: {
                                disabled: '{!recordTKXK.kho>0}' && '{selectionDeXuat.trangThai!=1}',
                                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager'))
                            },
                            disabled: true,
                            tooltip: 'Phiếu xuất kho',
                            reference: 'btnPhieuXuatKho',
                            //handler: 'onPhieuXuatKho'
                        }, {
                            text: 'In phiếu',
                            iconCls: 'x-fa fa-print',
                            ui: 'blue',
                            bind: {
                                disabled: '{!recordTKXK.kho>0}' && '{selectionDeXuat.trangThai!=1}',
                                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.DeXuat.Manager'))
                            },
                            tooltip: 'In phiếu',
                            reference: 'btnInPhieuDXVT',
                            handler: 'onInPhieuXuat'
                        }, {
                            text: 'Tìm phiếu đóng',
                            iconCls: 'x-fa fa-search',
                            ui: 'blue',
                            tooltip: 'Tìm phiếu đóng',
                            handler: 'onTimPhieuDeXuat'
                        }]
                    })
                }, {
                    width: 20,
                    padding: '0 0 0 0',
                    height: 20,
                    margin: '0 5 0 5',
                    cls: 'TTPhieuCho',
                    tooltip: 'Phiếu chờ'
                }, {
                    width: 20,
                    height: 20,
                    padding: '0 0 0 0',
                    cls: 'TTPhieuDaDuyet',
                    margin: '0 5 0 0',
                    tooltip: 'Phiếu đã duyệt'
                }, {
                    width: 20,
                    padding: '0 0 0 0',
                    height: 20,
                    cls: 'TTPhieuKhongDuyet',
                    margin: '0 5 0 0',
                    tooltip: 'Từ chối'
                }, {
                    width: 20,
                    padding: '0 0 0 0',
                    height: 20,
                    cls: 'TTPhieuDeXuatHuy',
                    margin: '0 5 0 0',
                    tooltip: 'Phiếu đóng'
                }, '->', {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    bind: {
                        store: '{storePhieuXuatKho}'
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
            }]
        }]
    }],
    listeners: {
        afterRender: 'onAfterrender'
    }
});

Ext.define('Admin.view.quanlydexuatvattu.quanLyDeXuatVatTuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.quanlydexuatvattu',
    ref: null,
    storeinfo: null,
    dataFields: null,
    sDATE: null,
    eDATE: null,
    init: function () {
        var me = this;
        me.callParent(arguments);
    },

    onAfterrender: function () {
        var me = this;
        me.ref = me.getReferences();
        me.storeinfo = me.getViewModel().storeInfo;
        //var dStart = app.gplatformconsts.sDate;//moment().startOf('month');
        //var dEnd = app.gplatformconsts.eDate;//moment().endOf('month');
        //app.gplatformutils.createDateRange('DeXuatVatTu', me, dStart, dEnd, function () { me.onTimKiemXuatKho(); });
        //$('.daterangepicker').css('display', 'none');
        //me.loadKho();
    },

    onRenderPicker: function () {
        $(function () {

            var start = moment().subtract(29, "days");
            var end = moment();

            function cb(start, end) {
                $("#reportrange span").html(start.format("DD/MM/YYYY") + " - " + end.format("DD/MM/YYYY"));
            }

            $("#reportrange").daterangepicker({
                startDate: start,
                endDate: end,
                ranges: {
                    "Hôm nay": [moment(), moment()],
                    "Hôm qua": [moment().subtract(1, "days"), moment().subtract(1, "days")],
                    "7 ngày trước": [moment().subtract(6, "days"), moment()],
                    "30 ngày trước": [moment().subtract(29, "days"), moment()],
                    "Tháng này": [moment().startOf("month"), moment().endOf("month")],
                    "Tháng trước": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
                }
            }, cb);

            cb(start, end);

        });
    },


    //loadKho: function () {
    //    var me = this;
    //    var recordTK = me.getViewModel().data.recordTKXK;
    //    var store = me.storeinfo.storeKhoNhap;
    //    var url = abp.appPath + "api/services/app/CMMSKho/GetPermission";
    //    store.proxy.api.read = url;
    //    store.load({
    //        scope: this,
    //        callback: function (records, operation, success) {
    //            if (records.length > 0) {
    //                recordTK.set('kho', records[0].get('id'));
    //            }
    //            recordTK.set('tungay', app.gplatformutils.getstartDate());
    //            recordTK.set('denngay', app.gplatformutils.getendDate());
    //            recordTK.set('trangthai', 'tatca');
    //            me.onTimKiemXuatKho();
    //            var idUrl = app.gplatformutils.getUrlVars()["id"];
    //            if (idUrl && idUrl != "") {
    //                var maPDX = idUrl.split("#");
    //                if (maPDX.length > 0 && isNaN(parseInt(maPDX[0])) == false) {
    //                    //Xem chi tiết phiếu khi có id trên url
    //                    me.onChiTietPhieuDeXuat(maPDX[0]);
    //                }
    //            }
    //            me.getView().setLoading(false);
    //        }
    //    });
    //},

    //onTimKiemXuatKho: function () {
    //    var me = this;
    //    me.storeinfo.storePhieuXuatChiTiet.loadData([]);
    //    me.loadXuatKho();
    //},

    //specialkey: function (field, e) {
    //    var me = this;
    //    if (e.getKey() == e.ENTER) {
    //        me.loadXuatKho();
    //    }
    //},

    //onTimPhieuDeXuat: function () {
    //    var me = this;
    //    me.loadXuatKho(true)
    //},

    //loadXuatKho: function (phieudong) {
    //    var me = this;
    //    me.getViewModel().set("selectionDeXuat", null);
    //    var recordTKXK = me.getViewModel().data.recordTKXK;
    //    var filter = [{ name: 'phanLoai', value: 'dexuat' }];
    //    if (recordTKXK.get('sophieu')) {
    //        filter.push({ name: "filter", value: recordTKXK.get('sophieu') });
    //    }
    //    if (recordTKXK.get('kho')) {
    //        filter.push({ name: "maKhoXuat", value: recordTKXK.get('kho') });
    //    }
    //    if (!phieudong) {
    //        filter.push({ name: "TrangThaiDong", value: 3 });
    //        if (recordTKXK.get('trangthai') && recordTKXK.get('trangthai') != 'tatca') {
    //            filter.push({ name: "TrangThai", value: recordTKXK.get('trangthai') });
    //        }
    //    } else {
    //        filter.push({ name: "TrangThai", value: 3 });
    //    }
    //    var dStart = Ext.Date.format(new Date(me.sDATE), 'Y/m/d 00:00:00.000');
    //    var dEnd = Ext.Date.format(new Date(me.eDATE), 'Y/m/d 23:59:59.999');
    //    if (me.sDATE != "") {
    //        filter.push({ name: "ngayHachToanStart", value: dStart });
    //    }
    //    if (me.eDATE != "") {
    //        filter.push({ name: "ngayHachToanEnd", value: dEnd });
    //    }
    //    filter.push({ name: "sorting", value: "ngayHachToan desc" });
    //    var store = me.storeinfo.storePhieuXuatKho;
    //    var query = abp.utils.buildQueryString(filter);
    //    var url = abp.appPath + "api/services/app/CMMSKhoPhieuNhapXuat/GetAll" + query;
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
    //            if (records.length == 0) {
    //                store.removeAll();
    //                var storePhieuXuatChiTiet = me.storeinfo.storePhieuXuatChiTiet;
    //                storePhieuXuatChiTiet.removeAll();
    //            } else {
    //                me.ref.dsPhieuXuatKho.getSelectionModel().select(0);
    //                if (me.ref.dsPhieuXuatKho.getSelectionModel().getSelection().length > 0) {
    //                    me.loadChiTietPhieu(me.ref.dsPhieuXuatKho.getSelectionModel().getSelection()[0].data.id);
    //                }
    //            }
    //        }
    //    });
    //},

    //onChangeGridPhieuXuat: function (grid, selected, eOpts) {
    //    var me = this;
    //    me.ref.btnSuaPhieuDeXuat.setDisabled(true);
    //    me.ref.btnChuyenTrangThaiDXVT.setDisabled(true);
    //    me.ref.btnInPhieuDXVT.setDisabled(true);
    //    me.ref.btnHuyPhieuDeXuat.setDisabled(true);
    //    if (selected.length > 0) {
    //        me.ref.btnSuaPhieuDeXuat.setDisabled(false);
    //        me.ref.btnInPhieuDXVT.setDisabled(false);
    //        me.ref.btnChuyenTrangThaiDXVT.setDisabled(false);
    //        me.ref.btnHuyPhieuDeXuat.setDisabled(false);
    //        me.loadChiTietPhieu(selected[0].data.id);
    //        me.ref.btnSuaPhieuDeXuat.setText(app.localize('Edit'))
    //        me.ref.btnHuyPhieuDeXuat.setVisible(true);
    //        if (selected[0].get('trangThai') == 1) {
    //            me.ref.btnSuaPhieuDeXuat.setText(app.localize('CMMSCongViec_Xem'))
    //            me.ref.btnHuyPhieuDeXuat.setVisible(false);
    //        }

    //    }
    //},

    //cellKho: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    //    var me = this;
    //    if (e.target.className == 'fa fa-eye') {
    //        var storeKho = me.storeinfo.storeKhoNhap;
    //        var recordsCT = storeKho.queryBy(function (records, id) {
    //            return (records.get('id') == record.data.maKhoXuat);
    //        });
    //        var nodesSelect = recordsCT.items[0];
    //        var wnd = Ext.create('Admin.view.quanlydexuatvattu.DanhSachXuatKhoDeXuat', {
    //            title: app.localize("CMMSDMKhoThongTinPhieuXuat") + ': ' + nodesSelect.get('moTa'),
    //            viewModel: {
    //                data: {
    //                    record: record,
    //                    fnSauKhiLoad: function () { }
    //                }
    //            }
    //        });
    //        wnd.show();
    //    }
    //},

    //loadChiTietPhieu: function (maPhieu) {
    //    var me = this;
    //    var store = me.storeinfo.storePhieuXuatChiTiet;
    //    if (maPhieu == null || maPhieu == '') {
    //        store.loadData([]);
    //        return;
    //    }
    //    var filter = [{ name: 'maPhieu', value: maPhieu }];
    //    var query = abp.utils.buildQueryString(filter);
    //    var url = abp.appPath + "api/services/app/CMMSKhoPhieuNhapXuatChiTiet/GetAllByMaPhieu" + query;
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
    //        }
    //    });
    //},

    onThemPhieuDeXuat: function () {
        var me = this;
        var nodesSelect = me.ref.cbkhoDX.getSelection();
        var record = Ext.create('Admin.model.mPhieuNhapXuat');
        record.set('id', 0);
        //record.set('phanLoai', "dexuat");
        //record.set('ngayHachToan', new Date());
        //record.set('donViGiao', app.session.user.name);
        //record.set('nguoiGiao', abp.session.userId);
        //record.set('maKhoXuat', nodesSelect.data.id);
        //record.set('nguoiDeXuat', abp.session.userId);
        var title = 'Thêm phiếu đề xuất' /*+ ": " + nodesSelect.data.moTa*/;
        //var storeKho = app.gplatformutils.deepCloneStore(me.ref.cbkhoDX.getStore());
        var wnd = Ext.create('Admin.view.quanlydexuatvattu.CNDeXuatVatTu', {
            title: title,
            viewModel: {
                data: {
                    //storeKho: storeKho,
                    recordPhieu: record,
                    fnSauKhiLoad: function () {
                        //me.onTimKiemXuatKho();
                    }
                }
            }
        });
        wnd.show();
    },

    onChuyenTrangThai: function () {
        var me = this;
        var nodesSelect = me.ref.dsPhieuXuatKho.getSelectionModel().getSelection();
        var record = Ext.create('Admin.model.mKhoChuyenTrangThai');
        record.set('id', 0);
        //record.set('maPhieu', nodesSelect[0].data.id);
        //record.set('phanLoai', 'dexuat');
        //record.set('tenNguoiThucHien', app.session.user.name);
        //record.set('nguoiThucHien', app.session.user.id);
        //record.set('trangThaiCu', nodesSelect[0].data.trangThai == null || nodesSelect[0].data.trangThai == "" ? 0 : nodesSelect[0].data.trangThai);
        //var dataTT = [{ matrangthai: 3, tentrangthai: app.localize("CMMSDMKhoTrangThaiPhieuDong") }]
        //if (abp.auth.hasPermission('CMMS.Inventory.DeXuat.Manager')) {
        //    dataTT = [
        //        { matrangthai: 1, tentrangthai: app.localize("CMMSDMKhoTrangThaiDuyetDaDuyet") },
        //        { matrangthai: 2, tentrangthai: app.localize("CMMSDMKhoTrangThaiDuyetKhongDuyet") },
        //        { matrangthai: 3, tentrangthai: app.localize("CMMSDMKhoTrangThaiPhieuDong") },
        //        { matrangthai: 0, tentrangthai: app.localize("CMMSDMKhoTrangThaiDuyetChoDuyet") }
        //    ]
        //    if (nodesSelect[0].data.trangThai == 3) {
        //        dataTT.push({ matrangthai: 0, tentrangthai: app.localize("CMMSDMKhoTrangThaiDuyetChoDuyet") })
        //    }
        //}
        var title = 'Thay đổi trạng thái phiếu' /*+ ": " + nodesSelect[0].data.soPhieu + ")"*/;
        var wnd = Ext.create('Admin.view.quanlydonmuahang.CNThayDoiTrangThai', {
            title: title,
            viewModel: {
                data: {
                    //record: record,
                    //dataTT: dataTT,
                    fnSauKhiLoad: function () {
                        //me.onTimKiemXuatKho();
                    }
                }
            }
        });
        wnd.show();
    },

    //onChiTietPhieuDeXuat: function (id) {
    //    var me = this;
    //    var title = app.localize("CMMSDMKhoSuaPhieuDeXuat") + ": " + me.ref.cbkhoDX.getRawValue();
    //    var storeKho = app.gplatformutils.deepCloneStore(me.storeinfo.storeKhoNhap);
    //    var recordPhieu = Ext.create('Admin.model.mPhieuNhapXuat');
    //    abp.services.app.cMMSKhoPhieuNhapXuat
    //        .getDetail({ id: id })
    //        .done(function (result) {
    //            recordPhieu.data = result;
    //            if (result.ngayHachToan) {
    //                result.ngayHachToan = new Date(result.ngayHachToan);
    //            }
    //            recordPhieu.commit();
    //            var wnd = Ext.create('Admin.view.quanlydexuatvattu.CNDeXuatVatTu', {
    //                title: title,
    //                viewModel: {
    //                    data: {
    //                        storeKho: storeKho,
    //                        recordPhieu: recordPhieu,
    //                        fnSauKhiLoad: function () {
    //                            me.onTimKiemXuatKho();
    //                        }
    //                    }
    //                }
    //            });
    //            wnd.show();
    //        });
    //},

    //onSuaPhieuDeXuat: function () {
    //    var me = this;
    //    var nodesSelect = me.ref.cbkhoDX.getSelection();
    //    var title = app.localize("CMMSDMKhoSuaPhieuDeXuat") + ": " + nodesSelect.data.moTa;
    //    var record = me.ref.dsPhieuXuatKho.getSelectionModel().getSelection();
    //    var storeKho = app.gplatformutils.deepCloneStore(me.storeinfo.storeKhoNhap);
    //    var wnd = Ext.create('Admin.view.quanlydexuatvattu.CNDeXuatVatTu', {
    //        title: title,
    //        viewModel: {
    //            data: {
    //                storeKho: storeKho,
    //                recordPhieu: record[0],
    //                fnSauKhiLoad: function () {
    //                    me.onTimKiemXuatKho();
    //                }
    //            }
    //        }
    //    });
    //    wnd.show();
    //},

    //onHuyPhieuDeXuat: function () {
    //    var me = this;
    //    var grid = me.ref.dsPhieuXuatKho;
    //    var rowselected = grid.getSelectionModel().getSelection();
    //    var store = me.storeinfo.storePhieuXuatKho;
    //    abp.message.confirm(
    //        app.localize("CMMSDMKhoPhieuDeXuat") + " " + rowselected[0].data.soPhieu,
    //        app.localize('ExtgDataManagerAreYouSure'),
    //        function (isConfirmed) {
    //            if (isConfirmed) {
    //                _cMMSKhoPhieuNhapXuat.delete({ id: rowselected[0].get('id') }).done(function (result) {
    //                    me.onTimKiemXuatKho();
    //                    me.getView().setLoading(false);
    //                    abp.notify.success(app.localize('SavedSuccessfully'));
    //                }).fail(function (data) {
    //                    me.getView().setLoading(false);
    //                });
    //            }
    //        }
    //    );
    //},

    //onInPhieuXuat: function () {
    //    var me = this;
    //    var grid = me.ref.dsPhieuXuatKho;
    //    var rowselected = grid.getSelectionModel().getSelection();
    //    var url = abp.appPath + "CMMSImportExport/InPhieuDeXuatVatTu?id=" + rowselected[0].get('id');;
    //    window.location.href = url;
    //},

    //onPhieuXuatKho: function () {
    //    var me = this;
    //    var grid = me.ref.dsPhieuXuatKho;
    //    var rowselected = grid.getSelectionModel().getSelection();
    //    var record = Ext.create('Admin.model.mPhieuNhapXuatChiTiet');
    //    record.set('id', 0);
    //    record.set('ngayHachToan', new Date());
    //    record.set('ngayChungTu', new Date());
    //    record.set('maKhoXuat', rowselected[0].get('maKhoXuat'));
    //    record.set('maPhieuCha', rowselected[0].get('id'));
    //    record.set('nguoiNhan', rowselected[0].get('nguoiNhan'));
    //    record.set('nguoiGiao', rowselected[0].get('nguoiGiao'));
    //    var recordIn = me.ref.cbkhoDX.getStore().queryBy(function (records, id) {
    //        return (records.get('id') == rowselected[0].get('maKhoXuat'));
    //    });
    //    var nodesSelect = recordIn.items[0];
    //    var storesVM = me.storeinfo.storePhieuXuatChiTiet;
    //    var dataVatTu = [];
    //    var data = storesVM.data.items;
    //    for (var i = 0; i < data.length; i++) {
    //        var obj = {};
    //        obj['maVatTu'] = data[i].get('maVatTu');
    //        obj['vatTu'] = data[i].get('vatTu');
    //        obj['tenVatTu'] = data[i].get('tenVatTu');
    //        obj['tenVatTu1'] = data[i].get('vatTu') + "/" + data[i].get('tenVatTu');
    //        obj['ghiChu'] = data[i].data.ghiChu;
    //        obj['donGia'] = data[i].data.donGia;
    //        var soluongthuc = data[i].get('soLuongThuc');
    //        var dongia = data[i].get('donGia');
    //        if (soluongthuc != 0 || soluongthuc != null) {
    //            var tt = soluongthuc * dongia;
    //            obj['thanhTien'] = tt;
    //        }
    //        obj['soLuongThuc'] = data[i].data.soLuongThuc;
    //        obj['soLuong'] = data[i].data.soLuong;
    //        obj['donViTinhThuc'] = data[i].data.donViTinhThuc;
    //        dataVatTu.push(obj);
    //    }
    //    var title = "Phiếu xuất kho: " + nodesSelect.data.moTa;
    //    var wnd = Ext.create('Admin.view.phieunhapxuatkho.CNPhieuXuatKho', {
    //        title: title,
    //        viewModel: {
    //            data: {
    //                dataVatTu: dataVatTu,
    //                deXuatVatTu: true,
    //                storeKho: me.storeinfo.storeKhoNhapXuat,
    //                recordPhieu: record,
    //                fnSauKhiLoad: function () {
    //                    me.onTimKiemXuatKho();
    //                }
    //            }
    //        }
    //    });
    //    wnd.show();
    //}
});
