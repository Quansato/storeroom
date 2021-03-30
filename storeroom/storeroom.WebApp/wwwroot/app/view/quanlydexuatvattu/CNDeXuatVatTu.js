Ext.define('Admin.view.quanlydexuatvattu.CNDeXuatVatTuModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.quanlydexuatvattu-mcndexuatvattu',
    data: {
        storeKho: null,
        recordPhieu: null,
        fnSauKhiLoad: null,
        selectionPhieuNhapXuatChiTiet: null,
        dataVatTu: [],
        recCongViec: null,
        dieuchuyen: false
    },
    stores: {
        storeKhoNhap: { type: 'skho', pageSize: 1000 },
        storePhieuXuatChiTiet: { type: 'sphieunhapxuatchitiet' },
        storeNguoiDeXuat: { type: 'skhonguoidung' },
        storeChuyenTrangThai: { type: 'skhochuyentrangthai' },
        storeNguoiDuyet: { type: 'skhonguoidung' }
    }
});
Ext.define('Admin.view.quanlydexuatvattu.CNDeXuatVatTu', {
    extend: 'Ext.window.Window',
    requires: [
        'Admin.view.quanlydexuatvattu.CNDeXuatVatTuController',
        'Admin.view.quanlydexuatvattu.CNDeXuatVatTuModel'
    ],
    controller: 'quanlydexuatvattu-ccndexuatvattu',
    viewModel: {
        type: 'quanlydexuatvattu-mcndexuatvattu'
    },
    width: 1150,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    iconCls: 'x-fa fa-bars',
    items: [{
        xtype: 'fieldcontainer',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        margin: '0 5 5 0',
        items: [{
            xtype: 'form',
            flex: 1,
            reference: 'frmPhieuDeXuat',
            bodyPadding: 0,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0 0 0 0',
                defaults: {
                    flex: 1
                },
                items: [{
                    xtype: 'combo',
                    margin: '5 10 0 5',
                    labelAlign: 'right',
                    reference: 'cbkho',
                    bind: {
                        store: '{storeKhoNhap}',
                        value: '{recordPhieu.maKhoXuat}'
                    },
                    labelWidth: 140,
                    fieldLabel: 'Kho' /*+ ' ' + app.gplatformconsts.var_required*/,
                    queryMode: 'local',
                    displayField: 'moTa',
                    valueField: 'id',
                    forceSelection: true,
                    editable: false,
                    allowBlank: false,
                    blankText: 'Kho',
                    //listeners: {
                    //    change: 'onChangeKho'
                    //}
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin: '0 0 0 0',
                    items: [{
                        xtype: 'textfield',
                        margin: '5 5 0 5',
                        labelAlign: 'right',
                        labelWidth: 115,
                        reference: 'txtSoPhieu',
                        fieldLabel: 'Số phiếu' /*+ ' ' + app.gplatformconsts.var_required*/,
                        bind: {
                            readOnly: '{!recordPhieu.id==0}',
                            value: '{recordPhieu.soPhieu}'
                        },
                        allowBlank: false,
                        flex: 1,
                        blankText: 'Số phiếu không được để trống',
                        //listeners: {
                        //    blur: "blurMa"
                        //}
                    }, {
                        margin: '5 5 0 0',
                        xtype: 'button',
                        bind: {
                            hidden: '{!recordPhieu.id==0}'
                        },
                        handler: 'onLaySoNhap',
                        text: 'Lấy số'
                    }]
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '5 0 0 0',
                defaults: {
                    flex: 1,
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'datefield',
                    labelWidth: 140,
                    margin: '0 5 0 5',
                    name: 'ngayhachtoan',
                    fieldLabel: 'Ngày đề xuất' /*+ ' ' + app.gplatformconsts.var_required*/,
                    bind: '{recordPhieu.ngayHachToan}',
                    allowBlank: false,
                    blankText: 'Chưa chọn ngày đề xuất',
                    format: 'd/m/Y',
                    flex: 1,
                    value: new Date()
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    padding: 0,
                    margin: '0 5 0 0',
                    items: [{
                        xtype: 'textfield',
                        labelAlign: 'right',
                        fieldLabel: 'Người đề xuất' /*+ ' ' + app.gplatformconsts.var_required*/,
                        allowBlank: false,
                        readOnly: true,
                        blankText: 'Chưa chọn người đề xuất',
                        margin: '5 5 0 0',
                        labelWidth: 125,
                        flex: 1,
                        bind: {
                            value: '{recordPhieu.tenNguoiDeXuat}'
                        }
                    }, {
                        margin: '5 0 0 0',
                        xtype: 'button',
                        reference: 'btnLayNguoiDung',
                        tooltip: 'Chọn người đề xuất',
                        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.NhapXuat.Manager')),
                        handler: 'onLayNguoiDung',
                        text: '...'
                    }]
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '5 0 0 0',
                defaults: {
                    flex: 1,
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'combo',
                    fieldLabel: 'Người duyệt',
                    displayField: 'fullName',
                    valueField: 'id',
                    bind: {
                        value: '{recordPhieu.nguoiPheDuyet}',
                        store: '{storeNguoiDuyet}'
                    },
                    triggerAction: 'all',
                    labelWidth: 140,
                    margin: '0 10 0 5',
                    editable: false,
                    queryMode: 'local',
                    forceSelection: true,
                    anyMatch: true
                }, { xtype: 'component', flex: 1 }]
            }, {
                xtype: 'textareafield',
                name: 'lydo',
                margin: '5 5 0 5',
                flex: 1,
                labelAlign: 'right',
                labelWidth: 140,
                bind: '{recordPhieu.lyDo}',
                fieldLabel: 'Lý do'
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: 0,
            width: 300,
            items: [{
                xtype: 'fieldset',
                title: 'Tìm kiếm vật tư',
                padding: '0 5 5 5',
                margin: 0,
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'displayfield',
                    labelAlign: 'top',
                    fieldCls: 'clsdisplayfield',
                    flex: 1,
                    fieldLabel: 'Mã phiếu(Đồng bộ mã phiếu trên di động đề nhập vật tư)'
                }, {
                    xtype: 'container',
                    flex: 1,
                    layout: 'hbox',
                    margin: '0 0 0 100',
                    items: [{
                        width: 80,
                        height: 80,
                        margin: '0 0 0 5',
                        xtype: 'component',
                        html: '<div id="idqrcodeDXVT"></div>'
                    }]
                }, {
                    xtype: 'displayfield',
                    labelAlign: 'top',
                    fieldCls: 'clsdisplayfield',
                    flex: 1,
                    margin: '5 0 5 5',
                    style: 'line-height: 24px;',
                    value: 'Nhập mã QRcode hoặc mã vật tư để tìm'
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'displayfield',
                        labelAlign: 'top',
                        fieldCls: 'clsdisplayfield'
                    },
                    items: [{
                        flex: 1,
                        xtype: 'textfield',
                        bind: {
                            readOnly: '{recordPhieu.trangThai==1}'
                            // disabled: '{!recordPhieu.id>0}'
                        },
                        reference: 'textNhapMaChungLoaiXuatKho',
                        listeners: {
                            specialkey: 'specialkeyThemChungLoai'
                        }
                    }, {
                        xtype: 'button',
                        ui: 'soft-blue',
                        align: 'center',
                        margin: '0 0 0 5',
                        bind: {
                            //   disabled: '{recordPhieu.id==0}',
                            hidden: '{recordPhieu.trangThai==1}'
                        },
                        iconCls: 'fa fa-search',
                        handler: "onTimKiemVT"
                    }]
                }]
            }]
        }]
    }, {
        xtype: 'grid',
        reference: 'dsPhieuXuatKhoChiTiet',
        title: 'Danh sách vật tư',
        iconCls: 'x-fa fa-list-alt',
        ui: 'light',
        style: 'border-top: 1px solid #d0d0d0;',
        height: 300,
        cls: 'topGrid',
        plugins: [{
            ptype: 'cellediting',
            clicksToMoveEditor: 1,
            clicksToEdit: 1,
            autoCancel: false,
            listeners: {
                edit: "onEditGrid"
            }
        }],
        header: {
            padding: 3,
            items: [{
                xtype: 'button',
                text:'Lịch sử trạng thái',
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.DeXuat.Manager')),
                handler: 'onLichSuThayDoiTrangThai',
                iconCls: 'x-fa fa-exchange',
                bind: {
                    disabled: '{!recordPhieu.id>0}'
                }
            }, {
                xtype: 'button',
                margin: '0 0 0 10',
                bind: {
                    hidden: '{recordPhieu.trangThai==1}'
                    // disabled: '{!recordPhieu.id>0}'
                },
                text: 'Thêm vật tư',
                reference: 'btnThemVatTu',
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.DeXuat.Manager')),
                handler: 'onTimKiemvatTuNangCao',
                iconCls: 'x-fa fa-plus'
            }]
        },
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
            header: 'Mã-Tên',
            dataIndex: 'tenVatTu1',
            cellWrap: true,
            flex: 1,
            summaryType: 'count',
            //summaryRenderer: function (value, summaryData, dataIndex) {
            //    return ((value === 0 || value > 1) ? '(' + value + ' ' + app.localize('CMMSDMKhoVatTu') + ')' : '(1 ' + app.localize('CMMSDMKhoVatTu') + ')');
            //}
        }, {
            text: 'Đơn vị tính',
            dataIndex: 'donViTinh',
            border: 1,
            style: 'text-align:center',
            align: 'left',
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
                editor: {
                    xtype: 'currencyfield',
                    fieldStyle: 'text-align: right;'
                },
                //renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
                //    if (value != undefined && value != null) {
                //        return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                //    }
                //},
                summaryType: 'sum',
                //summaryRenderer: function (value, summaryData, dataIndex) {
                //    if (value != undefined && value != null) {
                //        return app.gplatformutils.fnDinhDangSoThuc(value, 2);
                //    }
                //}
            },
            {
                text: 'Phê duyệt',
                dataIndex: 'soLuongThuc',
                border: 1,
                reference: 'clsoluongthuc',
                style: 'text-align:center',
                align: 'right',
                width: 105,
                editor: {
                    xtype: 'currencyfield',
                    fieldStyle: 'text-align: right;'
                },
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
            }]
        },
        {
            xtype: 'numbercolumn',
            text: 'Đơn giá',
            dataIndex: 'donGia',
            style: 'text-align:center',
            align: 'right',
            border: 1,
            width: 100,
            //renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
            //    if (value != undefined && value != null) {
            //        return app.gplatformutils.fnDinhDangSoThuc(value, 2);
            //    }
            //},
            editor: {
                xtype: 'currencyfield',
                fieldStyle: 'text-align: right;'
            }
        },
        {
            xtype: 'numbercolumn',
            text: 'Thành tiền',
            dataIndex: 'thanhTien',
            border: 1,
            style: 'text-align:center',
            align: 'right',
            width: 110,
            //renderer: function (value, meta, record, rowIndex, colIndex, storedt, view) {
            //    if (value != undefined && value != null) {
            //        return app.gplatformutils.fnDinhDangSoThuc(value, 2);
            //    }
            //},
            summaryType: 'sum',
            //summaryRenderer: function (value, summaryData, dataIndex) {
            //    if (value != undefined && value != null) {
            //        return app.gplatformutils.fnDinhDangSoThuc(value, 2);
            //    }
            //}
        },
        {
            text: 'Ghi chú',
            dataIndex: 'ghiChu',
            border: 1,
            width: 120,
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'actioncolumn',
            bind: {
                hidden: '{recordPhieu.trangThai==1}'
            },
            width: 20,
            items: [{
                xtype: 'button',
                cls: 'actionDelete',
                iconCls: 'x-fa fa-minus',
                reference: 'btnXoaLoaiVatTu',
                align: 'center',
                tooltip: 'Xoá vật tư khỏi phiếu',
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.DeXuat.Manager')),
                handler: "onXoaLoaiVatTu"
            }]
        }],
        viewConfig: {
            emptyText: 'Chưa có dữ liệu',
            getRowClass: function (record, index, rowParams, ds) {
                if (record.get('color') && record.get('color') == 'red') {
                    return 'trangThaiPhieuDeXuatHuy';
                } else {
                    return 'trangThaiPhieuCho';
                }
            }
        }
    },
    {
        xtype: 'grid',
        reference: 'dsChuyenTT',
        hidden: true,
        ui: 'light',
        height: 300,
        style: 'border-top: 1px solid #d0d0d0;',
        title: 'Danh sách lịch sử thay đổi trạng thái',
        iconCls: 'x-fa fa-exchange',
        flex: 1,
        cls: 'topGrid',
        bind: {
            store: '{storeChuyenTrangThai}'
        },
        header: {
            padding: 3,
            items: [{
                xtype: 'button',
                bind: {
                    disabled: '{!recordPhieu.id>0}'
                },
                text: 'Quay lại',
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.DeXuat.Manager')),
                handler: 'onAn',
                iconCls: 'x-fa fa-exchange'
            }]
        },
        flex: 1,
        layout: 'fit',
        columns: [{
            xtype: 'rownumberer',
            text: '#',
            width: 40,
            align: 'center'
        }, {
            header: 'Người chuyển',
            dataIndex: 'tenNguoiThucHien',
            width: 180
        }, {
            header: 'Trạng thái cũ',
            align: 'center',
            dataIndex: 'trangThaiCu',
            width: 100,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                var text = value;
                if (value == 0) {
                    text = app.localize('CMMSDMKhoTrangThaiDuyetChoDuyet');
                } else if (value == 1) {
                    text = app.localize('CMMSDMKhoTrangThaiDuyetDaDuyet');
                } else if (value == 2) {
                    text = app.localize('CMMSDMKhoTrangThaiDuyetKhongDuyet');
                } else if (value == 3) {
                    text = app.localize('CMMSDMKhoTrangThaiPhieuDong');
                }
                return text;
            }
        }, {
            header: 'Trạng thái mới',
            align: 'center',
            dataIndex: 'trangThaiMoi',
            width: 115,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                var text = app.localize('CMMSDMKhoTrangThaiDuyetChoDuyet');
                if (value == 0) {
                    text = app.localize('CMMSDMKhoTrangThaiDuyetChoDuyet');
                } else if (value == 1) {
                    text = app.localize('CMMSDMKhoTrangThaiDuyetDaDuyet');
                } else if (value == 2) {
                    text = app.localize('CMMSDMKhoTrangThaiDuyetKhongDuyet');
                } else if (value == 3) {
                    text = app.localize('CMMSDMKhoTrangThaiPhieuDong');
                }
                return text;
            }
        }, {
            xtype: 'datecolumn',
            text: 'Ngày chuyển',
            dataIndex: 'creationTime',
            width: 110,
            align: 'center',
            style: 'text-align:center',
            format: 'd/m/Y H:i'
        }, {
            text: 'Lý do',
            dataIndex: 'lyDo',
            border: 1,
            minWidth: 120,
            cellWrap: true,
            flex: 1
        }]
    }],
    buttons: [{
        xtype: 'panel',
        align: 'right',
        flex: 1,
        cls: 'panelThongBao',
        reference: 'panelThongBao'
    }, {
        text: 'Lưu thông tin',
        iconCls: 'fa fa-floppy-o',
        ui: 'soft-blue',
        bind: {
            hidden: '{recordPhieu.trangThai==1}'
        },
        reference: 'btnThucHien',
        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DeXuat.Edit') || abp.auth.hasPermission('CMMS.Inventory.DeXuat.Manager')),
        handler: 'onThucHien'
    }, {
        text: 'Huỷ bỏ',
        ui: 'soft-red',
        handler: function () {
            this.up('window').close();
        },
        iconCls: 'fa fa-times'
    }],
    listeners: {
        boxready: 'onAfterrender',
        close: 'onDongWinDow'
    }
});

Ext.define('Admin.view.quanlydexuatvattu.CNDeXuatVatTuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.quanlydexuatvattu-ccndexuatvattu',
    ref: null,
    storeinfo: null,
    checkThayDoiChiTiet: false,
    init: function () {
        var me = this;
        me.callParent(arguments);
    },
    pubSub: null,
    onAfterrender: function () {
        var me = this;
        //me.pubSub = function (userNotification) {
        //    if (userNotification.type == "WareHouseQRCode") {
        //        var data = JSON.parse(userNotification.data);
        //        me.onTimKiem(data);
        //    }
        //};
        //abp.event.on('abp.notifications.receivedEKGISData', me.pubSub);
        me.ref = me.getReferences();
        me.storeinfo = me.getViewModel().storeInfo;
        //me.loadKho();
        //me.onLoadNguoiDeXuat();
        //me.onLoadNguoiDuyet();
        //var record = me.getViewModel().data.recordPhieu;
        //if (record.get('id') == 0) {
        //    record.set("tenNguoiDeXuat", app.session.user.surname + " " + app.session.user.name);
        //    record.set("nguoiDeXuat", app.session.user.id);
        //    var dataVatTu = me.getViewModel().data.dataVatTu;
        //    if (dataVatTu) {
        //        me.storeinfo.storePhieuXuatChiTiet.loadData(dataVatTu);
        //    }
        //} else {
        //    me.onloadChiTiet();
        //    me.loadChuyenTT();
        //}
    },

    //loadChuyenTT: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    var store = me.storeinfo.storeChuyenTrangThai;
    //    var filter = [{ name: 'maPhieu', value: record.get('id') }, { name: 'phanLoai', value: record.get('phanLoai') }, { name: "sorting", value: "item.CreationTime DESC" }];
    //    var query = abp.utils.buildQueryString(filter);
    //    var url = abp.appPath + "api/services/app/CMMSKhoChuyenTrangThai/GetAll" + query;
    //    store.proxy.api.read = url;
    //    store.pageSize = 1000;
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

    //onLoadNguoiDeXuat: function () {
    //    var me = this;
    //    var storeNguoiDeXuat = me.storeinfo.storeNguoiDeXuat;
    //    storeNguoiDeXuat.proxy.api.read = abp.appPath + 'api/services/app/CMMSPhanQuyenPhongBan/GetNguoiDung?Permissions=CMMS.Inventory.DeXuat.Manager&Permissions=CMMS.Inventory.DeXuat.Edit&MaxResultCount=1000';
    //    storeNguoiDeXuat.load({
    //        scope: this,
    //        callback: function (record, operation, success) {
    //        }
    //    });
    //},

    //onLayNguoiDung: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    Ext.create("Admin.view.chondulieu.wdChonNguoiDung", {
    //        viewModel: {
    //            data: {
    //                fnSauKhiChon: function (result) {
    //                    record.set("tenNguoiDeXuat", result.get("surname") + " " + result.get("name"));
    //                    record.set("nguoiDeXuat", result.get("id"));
    //                }
    //            }
    //        }
    //    }).show();
    //},

    //onLoadNguoiDuyet: function (makho) {
    //    var me = this;
    //    var storeNguoiDuyet = me.storeinfo.storeNguoiDuyet;
    //    var record = me.getViewModel().data.recordPhieu;
    //    var url = abp.appPath + 'api/services/app/CMMSPhanQuyenPhongBan/GetNguoiDung?Permissions=CMMS.Inventory.DeXuat.Manager&MaxResultCount=1000';
    //    app.gplatformutils.fnGETAjax(url, function (data) {
    //        if (makho == undefined) {
    //            makho = record.get('maKhoXuat');
    //        }
    //        if (abp.auth.hasPermission('CMMS.Inventory.Kho.Manager') && abp.setting.get('Ekgis.CMMS.PhanQuyenKho') == 'true' && makho != null) {
    //            //Nếu hệ thống sử dụng phân quyền kho thì lọc thêm người dùng trong kho đc phân quyền quản lý
    //            var urlPQ = abp.appPath + "api/services/app/CMMSKhoNguoiDung/GetAll?maKho=" + makho + "&skipCount=0&maxResultCount=1000"
    //            app.gplatformutils.fnGETAjax(urlPQ, function (resultPQ) {
    //                var listid = []
    //                for (var i = 0; i < resultPQ.result.items.length; i++) {
    //                    listid.push(resultPQ.result.items[i].maNguoiDung);
    //                }
    //                var dataND = [];
    //                for (var i = 0; i < data.result.items.length; i++) {
    //                    if (listid.indexOf(data.result.items[i].id) !== -1) {
    //                        dataND.push(data.result.items[i]);
    //                    }
    //                }
    //                storeNguoiDuyet.loadData(dataND);
    //            });
    //        } else {
    //            storeNguoiDuyet.loadData(data.result.items);
    //        }
    //    })
    //},

    //loadKho: function () {
    //    var me = this;
    //    var store = me.storeinfo.storeKhoNhap;
    //    var storeKho = me.getViewModel().data.storeKho;
    //    if (storeKho != null) {
    //        store.loadRecords(storeKho.data.items);
    //        return
    //    }
    //    var url = abp.appPath + "api/services/app/CMMSKho/GetPermission";
    //    store.proxy.api.read = url;
    //    store.load({
    //        scope: this,
    //        callback: function (records, operation, success) {
    //            me.getView().setLoading(false);
    //        }
    //    });
    //},

    //onloadChiTiet: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    var filter = [{ name: 'maPhieu', value: record.get('id') }];
    //    var dataVatTu = me.getViewModel().data.dataVatTu;
    //    var query = abp.utils.buildQueryString(filter);
    //    var url = abp.appPath + "api/services/app/CMMSKhoPhieuNhapXuatChiTiet/GetAllByMaPhieu" + query;
    //    var store = me.storeinfo.storePhieuXuatChiTiet;
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
    //            if (records == null)
    //                store.removeAll();
    //            if (dataVatTu) {
    //                for (var i = 0; i < dataVatTu.length; i++) {
    //                    var recordIn = store.queryBy(function (records, id) {
    //                        return (records.get('maVatTu') == dataVatTu[i].maVatTu);
    //                    });
    //                    dataVatTu[i]['id'] = 0
    //                    if (recordIn.items.length == 0) {
    //                        var record1 = Ext.create('Admin.model.mPhieuNhapXuatChiTiet');
    //                        //CuongND -> Bỏ check vật tư id có tồn tại trong kho không? check này rất chậm!
    //                        //var url = abp.appPath + 'api/services/app/CMMSKhoInventory/GetAll' + abp.utils.buildQueryString([{ name: 'maKho', value: record.get('maKhoXuat') }, { name: 'IdVatTu', value: dataVatTu[i].maVatTu }, { name: 'maxResultCount', value: 100 }]);
    //                        //app.gplatformutils.fnGETAjax(url, function (data) {
    //                        record1.data['color'] = "black";
    //                        //if (data.result.items.length == 0) {
    //                        //    record1.data['color'] = "red";
    //                        //}
    //                        record1.data.maVatTu = dataVatTu[i].maVatTu;
    //                        record1.data.tenVatTu1 = dataVatTu[i].tenVatTu1;
    //                        record1.data.donGia = dataVatTu[i].donGia;
    //                        record1.data.soLuongThuc = dataVatTu[i].soLuongThuc;
    //                        record1.data.soLuong = dataVatTu[i].soLuong;
    //                        var soluongthuc = record1.get('soLuongThuc');
    //                        var dongia = record1.get('donGia');
    //                        if (soluongthuc != 0 || soluongthuc != null && dongia && dongia != null) {
    //                            var tt = soluongthuc * dongia;
    //                            record1.set('thanhTien', tt);
    //                        }
    //                        record1.set('donViTinh', dataVatTu[i].donViTinh);
    //                        record1.set('donViTinhThuc', dataVatTu[i].donViTinh);
    //                        store.add(record1);
    //                        //})
    //                    }
    //                }
    //            }
    //        }
    //    });
    //},

    //onChangeKho: function (combo, record, eOpts) {
    //    var me = this;
    //    me.onLaySoNhap();
    //    var dataVatTu = me.getViewModel().data.dataVatTu;
    //    var record = me.getViewModel().data.recordPhieu;
    //    if (dataVatTu && dataVatTu.length > 0 && record.get('id') == 0) {
    //        var listIdVT = ""
    //        for (var i = 0; i < dataVatTu.length; i++) {
    //            if (listIdVT != "") listIdVT += ","
    //            listIdVT += dataVatTu[i].maVatTu
    //        }
    //        var url = abp.appPath + 'api/services/app/CMMSKhoInventory/GetVatTuCoTrongKho' + abp.utils.buildQueryString([{ name: 'maKho', value: combo.getValue() }, { name: 'ListIdNotIn', value: listIdVT }]);
    //        app.gplatformutils.fnGETAjax(url, function (data) {
    //            var listID = data.result.split(',');
    //            for (var i = 0; i < dataVatTu.length; i++) {
    //                delete dataVatTu[i].id
    //                if (listID.indexOf(dataVatTu[i].maVatTu.toString()) == -1) {
    //                    dataVatTu[i]['color'] = 'red';
    //                }
    //            }
    //            var gridCT = me.ref.dsPhieuXuatKhoChiTiet;
    //            gridCT.getStore().loadData([]);
    //            gridCT.getStore().loadData(dataVatTu);
    //        });
    //    }
    //    me.onLoadNguoiDuyet(combo.getValue());
    //},

    //blurMa: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    if (record.get('id') > 0) {
    //        return;
    //    }
    //    $("#idqrcodeDXVT").html('');
    //    var qrcode = new QRCode("idqrcodeDXVT", {
    //        width: 80,
    //        height: 80
    //    });
    //    if (qrcode == "") {
    //        return;
    //    }
    //    qrcode.makeCode(record.data.soPhieu);
    //},

    //onLaySoNhap: function (isNhap) {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    var nodesSelect = me.ref.cbkho.getSelectedRecord();
    //    if (!nodesSelect) {
    //        abp.notify.info(app.localize('CongViec_VatTu_ThongBaoChonKho'));
    //        return;
    //    }
    //    if (record.get('id') == 0) {
    //        _cMMSKhoPhieuNhapXuat.laySoPhieu(nodesSelect.get('id'), nodesSelect.get('ma'), 'dexuat').done(function (result) {
    //            record.set('soPhieu', result);
    //            $("#idqrcodeDXVT").html('');
    //            var qrcode = new QRCode("idqrcodeDXVT", {
    //                width: 80,
    //                height: 80
    //            });
    //            if (result == "") {
    //                return;
    //            }
    //            qrcode.makeCode(record.data.soPhieu);
    //            me.ref.txtSoPhieu.setValue(result);
    //        }).fail(function (data) {
    //        });
    //    } else {
    //        $("#idqrcodeDXVT").html('');
    //        var qrcode = new QRCode("idqrcodeDXVT", {
    //            width: 80,
    //            height: 80
    //        });
    //        qrcode.makeCode(record.data.soPhieu);
    //    }
    //},

    //onSelectLoaiVatTu: function (combo, records) {
    //    var me = this;
    //    var txtdonvitinhthuc = me.ref.dsPhieuXuatKhoChiTiet.getPlugin().editor.down('[name=donvitinhthuc]');
    //    txtdonvitinhthuc.setValue(records.data.donvidathang);
    //    var dongia = me.ref.dsPhieuXuatKhoChiTiet.getPlugin().editor.down('[name=dongia]');
    //    dongia.setValue(records.data.giatri);
    //},

    //onTimKiemVT: function () {
    //    this.onTimKiem();
    //},

    //specialkeyThemChungLoai: function (field, e) {
    //    var me = this;
    //    if (e.getKey() == e.ENTER) {
    //        me.onTimKiem();
    //    }
    //},

    //onTimKiem: function (dataPsub) {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    if (dataPsub && record.get('soPhieu') == dataPsub.maPhieu && (record.get('trangThai') == null || record.get('trangThai') == 0)) {
    //        me.ref.textNhapMaChungLoaiXuatKho.setValue(dataPsub.maVatTu);
    //    }
    //    //if (record.get('id') == 0) {
    //    //    abp.notify.info(app.localize('CMMSKhoThongBaoLuuPhieu'));
    //    //    return
    //    //}
    //    if (me.ref.textNhapMaChungLoaiXuatKho.getValue() == "") {
    //        abp.notify.info(app.localize('CMMSKhoDeXuatTimVatTu'));
    //        return;
    //    }
    //    var filter = [{ name: "laKho", value: true }, { name: "MaVatTu", value: me.ref.textNhapMaChungLoaiXuatKho.getValue() }];
    //    var query = abp.utils.buildQueryString(filter);
    //    var url = abp.appPath + "api/services/app/CMMSKhoVatTu/GetVatTuKho" + query;
    //    app.gplatformutils.fnGETAjax(url, function (data) {
    //        var ressult = data.result.items;
    //        if (ressult.length > 0) {
    //            var storePhieuXuatChiTiet = me.storeinfo.storePhieuXuatChiTiet;
    //            var recordIn = storePhieuXuatChiTiet.queryBy(function (records, id) {
    //                return (records.get('maVatTu') == ressult[0].id);
    //            });
    //            if (recordIn.items.length > 0) {
    //                for (var i = 0; i < recordIn.items.length; i++) {
    //                    var soLuong = recordIn.items[i].get('soLuongThuc') + 1;
    //                    if (dataPsub != null) {
    //                        var soluongpub = parseInt(dataPsub.soLuong)
    //                        if (isNaN(soluongpub) == false) {
    //                            soLuong = recordIn.items[i].get('soLuongThuc') + soluongpub
    //                        } else {
    //                            soLuong = recordIn.items[i].get('soLuongThuc');
    //                        }
    //                    }
    //                    recordIn.items[i].set('soLuongThuc', soLuong);
    //                    recordIn.items[i].set('soLuong', soLuong);
    //                    var soluongthuc = recordIn.items[i].get('soLuongThuc');
    //                    var dongia = recordIn.items[i].get('donGia');
    //                    if (soluongthuc != 0 || soluongthuc != null && dongia && dongia != null) {
    //                        var tt = soluongthuc * dongia;
    //                        recordIn.items[i].set('thanhTien', tt);
    //                    }
    //                }
    //            } else {
    //                var record = Ext.create('Admin.model.mPhieuNhapXuatChiTiet');
    //                record.data.maVatTu = ressult[0].id;
    //                record.data.vatTu = ressult[0].ma;
    //                record.data.tenVatTu1 = ressult[0].moTa;
    //                record.data.donGia = ressult[0].giaTri;
    //                record.data.soLuongThuc = 1;
    //                record.data.soLuong = 1;
    //                if (dataPsub != null) {
    //                    var soluongpub = parseInt(dataPsub.soLuong);
    //                    if (isNaN(soluongpub) == false) {
    //                        record.set('soLuongThuc', dataPsub.soLuong == 0 ? 1 : soluongpub);
    //                        record.set('soLuong', dataPsub.soLuong == 0 ? 1 : soluongpub);
    //                    }
    //                }
    //                var soluongthuc = record.get('soLuongThuc');
    //                var dongia = record.get('donGia');
    //                if (soluongthuc != 0 || soluongthuc != null && dongia && dongia != null) {
    //                    var tt = soluongthuc * dongia;
    //                    record.set('thanhTien', tt);
    //                }
    //                record.set('donViTinh', ressult[0].donViPhatHanh);
    //                record.set('donViTinhThuc', ressult[0].donViPhatHanh);
    //                record.set('rotating', ressult[0].rotating);
    //                storePhieuXuatChiTiet.add(record);
    //            }
    //            abp.notify.info(app.localize('CMMSDMKhoDaThemmotVatTuVaoPhieu'));
    //        } else {
    //            abp.notify.warn(app.localize('CMMSDMKhoVatTuKhongTonTai'));
    //        }
    //    })
    //},

    //onFnCheck: function (machungloai) {
    //    var me = this;
    //    var storePhieuXuatChiTiet = me.storeinfo.storePhieuXuatChiTiet;
    //    var record = storePhieuXuatChiTiet.data.items;
    //    for (var i = 0; i < record.length; i++) {
    //        if (record[i].get('maVatTu') == machungloai)
    //            return record[i]
    //    }
    //    return false;
    //},

    //onLichSuThayDoiTrangThai: function () {
    //    var me = this;
    //    me.ref.dsChuyenTT.setVisible(true);
    //    me.ref.dsPhieuXuatKhoChiTiet.setVisible(false);
    //},

    //onAn: function () {
    //    var me = this;
    //    me.ref.dsChuyenTT.setVisible(false);
    //    me.ref.dsPhieuXuatKhoChiTiet.setVisible(true);
    //},

    onTimKiemvatTuNangCao: function (btn) {
        var me = this;
        var notItem = me.storeinfo.storePhieuXuatChiTiet.data.items;
        var stringMaLoaiVatTu = "";
        for (var i = 0; i < notItem.length; i++) {
            if (stringMaLoaiVatTu != "") stringMaLoaiVatTu += ",";
            stringMaLoaiVatTu += notItem[i].get('maVatTu');
        }
        var recordPhieu = me.getViewModel().data.recordPhieu;
        var wnd = Ext.create('Admin.view.phieunhapxuatkho.cnThemChungLoaiVaoPhieu', {
            viewModel: {
                data: {
                    listNotIn: stringMaLoaiVatTu,
                    maKho: recordPhieu.get('maKhoXuat'),
                    fnSauKhiChon: function (recordVatTu) {
                        var storePhieuXuatChiTiet = me.storeinfo.storePhieuXuatChiTiet;
                        for (var i = 0; i < recordVatTu.length; i++) {
                            var check = me.onFnCheck(recordVatTu[i].get('id'))
                            if (check != false) {
                                var soluong = check.get('soLuongThuc') + 1
                                check.set('soLuongThuc', soluong)
                            }
                            if (check == false) {
                                var record = Ext.create('Admin.model.mPhieuNhapXuatChiTiet');
                                record.set('maVatTu', recordVatTu[i].get('id'));
                                record.set('vatTu', recordVatTu[i].get('ma'));
                                record.set('tenVatTu', recordVatTu[i].get('moTa'));
                                record.set('tenVatTu1', recordVatTu[i].get('ma') + "/" + recordVatTu[i].get('moTa'));
                                record.set('donGia', recordVatTu[i].get('giaTri'));
                                record.set('soLuongThuc', 1);
                                record.set('soLuongTrongKho', recordVatTu[i].get('soLuongTrongKho'));
                                record.set('soLuong', 1);
                                var soluongthuc = record.get('soLuongThuc');
                                var dongia = record.get('donGia');
                                if (soluongthuc != 0 || soluongthuc != null) {
                                    var tt = soluongthuc * dongia;
                                    record.set('thanhTien', tt);
                                }
                                if (recordPhieu.get('id') > 0) {
                                    record.set('maPhieu', recordPhieu.get('id'));
                                }
                                record.set('donViTinh', recordVatTu[i].get('donViPhatHanh'));
                                record.set('donViTinhThuc', recordVatTu[i].get('donViPhatHanh'));
                                storePhieuXuatChiTiet.add(record);
                            }
                        }
                    }
                }
            }
        });
        wnd.show();
    },

    //onEditGrid: function (editor, context, eOpts) {
    //    var me = this;
    //    var record = context.record;
    //    var soluongthuc = record.get('soLuongThuc');
    //    var dongia = record.get('donGia');
    //    if (soluongthuc != 0 || soluongthuc != null) {
    //        var tt = soluongthuc * dongia;
    //        record.set('thanhTien', tt)
    //        record.commit();
    //    }
    //    me.checkThayDoiChiTiet = true;
    //},

    //onXoaLoaiVatTu: function (grid, rowIndex, colIndex) {
    //    var me = this;
    //    var selected = grid.getStore().getAt(rowIndex);
    //    var store = me.storeinfo.storePhieuXuatChiTiet
    //    var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
    //    if (isNaN(selected.data.id) == true) {
    //        abp.message.confirm(
    //            app.localize('CMMSKhoThongBaoVatTu') + " " + selected.data.tenVatTu,
    //            app.localize('ExtgDataManagerAreYouSure'),
    //            function (isConfirmed) {
    //                if (isConfirmed) {
    //                    store.remove(selected);
    //                }
    //            }
    //        );
    //    } else {
    //        abp.message.confirm(
    //            app.localize('CMMSKhoThongBaoVatTu') + " " + selected.data.tenVatTu,
    //            app.localize('ExtgDataManagerAreYouSure'),
    //            function (isConfirmed) {
    //                if (isConfirmed) {
    //                    store.remove(selected);
    //                    _cMMSKhoPhieuNhapXuatChiTiet.delete({ id: selected.get('id') }).done(function (result) {
    //                        me.getView().setLoading(false);
    //                        abp.notify.success(app.localize('SavedSuccessfully'));
    //                        if (fnSauKhiLoad)
    //                            fnSauKhiLoad(result);
    //                    }).fail(function (data) {
    //                        me.getView().setLoading(false);
    //                    });
    //                }
    //            }
    //        );
    //    }
    //},

    //onThucHien: function (isNhap) {
    //    var me = this;
    //    var record = me.getViewModel().data.recordPhieu;
    //    var grid = me.ref.dsPhieuXuatKhoChiTiet;
    //    var rows = grid.getStore().getRange();
    //    var form = me.ref.frmPhieuDeXuat;
    //    var dataVatTu = me.getViewModel().data.dataVatTu;
    //    if (!form.getForm().isValid()) {
    //        abp.notify.warn(app.localize("TaiSan_isValid"));
    //        return;
    //    }
    //    if (rows.length == 0) {
    //        abp.notify.warn(app.localize("CMMSDMKhoVatTu_ThongBao"));
    //        return;
    //    }
    //    for (var i = 0; i < rows.length; i++) {
    //        if (rows[i].get('soLuongThuc') == null || rows[i].get('soLuongThuc') == 0) {
    //            abp.notify.info(app.localize('CMMSDMKhoSoLuongVatTuKhongDuocDeTrong'))
    //            return;
    //        }
    //    }
    //    if (me.getViewModel().data.recCongViec) {
    //        record.set('maCongViec', me.getViewModel().data.recCongViec.get('id'));
    //    }
    //    record.data.thoiGian = Ext.Date.format(new Date(record.get('ngayHachToan')), "Y/m/d H:i:s");
    //    record.data.ngayHachToan = Ext.Date.format(new Date(record.get('ngayHachToan')), "Y/m/d H:i:s");
    //    record.data.ngayChungTu = Ext.Date.format(new Date(record.get('ngayHachToan')), "Y/m/d H:i:s");
    //    record.data.phanLoai = 'dexuat';
    //    //check vật tư đã được add vào kho chưa
    //    //if (dataVatTu.length > 0) {
    //    //    for (var i = 0; i < rows.length; i++) {
    //    //        if (rows[i].get('color') && rows[i].get('color') == 'red') {
    //    //            abp.notify.info(app.localize('CongViec_VatTu_CapNhat_lblVatTu') + " '" + rows[i].get('tenVatTu') + "' " + app.localize('CMMSDMKhoSoLuongVatTuKhongCoTrongKho'))
    //    //            return;
    //    //        }
    //    //    }
    //    //}
    //    if (record.get('id') == 0) {
    //        me.getView().setLoading(true);
    //        _cMMSKhoPhieuNhapXuat.create(record.data).done(function (result) {
    //            me.getView().setLoading(false);
    //            record.set('id', result.id);
    //            me.onLuuChiTietPhieu(rows, record.get('id'));
    //            //Lưu phiếu khi thêm từ công việc
    //            abp.notify.success(app.localize('SavedSuccessfully'));

    //        }).fail(function (data) {
    //            me.getView().setLoading(false);
    //        });
    //    }
    //    else if (record.dirty) {
    //        me.getView().setLoading(true);
    //        _cMMSKhoPhieuNhapXuat.update(record.data).done(function (result) {
    //            me.getView().setLoading(false);
    //            record.commit(record);
    //            me.onLuuChiTietPhieu(rows, record.get('id'));
    //            abp.notify.success(app.localize('SavedSuccessfully'));
    //        }).fail(function (data) {
    //            me.getView().setLoading(false);
    //        });
    //    } else {
    //        me.onLuuChiTietPhieu(rows, record.get('id'), true);
    //    }
    //},

    //onLuuChiTietPhieu: function (rows, Id, thongbao) {
    //    var me = this;
    //    var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
    //    var lstphieuchitiet = [];

    //    for (var i = 0; i < rows.length; i++) {
    //        rows[i].data.maPhieu = Id;
    //        if (isNaN(rows[i].data.id) == true) {
    //            me.checkThayDoiChiTiet = true;
    //            rows[i].data.id = 0;
    //        }
    //        lstphieuchitiet.push(rows[i].data);
    //    }
    //    if (me.checkThayDoiChiTiet == false) {
    //        return
    //    }
    //    me.getView().setLoading(true)
    //    _cMMSKhoPhieuNhapXuatChiTiet.createList(lstphieuchitiet).done(function (result) {
    //        me.getView().setLoading(false);
    //        me.checkThayDoiChiTiet = false;
    //        me.onloadChiTiet();
    //        if (thongbao) {
    //            abp.notify.success(app.localize('SavedSuccessfully'));
    //        }
    //        if (fnSauKhiLoad)
    //            fnSauKhiLoad();
    //    }).fail(function (data) {
    //        if (fnSauKhiLoad)
    //            fnSauKhiLoad();
    //        me.getView().setLoading(false);
    //    });
    //},

    //onDongWinDow: function () {
    //    var me = this;
    //    abp.event.off('abp.notifications.receivedEKGISData', me.pubSub);
    //    var record = me.getViewModel().data.recordPhieu;
    //    record.reject();
    //}
});
