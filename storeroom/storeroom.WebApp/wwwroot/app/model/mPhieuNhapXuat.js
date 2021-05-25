Ext.define('Admin.model.mPhieuNhapXuat', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int', defaultValue: null, allowNull: true },
        { name: 'inputCode', type: 'string' },
        { name: 'storeroomId', type: 'int', defaultValue: null, allowNull: true },
        { name: 'deliveryUnit', type: 'string' },
        { name: 'shipper', type: 'string' },
        { name: 'dateInput', type: 'date', defaultValue: null, allowNull: true },
        { name: 'dateStatus', type: 'date', defaultValue: null, allowNull: true },
        //{ name: 'creationTime', type: 'date', defaultValue: null, allowNull: true },
        { name: 'description', type: 'string' },
        { name: 'userId', type: 'string', defaultValue: null, allowNull: true },


        { name: 'outputCode', type: 'string' },
        { name: 'storeroomId', type: 'int', defaultValue: null, allowNull: true },
        { name: 'recipient', type: 'string' },
        //{ name: 'userRecipient', type: 'string' },
        { name: 'type', type: 'int', defaultValue: null, allowNull: true },

        { name: 'dateOutput', type: 'date', defaultValue: null, allowNull: true },
        { name: 'dateDocument', type: 'date', defaultValue: null, allowNull: true },
        { name: 'storeroomReceiveId', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'creationTime', type: 'date', defaultValue: null, allowNull: true },
        { name: 'description', type: 'string' },
        { name: 'userId', type: 'string', defaultValue: null, allowNull: true },
    ]
});

