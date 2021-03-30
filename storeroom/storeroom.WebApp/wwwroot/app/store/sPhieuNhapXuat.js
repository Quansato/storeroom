Ext.define('Admin.store.sPhieuNhapXuat', {
    extend: 'Ext.data.Store',
    alias: 'store.sphieunhapxuat',
    model: 'Admin.model.mPhieuNhapXuat',
    pageSize: 25,
    proxy: {
        type: 'rest',
        api: {
            read: '',
            update: '',
            destroy: '',
            create: ''
        },
        reader: {
            type: "json",
            rootProperty: "result.items",
            totalProperty: "result.totalCount"
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            nameProperty: 'id'
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
