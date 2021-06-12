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
        { name: 'storeroomId', type: 'int' },
        { name: 'materialId', type: 'int' },
        { name: 'date', type: 'date', defaultValue: null, useNull: true },
        { name: 'quantityLT', type: 'int', defaultValue: null, allowNull: true },
        {
            name: 'quantity', type: 'int',
            convert: function (value, record) {
                var total = record.get('quantityLT');
                return total
            }
        },
        { name: 'quantityTT', type: 'int', defaultValue: null, allowNull: true },
        {
            name: 'quantityReal', type: 'int',
            convert: function (value, record) {
                var total = record.get('quantityTT');
                return total
            }
        },
        { name: 'description', type: 'string' },
        {name:'price',type:'float'},
        { name: 'materialCode', type: 'string' },
        { name: 'materialName', type: 'string' },
        {
            name: 'displayName', type: 'string',
            convert: function (value, record) {
                var total = record.get('materialName');
                return total
            }
        },
        { name: 'unitName', type: 'string' }
    ]
});