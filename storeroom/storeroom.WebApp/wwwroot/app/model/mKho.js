Ext.define('Admin.model.mKho', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int', defaultValue: null, allowNull: true },
        {name:'displayName',type:'string'},
        {name:'storeroomCode',type:'string'},
        { name: 'userId', type: 'string' },
        { name: 'area', type: 'float' },
        {name:'userName',type:'string'}
        //{ name: 'tenantId', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'creationTime', type: 'string' },
        //{ name: 'lastModificationTime', type: 'auto', defaultValue: null, allowNull: true },
        //{ name: 'lastModifierUserId', type: 'auto', defaultValue: null, allowNull: true },
        //{ name: 'creatorUserId', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'isDeleted', type: 'bool', defaultValue: null, allowNull: true },
        //{ name: 'deleterUserId', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'deletionTime', type: 'date', defaultValue: null, allowNull: true },
        //{ name: 'ma', type: 'string' },
        //{ name: 'moTa', type: 'string' },
        //{ name: 'xDaiDien', type: 'float', defaultValue: null, useNull: true },
        //{ name: 'yDaiDien', type: 'float', defaultValue: null, useNull: true },
        //{ name: 'trangThaiKho', type: 'string' },
        //{ name: 'diaChi', type: 'string' },
        //{ name: 'soDoKho', type: 'int', defaultValue: null, useNull: true },
        //{ name: 'phanLoai', type: 'string' },
        //{ name: 'maCha', type: 'int', defaultValue: null, useNull: true },
        //{ name: 'donViQuanLy', type: 'int', defaultValue: null, useNull: true },
        //{ name: 'maDonViQuanLy', type: 'string' },
        //{ name: 'tenDonViQuanLy', type: 'string' },
        //{ name: 'nguoiDaiDien', type: 'int', defaultValue: null, useNull: true },
        //{ name: 'tenNguoiDaiDien', type: 'string' }
    ]
});