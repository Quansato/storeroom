Ext.define('Admin.view.danhmuckho.cnKhoModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.danhmuckho-mcnkho',
    data: {
        fnSauKhiLoad: null,
        record: null
    },
    stores: {
        storeKhoNhap: { type: 'skho', pageSize: 1000 }
    }
});

Ext.define('Admin.view.danhmuckho.cnKho', {
    extend: 'Ext.window.Window',
    requires: [
        'Admin.view.danhmuckho.cnKhoController',
        'Admin.view.danhmuckho.cnKhoModel'
    ],
    controller: 'danhmuckho-ccnkho',
    viewModel: {
        type: 'danhmuckho-mcnkho'
    },
    width: 580,
    modal: true,
    title: 'Quản lý kho',
    iconCls: 'x-fa fa-archive',
    layout: 'fit',
    items: [{
        xtype: 'form',
        reference: 'frmKho',
        bodyPadding: 10,
        layout: {
            type: 'vbox',
            align: 'stretch',
            labelAlign: 'right'
        },
        defaults: {
            flex: 1,
            labelAlign: "right"
        },
        items: [{
            xtype: 'fieldcontainer',
            layout: 'hbox',
            margin: '5 0 10 0',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Người đại diện' /*+ app.gplatformconsts.var_required*/,
                labelAlign: 'right',
                allowBlank: false,
                blankText: 'Người đại diện không được để trống',
                margin: '0 5 0 0',
                labelWidth: 110,
                flex: 1,
                bind: {
                    value: '{record.userName}'
                }
            }, {
                margin: '0 0 0 0',
                xtype: 'button',
                tooltip: 'Chọn người địa diện kho',
                //hidden: !(abp.auth.hasPermission('CMMS.Inventory.Kho.Edit') || abp.auth.hasPermission('CMMS.Inventory.Kho.Manager')),
                ui: 'soft-blue',
                handler: 'onLayNguoiDung',
                text: '...'
            }]
        },
        {
            xtype: 'textfield',
            reference: 'textmako',
            labelWidth: 110,
            allowBlank: false,
            blankText: 'Mã kho không được để trống',
            fieldLabel: 'Mã kho' /*+ " " + app.gplatformconsts.var_required*/,
            bind: {
                value: '{record.storeroomCode}',
                readOnly: '{record.id!=0}'
            },
            listeners: {
                blur: "blurMa"
            }
        },
        {
            xtype: 'textfield',
            labelSeparator: '',
            labelWidth: 110,
            bind: '{record.displayName}',
            allowBlank: false,
            fieldLabel: 'Tên kho'/* + app.gplatformconsts.var_required*/,
            blankText: 'Tên kho không được để trống'
        },
            /* {
            xtype: 'combo',
            fieldLabel: 'Phân loại',
            queryMode: 'local',
            editable: false,
            labelWidth: 110,
            reference: 'phanLoai',
            displayField: 'name',
            bind: {
                value: '{record.phanLoai}'
            },
            valueField: 'value',
            store: Ext.create('Ext.data.Store', {
                fields: ['value', 'name'],
                data: [
                    { "value": 'Kho vật tư', "name": 'Kho vật tư' },
                    { "value": 'Kho thu hồi', "name": 'Kho thu hồi' }
                ]
            })
        }, {
            xtype: 'combo',
            reference: 'cbkho',
            bind: {
                store: '{storeKhoNhap}',
                value: '{record.maCha}'
            },
            labelWidth: 110,
            fieldLabel: 'Kho liên kết',
            queryMode: 'local',
            displayField: 'moTa',
            valueField: 'id',
            forceSelection: true,
            editable: false
        },*/ {
            labelWidth: 110,
            bind: '{record.area}',
            fieldLabel: 'Diện tích',
            xtype: 'currencyfield',
            fieldStyle: 'text-align: right;'
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                labelWidth: 110,
                bind: '{record.address}',
                fieldLabel: 'Địa chỉ',
                labelAlign: "right",
                flex: 1
            }, {
                xtype: 'button',
                ui: 'soft-blue',
                text: 'Chọn vị trí',
                handler: 'onOpenMap',
                flex: 0.5
            }]
        },
        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [{
                xtype: 'combo',
                labelWidth: 110,
                fieldLabel: 'Trạng thái kho',
                name: 'trangthaikho',
                queryMode: 'local',
                bind: '{record.status}',
                displayField: 'value',
                valueField: 'key',
                hidden: true,
                editable: false,
                value: 'active',
                store: Ext.create('Ext.data.Store', {
                    fields: ['key', 'value'],
                    data: [
                        //{ key: 'active', value: app.localize('CMMSKhoHoatDong') },
                        //{ key: 'pending', value: app.localize('CMMSKhoNoAction') }
                    ]
                })
            }, {
                flex: 1,
                xtype: 'textfield',
                labelWidth: 110,
                bind: '{record.soDoKho}',
                margin: '0 0 0 10',
                hidden: true,
                name: 'sodokho',
                fieldLabel: 'Sơ đồ kho'
            }]
        }, {
            xtype: "panel",
            ui: 'light',
            reference: 'btnDinhKem',
            title: 'Hình ảnh đính kèm',
            style: {
                borderTop: "solid 1px #d0d0d0 !important"
            },
            header: {
                padding: 7,
                items: [{
                    xtype: "box",
                    bind: { disabled: "{record.id==0}" },
                    //hidden: !(abp.auth.hasPermission('CMMS.Inventory.Kho.Edit') || abp.auth.hasPermission('CMMS.Inventory.Kho.Manager')),
                    html: '<a style="color:blue; cursor: pointer;"><u>' + 'Tải tệp lên' + "</u></a>",
                    listeners: {
                        click: "onClickHinhAnh",
                        element: "el",
                        delegate: "a"
                    }
                }]
            },
            margin: "0 0 5 0",
            iconCls: "x-fa fa-picture-o",
            layout: "fit",
            height: 150,
            items: [{
                xtype: "dataview",
                reference: "dtvHinhAnh",
                cls: "images-view-80",
                trackOver: true,
                overItemCls: "x-item-over",
                itemSelector: "div.tt-thumb-wrap",
                itemTpl: [
                    '<tpl for=".">' +
                    '<div class="tt-thumb-wrap">' +
                    '<div class="tt-thumb"><img src="{url}" title="{fullname:htmlEncode}"></div>' +
                    '<span>{name:htmlEncode}</span>' +
                    '</div>' +
                    '</tpl>'
                ],
                store: Ext.create('Ext.data.Store', {
                    fields: ['name', 'fullname', 'url', 'pathFile']
                }),
                listeners: {
                    select: "onSelectTaiLieu"
                }
            }],
            dockedItems: [{
                xtype: "toolbar",
                dock: "top",
                style: {
                    borderTop: "solid 1px #d0d0d0 !important"
                },
                padding: 0,
                items: []
            }]
        }]
    }],
    buttons: [{
        text: 'Lưu và thêm mới',
        iconCls: "fa fa-floppy-o",
        ui: "soft-green",
        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.Kho.Edit') || abp.auth.hasPermission('CMMS.Inventory.Kho.Manager')),
        handler: "onSaveAndNew"
    }, {
        text: 'Lưu thông tin',
        handler: 'onSave',
        ui: 'soft-blue',
        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.Kho.Edit') || abp.auth.hasPermission('CMMS.Inventory.Kho.Manager')),
        iconCls: 'x-fa fa-floppy-o'
    }, {
        text: 'Huỷ bỏ',
        ui: 'soft-red',
        handler: function () {
            this.up('window').close();
        },
        iconCls: 'fa fa-times'
    }],
    listeners: {
        afterRender: 'onAfterrender',
        close: 'onDongWinDow'
    }
});

Ext.define('Admin.view.danhmuckho.cnKhoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.danhmuckho-ccnkho',
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
        me.loadKho();
        var record = me.getViewModel().data.record;
        if (record.get('id') > 0) {
            me.ref.btnDinhKem.setDisabled(false);
        }
        //me.onLoadFile();
    },

    onOpenMap: function () {
        var me = this;
        var record = me.getViewModel().data.record;
        Ext.create("Admin.view.danhmuckho.cnBanDoKhoV2", {
            viewModel: {
                data: {
                    record: record,
                    fnSauKhiChon: function (result) {
                        record.set("x", result.x);
                        record.set("y", result.y);
                    }
                }
            }
        }).show();
    },

    onLayNguoiDung: function () {
        var me = this;
        var record = me.getViewModel().data.record;
        Ext.create("Admin.view.chondulieu.wdChonNguoiDung", {
            viewModel: {
                data: {
                    fnSauKhiChon: function (result) {
                        console.log(result.get("tenNguoiDaiDien"))
                        record.set("userName", result.get("tenNguoiDaiDien"));
                        record.set("userId", result.get("userId"));
                        console.log(record)
                    }
                }
            }
        }).show();
    },

    //blurMa: function () {
    //    var me = this;
    //    var record = me.getViewModel().get("record");
    //    var ma = app.gplatformutils.BoDauBoKhoangTrangGiuNguyenHoaThuong(record.get("ma"));
    //    record.set("ma", ma);
    //},

    loadKho: function () {
        var me = this;
        var store = me.storeinfo.storeKhoNhap;
        var url = "api/Storeroom?page=1&start=0";
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
    },

    //onClickHinhAnh: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.record;
    //    var pathDinhKem = 'khodata/CMMSKho/' + record.get('id') + '/tailieu';
    //    Ext.create("Admin.view.utils.cnFileManager", {
    //        title: app.localize("FileManager_ListFile"),
    //        viewModel: {
    //            data: {
    //                pathFolder: pathDinhKem,
    //                isEdit: (abp.auth.hasPermission('CMMS.Inventory.Kho.Edit') || abp.auth.hasPermission('CMMS.Inventory.Kho.Manager')),
    //                fnCallBack: function (records) {
    //                    me.onLoadFile();
    //                }
    //            }
    //        }
    //    }).show();
    //},

    //onSelectTaiLieu: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.record;
    //    if (record.data.id == 0) return;
    //    me.onClickHinhAnh();
    //    var rows = me.ref.dtvHinhAnh.getStore().getRange();
    //    if (rows.length > 0) {
    //        for (var i = 0; i < rows.length; i++) {
    //            me.ref.dtvHinhAnh.deselect(rows[i]);
    //        }
    //    }
    //},

    //onLoadFile: function () {
    //    var me = this;
    //    var record = me.getViewModel().data.record;
    //    if (record.get("id") == 0) return;
    //    var pathFolder = 'khodata/CMMSKho/' + record.get('id') + '/tailieu';
    //    if (record.get("tailieu") && record.get("tailieu") != "") {
    //        pathFolder = record.get("tailieu");
    //    }
    //    abp.services.app.fileManager.getFileInFolder({ path: pathFolder }
    //    ).done(function (result) {
    //        var lstFile = result.items;
    //        var storeImage = me.ref.dtvHinhAnh.getStore();
    //        var arrTypeImg = ['.PNG', '.JPG', '.GIF', ".JPEG", ".TIFF", ".BMP"];
    //        var dataStoreImg = [];
    //        var j = 0;
    //        for (var i = 0; i < lstFile.length; i++) {
    //            recordimg = lstFile[i];
    //            if (j == 6) break;
    //            if (arrTypeImg.indexOf(recordimg.fileType.toUpperCase()) != -1) {
    //                j++;
    //                dataStoreImg.push({
    //                    name: recordimg.name,
    //                    fullname: recordimg.fullName,
    //                    url: app.gplatformconsts.URLFileStatics + recordimg.path,
    //                    path: recordimg.path
    //                });
    //            }
    //            else if (recordimg.fileType.toUpperCase() == ".DOC" || recordimg.fileType.toUpperCase() == ".DOCX") {
    //                j++;
    //                dataStoreImg.push({
    //                    name: recordimg.name,
    //                    fullname: recordimg.fullName,
    //                    url: '/gPlatform/Resources/images/word.png',
    //                    path: recordimg.path
    //                });
    //            }
    //            else if (recordimg.fileType.toUpperCase() == ".XLS" || recordimg.fileType.toUpperCase() == ".XLSX") {
    //                j++;
    //                dataStoreImg.push({
    //                    name: recordimg.name,
    //                    fullname: recordimg.fullName,
    //                    url: '/gPlatform/Resources/images/excel.png',
    //                    path: recordimg.path
    //                });
    //            }
    //            else if (recordimg.fileType.toUpperCase() == ".PDF") {
    //                j++;
    //                dataStoreImg.push({
    //                    name: recordimg.name,
    //                    fullname: recordimg.fullName,
    //                    url: '/gPlatform/Resources/images/pdf.png',
    //                    path: recordimg.path
    //                });
    //            }
    //            else {
    //                j++;
    //                dataStoreImg.push({
    //                    name: recordimg.name,
    //                    fullname: recordimg.fullName,
    //                    url: '/gPlatform/Resources/images/filedoc.png',
    //                    path: recordimg.path
    //                });
    //            }
    //        }
    //        if (dataStoreImg.length == 0) {
    //            dataStoreImg.push({
    //                name: 'no-image',
    //                fullname: 'no-image.png',
    //                url: '/gPlatform/Resources/images/no-image-available.png',
    //                path: ''
    //            });
    //        }
    //        storeImage.loadData(dataStoreImg);
    //    }).fail(function (data) {
    //        var storeImage = me.ref.dtvHinhAnh.getStore();
    //        storeImage.loadData([{
    //            name: 'no-image',
    //            fullname: 'no-image.png',
    //            url: '/gPlatform/Resources/images/no-image-available.png',
    //            path: ''
    //        }]);
    //        me.getView().setLoading(false);
    //    });;
    //},

    onSave: function () {
        this.fnSave();
    },

    onSaveAndNew: function () {
        var me = this;
        me.fnSave();
        var newRecord = Ext.create("Admin.model.mKho", { id: 0 });
        me.getViewModel().set("record", newRecord);
    },

    fnSave: function () {
        var me = this;
        var frm = me.ref.frmKho;
        if (!frm.getForm().isValid()) {
            toastr.warning("Nhập đầy đủ thông tin");
            return;
        }
        var view = me.getView();
        var fnSauKhiSave = me.getViewModel().get("fnSauKhiSave");
        var record = me.getViewModel().get("record");
        console.log(record);
        view.setLoading(true);
        if (record.data.id != 0) {
            var url = "api/Storeroom"
            app.mUtils.fnPUTAjax(url, record.data, function () {
                //record.set("id", data.id);
                toastr.success("Cập nhật dữ liệu thành công")
                if (fnSauKhiSave) fnSauKhiSave();
                me.getView().doClose();
                view.setLoading(false);
            })
        } else {
            var url = "api/Storeroom"
            app.mUtils.fnPOSTAjax(url, record.data, function () {
                //record.set("id", data.id);
                toastr.success("Thêm mới dữ liệu thành công")
                if (fnSauKhiSave) fnSauKhiSave();
                me.getView().doClose();
                view.setLoading(false);
            })
        }
    },

    onDongWinDow: function () {
        var me = this;
        var record = me.getViewModel().data.record;
        record.reject();
    }
});
