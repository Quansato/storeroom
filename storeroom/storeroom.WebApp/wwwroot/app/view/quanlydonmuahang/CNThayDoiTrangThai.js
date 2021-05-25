Ext.define('Admin.view.quanlydonmuahang.CNThayDoiTrangThaiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.quanlydonmuahang-mcnchuyentrangthai',
    data: {
        record: null,
        dataTT: [],
        dataTTCu: [],
        fnSauKhiLoad: null
    },
    stores: {
        storeChuyenTrangThai: { type: 'skhochuyentrangthai' }

    }
});
Ext.define('Admin.view.quanlydonmuahang.CNThayDoiTrangThai', {
    extend: 'Ext.window.Window',
    requires: [
        'Admin.view.quanlydonmuahang.CNThayDoiTrangThaiController',
        'Admin.view.quanlydonmuahang.CNThayDoiTrangThaiModel'
    ],
    controller: 'quanlydonmuahang-ccnchuyentrangthai',
    viewModel: {
        type: 'quanlydonmuahang-mcnchuyentrangthai'
    },
    width: 700,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'form',
        flex: 1,
        reference: 'frmChuyenTrangThai',
        bodyPadding: 0,
        layout: {
            type: 'vbox',
            align: 'stretch',
            labelAlign: 'right'
        },
        items: [{
            flex: 1,
            xtype: 'textfield',
            margin: '5 5 0 5',
            labelWidth: 105,
            fieldLabel: 'Người thực hiện',
            style: 'line-height: 24px;',
            readOnly: true,
            bind: {
                value: '{record.tenNguoiThucHien}'
            }
        }, {
            xtype: 'combo',
            margin: '5 5 0 5',
            reference: 'cbTrangThaiCu',
            bind: {
                value: '{record.trangThaiCu}'
            },
            store: Ext.create('Ext.data.Store', {
                fields: ['matrangthai', 'tentrangthai']
            }),
            labelWidth: 105,
            fieldLabel: 'Trạng thái cũ',
            queryMode: 'local',
            displayField: 'tentrangthai',
            valueField: 'matrangthai',
            readOnly: true,
            flex: 1
        }, {
            xtype: 'combo',
            margin: '5 5 0 5',
            reference: 'cbTrangThaiMoi',
            bind: {
                value: '{record.trangThaiMoi}'
            },
            store: Ext.create('Ext.data.Store', {
                fields: ['matrangthai', 'tentrangthai']
            }),
            labelWidth: 105,
            fieldLabel: 'Trạng thái mới',
            queryMode: 'local',
            displayField: 'tentrangthai',
            valueField: 'matrangthai',
            editable: false,
            flex: 1
        }, {
            xtype: 'textareafield',
            name: 'lydo',
            margin: '5 5 5 5',
            labelWidth: 105,
            bind: '{record.lyDo}',
            fieldLabel: 'Lý do'
        }]
    }, {
        xtype: 'grid',
        reference: 'dsChuyenTT',
        ui: 'light',
        style: 'border-top: 1px solid #d0d0d0;',
        title: 'Danh sách lịch sử thay đổi trạng thái',
        iconCls: 'x-fa fa-exchange',
        flex: 1,
        height: 200,
        cls: 'topGrid',
        bind: {
            store: '{storeChuyenTrangThai}'
        },
        flex: 1,
        layout: 'fit',
        columns: [
            {
                xtype: 'rownumberer',
                text: '#',
                width: 40,
                align: 'center'
            },
            {
                header: 'Người chuyển',
                dataIndex: 'tenNguoiThucHien',
                width: 180
            },
            {
                header: 'Trạng thái cũ',
                align: 'center',
                dataIndex: 'trangThaiCu',
                width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    var text = value;
                    if (value == 0) {
                        text = 'Chờ duyệt';
                    } else if (value == 1) {
                        text = 'Đã duyệt';
                    } else if (value == 2) {
                        text = 'Từ chối';
                    } else if (value == 3) {
                        text = 'Phiếu đóng';
                    }
                    return text;
                }
            },
            {
                header: 'Trạng thái mới',
                align: 'center',
                dataIndex: 'trangThaiMoi',
                width: 115,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    var text = 'Chờ duyệt';
                    if (value == 0) {
                        text = 'Chờ duyệt';
                    } else if (value == 1) {
                        text = 'Đã duyệt';
                    } else if (value == 2) {
                        text = 'Từ chối';
                    } else if (value == 3) {
                        text = 'Phiếu đóng';
                    }
                    return text;
                }
            },
            {
                xtype: 'datecolumn',
                text: 'Ngày chuyển',
                dataIndex: 'creationTime',
                width: 110,
                align: 'center',
                style: 'text-align:center',
                format: 'd/m/Y H:i'
            },
            {
                text: 'Lý do',
                dataIndex: 'lyDo',
                border: 1,
                minWidth: 120,
                cellWrap: true,
                flex: 1
            }]
    }],
    buttons: [{
        text: 'Lưu thông tin',
        iconCls: 'fa fa-floppy-o',
        ui: 'soft-blue',
        reference: 'btnThucHien',
        handler: 'onLuu'
    }, {
        text: 'Huỷ bỏ',
        ui: 'soft-red',
        handler: function () {
            this.up('window').close();
        },
        iconCls: 'fa fa-times'
    }],
    listeners: {
        close: 'onDongWinDow'
    },
    listeners: {
        boxready: 'onAfterrender',
        close: 'onDongWinDow'
    }
});

Ext.define('Admin.view.quanlydonmuahang.CNThayDoiTrangThaiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.quanlydonmuahang-ccnchuyentrangthai',
    ref: null,
    storeinfo: null,
    recordPubSub: null,
    init: function () {
        var me = this;
        me.callParent(arguments);
    },

    onAfterrender: function () {
        var me = this;
        me.ref = me.getReferences();
        me.storeinfo = me.getViewModel().storeInfo;
        var data = [{ matrangthai: 1, tentrangthai: "Hoàn thành" },
        { matrangthai: 2, tentrangthai: "Không Duyệt" },
        { matrangthai: 0, tentrangthai:"Chờ duyệt" }]
        if (me.getViewModel().data.dataTTCu.length > 0) {
            me.ref.cbTrangThaiCu.getStore().loadData(me.getViewModel().data.dataTTCu);
        } else {
            me.ref.cbTrangThaiCu.getStore().loadData(data);
        }

        var store = me.ref.cbTrangThaiMoi.getStore();
        var dataTT = me.getViewModel().data.dataTT;
        store.loadData(dataTT);
        me.loadCT();
    },

    //loadCT: function (fnSauKhiLoad) {
    //    var me = this;
    //    var record = me.getViewModel().data.record;
    //    var store = me.storeinfo.storeChuyenTrangThai;
    //    var filter = [{ name: 'maPhieu', value: record.get('maPhieu') }, { name: 'phanLoai', value: record.get('phanLoai') }, { name: "sorting", value: "item.CreationTime DESC" }];
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

    onLuu: function (button) {
        var me = this;
        var frm = me.ref.frmChuyenTrangThai;
        var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
        if (frm.isValid()) {
            var record = me.getViewModel().data.record;
            me.getView().setLoading(true);
            var obj = {
                NguoiThucHien: abp.session.userId,
                LyDo: record.get('lyDo'),
                MaPhieu: record.get('maPhieu'),
                phanLoai: record.get('phanLoai'),
                TrangThaiCu: record.get('trangThaiCu'),
                TrangThaiMoi: record.get('trangThaiMoi')
            }
            if (record.get('id') == 0) {
                me.getView().setLoading(true);
                _cMMSKhoChuyenTrangThai.create(obj).done(function (result) {
                    me.getView().setLoading(false);
                    if (record.get('phanLoai') == 'donmuahang') {
                        var objdh = { id: record.get('maPhieu'), TinhTrangDon: record.get('trangThaiMoi') }
                        _cMMSKhoDonMuaHang.updateTinhTrangDon(objdh).done(function (result) {
                            abp.notify.success(app.localize('SavedSuccessfully'));
                            if (fnSauKhiLoad)
                                fnSauKhiLoad(result);
                        }).fail(function (data) {
                        });
                        if (fnSauKhiLoad)
                            fnSauKhiLoad(result);
                        me.getView().close();
                    } else if (record.get('phanLoai') == 'dexuat') {
                        var objdh = { id: record.get('maPhieu'), TrangThai: record.get('trangThaiMoi') }
                        _cMMSKhoPhieuNhapXuat.updateTrangThai(objdh).done(function (result) {
                            abp.notify.success(app.localize('SavedSuccessfully'));
                            if (fnSauKhiLoad)
                                fnSauKhiLoad(result);
                            me.getView().close();
                        }).fail(function (data) {
                        });
                    } else {
                        var objdh = { id: record.get('maPhieu'), TrangThai: record.get('trangThaiMoi') }
                        _cMMSKhoPhieuDeXuatMuaHang.updateTrangThai(objdh).done(function (result) {
                            abp.notify.success(app.localize('SavedSuccessfully'));
                            if (fnSauKhiLoad)
                                fnSauKhiLoad(result);
                            me.getView().close();
                        }).fail(function (data) {
                        });
                    }
                }).fail(function (data) {
                    me.getView().setLoading(false);
                });
            }
        }
    },

    //onDongWinDow: function () {
    //    var me = this;
    //}
});
