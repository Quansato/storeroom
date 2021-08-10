Ext.define('Admin.model.mQuyen', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'displayName', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'addedTime', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'creationTime', type: 'string' },
        { name: 'isStatic', type: 'auto', defaultValue: null, allowNull: true },
        { name: 'isDefault', type: 'auto', defaultValue: null, allowNull: true },
        {name:'selected',type:'bool'}

    ]
});
