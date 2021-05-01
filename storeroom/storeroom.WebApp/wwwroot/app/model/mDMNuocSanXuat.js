Ext.define('Admin.model.mDMNuocSanXuat', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'CreationTime', type: 'date' },
        { name: 'LastModificationTime', type: 'date' },

        { name: "id", type: "string" },
        { name: "displayName", type: "string" }

    ]
});
