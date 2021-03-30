Ext.define("Admin.store.sDMNhaCungCap", {
    extend: "Ext.data.Store",
    alias: "store.sdmnhacungcap",
    model: "Admin.model.mDMNhaCungCap",
    pageSize: 25,
    autoLoad: false,
    proxy: {
        type: "rest",
        api: {
            read: ""
        },
        reader: {
            type: "json",
            rootProperty: "result.items",
            totalProperty: "result.totalCount"
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

// Service Provider, Manufacturer, Supplier, Customer
Ext.define("Admin.store.sDMPhanLoaiNhaCungCap", {
    extend: "Ext.data.Store",
    alias: "store.sdmphanloainhacungcap",
    autoLoad: true,
    fields: ["name", "value"],
    data: [
        { value: 'serviceprovider', name: 'Service Provider' },
        { value: 'manufacturer', name: 'Manufacturer' },
        { value: 'supplier', name: 'Supplier' },
        { value: 'customer', name: 'Customer' }
    ]
});

Ext.define("Admin.store.sDMTrangThaiNhaCungCap", {
    extend: "Ext.data.Store",
    alias: "store.sdmtrangthainhacungcap",
    autoLoad: true,
    fields: ["name", "value"],
    data: [
        { value: 'hoatDong', name: 'Hoạt động' },
        { value: 'ngungHoatDong', name: 'Ngưng hoạt động' }
    ]
});