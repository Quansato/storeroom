Ext.define('Admin.view.danhmuckho.dsKhoModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.quanlydmkho',
    data: {
        recordTK: Ext.create('Ext.data.Model', {
        }),
        selectionKho: null
    },
    stores: {
        storeKho: { type: 'skho' }
    }
});

Ext.define('Admin.view.danhmuckho.dsKho', {
    extend: 'Ext.panel.Panel',
    xtype: 'dsCMMSKho',
    requires: [
        'Admin.view.danhmuckho.dsKhoController',
        'Admin.view.danhmuckho.dsKhoModel',
        'Ext.data.proxy.Rest',
        'Ext.app.ViewModel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.Panel',
        'Ext.form.field.ComboBox',
        'Ext.data.Store'
    ],
    controller: 'quanlydmkho',
    viewModel: {
        type: 'quanlydmkho'
    },
    bodyStyle: { 'background-color': '#f6f6f6', 'padding': '0px 0px 0px 5px' },
    height: window.innerHeight - 65,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'panel',
        title: 'Danh sách kho',
        iconCls: 'x-fa fa-archive',
        ui: 'light',
        flex: 1,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'gridpanel',
            layout: 'fit',
            ui: 'light',
            reference: 'dsKho',
            flex: 1,
            bind: {
                store: '{storeKho}',
                selection: '{selectionKho}'
            },
            columns: [{
                xtype: 'rownumberer',
                text: '#',
                width: 40,
                align: 'center',
                sortable: false
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'storeroomCode',
                width: 150,
                text: 'Mã'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'displayName',
                flex: 1,
                text: 'Tên'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'tenNguoiDaiDien',
                width: 180,
                text: 'Người đại diện'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'phanLoai',
                width: 150,
                text: 'Phân loại'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'taiLieu',
                sortable: false,
                align: 'center',
                width: 80,
                text: 'Đính kèm',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return '<a class="tepdinhkem" style="color:blue;cursor: pointer;"><span class="fa fa-picture-o"></span></a>';
                }
            }],
            viewConfig: {
                emptyText: 'Chưa có dữ liệu'
            },
            listeners: {
                //cellclick: 'cellKho'
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
                        xtype: 'textfield',
                        fieldLabel: 'Tìm',
                        labelWidth: 60,
                        bind: {
                            value: '{recordTK.tenkho}'
                        },
                        emptyText: 'Nhập mã, tên kho',
                        flex: 1,
                        cls: "EnterToTab",
                        listeners: {
                            specialkey: 'specialkey'
                        }
                    }, {
                        xtype: 'button',
                        text: 'Tìm',
                        iconCls: 'x-fa fa-search',
                        handler: 'onTimKiem',
                        ui: 'soft-blue',
                    }]
                }]
            }, {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [{
                    reference: 'btnThemKho',
                    text: 'Thêm',
                    iconCls: 'fa fa-plus',
                    ui: 'soft-blue',
                    //hidden: !(app.session.isAdmin),
                    handler: "onThemKho"
                }, {
                    reference: 'btnSua',
                    text: 'Sửa',
                    bind: {
                        disabled: '{!selectionKho}',
                        //hidden: !(app.session.isAdmin)
                    },
                    iconCls: 'fa fa-pencil',
                    ui: 'soft-blue',
                    handler: "onSua"
                }, {
                    reference: 'btnXoaKho',
                    text: 'Xoá',
                    bind: {
                        disabled: '{!selectionKho}',
                        //hidden: !(app.session.isAdmin)
                    },
                    iconCls: 'fa fa-minus-circle',
                    ui: 'soft-red',
                    handler: "onXoa"
                }, {
                    //reference: 'btnPhanQuyen',
                    //text: app.localize('ExtgDataAminDecentralization'),
                    //bind: {
                    //    disabled: '{!selectionKho}'
                    //},
                    //iconCls: 'fa fa-user-plus',
                    //hidden: true,
                    //ui: 'blue',
                    //disabled: true,
                    //handler: "onPhanQuyen"
                }, { xtype: 'tbfill' }, {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    bind: {
                        store: '{storeKho}'
                    },
                    style: 'padding: 0px !important',
                    beforePageText: "Trang",
                    //afterPageText: "của {0}",
                    displayMsg: "{0} - {1} của {2}",
                }]
            }]
        }]
    }],
    listeners: {
        afterRender: 'onAfterrender',
        close: 'onDongWinDow'
    }
});

//var _cMMSKho = abp.services.app.cMMSKho;
//var _cMMSKhoNguoiDung = abp.services.app.cMMSKhoNguoiDung
Ext.define('Admin.view.danhmuckho.dsKhoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.quanlydmkho',
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
        //var btnPhanQuyen = me.ref.btnPhanQuyen;
        //if (abp.auth.hasPermission('CMMS.Inventory.Kho.Manager') && abp.setting.get('Ekgis.CMMS.PhanQuyenKho').toLowerCase() == 'true') {
        //    btnPhanQuyen.setVisible(true);
        //}
        me.onTimKiem();
    },

    specialkey: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.loadKho();
        }
    },

    onTimKiem: function () {
        var me = this;
        console.log(app.session.isAdmin);
        me.loadKho();
    },

    loadKho: function (fnSauKhiLoad) {
        var me = this;
        var filter = []
        var recordTK = me.getViewModel().data.recordTK;
        if (recordTK.get('tenkho')) {
            filter.push({ name: "filter", value: recordTK.get('tenkho') });
        }
        var store = me.storeinfo.storeKho;
        var url = "api/Storeroom/";
        store.proxy.api.read = url;
        store.proxy.pageParam = undefined;
        store.proxy.limitParam = undefined;
        store.proxy.startParam = undefined;
        store.load({
            params: {
                page: 1,
                start: 0,
                limit: store.pageSize
            },
            scope: this,
            callback: function (records, operation, success) {
                console.log(records);
                if (records == null) {
                    store.removeAll();
                }
            }
        });
    },

    //onPhanQuyen: function () {
    //    var me = this;
    //    var record = me.ref.dsKho.getSelectionModel().getSelection();
    //    if (record.length == 0) {
    //        return
    //    }
    //    var wnd = Ext.create('Admin.view.danhmuckho.cnPhanQuyen', {
    //        title: app.localize('CMMSKhoTieuDePhanQuyen') + ": " + record[0].data.moTa,
    //        viewModel: {
    //            data: {
    //                recordKho: record[0],
    //                fnSauKhiLoad: function () {
    //                }
    //            }
    //        }
    //    });
    //    wnd.show();
    //},

    //cellKho: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    //    var me = this;
    //    if (e.target.className == 'fa fa-picture-o') {
    //        var pathDinhKem = 'khodata/CMMSKho/' + record.get('id') + '/tailieu';
    //        Ext.create("Admin.view.utils.cnFileManager", {
    //            title: app.localize("FileManager_ListFile"),
    //            viewModel: {
    //                data: {
    //                    pathFolder: pathDinhKem,
    //                    isEdit: (abp.auth.hasPermission('CMMS.Inventory.Kho.Edit') || abp.auth.hasPermission('CMMS.Inventory.Kho.Manager')),
    //                    fnCallBack: function (records) {
    //                    }
    //                }
    //            }
    //        }).show();
    //    }
    //},

    onThemKho: function () {
        var me = this;
        var record = Ext.create('Admin.model.mKho');
        record.set('id', 0);
        record.set('status', true);
        var wnd = Ext.create('Admin.view.danhmuckho.cnKho', {
            title: 'Thêm mới kho',
            viewModel: {
                data: {
                    record: record,
                    fnSauKhiSave: function () {
                        //me.loadKho();
                    }
                }
            }
        });
        wnd.show();
    },

    onSua: function () {
        var me = this;
        var record = me.ref.dsKho.getSelectionModel().getSelection();
        var wnd = Ext.create('Admin.view.danhmuckho.cnKho', {
            title: 'Cập nhật kho',
            viewModel: {
                data: {
                    record: record[0],
                    fnSauKhiSave: function () {
                        me.loadKho();
                    }
                }
            }
        });
        wnd.show();
    },

    onXoa: function () {
        var me = this;
        var selectSelection = me.ref.dsKho.getSelectionModel().getSelection();
        if (selectSelection.length == 0) return;
        var store = me.storeinfo.storeKho;
        var record = selectSelection[0];
        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: "Bạn có muốn xoá " + record.data.displayName + "?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Huỷ bỏ',
            confirmButtonText: 'Đồng ý'
        }).then(function (result) {
            if (result.isConfirmed) {
                var url = "api/Storeroom/" + record.data.id
                app.mUtils.fnDELETEAjax(url, function (response) {
                    if (response == 1) {
                        Swal.fire(
                            'Deleted!',
                            '"Xoá dữ liệu thành công',
                            'success'
                        )
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Xoá dữ liệu thất bại!',
                        })
                    }
                    me.onTImKiem()
                })
            }
        })
    }
});
