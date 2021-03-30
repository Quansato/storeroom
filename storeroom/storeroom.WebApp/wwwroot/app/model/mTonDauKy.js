Ext.define('Admin.model.mTonDauKy', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int', defaultValue: null, allowNull: true },
        { name: 'tenantId', type: 'int', defaultValue: null, allowNull: true },
        { name: 'creationTime', type: 'string' },
        { name: 'lastModificationTime', type: 'auto', defaultValue: null, allowNull: true },
        { name: 'lastModifierUserId', type: 'auto', defaultValue: null, allowNull: true },
        { name: 'creatorUserId', type: 'int', defaultValue: null, allowNull: true },
        { name: 'isDeleted', type: 'bool', defaultValue: null, allowNull: true },
        { name: 'deleterUserId', type: 'int', defaultValue: null, allowNull: true },
        { name: 'deletionTime', type: 'date', defaultValue: null, allowNull: true },
        { name: 'maKho', type: 'string' },
        { name: 'maVatTu', type: 'string' },
        { name: 'thoiDiem', type: 'date', defaultValue: null, useNull: true },
        { name: 'soLuongTonKhoLT', type: 'float', defaultValue: null, allowNull: true },
        { name: 'soLuongTonKhoThuc', type: 'float', defaultValue: null, allowNull: true },
        { name: 'lyDo', type: 'string' },
        { name: 'vatTu', type: 'string' },
        { name: 'tenVatTu', type: 'string' },
        { name: 'donViTinh', type: 'string' }
    ]
});