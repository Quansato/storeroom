Ext.define('Admin.store.sPhieuNhapXuatChiTiet', {
    extend: 'Ext.data.Store',
    alias: 'store.sphieunhapxuatchitiet',
    model: 'Admin.model.mPhieuNhapXuatChiTiet',
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
            rootProperty: "items",
            totalProperty: "totalRecord"
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
