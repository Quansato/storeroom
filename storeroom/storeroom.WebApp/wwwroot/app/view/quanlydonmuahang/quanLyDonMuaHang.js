Ext.define('Admin.view.quanlydonmuahang.quanLyDonMuaHangModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.quanlydonmuahang',
    data: {
        recordTK: Ext.create('Ext.data.Model', {}),
        recordTKDX: Ext.create('Ext.data.Model', {}),
        selectionDonHang: null,
        selectionDonDeXuatMuaHang: null
    },
    stores: {
        storeKhoNhap: { type: 'skho', pageSize: 1000 },
        storeKhoDeXuatMua: { type: 'skho', pageSize: 1000 },
        storeDonHang: { type: 'sdonhang' },
        storeDonHangChiTiet: { type: 'sdonhangchitiet' },
        storeDonDeXuatMuaHang: { type: 'sdondexuathang' },
        storeDonDeXuatMuaHangChiTiet: { type: 'sdondexuatmuahangchitiet' }
    }
});

Ext.define('Admin.view.quanlydonmuahang.quanLyDonMuaHang', {
    extend: 'Ext.tab.Panel',
    xtype: 'quanLyDonMuaHang',
    requires: [
        'Admin.view.quanlydonmuahang.quanLyDonMuaHangController',
        'Admin.view.quanlydonmuahang.quanLyDonMuaHangModel',
        'Ext.tab.Panel',
        'Ext.grid.feature.Summary'
    ],
    controller: 'quanlydonmuahang',
    viewModel: {
        type: 'quanlydonmuahang'
    },
    cls: 'tabMain',
    height: window.innerHeight - 65,
    bodyStyle: { 'background-color': '#f6f6f6', 'padding': '0px 0px 0px 5px' },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'panel',
        reference: 'panelDonHang',
        flex: 1,
        ui: 'light',
        title: 'Đơn mua hàng',
        iconCls: 'fa fa-file-text-o',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'grid',
            layout: 'fit',
            ui: 'light',
            reference: 'dsDonHang',
            flex: 1,
            bind: {
                store: '{storeDonHang}',
                selection: '{selectionDonHang}'
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
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    //if (record.get('soLuongPhieuNhap') > 0) {
                    //    return '<a style="color:blue;cursor: pointer;" title="' + app.localize('CMMSDMKhoThongTinPhieuXuat') + '"><span class="fa fa-eye"></span></a>';
                    //}
                    return "";
                }
            }, {
                xtype: 'datecolumn',
                text: 'Ngày lên đơn',
                dataIndex: 'date',
                width: 140,
                align: 'center',
                format: 'd/m/Y'
            }, {
                xtype: 'gridcolumn',
                text: 'Số đơn hàng',
                dataIndex: 'code',
                sortable: true,
                width: 120
            }, {
                xtype: 'gridcolumn',
                text: 'Người mua',
                dataIndex: 'userName',
                sortable: true,
                flex: 1
            }, {
                xtype: 'gridcolumn',
                text: 'Đơn vị cung cấp',
                dataIndex: 'suplierName',
                sortable: true,
                flex: 1
            }, {
                xtype: 'gridcolumn',
                text: 'Lý do',
                dataIndex: 'nameOfOrder',
                sortable: true,
                flex: 1
            }, {
                xtype: 'gridcolumn',
                text: 'Tình trạng đơn',
                dataIndex: 'status',
                width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    if (value == null || value == 0) {
                        return '<div style="float: none;min-width:90px;" class="status assignment metadata-cell unassigned">' + 'Chờ duyệt' + '</div>'
                    } else if (value == 1) {
                        return '<div style="float: none;min-width:90px;" class="status assignment metadata-cell completed">' + 'Hoàn thành' + '</div>'
                    } else if (value == 2) {
                        return '<div style="float: none;min-width:90px;" class="status assignment metadata-cell khongduyet">' + 'Từ chối' + '</div>'
                    } else if (value == 3) {
                        return '<div style="float: none;min-width:90px;" class="status assignment metadata-cell phieudong">' + 'Phiếu đóng' + '</div>'
                    }
                }
            }],
            viewConfig: {
                emptyText: 'Chưa có dữ liệu'
            },
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
                        margin: '5 0 5 0',
                        labelAlign: 'right'
                    },
                    items: [{
                        xtype: 'combo',
                        reference: 'cbkho',
                        bind: {
                            store: '{storeKhoNhap}',
                            value: '{recordTK.storeroomId}'
                        },
                        labelWidth: 80,
                        width: 280,
                        fieldLabel: 'Kho',
                        queryMode: 'local',
                        displayField: 'displayName',
                        valueField: 'id',
                        forceSelection: true,
                        editable: false
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Số đơn hàng',
                        bind: '{recordTK.code}',
                        labelWidth: 110,
                        flex: 1,
                        cls: "EnterToTab",
                        listeners: {
                            specialkey: 'specialkey'
                        }
                    }, {
                        xtype: 'combo',
                        fieldLabel: 'Tình trạng đơn',
                        labelWidth: 105,
                        width: 245,
                        displayField: 'name',
                        bind: '{recordTK.status}',
                        valueField: 'value',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [{ value: "tatca", name: 'Tất cả' },
                            { value: "0", name: 'Chờ duyệt' },
                            { value: "1", name: 'Hoàn thành' },
                            { value: "2", name: 'Từ chối' },
                            { value: "3", name: 'Phiếu đóng' }]
                        }),
                        triggerAction: 'all',
                        queryMode: 'local',
                        editable: false
                    }, {
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
                        handler: 'onTimKiemDonHang',
                        ui: 'soft-blue',
                    }]
                }]
            }],
            listeners: {
                selectionchange: 'onChangeGridDonHang',
                //cellclick: 'cellDonHang'
            }
        }, {
            xtype: 'grid',
            reference: 'dsPhieuChiTiet',
            ui: 'light',
            border: true,
            title: 'Danh sách vật tư',
            iconCls: 'fa fa-list-alt',
            columnLines: true,
            height: 300,
            features: [{
                ftype: 'summary',
                dock: 'bottom'
            }],
            bind: {
                store: '{storeDonHangChiTiet}',
                selection: '{selectionPhieuNhapXuatChiTiet}'
            },
            layout: 'fit',
            columns: [{
                xtype: 'rownumberer',
                text: '#',
                width: 40,
                align: 'center'
            }, {
                header: 'Mã - Tên',
                dataIndex: 'tenVatTu1',
                cellWrap: true,
                flex: 1,
                summaryType: 'count',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '(' + value + ' ' + "Vật tư" + ')' : '(1 ' + "Vật tư" + ')');
                }
            }, {
                text: 'Đơn vị tính',
                dataIndex: 'unit',
                border: 1,
                style: 'text-align:center',
                width: 100
            }, {
                text: 'Số lượng',
                dataIndex: 'quantity',
                border: 1,
                style: 'text-align:center',
                align: 'right',
                width: 100,
                summaryType: 'sum',
                renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                    if (value != undefined && value != null) {
                        return app.mUtils.fnFormatCurrency(value, 2);
                    }
                },
                summaryRenderer: function (value, summaryData, dataIndex) {
                    if (value != undefined && value != null) {
                        return app.mUtils.fnFormatCurrency(value, 2);
                    }
                }

            }, {
                xtype: 'numbercolumn',
                text: 'Đơn giá',
                dataIndex: 'price',
                style: 'text-align:center',
                align: 'right',
                border: 1,
                width: 125,
                renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                    if (value != undefined && value != null) {
                        return app.mUtils.fnFormatCurrency(value, 2);
                    }
                }
            }, {
                xtype: 'numbercolumn',
                text: 'Thành tiền',
                dataIndex: 'total',
                border: 1,
                style: 'text-align:center',
                align: 'right',
                width: 145,
                renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                    if (value != undefined && value != null) {
                        return app.mUtils.fnFormatCurrency(value, 2);
                    }
                },
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    if (value != undefined && value != null) {
                        return app.mUtils.fnFormatCurrency(value, 2);
                    }
                }
            }, {
                text: 'Ghi chú',
                dataIndex: 'description',
                border: 1,
                width: 220,
                editor: {
                    xtype: 'textfield',
                    name: 'ghichu'
                }
            }],
            lockedGridConfig: {
                header: false,
                collapsible: true,
                width: 300,
                forceFit: true
            },
            lockedViewConfig: {
                scroll: 'horizontal'
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
                    reference: 'btnThemDonHang',
                    text: 'Thêm',
                    ui: 'soft-blue',
                    //bind: {
                    //    disabled: '{!recordTK.kho>0}'
                    //},
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.MuaHang.Edit') || abp.auth.hasPermission('CMMS.Inventory.MuaHang.Manager')),
                    tooltip: 'Thêm mới dữ liệu',
                    handler: 'onThemDonHang'
                }, {
                    xtype: 'button',
                    iconCls: 'fa fa-pencil',
                    reference: 'btnSuaDonMuaHang',
                    bind: {
                        disabled: '{selectionDonHang.status == 3}'
                    },
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.MuaHang.Edit') || abp.auth.hasPermission('CMMS.Inventory.MuaHang.Manager')),
                    text: 'Sửa',
                    ui: 'soft-blue',
                    tooltip: 'Sửa',
                    handler: 'onSuaPhieuDonHang'
                }, {
                    xtype: 'button',
                    iconCls: 'fa fa-minus',
                    reference: 'btnHuyDonMuaHang',
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.MuaHang.Edit') || abp.auth.hasPermission('CMMS.Inventory.MuaHang.Manager')),
                    text: 'Xoá',
                    ui: 'soft-red',
                    tooltip: 'Xoá',
                    handler: 'onHuy'
                }, {
                    xtype: 'button',
                    iconCls: 'fa fa-puzzle-piece',
                    text: 'Tiện ích',
                    ui: 'soft-blue',
                    tooltip: 'Tiện ích',
                    menu: new Ext.menu.Menu({
                        items: [{
                            reference: 'btnChuyenTrangThai',
                            text: 'Chuyển trạng thái',
                            iconCls: 'x-fa fa-plus',
                            bind: {
                                disabled:'{selectionDonHang.status == 1}' || '{ selectionDonHang.status == 3 }'
                            },
                            hidden: !(app.session.isAdmin),
                            ui: 'soft-blue',
                            tooltip: 'Chuyển trạng thái phiếu',
                            handler: 'onChuyenTrangThai'
                        }, {
                            xtype: 'menuseparator'
                        }, {
                            text: 'Phiếu nhập kho',
                            iconCls: 'x-fa fa-check-circle-o',
                            ui: 'soft-blue',
                            bind: {
                                disabled:'{selectionDonHang.status!=1}' || '{ selectionDonHang.status == 3 }'
                            },
                            hidden: !(app.session.isAdmin),
                            disabled: true,
                            tooltip: 'Phiếu nhập kho',
                            reference: 'btnPhieuNhapKho',
                            handler: 'onPhieuNhapKho'
                        }, {
                            text: 'Tìm phiếu đóng',
                            iconCls: 'x-fa fa-search',
                            ui: 'soft-blue',
                            tooltip: 'Tìm phiếu đóng',
                            handler: 'onTimPhieuDongDonHang'
                        }]
                    })
                }, {
                    width: 20,
                    padding: '0 0 0 0',
                    height: 20,
                    margin: '0 5 0 5',
                    cls: 'TTPhieuCho',
                    tooltip: 'Chờ duyệt'
                }, {
                    width: 20,
                    height: 20,
                    padding: '0 0 0 0',
                    cls: 'TTPhieuDaDuyet',
                    margin: '0 5 0 0',
                    tooltip: 'Hoàn thành'
                }, {
                    width: 20,
                    padding: '0 0 0 0',
                    height: 20,
                    hidden: true,
                    cls: 'TTDaNhapDaXuat',
                    margin: '0 5 0 0',
                    tooltip: 'Đơn đã nhập kho'
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
                        store: '{storeDonHang}'
                    },
                    style: "padding: 0px !important",
                    beforePageText: "Trang",
                    //afterPageText: "của {0}",
                    displayMsg: "{0} - {1} của {2}",
                }]
            }]
        }]
    }, {
        xtype: 'panel',
        flex: 1,
        reference: 'panelDonDeXuatMuaHang',
        ui: 'light',
        title: 'Đề xuất mua hàng',
        iconCls: 'fa fa-th-list',
        hidden: true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'grid',
            layout: 'fit',
            ui: 'light',
            reference: 'dsDonDeXuatHang',
            flex: 1,
            bind: {
                store: '{storeDonDeXuatMuaHang}',
                selection: '{selectionDonDeXuatMuaHang}'
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
                text: 'Ngày lên đơn',
                dataIndex: 'ngayDeXuat',
                width: 140,
                align: 'center',
                style: 'text-align:right',
                format: 'd/m/Y'
            }, {
                xtype: 'gridcolumn',
                text: 'Số phiếu',
                dataIndex: 'soPhieu',
                sortable: true,
                width: 120
            }, {
                xtype: 'gridcolumn',
                text: 'Người đề xuất',
                dataIndex: 'tenNguoiDeXuat',
                sortable: true,
                flex: 1
            }, {
                xtype: 'gridcolumn',
                text: 'Người phê duyệt',
                dataIndex: 'tenNguoiPheDuyet',
                sortable: true,
                flex: 1
            }, {
                xtype: 'gridcolumn',
                text: 'Lý do',
                dataIndex: 'lyDo',
                sortable: true,
                flex: 1
            }, {
                xtype: 'gridcolumn',
                text: 'Tình trạng đơn',
                dataIndex: 'trangThai',
                width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //if (value == null || value == 0) {
                    //    return '<div style="float: none;min-width:90px;" class="status assignment metadata-cell unassigned">' + app.localize('CMMSDMKhoTrangThaiDuyetChoDuyet') + '</div>'
                    //} else if (value == 1) {
                    //    return '<div style="float: none;min-width:90px;" class="status assignment metadata-cell completed">' + app.localize('CMMSDMKhoTrangThaiDuyetDaDuyet') + '</div>'
                    //} else if (value == 2) {
                    //    return '<div style="float: none;min-width:90px;" class="status assignment metadata-cell khongduyet">' + app.localize('CMMSDMKhoTrangThaiDuyetKhongDuyet') + '</div>'
                    //} else if (value == 3) {
                    //    return '<div style="float: none;min-width:90px;" class="status assignment metadata-cell dong">' + app.localize('CMMSDMKhoTrangThaiPhieuDong') + '</div>'
                    //}
                }
            }],
            viewConfig: {
                emptyText: 'Chưa có dữ liệu'
            },
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
                        reference: 'cbkhoDeXuat',
                        bind: {
                            store: '{storeKhoDeXuatMua}',
                            value: '{recordTKDX.kho}'
                        },
                        labelWidth: 80,
                        width: 280,
                        fieldLabel: 'Kho',
                        queryMode: 'local',
                        displayField: 'moTa',
                        valueField: 'id',
                        forceSelection: true,
                        editable: false
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Số phiếu',
                        bind: '{recordTKDX.sophieu}',
                        labelWidth: 110,
                        flex: 1,
                        cls: "EnterToTab",
                        listeners: {
                            specialkey: 'specialkeyDX'
                        }
                    }, {
                        xtype: 'combo',
                        fieldLabel: 'Tình trạng đơn',
                        labelWidth: 105,
                        width: 245,
                        displayField: 'name',
                        bind: '{recordTKDX.tinhtrangdon}',
                        valueField: 'value',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [{ value: "tatca", name: 'Tất cả' },
                            { value: "0", name: 'Chờ duyệt' },
                            { value: "1", name: 'Đã duyệt' },
                            { value: "2", name: 'Từ chối' },
                            { value: "3", name: 'Phiếu đóng' }]
                        }),
                        triggerAction: 'all',
                        queryMode: 'local',
                        editable: false
                    }, {
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
                        handler: 'onTimKiemDonDeXuatDonHang'
                    }]
                }]
            }],
            listeners: {
                selectionchange: 'onChangeGridDonDeXuatMuaHang'
            }
        }, {
            xtype: 'grid',
            reference: 'dsPhieuChiTietDeXuat',
            ui: 'light',
            border: true,
            title: 'Danh sách vật tư',
            iconCls: 'fa fa-list-alt',
            columnLines: true,
            height: 300,
            features: [{
                ftype: 'summary',
                dock: 'bottom'
            }],
            bind: {
                store: '{storeDonDeXuatMuaHangChiTiet}',
                selection: '{selectionPhieuNhapXuatChiTiet}'
            },
            layout: 'fit',
            columns: [{
                xtype: 'rownumberer',
                text: '#',
                width: 40,
                align: 'center'
            }, {
                header: 'Mã - Tên',
                dataIndex: 'tenVatTu1',
                cellWrap: true,
                flex: 1,
                summaryType: 'count',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    //return ((value === 0 || value > 1) ? '(' + value + ' ' + app.localize('CMMSDMKhoVatTu') + ')' : '(1 ' + app.localize('CMMSDMKhoVatTu') + ')');
                }
            }, {
                text: 'Đơn vị tính',
                dataIndex: 'donViTinhThuc',
                border: 1,
                style: 'text-align:center',
                width: 100
            }, {
                text: 'Số lượng',
                columns: [{
                    text: 'Đề xuất',
                    dataIndex: 'soLuong',
                    border: 1,
                    style: 'text-align:center',
                    align: 'right',
                    width: 100,
                    summaryType: 'sum',
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
                    text: 'Thực mua',
                    dataIndex: 'soLuongThuc',
                    border: 1,
                    style: 'text-align:center',
                    align: 'right',
                    width: 100,
                    summaryType: 'sum',
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
                    text: 'Tồn kho',
                    dataIndex: 'soLuongTrongKho',
                    border: 1,
                    hidden: true,
                    style: 'text-align:center',
                    align: 'right',
                    width: 90
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
                width: 145,
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
                width: 220,
                editor: {
                    xtype: 'textfield',
                    name: 'ghichu'
                }
            }],
            lockedGridConfig: {
                header: false,
                collapsible: true,
                width: 300,
                forceFit: true
            },
            lockedViewConfig: {
                scroll: 'horizontal'
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
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Manager') || abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Edit')),
                    tooltip: 'Thêm mới dữ liệu',
                    //bind: {
                    //    disabled: '{!recordTKDX.kho>0}'
                    //},
                    handler: 'onThemDonDeXuatHang'
                }, {
                    xtype: 'button',
                    iconCls: 'fa fa-pencil',
                    reference: 'btnSuaPhieuDeXuat',
                    bind: {
                        disabled: '{!selectionDonDeXuatMuaHang}' && '{!recordTKDX.kho>0}'
                    },
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Manager') || abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Edit')),
                    text: 'Sửa',
                    ui: 'soft-blue',
                    tooltip: 'Sửa',
                    handler: 'onSuaPhieuDeXuatDonHang'
                }, {
                    xtype: 'button',
                    iconCls: 'fa fa-minus',
                    reference: 'btnHuyPhieuDeXuat',
                    //bind: {
                    //    disabled: '{!selectionDonDeXuatMuaHang}' && '{!recordTKDX.kho>0}'
                    //},
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Manager') || abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Edit')),
                    text: 'Xoá',
                    ui: 'soft-red',
                    tooltip: 'Xoá',
                    handler: 'onHuyDeXuat'
                }, {
                    xtype: 'button',
                    iconCls: 'fa fa-puzzle-piece',
                    text: 'Tiện ích',
                    ui: 'soft-blue',
                    tooltip: 'Tiện ích',
                    menu: new Ext.menu.Menu({
                        items: [{
                            text: 'Chuyển trạng thái',
                            reference: 'btnChuyenTrangThaiDX',
                            iconCls: 'x-fa fa-plus',
                            //bind: {
                            //    disabled: '{!selectionDonDeXuatMuaHang}' && '{!recordTKDX.kho>0}',
                            //    hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Manager'))
                            //},
                            ui: 'soft-blue',
                            tooltip: 'Chuyển trạng thái phiếu',
                            handler: 'onChuyenTrangThaiDeXuat'
                        }, {
                            xtype: 'menuseparator'
                        }, {
                            text: 'Tạo đơn mua hàng',
                            iconCls: 'x-fa fa-check-circle-o',
                            ui: 'soft-blue',
                            //bind: {
                            //    disabled: '{!recordTKDX.kho>0}' && '{selectionDonDeXuatMuaHang.trangThai!=1}',
                            //    hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Manager'))
                            //},
                            disabled: true,
                            tooltip: 'Tạo đơn mua hàng',
                            handler: 'onTaoDonMuaHang'
                        }, {
                            xtype: 'menuseparator'
                        }, {
                            text: 'In phiếu',
                            reference: 'btnInDX',
                            iconCls: 'x-fa fa-print',
                            ui: 'soft-blue',
                            //bind: {
                            //    disabled: '{!selectionDonDeXuatMuaHang}' && '{selectionDonDeXuatMuaHang.trangThai!=1}',
                            //    hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Manager') || abp.auth.hasPermission('CMMS.Inventory.DeXuatMuaHang.Edit'))
                            //},
                            tooltip: 'In phiếu',
                            handler: 'onInPhieuDXuat'
                        }, {
                            xtype: 'menuseparator'
                        }, {
                            text: 'Tìm phiếu đóng',
                            iconCls: 'x-fa fa-search',
                            ui: 'blue',
                            tooltip: 'Tìm phiếu đóng',
                            handler: 'onTimPhieuDong'
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
                    hidden: true,
                    cls: 'TTDaNhapDaXuat',
                    margin: '0 5 0 0',
                    tooltip: 'Đơn đã nhập kho'
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
                        store: '{storeDonDeXuatMuaHang}'
                    },
                    style: "padding: 0px !important",
                    beforePageText: "Trang",
                    //afterPageText: "của {0}",
                    displayMsg: "{0} - {1} của {2}",
                }]
            }]
        }]
    }],
    listeners: {
        afterRender: 'onAfterrender',
        tabchange: 'changeTab'
    }
});

//var _cMMSKhoDonMuaHang = abp.services.app.cMMSKhoDonMuaHang;
//var _cMMSKhoDonMuaHangChiTiet = abp.services.app.cMMSKhoDonMuaHangChiTiet;
//var _cMMSKhoChuyenTrangThai = abp.services.app.cMMSKhoChuyenTrangThai;
//var _cMMSKhoPhieuDeXuatMuaHang = abp.services.app.cMMSKhoDeXuatMuaHang;
//var _cMMSKhoPhieuDeXuatMuaHangChiTiet = abp.services.app.cMMSKhoDeXuatMuaHangChiTiet;
Ext.define('Admin.view.quanlydonmuahang.quanLyDonMuaHangController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.quanlydonmuahang',
    ref: null,
    storeinfo: null,
    sDATE: null,
    eDATE: null,
    dataFields: null,
    selectDonHang: false,
    sDATECreate: null,
    eDATECreate: null,
    activeT: null,
    init: function () {
        var me = this;
        me.callParent(arguments);
    },

    //changeTab: function (obj, newValue, oldValue, eOpts) {
    //    var me = this;
    //    if (obj.activeTab.reference == "panelDonDeXuatMuaHang" && me.activeT == null) {
    //        var dStart = app.gplatformconsts.sDate;//moment().startOf('month');
    //        var dEnd = app.gplatformconsts.eDate;//moment().endOf('month');
    //        app.gplatformutils.createDateRangeExtent('DonDeXuatMuaHang', me, dStart, dEnd, function () { me.onTimKiemDonDeXuatDonHang() });
    //        $('.daterangepicker').css('display', 'none');
    //        var recordTKDX = me.getViewModel().data.recordTKDX;
    //        recordTKDX.set('tinhtrangdon', 'tatca');
    //        me.onTimKiemDonDeXuatDonHang();
    //        me.activeT = true;
    //    }
    //},

    onAfterrender: function () {
        var me = this;
        me.ref = me.getReferences();
        me.storeinfo = me.getViewModel().storeInfo;
        //var dStart = app.gplatformconsts.sDate;//moment().startOf('month');
        //var dEnd = app.gplatformconsts.eDate;//moment().endOf('month');
        //app.gplatformutils.createDateRange('DonMuaHang', me, dStart, dEnd, function () { });
        //$('.daterangepicker').css('display', 'none');
        me.loadKho();
        var recordTK = me.getViewModel().data.recordTK;
        recordTK.set('status', 'tatca');
        //recordTK.set('tungay', app.gplatformutils.getstartDate());
        //recordTK.set('denngay', app.gplatformutils.getendDate());
        //recordTK.set('loaingay', "thoigian");

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

    loadKho: function (fnSauKhiLoad) {
        var me = this;
        var store = me.storeinfo.storeKhoNhap;
        var url = "api/Storeroom?page=1&start=0&limit=25";
        store.proxy.api.read = url;
        store.pageSize = 500;
        store.proxy.pageParam = undefined;
        store.proxy.limitParam = undefined;
        store.proxy.startParam = undefined;
        store.load({
            params: {
                skipCount: 0,
                limit: store.pageSize
            },
            scope: this,
            callback: function (records, operation, success) {
                if (records == null) {
                    store.removeAll();
                }
            }
        });
        var me = this;
        var recordTK = me.getViewModel().data.recordTK;
        var recordTKDX = me.getViewModel().data.recordTKDX;
        var store = me.storeinfo.storeKhoNhap;
        var storeKhoDeXuatMua = me.storeinfo.storeKhoDeXuatMua;
        var url = "api/Storeroom?page=1&start=0&limit=25";
        storeKhoDeXuatMua.proxy.api.read = url;
        storeKhoDeXuatMua.load({
            scope: this,
            callback: function (records, operation, success) {
                store.loadRecords(records);
                if (records.length > 0) {
                    recordTK.set('storeroomId', records[0].get('id'));
                    recordTKDX.set('storeroomId', records[0].get('id'));
                }
                recordTKDX.set('status', 'tatca');
                //recordTKDX.set('denngay', app.gplatformutils.getendDate());
                //recordTK.set('phanloai', 'tatca');
                //recordTK.set('denngay', app.gplatformutils.getendDate());
                me.onTimKiemDonHang();
                var idUrl = app.mUtils.getUrlVars()["id"];
                if (idUrl && idUrl != "") {
                    var maPDX = idUrl.split("#");
                    if (maPDX.length > 0 && isNaN(parseInt(maPDX[0])) == false) {
                        me.getView().setActiveItem(1);
                        me.onChiTietPhieuDeXuatDonHang(maPDX[0]);
                    }
                }
                me.getView().setLoading(false);
            }
        });
    },

    onTimKiemDonHang: function () {
        var me = this;
        me.storeinfo.storeDonHangChiTiet.loadData([]);
        me.loadDonHang();
    },

    specialkey: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.loadDonHang();
        }
    },

    onTimPhieuDongDonHang: function () {
        var me = this;
        me.loadDonHang(true);
    },

    loadDonHang: function (phieudong) {
        var me = this;
        var recordTK = me.getViewModel().data.recordTK;
        var filter = {};
        me.selectDonHang = false;
        if (recordTK.get('storeroomId')) {
            filter.storeroomId = recordTK.get('storeroomId')
        }
        if (recordTK.get('code')) {
            filter.code = recordTK.get('code')
        }
        if (recordTK.get('status') && recordTK.get('status') != 'tatca') {
            filter.status = recordTK.get('status')
        }
        //if (recordTK.get('sophieu')) {
        //    filter.push({ name: "filter", value: recordTK.get('sophieu') });
        //}
        //if (!phieudong) {
        //    filter.push({ name: "TinhTrangDong", value: 3 });
        //    if (recordTK.get('tinhtrangdon') && recordTK.get('tinhtrangdon') != 'tatca') {
        //        filter.push({ name: "tinhTrangDon", value: recordTK.get('tinhtrangdon') });
        //    }
        //} else {
        //    filter.push({ name: "tinhTrangDon", value: 3 });
        //}
        //if (recordTK.get('kho')) {
        //    filter.push({ name: "maKho", value: recordTK.get('kho') });
        //}
        //var dStart = Ext.Date.format(new Date(me.sDATE), 'Y/m/d 00:00:00.000');
        //var dEnd = Ext.Date.format(new Date(me.eDATE), 'Y/m/d 23:59:59.999');
        //if (me.sDATE != "") {
        //    filter.push({ name: "ngayDonHangStart", value: dStart });
        //}
        //if (me.eDATE != "") {
        //    filter.push({ name: "ngayDonHangEnd", value: dEnd });
        //}
        var store = me.storeinfo.storeDonHang;
        var query = app.mUtils.fnBuildQueryString(filter);
        var url = "api/PurchaseOrder?page=1&start=0&limit=25&" + query;
        store.proxy.api.read = url;
        store.proxy.pageParam = undefined;
        store.proxy.limitParam = undefined;
        store.proxy.startParam = undefined;
        store.load({
            //params: {
            //    skipCount: 0,
            //    maxResultCount: store.pageSize
            //},
            scope: this,
            callback: function (records, operation, success) {
                console.log(records)
                if (records.length == 0) {
                    me.ref.btnHuyDonMuaHang.setDisabled(true);
                    me.ref.btnChuyenTrangThai.setDisabled(true);
                    me.ref.btnPhieuNhapKho.setDisabled(true);
                    //me.ref.btnInPhieu.setDisabled(true);
                    me.ref.btnSuaDonMuaHang.setDisabled(true);
                    var storeDonHangChiTiet = me.storeinfo.storeDonHangChiTiet;
                    storeDonHangChiTiet.removeAll();
                } else {
                    me.ref.btnHuyDonMuaHang.setDisabled(false);
                    me.ref.btnPhieuNhapKho.setDisabled(false);
                    //me.ref.btnInPhieu.setDisabled(false);
                    me.ref.btnChuyenTrangThai.setDisabled(false);
                    me.ref.btnSuaDonMuaHang.setDisabled(false);
                    me.ref.dsDonHang.getSelectionModel().select(0);
                    if (me.selectDonHang == false && me.ref.dsDonHang.getSelectionModel().getSelection().length > 0) {
                        me.loadChiTietPhieu(me.ref.dsDonHang.getSelectionModel().getSelection()[0].data.id);
                    }
                }
            }
        });
    },

    onChangeGridDonHang: function (grid, selected, eOpts) {
        var me = this;
        me.selectDonHang = true;
        var storeDH = me.storeinfo.storeDonHangChiTiet;
        if (selected.length == 0) {
            storeDH.loadData([]);
            return;
        }
        //me.ref.btnSuaDonMuaHang.setVisible(abp.auth.hasPermission('CMMS.Inventory.MuaHang.Manager') || abp.auth.hasPermission('CMMS.Inventory.MuaHang.Edit'));
        me.ref.btnHuyDonMuaHang.setVisible(app.session.isAdmin);
        me.ref.btnSuaDonMuaHang.setText("Sửa")
        if (selected[0].get('status') == 1) {
            me.ref.btnSuaDonMuaHang.setText("Xem")
            me.ref.btnHuyDonMuaHang.setVisible(false);
        }
        me.loadChiTietPhieu(selected[0].data.id);
    },

    //cellDonHang: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    //    var me = this;
    //    if (e.target.className == 'fa fa-eye') {
    //        var wnd = Ext.create('Admin.view.quanlydonmuahang.DanhSachNhapKhoDonMuaHang', {
    //            title: app.localize("CMMSDMKhoThongTinPhieuNhap"),
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

    loadChiTietPhieu: function (maPhieu) {
        var me = this;
        var store = me.storeinfo.storeDonHangChiTiet;
        if (maPhieu == null || maPhieu == '') {
            store.loadData([]);
            return;
        }
        //var filter = [{ name: 'maPhieu', value: maPhieu }];
        //var query = abp.utils.buildQueryString(filter);
        var url = "api/PurchaseOrder/PurchaseId?PurchaseId=" + maPhieu;
        store.proxy.api.read = url;
        store.proxy.pageParam = undefined;
        store.proxy.limitParam = undefined;
        store.proxy.startParam = undefined;
        store.load({
            //params: {
            //    skipCount: 0,
            //    maxResultCount: store.pageSize
            //},
            scope: this,
            callback: function (records, operation, success) {
            }
        });
    },

    onThemDonHang: function () {
        var me = this;
        var nodesSelect = me.ref.cbkho.getSelection();
        var record = Ext.create('Admin.model.mDonHang');
        record.set('id', 0);
        record.set('phanLoai', "donhang");
        record.set('thoiGian', new Date());
        record.set('status', '0');
        record.set('storeroomId', nodesSelect.data.storeroomId);
        var title = "Thêm mới đơn mua hàng";
        var storeKho = app.mUtils.deepCloneStore(me.storeinfo.storeKhoNhap);
        var wnd = Ext.create('Admin.view.quanlydonmuahang.CNDonHang', {
            title: title,
            viewModel: {
                data: {
                    storeKho: storeKho,
                    recordPhieu: record,
                    fnSauKhiLoad: function () {
                        me.loadDonHang();
                    }
                }
            }
        });
        wnd.show();
    },

    onSuaPhieuDonHang: function () {
        var me = this;
        var title = "Sửa đơn mua hàng";
        var record = me.ref.dsDonHang.getSelectionModel().getSelection();
        console.log(record)
        var storeKho = app.mUtils.deepCloneStore(me.storeinfo.storeKhoNhap);
        var wnd = Ext.create('Admin.view.quanlydonmuahang.CNDonHang', {
            title: title,
            viewModel: {
                data: {
                    storeKho: storeKho,
                    recordPhieu: record[0],
                    fnSauKhiLoad: function () {
                        me.loadDonHang();
                    }
                }
            }
        });
        wnd.show();
    },

    onChuyenTrangThai: function () {
        var me = this;
        var nodesSelect = me.ref.dsDonHang.getSelectionModel().getSelection();
        var record = Ext.create('Admin.model.mKhoChuyenTrangThai');
        record.set('id', 0);
        record.set('maPhieu', nodesSelect[0].data.id);
        record.set('tenNguoiThucHien', 'Quản trị');
        //record.set('nguoiThucHien', app.session.user.id);
        record.set('trangThaiCu', nodesSelect[0].data.tinhTrangDon == null || nodesSelect[0].data.tinhTrangDon == "" ? 0 : nodesSelect[0].data.tinhTrangDon);
        var dataTT = []
        //if (abp.auth.hasPermission('CMMS.Inventory.MuaHang.Manager')) {
        //    dataTT = [{ matrangthai: 0, tentrangthai: app.localize("CMMSDMKhoTrangThaiDuyetChoDuyet") },
        //    { matrangthai: 1, tentrangthai: app.localize('CMMSDMKhoTrangThaiDuyetDaHoanThanh') },
        //    { matrangthai: 2, tentrangthai: app.localize('CMMSDMKhoTrangThaiDuyetKhongDuyet') },
        //    { matrangthai: 3, tentrangthai: app.localize('CMMSDMKhoTrangThaiPhieuDong') }]
        //}
        //var dataTTCu = [{ matrangthai: 1, tentrangthai: app.localize("CMMSDMKhoTrangThaiDuyetDaHoanThanh") },
        //{ matrangthai: 2, tentrangthai: app.localize("CMMSDMKhoTrangThaiDuyetKhongDuyet") },
        //{ matrangthai: 3, tentrangthai: app.localize("CMMSDMKhoTrangThaiPhieuDong") },
        //{ matrangthai: 0, tentrangthai: app.localize("CMMSDMKhoTrangThaiDuyetChoDuyet") }]
        dataTT = [{ value: "0", name: 'Chờ duyệt' },
        { value: "1", name: 'Hoàn thành' },
        { value: "2", name: 'Từ chối' },
        { value: "3", name: 'Phiếu đóng' }]

        var dataTTCu = [{ value: "0", name: 'Chờ duyệt' },
        { value: "1", name: 'Hoàn thành' },
        { value: "2", name: 'Từ chối' }]
        var title = 'Thay đổi trạng thái phiếu' + ": " + nodesSelect[0].data.code + "";
        var wnd = Ext.create('Admin.view.quanlydonmuahang.CNThayDoiTrangThai', {
            title: title,
            viewModel: {
                data: {
                    record: record,
                    dataTT: dataTT,
                    dataTTCu: dataTTCu,
                    fnSauKhiLoad: function () {
                        me.onTimKiemDonHang();
                    }
                }
            }
        });
        wnd.show();
    },

    //onInPhieuDonHang: function () {
    //    var me = this;
    //    var record = me.ref.dsDonHang.getSelectionModel().getSelection();
    //    var url = abp.appPath + "CMMSImportExport/InPhieuDonMuaHang?id=" + record[0].get('id');;
    //    window.location.href = url;
    //},

    onPhieuNhapKho: function () {
        var me = this;
        var grid = me.ref.dsDonHang;
        var rowselected = grid.getSelectionModel().getSelection();
        if (rowselected[0].get('status') != 1) {
            toastr.warning('Phiếu này không thể thực hiện nhập kho!');
            return;
        }
        var record = Ext.create('Admin.model.mPhieuNhapXuatChiTiet');
        record.set('id', 0);
        record.set('inputCode', 'P' + new Date().getTime())
        record.set('dateInput', new Date());
        record.set('dateStatus', new Date());
        record.set('storeroomId', rowselected[0].get('storeroomId'));
        record.set('shipper', 'Nhân viên')
        record.set('deliveryUnit', 'Công ty vận tải Kiến Vàng')
        record.set('phanLoai', 'nhapkho');
        record.set('userId', rowselected[0].get('userId'));
        var storesVM = me.storeinfo.storeDonHangChiTiet;
        var dataVatTu = [];
        var data = storesVM.data.items;
        var listid = "";
        for (var i = 0; i < data.length; i++) {
            var obj = {};
            obj['materialCode'] = data[i].data.materialCode;
            obj['materialName'] = data[i].data.materialName;
            obj['displayName'] = data[i].data.materialName;
            obj['materialId'] = data[i].data.materialId;
            obj['quantity'] = data[i].get('quantity');
            obj['price'] = data[i].data.price;
            obj['storeroomId'] = rowselected[0].get('storeroomId');
            dataVatTu.push(obj);
            if (listid != "") listid += ","
            listid += data[i].data.maVatTu;
        }
        var dataToSave = record.data;
        dataToSave.materialInput = dataVatTu;
        console.log(dataToSave)
        var url = "api/Material/GetMaterialToAdd?page=1&start=0&limit=25&StoreroomId=" + dataToSave.storeroomId;
        app.mUtils.fnGETAjax(url, function (response) {
            var notify = [];
            var material = response.items.map(x => x.id);
            dataToSave.materialInput.forEach(function (item) {
                if (material.includes(item.materialId)) {
                    notify.push(item.materialName)
                }
            })
            if (notify.length != 0) {
                toastr.warning(notify.join(',') + 'chưa có trong kho vật tư')
                return;
            }
            me.getView().setLoading("Đang tiến hành nhập kho");
            var url = "/api/Input";
            app.mUtils.fnPOSTAjax(url, dataToSave, function (res) {
                console.log(res);
                if (res == -1) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Oops...',
                        text: 'Mã phiếu đã tồn tại!',
                    })
                    me.getView().setLoading(false);
                    return;
                }
                var urlStt = 'api/PurchaseOrder/status/' + rowselected[0].id + '/3'
                app.mUtils.fnPUTAjax(urlStt, obj, function (response) {
                    setTimeout(function () {
                        me.getView().setLoading(false);
                        toastr.success("Nhập kho thành công");
                        me.onTimKiemDonHang()
                    }, 2000)
                })
                //
                dataToSave.materialInput.forEach(function (el) {
                    var url = "/api/Material/materialStoreroom/quantity"
                    app.mUtils.fnPUTAjax(url, el, function (response) {
                        console.log(response)
                    })
                })
            });
            console.log(response)
        })
    },

    onThemDonDeXuatHang: function () {
        var me = this;
        var nodesSelect = me.ref.cbkhoDeXuat.getSelection();
        var record = Ext.create('Admin.model.mDonDeXuatMuaHang');
        record.set('id', 0);
        record.set('ngayDeXuat', new Date());
        record.set('status', '0');
        record.set('storeroomId', nodesSelect.data.id);
        var title = 'Thêm đơn đề xuất mua hàng';
        var storeKho = app.mUtils.deepCloneStore(me.storeinfo.storeKhoNhap);
        var wnd = Ext.create('Admin.view.quanlydonmuahang.CNDonDeXuatHang', {
            title: title,
            viewModel: {
                data: {
                    storeKho: storeKho,
                    recordPhieu: record,
                    fnSauKhiLoad: function () {
                        me.loadDeXuatDonHang();
                    }
                }
            }
        });
        wnd.show();
    },

    onChuyenTrangThaiDeXuat: function () {
        var me = this;
        var nodesSelect = me.ref.dsDonDeXuatHang.getSelectionModel().getSelection();
        var record = Ext.create('Admin.model.mKhoChuyenTrangThai');
        record.set('id', 0);
        record.set('maPhieu', nodesSelect[0].data.id);
        record.set('phanLoai', 'dexuatmuahang');
        record.set('tenNguoiThucHien', app.session.user.name);
        record.set('nguoiThucHien', app.session.user.id);
        record.set('trangThaiCu', nodesSelect[0].data.trangThai == null || nodesSelect[0].data.trangThai == "" ? 0 : nodesSelect[0].data.trangThai);
        var dataTT = []
        if (abp.auth.hasPermission('CMMS.Inventory.MuaHang.Manager')) {
            dataTT = [
                { matrangthai: 3, tentrangthai: app.localize('CMMSDMKhoTrangThaiPhieuDong') },
                { matrangthai: 0, tentrangthai: app.localize("CMMSDMKhoTrangThaiDuyetChoDuyet") },
                { matrangthai: 1, tentrangthai: app.localize('CMMSDMKhoTrangThaiDuyetDaDuyet') },
                { matrangthai: 2, tentrangthai: app.localize('CMMSDMKhoTrangThaiDuyetKhongDuyet') }]
        }

        var title = app.localize("CMMSDMKhoThayDoiTrangThaiPhieu") + ": " + nodesSelect[0].data.soPhieu + "";
        var wnd = Ext.create('Admin.view.quanlydonmuahang.CNThayDoiTrangThai', {
            title: title,
            viewModel: {
                data: {
                    record: record,
                    dataTT: dataTT,
                    fnSauKhiLoad: function () {
                        me.onTimKiemDonDeXuatDonHang();
                    }
                }
            }
        });
        wnd.show();
    },

    //onInPhieuDXuat: function () {
    //    var me = this;
    //    var record = me.ref.dsDonDeXuatHang.getSelectionModel().getSelection();
    //    var url = abp.appPath + "CMMSImportExport/InPhieuDeXuatMuaHang?id=" + record[0].get('id');;
    //    window.location.href = url;
    //}
});
