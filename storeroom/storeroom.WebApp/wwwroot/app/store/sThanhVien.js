Ext.define('Admin.store.sThanhVien', {
    extend: 'Ext.data.Store',
    alias: 'store.sdsthanhvien',
    // autoLoad: false,
    model: 'Admin.model.mThanhVien',
    autoLoad: false,
    proxy: {
        type: 'rest',
        api: {
            read: ""
        },
        useDefaultXhrHeader: false,
        reader: {
            type: 'json',
            headers: {
                'Accept': 'application/json',
            },
            rootProperty: 'items',
            totalProperty: 'totalRecord'
        },
        appendId: true,
        writer: {
            writeAllFields: true,
            type: 'json'
        }
    }
});
