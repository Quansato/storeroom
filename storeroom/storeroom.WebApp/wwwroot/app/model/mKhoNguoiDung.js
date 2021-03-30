Ext.define("Admin.model.mKhoNguoiDung", {
    extend: "Ext.data.Model",
    idProperty: "id",
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
        { name: "maNguoiDung", type: 'int', defaultValue: null, allowNull: true },
        { name: "maKho", type: 'int', defaultValue: null, allowNull: true },
        { name: "nhanVien", type: 'int', defaultValue: null, allowNull: true },
        { name: "tenNhanVien", type: 'string' },
        { name: "emailNhanVien", type: 'string' },
        { name: "name", type: 'string' },
        { name: "surname", type: 'string' },
        { name: "userName", type: 'string' },
        {
            name: "fullName", type: 'string', convert: function (value, record) {
                return record.get('surname') + " " + record.get('name');
            }
        },
        { name: "emailAddress", type: 'string' },
        { name: "nhanThongBao", type: 'bool', defaultValue: null, allowNull: true }
    ]
});
