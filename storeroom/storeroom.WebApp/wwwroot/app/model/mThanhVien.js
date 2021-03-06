Ext.define('Admin.model.mThanhVien', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'firstName', type: 'string' },
        { name: 'lastName', type: 'string' },
        {
            name: 'tenNguoiDaiDien', type: 'string',
            convert: function (value, record) {
                var total = record.get('firstName') + ' ' + record.get('lastName');
                return total
            }
        },
        { name: 'userName', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'profilePictureId', type: 'auto', defaultValue: null, allowNull: true },
        { name: 'addedTime', type: 'string' },
        { name: 'roles', type: 'auto', defaultValue: [], allowNull: true },
        { name: 'isEmailConfirmed', type: 'bool', defaultValue: null, allowNull: true },
        { name: 'phoneNumber', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'isActive', type: 'bool', defaultValue: null, allowNull: true },
        { name: 'creationTime', type: 'string' },
        { name: 'SetRandomPassword', type: 'bool', defaultValue: null, allowNull: true },
        { name: 'sendActivationEmail', type: 'bool', defaultValue: null, allowNull: true },
        { name: 'organizationUnits', type: 'auto', defaultValue: [], allowNull: true },
        { name: 'assignedRoleNames', type: 'auto', defaultValue: [], allowNull: true },
        { name: 'user', type: 'string' },
        { name: 'password', type: 'string' },
        { name: 'passwordRepeat', type: 'string' },
        { name: 'isTwoFactorEnabled', type: 'bool', defaultValue: null, allowNull: true },
        { name: 'isLockoutEnabled', type: 'bool', defaultValue: null, allowNull: true },
        { name: 'shouldChangePasswordOnNextLogin', type: 'bool', defaultValue: null, allowNull: true },
        { name: 'memberedOrganizationUnits', type: 'auto', defaultValue: [], allowNull: true }
    ]
});
