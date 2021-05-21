Ext.define("Admin.store.sKhoInventory", {
    extend: "Ext.data.Store",
    alias: "store.skhoinventory",
    model: "Admin.model.mKhoInventory",
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
