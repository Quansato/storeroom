Ext.define('Admin.store.sQuyen', {
    extend: 'Ext.data.Store',
    alias: 'store.sdsQuyen',
    // autoLoad: false,
    model: 'Admin.model.mQuyen',
    pageSize: 25,
    autoLoad: false,
    proxy: {
        type: 'rest',
        api: {
            read: ""
        },
        useDefaultXhrHeader: false,
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
