Ext.define('Admin.view.danhmuckho.cnChotTonLaiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.danhmuckho-mcnchottonlai',
    data: {
        fnSauKhiLoad: null,
        record: null
    },
    stores: {
    }
});

Ext.define('Admin.view.danhmuckho.cnChotTonLai', {
    extend: 'Ext.window.Window',
    requires: [
        'Admin.view.danhmuckho.cnChotTonLaiController',
        'Admin.view.danhmuckho.cnChotTonLaiModel'
    ],
    controller: 'danhmuckho-ccnchottonlai',
    viewModel: {
        type: 'danhmuckho-mcnchottonlai'
    },
    width: 580,
    modal: true,
    title: 'Chốt tồn lại',
    iconCls: 'x-fa fa-list',
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
            xtype: 'textfield',
            reference: 'textmako',
            disabled: true,
            fieldLabel: 'Mã',
            bind: {
                value: '{record.vatTu}'
            }
        }, {
            xtype: 'textfield',
            labelSeparator: '',
            bind: '{record.tenVatTu}',
            disabled: true,
            fieldLabel: 'Tên'
        }, {
            xtype: 'datefield',
            disabled: true,
            fieldLabel: 'Thời điểm',
            bind: '{record.thoiDiem}',
            format: 'd/m/Y'
        }, {
            xtype: 'currencyfield',
            fieldStyle: 'text-align: right;',
            labelSeparator: '',
            bind: '{record.giaTri}',
            fieldLabel: 'Giá trị'
        }, {
            xtype: 'textfield',
            labelSeparator: '',
            bind: '{record.donViTinh}',
            disabled: true,
            fieldLabel: 'Đơn vị tính'
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [{
                flex: 1,
                xtype: 'currencyfield',
                fieldStyle: 'text-align: right;',
                labelAlign: 'right',
                bind: '{record.soLuongTonKhoLT}',
                disabled: true,
                fieldLabel: 'Lý thuyết'
            }, {
                flex: 1,
                labelAlign: 'right',
                xtype: 'currencyfield',
                fieldStyle: 'text-align: right;',
                bind: '{record.soLuongTonKhoThuc}',
                fieldLabel: 'Thực tế'
            }]
        }, {
            xtype: 'textareafield',
            bind: '{record.lyDo}',
            fieldLabel: 'Lý do'
        }]
    }],
    buttons: [{
        text: 'Lưu thông tin',
        handler: 'onLuu',
        reference: 'btnLuu',
        ui: 'soft-blue',
        //hidden: !abp.auth.hasPermission('CMMS.Inventory.Kho.Manager'),
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

Ext.define('Admin.view.danhmuckho.cnChotTonLaiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.danhmuckho-ccnchottonlai',
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
    },

    onLuu: function (button) {
        var me = this;
        var form = me.ref.frmKho;
        if (!form.getForm().isValid()) {
            abp.notify.warn(app.localize("TaiSan_isValid"));
            return;
        }
        var record = me.getViewModel().data.record;
        var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
        var arrValue = [];
        if (!record.get('giaTri')) {
            abp.notify.info(app.localize('KhoVatTu_TonThongBaoGia', record.get('tenVatTu')));
            return;
        }
        arrValue.push({
            id: record.get('id'),
            MaKho: record.get('maKho'),
            GiaTri: record.get('giaTri'),
            MaVatTu: record.get('maVatTu'),
            ThoiDiem: Ext.Date.format(new Date(record.get('thoiDiem')), "Y/m/d H:i:s"),
            SoLuongTonKhoLT: record.get('soLuongTonKhoLT'),
            SoLuongTonKhoThuc: record.get('soLuongTonKhoThuc'),
            LyDo: record.get('lyDo')
        });
        abp.services.app.cMMSKhoTonDauKy.chotTonDauKy(arrValue).done(function (result) {
            me.getView().setLoading(false);
            abp.notify.success(app.localize('SavedSuccessfully'));
            if (fnSauKhiLoad)
                fnSauKhiLoad()
            me.getView().close();
            if (fnSauKhiLoad)
                fnSauKhiLoad(result);
        }).fail(function (data) {
            me.getView().setLoading(false);
        });
    },

    onDongWinDow: function () {
        var me = this;
        var record = me.getViewModel().data.record;
        record.reject();
    }
});
