Ext.define("Admin.view.danhmuckho.cnNhomVatTuModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.danhmuckho-cnnhomvattu",
    data: {
        record: null,
        fnSauKhiSave: null
    }
});

Ext.define("Admin.view.danhmuckho.cnNhomVatTu", {
    extend: "Ext.window.Window",
    requires: ["Admin.view.danhmuckho.cnNhomVatTuController", "Admin.view.danhmuckho.cnNhomVatTuModel"],
    controller: "danhmuckho-cnnhomvattu",
    viewModel: {
        type: "danhmuckho-cnnhomvattu"
    },
    width: 580,
    height: 280,
    iconCls: 'x-fa fa-list',
    modal: true,
    items: [{
        xtype: "form",
        padding: 5,
        reference: "frmKhoNhomVatTu",
        layout: {
            type: "vbox",
            align: "stretch"
        },
        defaults: {
            flex: 1,
            labelAlign: "right",
            labelWidth: 70
        },
        items: [{
            xtype: "textfield",
            name: "ma",
            fieldLabel: 'Mã' /*+ app.gplatformconsts.var_required*/,
            allowBlank: false,
            bind: {
                value: "{record.qrCode}",
                disabled: "{record.id != 0}"
            },
            listeners: {
                blur: "blurMa"
            }
        }, {
            xtype: "textarea",
            name: "moTa",
            fieldLabel: 'Tên' /*+ app.gplatformconsts.var_required*/,
            allowBlank: false,
            bind: "{record.displayName}"
        }, {
            xtype: "textfield",
            name: "ma",
            fieldLabel: 'QRCode',
            bind: "{record.qrCode}"
        }]
    }],
    buttons: [{
        text: 'Lưu và thêm mới',
        iconCls: "fa fa-floppy-o",
        ui: "soft-green",
        reference: "btnSaveAndNew",
        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
        handler: "onSaveAndNew"
    }, {
        text: 'Lưu thông tin',
        iconCls: "fa fa-floppy-o",
        ui: "soft-blue",
        reference: "btnSave",
        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
        handler: "onSave"
    }, {
        text: 'Huỷ bỏ',
        ui: "soft-red",
        handler: function () {
            this.up("window").close();
        },
        iconCls: "fa fa-times"
    }],
    listeners: {
        afterRender: "onAfterrender"
    }
});
Ext.define("Admin.view.danhmuckho.cnNhomVatTuController", {
    extend: "Ext.app.ViewController",
    alias: "controller.danhmuckho-cnnhomvattu",
    refs: null,
    storeInfo: null,

    init: function () {
        var me = this;
        me.callParent(arguments);
    },

    onAfterrender: function () {
        var me = this;
        me.refs = me.getReferences();
        me.storeInfo = me.getViewModel().storeInfo;
    },

    //blurMa: function () {
    //    var me = this;
    //    var record = me.getViewModel().get("record");
    //    var ma = app.gplatformutils.BoDauBoKhoangTrangGiuNguyenHoaThuong(record.get("ma"));
    //    record.set("ma", ma);
    //},

    onSave: function () {
        this.fnSave();
    },

    onSaveAndNew: function () {
        var me = this;
        me.fnSave();
        var newRecord = Ext.create("Admin.model.mKhoNhomVatTu", { id: 0 });
        me.getViewModel().set("record", newRecord);
    },

    fnSave: function () {
        var me = this;
        var frm = me.refs.frmKhoNhomVatTu;
        if (!frm.getForm().isValid()) {
            abp.notify.warn(app.localize("TaiSan_isValid"));
            return;
        }
        var view = me.getView();
        var fnSauKhiSave = me.getViewModel().get("fnSauKhiSave");
        var record = me.getViewModel().get("record");
        console.log(record)
        view.setLoading(true);
        if (record.data.id != 0) {
            var url = "api/MaterialGroup"
            app.mUtils.fnPUTAjax(url, record.data, function (response) {
                console.log(response)
            })
        } else {
            var url="api/MaterialGroup"
            app.mUtils.fnPOSTAjax(url, record.data, function (response) {
                console.log(response)
            })
        }
    }
});
