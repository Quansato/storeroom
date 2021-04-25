Ext.define("Admin.store.sKhoVatTu", {
    extend: "Ext.data.Store",
    alias: "store.skhovattu",
    model: "Admin.model.mKhoVatTu",
    autoLoad: false,
    pageSize: 25,
    proxy: {
        type: "rest",
        api: {
            read: ""
        },
        reader: {
            type: "json",
            rootProperty: "items",
            totalProperty: "totalCount"
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
