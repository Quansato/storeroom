Ext.define('Admin.model.mDonDeXuatMuaHang', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [{ name: 'id', type: 'int', defaultValue: null, allowNull: true },
    { name: 'tenantId', type: 'int', defaultValue: null, allowNull: true },
    {
        name: 'ngayDeXuat', dateFormat: 'date', defaultValue: null, allowNull: true,
        convert: function (value, record) {
            var text = value;
            if (value) { text = new Date(value); }
            return text;
        }
    },
    { name: 'SoPhieu', type: 'string' },
    { name: 'nguoiDeXuat', type: 'int', defaultValue: null, allowNull: true },
    { name: 'moTa', type: 'string' },
    { name: 'nguoiPheDuyet', type: 'int', defaultValue: null, allowNull: true },
    { name: 'LyDo', type: 'string' },
    { name: 'maKho', type: 'int', defaultValue: null, allowNull: true },
    { name: 'tenNguoiDeXuat', type: 'string' },
    { name: 'tenNguoiPheDuyet', type: 'string' },
    { name: 'lyDo', type: 'string' },
    { name: 'khoanChi', type: 'int', defaultValue: null, allowNull: true },
    { name: 'tenKhoanChi', type: 'string' },
    { name: 'trangThai', type: 'int', defaultValue: null, allowNull: true }
    ]
});