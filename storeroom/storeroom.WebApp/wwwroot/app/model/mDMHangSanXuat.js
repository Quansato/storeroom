﻿Ext.define('Admin.model.mDMHangSanXuat', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'CreationTime', type: 'date' },
        { name: 'LastModificationTime', type: 'date' },

        { name: "ma", type: "string" },
        { name: "moTa", type: "string" }

    ]
});