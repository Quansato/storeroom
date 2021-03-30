Ext.define('Admin.model.mDMLoaiPhieu', {
    extend: 'Ext.data.Model',
    idProperty: "id",
    fields: [
        { name: 'id', type: 'string' },
        { name: 'CreationTime', type: 'date' },
        { name: 'LastModificationTime', type: 'date' },
        { name: "ma", type: "string" },
        { name: "moTa", type: "string" },
        { name: "phanLoai", type: "string" }
    ]
});
