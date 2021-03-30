Ext.define('Admin.model.mKhoChuyenTrangThai', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int', defaultValue: null, allowNull: true },
        { name: 'tenantId', type: 'int', defaultValue: null, allowNull: true },
        { name: 'creationTime', type: 'date', defaultValue: null, allowNull: true },
        { name: 'lastModificationTime', type: 'auto', defaultValue: null, allowNull: true },
        { name: 'lastModifierUserId', type: 'auto', defaultValue: null, allowNull: true },
        { name: 'creatorUserId', type: 'int', defaultValue: null, allowNull: true },
        { name: 'isDeleted', type: 'bool', defaultValue: null, allowNull: true },
        { name: 'deleterUserId', type: 'int', defaultValue: null, allowNull: true },
        { name: 'deletionTime', type: 'date', defaultValue: null, allowNull: true },
        { name: 'nguoiThucHien', type: 'int', defaultValue: null, allowNull: true },
        { name: 'tenNguoiThucHien', type: 'string' },
        { name: 'lyDo', type: 'string' },
        { name: 'maPhieu', type: 'int', defaultValue: null, allowNull: true },
        { name: 'trangThaiCu', type: 'int', allowNull: true },
        { name: 'trangThaiMoi', type: 'int', allowNull: true },
        { name: 'phanLoai', type: 'string' }

    ]
});

