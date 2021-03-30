Ext.define('Admin.view.phieunhapxuatkho.quanLyPhieuNhapModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.quanlyphieunhapkho',
    data: {
        recordTK: Ext.create('Ext.data.Model', {}),
        selectionNhapKho: null,
        recordTKXK: Ext.create('Ext.data.Model', {}),
        selectionXuatKho: null
    },

    stores: {
        storeKho: { type: 'skho', pageSize: 100 },
        storePhieuNhapKho: { type: 'sphieunhapxuat' },
        storePhieuNhapChiTiet: { type: 'sphieunhapxuatchitiet' },
        storeKhoNhapXuat: { type: 'skho', pageSize: 100 },
        storePhieuXuatKho: { type: 'sphieunhapxuat' },
        storePhieuXuatChiTietXuat: { type: 'sphieunhapxuatchitiet' },
        storeLoaiPhieu: { type: 'sdmloaiphieu', pageSize: 500 },
        storeLoaiPhieuXuat: { type: 'sdmloaiphieu', pageSize: 500 }
    }
});

Ext.define('Admin.view.phieunhapxuatkho.quanLyPhieuNhapKho', {
    extend: 'Ext.tab.Panel',
    xtype: 'quanLyPhieuNhapKho',
    requires: [
        'Admin.view.phieunhapxuatkho.quanLyPhieuNhapKhoController',
        'Admin.view.phieunhapxuatkho.quanLyPhieuNhapModel',
        'Ext.tab.Panel',
        'Ext.grid.feature.Summary'
    ],
    controller: 'quanlyphieunhapkho',
    viewModel: {
        type: 'quanlyphieunhapkho'
    },
    cls: 'tabMain',
    bodyStyle: { 'background-color': '#f6f6f6', 'padding': '0px 0px 0px 5px' },
    height: window.innerHeight - 65,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'panel',
        flex: 1,
        ui: 'light',
        title: 'Phiếu xuất kho',
        iconCls: 'x-fa fa-cloud-upload',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'gridpanel',
            layout: 'fit',
            ui: 'light',
            reference: 'dsPhieuXuatKho',
            flex: 1,
            bind: {
                store: '{storePhieuXuatKho}',
                selection: '{selectionXuatKho}'
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
                xtype: 'datecolumn',
                text: 'Ngày xuất kho',
                dataIndex: 'ngayHachToan',
                width: 120,
                align: 'center',
                style: 'text-align:center',
                format: 'd/m/Y'
            }, {
                xtype: 'gridcolumn',
                text: 'Số phiếu',
                dataIndex: 'soPhieu',
                sortable: true,
                width: 150
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'loaiPhieu',
                width: 100,
                text: 'Loại phiếu',
                sortable: false,
                renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                    var text = record.get('tenLoaiPhieu');
                    if (value == -1) {
                        text = app.localize("CMMSDMKhoPhanLoaiDChuyen");
                    }
                    return text;
                }
            }, {
                xtype: 'gridcolumn',
                text: 'Người xuất',
                dataIndex: 'tenNguoiDeXuat',
                sortable: true,
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'lyDo',
                flex: 1,
                text: 'Lý do',
                cellWrap: true,
                //align: 'center',
                //style: 'text-align:center',
                sortable: false
            },
            {
                xtype: 'gridcolumn',
                text: 'Đơn vị nhận',
                dataIndex: 'donViNhan',
                hidden: true,
                sortable: true,
                width: 150
            },
            {
                xtype: 'gridcolumn',
                text: 'Người nhận',
                dataIndex: 'nguoiNhan',
                sortable: true,
                width: 150
            }],
            viewConfig: {
                emptyText: 'Không có dữ liệu'
            },
            listeners: {
                selectionchange: 'onChangeGridPhieuXuat'
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                padding: 0,
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
                        reference: 'cbkhoXuat',
                        bind: {
                            store: '{storeKhoNhapXuat}',
                            value: '{recordTKXK.kho}'
                        },
                        labelWidth: 75,
                        fieldLabel: 'Kho',
                        queryMode: 'local',
                        displayField: 'moTa',
                        valueField: 'id',
                        forceSelection: true,
                        editable: false,
                        listeners: {
                            change: 'onChangeKhoXuat'
                        },
                        flex: 1
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Phân loại',
                        queryMode: 'local',
                        flex: 1,
                        labelWidth: 75,
                        editable: false,
                        reference: 'phanLoaiXuat',
                        displayField: 'moTa',
                        bind: {
                            store: '{storeLoaiPhieuXuat}',
                            value: '{recordTKXK.loaiPhieu}'
                        },
                        forceSelection: true,
                        editable: false,
                        valueField: 'id'
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 5 0 0',
                        fieldLabel: 'Số phiếu',
                        bind: '{recordTKXK.sophieu}',
                        labelWidth: 65,
                        flex: 1,
                        cls: "EnterToTab",
                        listeners: {
                            specialkey: 'specialkeyXuat'
                        }
                    },
                    {
                        xtype: 'combo',
                        emptyText: 'Ngày xuất kho',
                        displayField: 'name',
                        bind: '{recordTKXK.loaingay}',
                        valueField: 'value',
                        editable: false,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                { value: "ngayHachToan", name: 'Ngày xuất kho' },
                                { value: "ngayChungTu", name: 'Ngày chứng từ' }]
                        }),
                        triggerAction: 'all',
                        queryMode: 'local',
                        width: 140
                    },
                    {
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
                        margin: '5 0 0 5',
                        xtype: 'button',
                        text: 'Tìm',
                        iconCls: 'x-fa fa-search',
                        handler: 'onTimKiemXuatKho'
                    }]
                }]
            }]
        }, {
            xtype: 'grid',
            reference: 'dsPhieuChiTietXuat',
            title: 'Danh sách vật tư',
            ui: 'light',
            iconCls: 'fa fa-list-alt',
            height: 300,
            style: {
                borderTop: "solid 1px #d0d0d0 !important"
            },
            features: [{
                ftype: 'summary',
                dock: 'bottom'
            }],
            bind: {
                store: '{storePhieuXuatChiTietXuat}',
                selection: '{selectionPhieuNhapXuatChiTiet}'
            },
            layout: 'fit',
            columns: [{
                xtype: 'rownumberer',
                text: '#',
                width: 40,
                align: 'center'
            }, {
                header: 'Mã-Tên',
                dataIndex: 'tenVatTu1',
                cellWrap: true,
                minWidth: 180,
                flex: 1,
                summaryType: 'count',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '(' + value + ' ' + app.localize('CMMSDMKhoVatTu') + ')' : '(1 ' + app.localize('CMMSDMKhoVatTu') + ')');
                }
            }, {
                text: 'Đơn vị tính',
                dataIndex: 'donViTinhThuc',
                border: 1,
                align: 'left',
                style: 'text-align:center',
                width: 100
            }, {
                text: 'Số lượng',
                columns: [{
                    text: 'Chứng từ',
                    dataIndex: 'soLuong',
                    border: 1,
                    style: 'text-align:center',
                    align: 'right',
                    width: 120,
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
                }, {
                    text: 'Thực xuất',
                    dataIndex: 'soLuongThuc',
                    border: 1,
                    style: 'text-align:center',
                    align: 'right',
                    width: 120,
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
                        //return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                    }
                },
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    if (value != undefined && value != null) {
                        //return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                    }
                }
            }, {
                text: 'Ghi chú',
                dataIndex: 'ghiChu',
                border: 1,
                width: 220
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                style: {
                    borderTop: 'solid 1px #d0d0d0 !important'
                },
                items: [
                    {
                        xtype: 'button',
                        iconCls: 'fa fa-plus',
                        reference: 'btnPhieuXuatKho',
                        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
                        text: 'Thêm',
                        //disabled: true,
                        ui: 'soft-blue',
                        tooltip: 'Thêm',
                        //bind: {
                        //    disabled: '{!recordTKXK.kho>0}'
                        //},
                        handler: 'onThemPhieuXuatKho'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'fa fa-plus-circle',
                        reference: 'btnPhieuDieuChuyen',
                        //bind: {
                        //    disabled: '{!recordTKXK.kho>0}'
                        //},
                        text: 'Thêm phiếu điều chuyển',
                        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
                        ui: 'blue',
                        tooltip: 'Thêm phiếu điều chuyển',
                        handler: 'onThemPhieuDieuChuyen'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'fa fa-pencil',
                        bind: {
                            disabled: '{!selectionXuatKho}'
                        },
                        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
                        reference: 'btnSuaPhieuXuat',
                        text: 'Sửa',
                        ui: 'blue',
                        tooltip: 'Sửa',
                        handler: 'onSuaPhieuXuatKho'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'fa fa-minus',
                        bind: {
                            disabled: '{!selectionXuatKho}'
                        },
                        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
                        reference: 'btnHuyPhieuXuat',
                        text: 'Xoá',
                        ui: 'soft-red',
                        tooltip: 'Xoá',
                        handler: 'onHuyPhieuXuatKho'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'fa fa-print',
                        reference: 'btnInPhieuXuat',
                        bind: {
                            disabled: '{!selectionXuatKho}'
                        },
                        text: 'In phiếu',
                        tooltip: 'In phiếu',
                        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
                        ui: 'blue',
                        handler: 'onInPhieuXuat'
                    },
                    { xtype: 'tbfill' }, {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        bind: {
                            store: '{storePhieuXuatKho}'
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
        }]
    }, {
        xtype: 'panel',
        flex: 1,
        ui: 'light',
        title: 'Phiếu nhập kho',
        iconCls: 'x-fa fa-cloud-download',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'gridpanel',
            layout: 'fit',
            ui: 'light',
            filter: '',
            reference: 'dsPhieuNhapKho',
            flex: 1,
            bind: {
                store: '{storePhieuNhapKho}',
                selection: '{selectionNhapKho}'
            },
            columns: [{
                xtype: 'rownumberer',
                text: '#',
                width: 40,
                style: 'text-align:center',
                align: 'center',
                sortable: false,
                style: {
                    borderRight: '1px solid #CCCCCC'
                }
            }, {
                xtype: 'datecolumn',
                text: 'Ngày nhập kho',
                dataIndex: 'ngayHachToan',
                width: 120,
                format: 'd/m/Y',
                align: 'center',
                style: 'text-align:center',
                sortable: false
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'soPhieu',
                width: 150,
                text: 'Số phiếu',
                sortable: false
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'loaiPhieu',
                width: 100,
                text: 'Loại phiếu',
                sortable: false,
                renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                    var text = record.get('tenLoaiPhieu');
                    if (value == -1) {
                        text = 'Điều chỉnh';
                    }
                    return text;
                }
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'donViGiao',
                minWidth: 200,
                flex: 1,
                sortable: false,
                text: 'Đơn vị giao'
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'nguoiGiao',
                width: 140,
                text: 'Người giao hàng',
                sortable: false
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'tenNguoiPheDuyet',
                width: 140,
                sortable: false,
                text: 'Người nhận'
            }, {
                xtype: 'datecolumn',
                text: 'Ngày chứng từ',
                dataIndex: 'ngayChungTu',
                width: 120,
                format: 'd/m/Y',
                align: 'center',
                style: 'text-align:center',
                sortable: false
            }, {
                xtype: 'datecolumn',
                text: 'Ngày tạo',
                dataIndex: 'creationTime',
                width: 120,
                format: 'd/m/Y',
                align: 'center',
                style: 'text-align:center',
                sortable: false
            }],
            viewConfig: {
                emptyText: 'Chưa có dữ liệu'
            },
            listeners: {
                selectionchange: 'onChangeGridPhieuNhap'
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                padding: 0,
                items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    flex: 1,
                    combineErrors: true,
                    defaults: {
                        margin: '5 5 0 0',
                        labelAlign: 'right'
                    },
                    items: [{
                        xtype: 'combo',
                        reference: 'cbkho',
                        bind: {
                            store: '{storeKho}',
                            value: '{recordTK.kho}'
                        },
                        flex: 1,
                        labelWidth: 75,
                        fieldLabel: 'Kho',
                        queryMode: 'local',
                        displayField: 'moTa',
                        valueField: 'id',
                        forceSelection: true,
                        editable: false,
                        listeners: {
                            change: 'onChangeKho'
                        }
                    }, {
                        xtype: 'combo',
                        fieldLabel: 'Loại phiếu',
                        queryMode: 'local',
                        flex: 1,
                        labelWidth: 75,
                        reference: 'phanLoai',
                        editable: false,
                        displayField: 'moTa',
                        valueField: 'id',
                        bind: {
                            store: '{storeLoaiPhieu}',
                            value: '{recordTK.loaiPhieu}'
                        },
                        forceSelection: true,
                        editable: false
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Số phiếu',
                        bind: '{recordTK.sophieu}',
                        labelWidth: 65,
                        flex: 1,
                        cls: "EnterToTab",
                        listeners: {
                            specialkey: 'specialkey'
                        }
                    }, {
                        xtype: 'combo',
                        emptyText: 'Ngày nhập kho',
                        displayField: 'name',
                        bind: '{recordTK.loaingay}',
                        valueField: 'value',
                        editable: false,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                { value: "ngayHachToan", name: 'Ngày nhập kho' },
                                { value: "ngayChungTu", name: 'Ngày chứng từ' }]
                        }),
                        triggerAction: 'all',
                        queryMode: 'local',
                        width: 150
                    }, {
                        xtype: 'component',
                        html: '<div id="reportrange" style="background: #fff; cursor: pointer; padding: 8px 10px; border: 1px solid #ccc; width: 200px;height:30px">' +
                            '<i class="fa fa-calendar"></i>&nbsp;' +
                            '<span></span>' +
                            '</div>',
                        margin: '5 0 5 5',
                        listeners: {
                            afterRender: 'onRenderPicker'
                        }
                    }, {
                        margin: '5 0 5 5',
                        xtype: 'button',
                        text: 'Tìm',
                        iconCls: 'x-fa fa-search',
                        handler: 'onTimKiemNhapKho'
                    }]
                }]
            }]
        }, {
            xtype: 'grid',
            reference: 'dsPhieuChiTiet',
            title: 'Danh sách vật tư',
            ui: 'light',
            iconCls: 'fa fa-list-alt',
            height: 300,
            style: {
                borderTop: "solid 1px #d0d0d0 !important"
            },
            features: [{
                ftype: 'summary',
                dock: 'bottom'
            }],
            bind: {
                store: '{storePhieuNhapChiTiet}',
                selection: '{selectionPhieuNhapChiTiet}'
            },
            layout: 'fit',
            columns: [{
                xtype: 'rownumberer',
                text: '#',
                width: 40,
                align: 'center'
            }, {
                header: 'Mã-Tên',
                dataIndex: 'tenVatTu1',
                cellWrap: true,
                minWidth: 180,
                flex: 1,
                summaryType: 'count',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    //return ((value === 0 || value > 1) ? '(' + value + ' ' + app.localize("CMMSDMKhoVatTu") + ')' : '(1 ' + app.localize("CMMSDMKhoVatTu") + ')');
                }
            }, {
                text: 'Đơn vị tính',
                dataIndex: 'donViTinhThuc',
                border: 1,
                align: 'left',
                style: 'text-align:center',
                width: 100
            }, {
                text: 'Số lượng',
                columns: [{
                    text: 'Chứng từ',
                    dataIndex: 'soLuong',
                    border: 1,
                    style: 'text-align:center',
                    align: 'right',
                    width: 120,
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
                }, {
                    text: 'Thực nhập',
                    dataIndex: 'soLuongThuc',
                    border: 1,
                    style: 'text-align:center',
                    align: 'right',
                    width: 120,
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
                }, {
                    text: 'Số lượng hỏng',
                    dataIndex: 'soLuongHong',
                    reference: 'coluonSoLuongHong',
                    border: 1,
                    hidden: true,
                    style: 'text-align:center',
                    align: 'right',
                    width: 110,
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
                width: 125,
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
                width: 145, summaryType: 'sum',
                renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                    if (value != undefined && value != null) {
                        //return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                    }
                },
                summaryRenderer: function (value, summaryData, dataIndex) {
                    if (value != undefined && value != null) {
                        //return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                    }
                }
            }, {
                text: 'Ghi chú',
                dataIndex: 'ghiChu',
                border: 1,
                width: 220
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                style: {
                    borderTop: 'solid 1px #d0d0d0 !important'
                },
                items: [{
                    xtype: 'button',
                    iconCls: 'fa fa-plus',
                    reference: 'btnPhieuNhapKho',
                    ui: 'soft-blue',
                    //bind: {
                    //    disabled: '{!recordTK.kho>0}'
                    //},
                    text: 'Thêm',
                    //disabled: true,
                    tooltip: 'Thêm',
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
                    handler: 'onThemPhieuNhapKho'
                }, {
                    xtype: 'button',
                    iconCls: 'fa fa-pencil',
                    reference: 'btnSuaPhieuNhap',
                    bind: {
                        disabled: '{!selectionNhapKho}'
                    },
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
                    text: 'Sửa',
                    ui: 'blue',
                    tooltip: 'Sửa',
                    handler: 'onSuaPhieuNhapKho'
                }, {
                    xtype: 'button',
                    iconCls: 'fa fa-minus',
                    reference: 'btnHuyPhieuNhap',
                    bind: {
                        disabled: '{!selectionNhapKho}'
                    },
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
                    text: 'Xoá',
                    disabled: true,
                    tooltip: 'Xoá',
                    ui: 'soft-red',
                    handler: 'onHuyPhieuNhapKho'
                }, {
                    xtype: 'button',
                    iconCls: 'fa fa-print',
                    reference: 'btnInPhieuNhap',
                    bind: {
                        disabled: '{!selectionNhapKho}'
                    },
                    text: 'In phiếu',
                    ui: 'blue',
                    tooltip: 'In phiếu',
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
                    handler: 'onInPhieu'
                }, {
                    width: 20,
                    padding: '0 0 0 0',
                    height: 20,
                    hidden: true,
                    margin: '0 5 0 5',
                    cls: 'TTPhieuCho',
                    tooltip: 'Phiếu chờ'
                }, {
                    width: 20,
                    height: 20,
                    padding: '0 0 0 0',
                    hidden: true,
                    cls: 'TTPhieuDaDuyet',
                    margin: '0 5 0 0',
                    tooltip: 'Đã duyệt'
                }, {
                    width: 20,
                    padding: '0 0 0 0',
                    height: 20,
                    hidden: true,
                    cls: 'TTPhieuKhongDuyet',
                    margin: '0 5 0 0',
                    tooltip: 'Từ chối'
                }, '->', {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    bind: {
                        store: '{storePhieuNhapKho}'
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
        }]
    }],
    listeners: {
        afterRender: 'onAfterrender',
        tabchange: 'changeTab'
    }
});

//var _cMMSKhoPhieuNhapXuat = abp.services.app.cMMSKhoPhieuNhapXuat;
//var _cMMSKhoPhieuNhapXuatChiTiet = abp.services.app.cMMSKhoPhieuNhapXuatChiTiet;

Ext.define('Admin.view.phieunhapxuatkho.quanLyPhieuNhapKhoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.quanlyphieunhapkho',
    ref: null,
    storeinfo: null,
    sDATE: null,
    eDATE: null,
    selectPhieuXuat: false,
    selectPhieuNhap: false,
    sDATECreate: null,
    eDATECreate: null,
    init: function () {
        var me = this;
        me.callParent(arguments);
    },

    onAfterrender: function () {
        var me = this;
        me.ref = me.getReferences();
        me.storeinfo = me.getViewModel().storeInfo;
        //var recordTKXK = me.getViewModel().data.recordTKXK;
        //recordTKXK.set('loaingay', 'ngayHachToan');
        //recordTKXK.set('loaiPhieu', '0')
        //var dStart = app.gplatformconsts.sDate;//moment().startOf('month');
        //var dEnd = app.gplatformconsts.eDate;//moment().endOf('month');
        //app.gplatformutils.createDateRangeExtent('PhieuXuat', me, dStart, dEnd, function () { });
        //$('.daterangepicker').css('display', 'none');
        //me.loadKho();
        //me.loadLoaiPhieuXuat();
        //me.loadLoaiPhieu();
        //var recordTK = me.getViewModel().data.recordTK;
        //recordTK.set('loaingay', "ngayHachToan");

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

    //changeTab: function (obj, newValue, oldValue, eOpts) {
    //    var me = this;
    //    if (obj.xtype == "quanLyPhieuNhapKho") {
    //        var dStart = app.gplatformconsts.sDate;//moment().startOf('month');
    //        var dEnd = app.gplatformconsts.eDate;//moment().endOf('month');
    //        app.gplatformutils.createDateRange('PhieuNhap', me, dStart, dEnd, function () { });
    //        $('.daterangepicker').css('display', 'none');
    //    }
    //},

    //loadLoaiPhieuXuat: function () {
    //    var me = this;
    //    var store = me.storeinfo.storeLoaiPhieuXuat;
    //    var url = abp.appPath + "api/services/app/CMMSDMLoaiPhieu/GetAll?PhanLoai=xuatkho";
    //    store.proxy.api.read = url;
    //    store.load({
    //        scope: this,
    //        callback: function (records, operation, success) {
    //            var data = { id: 0, moTa: app.localize('All') };
    //            store.insert(0, data);
    //            data = { id: -1, moTa: app.localize("CMMSDMKhoPhanLoaiDChuyen") };
    //            store.insert(3, data);
    //        }
    //    });
    //},

    //loadLoaiPhieu: function () {
    //    var me = this;
    //    var store = me.storeinfo.storeLoaiPhieu;
    //    var url = abp.appPath + "api/services/app/CMMSDMLoaiPhieu/GetAll?PhanLoai=nhapkho";
    //    store.proxy.api.read = url;
    //    store.load({
    //        scope: this,
    //        callback: function (records, operation, success) {
    //            var data = { id: -1, moTa: app.localize('All') };
    //            store.insert(0, data);
    //        }
    //    });
    //},

    //loadKho: function () {
    //    var me = this;
    //    var recordTKXK = me.getViewModel().data.recordTKXK;
    //    var recordTK = me.getViewModel().data.recordTK;
    //    var store = me.storeinfo.storeKho;
    //    var storeXuat = me.storeinfo.storeKhoNhapXuat;
    //    var url = abp.appPath + "api/services/app/CMMSKho/GetPermission";
    //    store.proxy.api.read = url;
    //    store.load({
    //        scope: this,
    //        callback: function (records, operation, success) {
    //            storeXuat.loadRecords(records);
    //            if (records.length > 0) {
    //                recordTK.set('kho', records[0].get('id'));
    //                //phiếu xuất
    //                recordTKXK.set('kho', records[0].get('id'));
    //            }

    //            recordTK.set('loaiPhieu', '-1');
    //            recordTK.set('denngay', app.gplatformutils.getendDate());
    //            //Phieu xuất
    //            recordTKXK.set('denngay', app.gplatformutils.getendDate());
    //            me.getView().setLoading(false);
    //        }
    //    });
    //},

    //onChangeGridPhieuNhap: function (grid, selected, eOpts) {
    //    var me = this;
    //    me.selectPhieuNhap = true;
    //    var storeDH = me.storeinfo.storePhieuNhapChiTiet;
    //    var nodesSelect = me.ref.cbkho.getSelection();
    //    if (selected.length == 0) {
    //        storeDH.loadData([]);
    //        return;
    //    }
    //    var nodesSelect = me.ref.cbkho.getSelection();
    //    me.ref.coluonSoLuongHong.setVisible(false);
    //    if (nodesSelect && nodesSelect.data.phanloai == 1) {
    //        me.ref.coluonSoLuongHong.setVisible(true);
    //    }
    //    me.ref.btnHuyPhieuNhap.setVisible(true);
    //    me.ref.btnSuaPhieuNhap.setText(app.localize('Edit'));
    //    if (selected[0].get('loaiPhieu') == '-1') {
    //        me.ref.btnHuyPhieuNhap.setVisible(false);
    //        me.ref.btnSuaPhieuNhap.setText(app.localize('View'));
    //    }
    //    me.loadChiTietPhieu(selected[0].data.id);
    //},

    //loadChiTietPhieu: function (maPhieu) {
    //    var me = this;
    //    var store = me.storeinfo.storePhieuNhapChiTiet;
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

    //onTimKiemNhapKho: function () {
    //    var me = this;
    //    me.storeinfo.storePhieuNhapChiTiet.loadData([]);
    //    me.loadNhapKho();
    //},

    //loadNhapKho: function () {
    //    var me = this;
    //    me.selectPhieuNhap = false;
    //    var filter = [{ name: 'phanLoai', value: 'nhapkho' }];
    //    var recordTK = me.getViewModel().data.recordTK;
    //    if (recordTK.get('sophieu')) {
    //        filter.push({ name: "filter", value: recordTK.get('sophieu') });
    //    }
    //    if (recordTK.get('loaiPhieu') && recordTK.get('loaiPhieu') != '-1') {
    //        filter.push({ name: "loaiPhieu", value: recordTK.get('loaiPhieu') });
    //    }
    //    if (me.ref.cbkho.getValue() != 0) {
    //        filter.push({ name: "maKhoNhap", value: me.ref.cbkho.getValue() });
    //    }
    //    var dStart = Ext.Date.format(new Date(me.sDATE), 'Y/m/d 00:00:00.000');
    //    var dEnd = Ext.Date.format(new Date(me.eDATE), 'Y/m/d 23:59:59.999');
    //    if (me.eDATE && me.sDATE && recordTK.get('loaingay') && recordTK.get('loaingay') == 'ngayHachToan') {
    //        filter.push({ name: "ngayHachToanStart", value: dStart });
    //        filter.push({ name: "ngayHachToanEnd", value: dEnd });
    //    } else if (me.eDATE && me.sDATE && recordTK.get('loaingay') && recordTK.get('loaingay') == 'ngayChungTu') {
    //        filter.push({ name: "ngayChungTuStart", value: dStart });
    //        filter.push({ name: "ngayChungTuEnd", value: dEnd });
    //    }
    //    filter.push({ name: "sorting", value: "ngayHachToan desc" });
    //    var store = me.storeinfo.storePhieuNhapKho;
    //    var query = abp.utils.buildQueryString(filter);
    //    var url = abp.appPath + "api/services/app/CMMSKhoPhieuNhapXuat/GetAll" + query;
    //    store.proxy.api.read = url;
    //    store.pageSize = 500;
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
    //            if (records == null) {
    //                store.removeAll();
    //                var storePhieuNhapChiTiet = me.storeinfo.storePhieuNhapChiTiet;
    //                storePhieuNhapChiTiet.removeAll();
    //            } else {
    //                me.ref.dsPhieuNhapKho.getSelectionModel().select(0);
    //                if (me.selectPhieuNhap == false && me.ref.dsPhieuNhapKho.getSelectionModel().getSelection().length > 0) {
    //                    me.loadChiTietPhieu(me.ref.dsPhieuNhapKho.getSelectionModel().getSelection()[0].data.id);
    //                }

    //            }
    //        }
    //    });
    //},

    //specialkey: function (field, e) {
    //    var me = this;
    //    if (e.getKey() == e.ENTER) {
    //        me.onTimKiemNhapKho();
    //    }
    //},

    //onChangeKho: function (combo, newValue, oldValue, eOpts) {
    //    var me = this;
    //    if (abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') && abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')) {
    //        if (newValue == 0) {
    //            me.ref.btnPhieuNhapKho.setDisabled(true);
    //        } else {
    //            me.ref.btnPhieuNhapKho.setDisabled(false);
    //        }
    //    }
    //    me.onTimKiemNhapKho();
    //},

    //onThemPhieuNhapKho: function () {
    //    var me = this;
    //    var record = Ext.create('Admin.model.mPhieuNhapXuat');
    //    record.set('id', 0);
    //    record.set('ngayHachToan', new Date());
    //    record.set('ngayChungTu', new Date());
    //    var nodesSelect = me.ref.cbkho.getSelection();
    //    record.set('maKhoNhap', nodesSelect.data.id)
    //    var storeKho = app.gplatformutils.deepCloneStore(me.storeinfo.storeKho);
    //    me.getView().setLoading(false);
    //    var title = app.localize("CMMSDMKhoBtnPhieuNhapKho") + ": " + nodesSelect.data.moTa;
    //    var wnd = Ext.create('Admin.view.phieunhapxuatkho.cnPhieuNhapKho', {
    //        title: title,
    //        viewModel: {
    //            data: {
    //                storeKho: storeKho,
    //                recordPhieu: record,
    //                fnSauKhiLoad: function () {
    //                    me.onTimKiemNhapKho();
    //                }
    //            }
    //        }
    //    });
    //    wnd.show();
    //},

    //onSuaPhieuNhapKho: function () {
    //    var me = this;
    //    var nodesSelect = me.ref.cbkho.getSelection();
    //    var title = app.localize("CMMSDMKhoSuaPhieuNhapKho") + ": " + nodesSelect.data.moTa;
    //    var record = me.ref.dsPhieuNhapKho.getSelectionModel().getSelection();
    //    var checkPhieu = false;
    //    var storeKho = app.gplatformutils.deepCloneStore(me.storeinfo.storeKho);
    //    var wnd = Ext.create('Admin.view.phieunhapxuatkho.cnPhieuNhapKho', {
    //        title: title,
    //        viewModel: {
    //            data: {
    //                // DataPhanLoai: DataPhanLoai,
    //                storeKho: storeKho,
    //                recordPhieu: record[0],
    //                phieuDieuChuyen: checkPhieu,
    //                fnSauKhiLoad: function () {
    //                    me.onTimKiemNhapKho();
    //                    // me.loadChiTietPhieu(record[0].data.id);
    //                }
    //            }
    //        }
    //    });
    //    wnd.show();
    //},

    //onHuyPhieuNhapKho: function () {
    //    var me = this;
    //    var grid = me.ref.dsPhieuNhapKho;
    //    var store = me.storeinfo.storePhieuNhapKho;
    //    var rowselected = grid.getSelectionModel().getSelection();
    //    abp.message.confirm(
    //        app.localize("CMMSDMKhoBtnPhieuNhapKho") + ": " + rowselected[0].data.soPhieu,
    //        app.localize('ExtgDataManagerAreYouSure'),
    //        function (isConfirmed) {
    //            if (isConfirmed) {
    //                _cMMSKhoPhieuNhapXuat.xoaPhieuNhapXuat({ Id: rowselected[0].get('id') }, 'nhapkho').done(function (result) {
    //                    me.onTimKiemNhapKho();
    //                    me.getView().setLoading(false);
    //                    abp.notify.success(app.localize('SavedSuccessfully'));
    //                }).fail(function (data) {
    //                    me.getView().setLoading(false);
    //                });
    //            }
    //        }
    //    );
    //},

    //onInPhieu: function () {
    //    var me = this;
    //    var record = me.ref.dsPhieuNhapKho.getSelectionModel().getSelection();
    //    var url = abp.appPath + "CMMSImportExport/InPhieuNhapKho?id=" + record[0].get('id');;
    //    window.location.href = url;
    //},

    ////Phiếu xuất
    //onInPhieuXuat: function () {
    //    var me = this;
    //    var record = me.ref.dsPhieuXuatKho.getSelectionModel().getSelection();
    //    var url = abp.appPath + "CMMSImportExport/InPhieuXuatKho?id=" + record[0].get('id');;
    //    window.location.href = url;
    //},

    //onTimKiemXuatKho: function () {
    //    var me = this;
    //    me.storeinfo.storePhieuXuatChiTietXuat.loadData([]);
    //    me.loadXuatKho();
    //},

    //specialkeyXuat: function (field, e) {
    //    var me = this;
    //    if (e.getKey() == e.ENTER) {
    //        me.loadXuatKho();
    //    }
    //},

    //loadXuatKho: function () {
    //    var me = this;
    //    var recordTKXK = me.getViewModel().data.recordTKXK;
    //    me.selectPhieuXuat = false;
    //    var filter = [{ name: 'phanLoai', value: 'xuatkho,dieuchuyen' }];
    //    if (recordTKXK.get('sophieu')) {
    //        filter.push({ name: "filter", value: recordTKXK.get('sophieu') });
    //    }
    //    if (recordTKXK.get('loaiPhieu') && recordTKXK.get('loaiPhieu') != '0') {
    //        filter.push({ name: "loaiPhieu", value: recordTKXK.get('loaiPhieu') });
    //    }
    //    if (me.ref.cbkhoXuat.getValue() != 0) {
    //        filter.push({ name: "maKhoXuat", value: me.ref.cbkhoXuat.getValue() });
    //    }
    //    var dStart = Ext.Date.format(new Date(me.sDATECreate), 'Y/m/d 00:00:00.000');
    //    var dEnd = Ext.Date.format(new Date(me.eDATECreate), 'Y/m/d 23:59:59.999');
    //    if (me.sDATECreate && me.eDATECreate && recordTKXK.get('loaingay') && recordTKXK.get('loaingay') == 'ngayHachToan') {
    //        filter.push({ name: "ngayHachToanStart", value: dStart });
    //        filter.push({ name: "ngayHachToanEnd", value: dEnd });
    //    } else if (me.sDATECreate && me.eDATECreate && recordTKXK.get('loaingay') && recordTKXK.get('loaingay') == 'ngayChungTu') {
    //        filter.push({ name: "ngayChungTuStart", value: dStart });
    //        filter.push({ name: "ngayChungTuEnd", value: dEnd });
    //    }
    //    filter.push({ name: "sorting", value: "ngayHachToan desc" });
    //    var store = me.storeinfo.storePhieuXuatKho;
    //    var query = abp.utils.buildQueryString(filter);
    //    var url = abp.appPath + "api/services/app/CMMSKhoPhieuNhapXuat/GetAll" + query;
    //    store.proxy.api.read = url;
    //    store.pageSize = 500;
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
    //            if (records == null) {
    //                store.removeAll();
    //                var storePhieuXuatChiTietXuat = me.storeinfo.storePhieuXuatChiTietXuat;
    //                storePhieuXuatChiTietXuat.removeAll();
    //            } else {
    //                me.ref.dsPhieuXuatKho.getSelectionModel().select(0);
    //                if (me.selectPhieuXuat == false && me.ref.dsPhieuXuatKho.getSelectionModel().getSelection().length > 0) {
    //                    me.loadChiTietPhieuXuat(me.ref.dsPhieuXuatKho.getSelectionModel().getSelection()[0].data.id);
    //                }
    //            }
    //        }
    //    });
    //},

    //onChangeKhoXuat: function (his, newValue, oldValue, eOpts) {
    //    var me = this;
    //    if (abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit')) {
    //        if (newValue == 0) {
    //            me.ref.btnPhieuXuatKho.setDisabled(true);
    //            me.ref.btnPhieuDieuChuyen.setDisabled(true);
    //        } else {
    //            me.ref.btnPhieuDieuChuyen.setDisabled(false);
    //            me.ref.btnPhieuXuatKho.setDisabled(false);
    //        }
    //    }
    //    me.onTimKiemXuatKho();
    //},

    onThemPhieuXuatKho: function () {
        var me = this;
        var record = Ext.create('Admin.model.mPhieuNhapXuat');
        record.set('id', 0);
        record.set('ngayHachToan', new Date());
        record.set('ngayChungTu', new Date());
        var nodesSelect = me.ref.cbkhoXuat.getSelection();
        //record.set('maKhoXuat', nodesSelect.data.id);
        me.getView().setLoading(false);
        //var storeKho = app.gplatformutils.deepCloneStore(me.storeinfo.storeKhoNhapXuat);
        var title = 'Thêm phiếu xuất kho'/* + ": " + nodesSelect.data.moTa*/;
        var wnd = Ext.create('Admin.view.phieunhapxuatkho.CNPhieuXuatKho', {
            title: title,
            viewModel: {
                data: {
                    //recordKho: nodesSelect,
                    //storeKho: storeKho,
                    recordPhieu: record,
                    fnSauKhiLoad: function () {
                        me.onTimKiemXuatKho();
                    }
                }
            }
        });
        wnd.show();

    },

    //onThemPhieuDieuChuyen: function () {
    //    var me = this;
    //    var record = Ext.create('Admin.model.mPhieuNhapXuat');
    //    record.set('id', 0);
    //    record.set('ngayHachToan', new Date());
    //    record.set('loaiPhieu', -1);
    //    record.set('ngayChungTu', new Date());
    //    var nodesSelect = me.ref.cbkhoXuat.getSelection();
    //    var storeKho = app.gplatformutils.deepCloneStore(me.storeinfo.storeKhoNhapXuat);
    //    record.set('maKhoXuat', nodesSelect.data.id);
    //    me.getView().setLoading(false);
    //    var title = app.localize("CMMSDMKhoBtnPhieuDieuChuyen") + ": " + nodesSelect.data.moTa;
    //    var wnd = Ext.create('Admin.view.phieunhapxuatkho.CNPhieuXuatKho', {
    //        title: title,
    //        viewModel: {
    //            data: {
    //                storeKho: storeKho,
    //                dieuchuyen: true,
    //                recordPhieu: record,
    //                fnSauKhiLoad: function () {
    //                    me.onTimKiemXuatKho();
    //                }
    //            }
    //        }
    //    });
    //    wnd.show();
    //},

    //onSuaPhieuXuatKho: function () {
    //    var me = this;
    //    var nodesSelect = me.ref.cbkhoXuat.getSelection();
    //    var title = app.localize("CMMSDMKhoSuaPhieuXuatKho") + ": " + nodesSelect.data.moTa;
    //    var record = me.ref.dsPhieuXuatKho.getSelectionModel().getSelection();
    //    var dieuchuyen = false;
    //    if (record[0].get('loaiPhieu') == '-1') {
    //        dieuchuyen = true;
    //        title = app.localize("CMMSDMKhoXemPhieuDieuChuyen");
    //    }
    //    var storeKho = app.gplatformutils.deepCloneStore(me.storeinfo.storeKhoNhapXuat);
    //    var wnd = Ext.create('Admin.view.phieunhapxuatkho.CNPhieuXuatKho', {
    //        title: title,
    //        viewModel: {
    //            data: {
    //                storeKho: storeKho,
    //                dieuchuyen: dieuchuyen,
    //                recordPhieu: record[0],
    //                fnSauKhiLoad: function () {
    //                    me.onTimKiemXuatKho();
    //                    // me.loadChiTietPhieuXuat(record[0].data.id);
    //                }
    //            }
    //        }
    //    });
    //    wnd.show();
    //},

    //onChangeGridPhieuXuat: function (grid, selected, eOpts) {
    //    var me = this;
    //    me.selectPhieuXuat = true;
    //    //  me.ref.btnSuaPhieuXuat.setDisabled(true);
    //    var storeDH = me.storeinfo.storePhieuXuatChiTietXuat;
    //    if (selected.length == 0) {
    //        storeDH.loadData([]);
    //        return;
    //    }
    //    me.ref.btnHuyPhieuXuat.setVisible(true);
    //    me.ref.btnSuaPhieuXuat.setText(app.localize('Edit'));
    //    if (selected[0].get('loaiPhieu') == '-1') {
    //        me.ref.btnHuyPhieuXuat.setVisible(false);
    //        me.ref.btnSuaPhieuXuat.setText(app.localize('View'));
    //    }
    //    me.loadChiTietPhieuXuat(selected[0].data.id);
    //},

    //loadChiTietPhieuXuat: function (maPhieu) {
    //    var me = this;
    //    var me = this;
    //    var store = me.storeinfo.storePhieuXuatChiTietXuat;
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

    //onHuyPhieuXuatKho: function () {
    //    var me = this;
    //    var grid = me.ref.dsPhieuXuatKho;
    //    var store = me.storeinfo.storePhieuXuatKho;
    //    var rowselected = grid.getSelectionModel().getSelection();
    //    abp.message.confirm(
    //        app.localize('CMMSDMKhoBtnPhieuXuatKho') + ": " + rowselected[0].data.soPhieu,
    //        app.localize('ExtgDataManagerAreYouSure'),
    //        function (isConfirmed) {
    //            if (isConfirmed) {
    //                _cMMSKhoPhieuNhapXuat.xoaPhieuNhapXuat({ Id: rowselected[0].get('id') }, 'xuatkho').done(function (result) {
    //                    me.onTimKiemXuatKho();
    //                    me.getView().setLoading(false);
    //                    abp.notify.success(app.localize('SuccessfullyDeleted'));
    //                }).fail(function (data) {
    //                    me.getView().setLoading(false);
    //                });
    //            }
    //        }
    //    );
    //}
});
