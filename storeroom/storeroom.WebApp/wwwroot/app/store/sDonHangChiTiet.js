Ext.define('Admin.store.sDonHangChiTiet', {
    extend: 'Ext.data.Store',
    alias: 'store.sdonhangchitiet',
    model: 'Admin.model.mDonHangChiTiet',
    pageSize: 25,
    autoLoad: false,
    proxy: {
        type: "rest",
        api: {
            read: ""
        },
        reader: {
            type: "json",
            rootProperty: "items",
            totalProperty: "totalRecord"
        },
        appendId: true,
        writer: {
            writeAllFields: true,
            type: "json"
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
