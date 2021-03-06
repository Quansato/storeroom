Ext.define('Admin.store.sKhoNguoiDung', {
    extend: 'Ext.data.Store',
    alias: 'store.skhonguoidung',
    model: 'Admin.model.mKhoNguoiDung',
    autoLoad: false,
    pageSize: 25,
    proxy: {
        type: 'rest',
        api: {
            read: '',
            create: '',
            update: '',
            destroy: ''
        },
        reader: {
            type: 'json',
            rootProperty: 'result.items',
            totalProperty: 'result.totalCount'
        },
        appendId: true,
        writer: {
            writeAllFields: true,
            type: 'json'
        },
        //listeners: {
        //    exception: function (proxy, response, op) {
        //        var error = JSON.parse(response.responseText).error;
        //        if (response.status == 401) {
        //            abp.ajax.handleUnAuthorizedRequest(
        //                abp.ajax.showError({ message: error.message }),
        //                abp.appPath
        //            );
        //        }
        //        else {
        //            abp.ajax.showError({ message: error.message });
        //        }
        //    }
        //}
    }
});