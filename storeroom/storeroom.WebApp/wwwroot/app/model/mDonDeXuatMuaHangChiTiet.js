Ext.define('Admin.model.mDonDeXuatMuaHangChiTiet', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int', defaultValue: null, allowNull: true },
        { name: 'tenantId', type: 'int', defaultValue: null, allowNull: true },
        { name: 'maPhieu', type: 'int', defaultValue: null, allowNull: true },
        { name: 'maVatTu', type: 'int', defaultValue: null, allowNull: true },
        { name: 'vatTu', type: 'string' },
        {
            name: 'tenVatTu', type: 'string'
        },
        {
            name: 'tenVatTu1', type: 'string',
            convert: function (value, record) {
                var text = record.get('vatTu') + "/" + record.get('tenVatTu');
                return text
            }
        },
        { name: 'donViTinh', type: 'string' },
        { name: 'soLuong', type: 'float', defaultValue: null, allowNull: true },
        { name: 'donViTinhThuc', type: 'string' },
        { name: 'soLuongThuc', type: 'float', defaultValue: null, allowNull: true },
        { name: 'donGia', type: 'float', defaultValue: null, allowNull: true },
        { name: 'thanhTien', type: 'float', defaultValue: null, allowNull: true },
        { name: 'ghiChu', type: 'string' },
        { name: 'maCongTrinh', type: 'string' }
    ]
});