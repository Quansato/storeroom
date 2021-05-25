Ext.define('Admin.model.mPhieuNhapXuatChiTiet', {
    extend: 'Ext.data.Model',
    // idProperty: 'id',
    fields: [
        { name: 'id', type: 'int', defaultValue: null, allowNull: true },
        { name: 'description', type: 'string' },
        { name: 'materialCode', type: 'string' },
        { name: 'materialId', type: 'int' },
        { name: 'materialName', type: 'string' },
        { name: 'price', type: 'float' },
        { name: 'quantity', type: 'int' },
        { name: 'unit', type: 'string' },
        {
            name: 'total', type: 'float',
            convert: function (value, record) {
                var total = record.get('price') * record.get('quantity');
                return total
            }
        },
        {
            name: 'tenVatTu1', type: 'string',
            convert: function (value, record) {
                var text = record.get('materialCode') + "/" + record.get('materialName');
                return text
            }
        },
    ]
});