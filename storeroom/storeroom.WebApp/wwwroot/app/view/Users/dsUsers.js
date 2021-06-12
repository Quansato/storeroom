Ext.define('Admin.view.users.dsUsersModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.users-dsusers',
    data: {
        selectionUsers: null,
        chucNang: null,
        selectionRole: null,
        selectionPB: null
    },
    stores: {
        storeUser: { type: 'sdsthanhvien' },
        storeQuyen: { type: 'sdsQuyen' }
    }
});

Ext.define('Admin.view.users.dsUsers', {
    extend: 'Ext.panel.Panel',
    xtype: 'dsUsers',
    controller: 'users-dsusers',
    requires: [
        'Ext.tree.Panel',
        'Ext.data.proxy.Rest',
        'Ext.data.TreeStore',
        'Ext.form.field.ComboBox'
    ],
    viewModel: {
        type: 'users-dsusers'
    },
    border: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyStyle: { 'background-color': '#f6f6f6', 'padding': '0px 0px 0px 5px' },
    height: window.innerHeight - 65,
    items: [
        {
            xtype: 'grid',
            layout: 'fit',
            flex: 1,
            title: app.localize('UsersHeaderInfo'),
            iconCls: 'x-fa fa-users',
            cls: 'user-grid',
            ui: 'light',
            reference: 'gridUsers',
            bind: {
                store: '{storeUser}',
                selection: '{selectionUsers}'
            },
            columns: [{
                xtype: 'rownumberer',
                text: '#',
                width: 40,
                align: 'center',
                style: {
                    borderRight: '1px solid #CCCCCC'
                }
            },
            {
                xtype: 'gridcolumn',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    var text = "<img src='/img/default-profile-picture.png' alt='Profile Pic' height='40px' width='40px'>";
                    if (record.get('profilePictureId')) {
                        text = "<img src='/Profile/GetProfilePictureById?id=" + record.get('profilePictureId') + "' alt='Profile Pic' height='40px' width='40px'>";
                    }
                    return text;
                },
                width: 75,
                text: 'Avatar'
            },
            {
                xtype: 'gridcolumn',
                text: 'Tên đăng nhập',
                minWidth: 200,
                flex: 1,
                cellWrap: true,
                align: 'left',
                style: 'text-align:left',
                dataIndex: 'userName'
            }, {
                xtype: 'gridcolumn',
                text: 'Họ',
                width: 200,
                cellWrap: true,
                align: 'left',
                style: 'text-align:left',
                dataIndex: 'name'
            }, {
                xtype: 'gridcolumn',
                text: 'Tên',
                width: 200,
                cellWrap: true,
                align: 'left',
                style: 'text-align:left',
                dataIndex: 'surname'
            }, {
                xtype: 'gridcolumn',
                text: 'Vai trò',
                width: 200,
                cellWrap: true,
                align: 'left',
                style: 'text-align:left',
                dataIndex: 'EmailAddress',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    var text = '';
                    var result = record.get('roles');
                    for (var i = 0; i < result.length; i++) {
                        if (text != "") text += ","
                        text += result[i].roleName;
                    }
                    return text;
                }
            }, {
                xtype: 'gridcolumn',
                text: 'Email',
                width: 250,
                cellWrap: true,
                align: 'left',
                style: 'text-align:left',
                dataIndex: 'emailAddress'
            }, {
                xtype: 'gridcolumn',
                text: 'Xác thực email',
                width: 120,
                cellWrap: true,
                //align: 'center',
                //style: 'text-align:left',
                dataIndex: 'isEmailConfirmed',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    var text = text = '<span class="label kt-badge kt-badge--dark kt-badge--inline">' + app.localize('No') + '</span>'
                    if (value) {
                        text = '<span class="label kt-badge kt-badge--success kt-badge--inline">' + app.localize('Yes') + "</span>";
                    }
                    return text;
                }
            }, {
                xtype: 'gridcolumn',
                text: 'Thời gian tạo',
                width: 140,
                align: 'right',
                style: 'text-align:left',
                dataIndex: 'creationTime',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    var text = value;
                    if (value != "") {
                        text = Ext.Date.format(new Date(value), 'd/m/Y');
                    }
                    return text;
                }
            }],
            viewConfig: {
                emptyText: 'Không có dữ liệu'
            },
            listeners: {
                selectionchange: 'onChangeGrid'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    border: false,
                    layout: 'fit',
                    //style: 'padding-bottom:0px;',
                    style: {
                        borderTop: 'solid 1px #d0d0d0 !important',
                        paddingBottom: '0px',
                        paddingTop: '2px'
                    },
                    items: [{
                        xtype: 'panel',
                        border: 0,
                        border: false,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'combo',
                                    margin: '5 5 5 5',
                                    reference: 'cboQuyen',
                                    editable: false,
                                    bind: {
                                        store: '{storeQuyen}'
                                    },
                                    labelWidth: 120,
                                    fieldLabel: 'Tìm theo vai trò',
                                    emptyText: 'Tìm kiếm người dùng theo vai trò',
                                    triggerAction: 'all',
                                    queryMode: 'local',
                                    displayField: 'displayName',
                                    valueField: 'id',
                                    forceSelection: false
                                }, {
                                    xtype: 'textfield',
                                    margin: '5 5 5 5',
                                    reference: 'txtSeach',
                                    listeners: {
                                        specialkey: 'specialTimKiem'
                                    },
                                    flex: 1,
                                    emptyText: 'Tìm kiếm...'
                                }]
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [{
                                    labelWidth: 135,
                                    fieldLabel: app.localize('OnlyLockedUsers'),
                                    xtype: 'checkboxfield',
                                    margin: '5 5 5 5',
                                    reference: 'checkboxonlyLockedUsers',
                                    flex: 1
                                }, {
                                    xtype: 'button',
                                    margin: '5 5 5 5',
                                    text: app.localize('Search'),
                                    iconCls: 'fa fa-search',
                                    handler: 'onTimKiem'
                                }]
                            }]
                    }]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'fa fa-plus',
                            reference: 'btnAddRole',
                            //hidden: !abp.auth.hasPermission('Pages.Administration.Users.Create'),
                            text: 'Thêm',
                            ui: 'soft-blue',
                            // disabled: true,
                            tooltip: 'Thêm dữ liệu',
                            handler: 'onAddUsers'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'fa fa-pencil',
                            reference: 'btnSuaRole',
                            //hidden: !abp.auth.hasPermission('Pages.Administration.Users.Edit'),
                            bind: { disabled: '{!selectionUsers}' },
                            text: 'Sửa',
                            ui: 'blue',
                            tooltip: 'Sửa',
                            handler: 'onEditUsers'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'fa fa-ban',
                            reference: 'btnPermissionsUsers',
                            bind: { disabled: '{!selectionUsers}' },
                            text: app.localize('Permissions'),
                            ui: 'soft-green',
                            //hidden: !abp.auth.hasPermission('Pages.Administration.Users.ChangePermissions'),
                            tooltip: 'Quyền',
                            handler: 'onPermissionsUsers'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'fa fa-puzzle-piece',
                            text: 'Tiện ích',
                            reference: 'btnPheDuyet',
                            ui: 'blue',
                            tooltip: 'Tiện ích',
                            menu: new Ext.menu.Menu({
                                items: [
                                    {
                                        bind: { disabled: '{!selectionUsers}' },
                                        iconCls: 'x-fa fa-minus',
                                        ui: 'blue',
                                        text: 'Xoá',
                                        //hidden: !abp.auth.hasPermission('Pages.Administration.Users.Delete'),
                                        tooltip: 'Xoá',
                                        handler: 'onDeleteUsers'
                                    },
                                    {
                                        iconCls: 'x-fa fa fa-ban',
                                        ui: 'blue',
                                        reference: 'btnLogUser',
                                        hidden: true,
                                        text: 'Đăng nhập với người dùng này',
                                        tooltip: 'Đăng nhập với người dùng này',
                                        handler: 'onLogUsers'
                                    },
                                    {
                                        xtype: 'menuseparator'
                                    },
                                    {
                                        iconCls: 'x-fa fa-tags',
                                        ui: 'blue',
                                        reference: 'btnUnlockUsers',
                                        bind: { disabled: '{!selectionUsers}' },
                                        text: app.localize('Unlock'),
                                        //hidden: !abp.auth.hasPermission('Pages.Administration.Users.Unlock'),
                                        tooltip: app.localize('Unlock'),
                                        handler: 'onUnlockUsers'
                                    }
                                ]
                            })
                        },
                        '->',
                        {
                            xtype: 'pagingtoolbar',
                            displayInfo: true,
                            bind: {
                                store: '{storeUser}'
                            },
                            style: 'padding: 0px !important',
                            lastText: app.localize("ExtLastText"),
                            prevText: app.localize("ExtPrevText"),
                            firstText: app.localize("ExtFirstText"),
                            nextText: app.localize("ExtNextText"),
                            refreshText: app.localize("ExtRefreshText"),
                            beforePageText: app.localize('ExtBeforePageText'),
                            afterPageText: app.localize('ExtAfterPageText'),
                            displayMsg: app.localize('ExtDisplayMsg'),
                            emptyMsg: app.localize("ExtEmptyMsg"),
                            listeners: {
                                beforechange: function (page, currentPage) {
                                    //--- Get Proxy ------//
                                    var myProxy = this.store.getProxy();
                                    //--- Define Your Parameter for send to server ----//
                                    myProxy.params = {
                                        skipCount: 0,
                                        maxResultCount: 0
                                    };
                                    //--- Set value to your parameter  ----//
                                    myProxy.setExtraParam("skipCount", (currentPage - 1) * this.store.pageSize);
                                    myProxy.setExtraParam("maxResultCount", this.store.pageSize);
                                }
                            }
                        }]
                }]
        }
    ],
    listeners: {
        boxready: 'onAfterrender'
    }
});

Ext.define('Admin.view.users.dsUsersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.users-dsusers',
    ref: null,
    dataUnit: [],
    storeInfo: null,
    _userService: abp.services.app.userNew,
    init: function () {
        var me = this;
        me.storeInfo = me.getViewModel().storeInfo;
        me.ref = me.getReferences();
    },

    onAfterrender: function () {
        var me = this;
        me.onLoadQuyen();
        me.onTimKiem();
        //  var html =
        // me.ref.btnImportToExcelUsers.setHtml(html)
    },

    specialTimKiem: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onTimKiem();
        }
    },

    onTimKiem: function () {
        var me = this;
        me.onLoadDSUsers();
    },

    onLoadQuyen: function () {
        var me = this;
        var _roleService = abp.services.app.roleNew;
        _roleService.getRoles({}).done(function (result) {
            me.storeInfo.storeQuyen.loadData(result.items);
            var data = { id: -1, displayName: 'Tất cả', name: '-1' };
            me.storeInfo.storeQuyen.insert(0, data);
            me.ref.cboQuyen.setValue(-1);
        }).fail(function (err) {
        });
    },

    onLoadDSUsers: function () {
        var me = this;
        var filter = "";
        var OnlyLockedUsers = me.ref.checkboxonlyLockedUsers.getValue();
        var txtSeach = me.ref.txtSeach.getValue();
        if (me.ref.txtSeach.getValue() != "") {
            filter = me.ref.txtSeach.getValue();
        }
        var queryparam = abp.utils.buildQueryString([
            { name: 'filter', value: txtSeach },
            { name: 'permissions', value: "" },
            { name: 'role', value: me.ref.cboQuyen.getValue() == -1 ? "" : me.ref.cboQuyen.getValue() },
            { name: 'onlyLockedUsers', value: OnlyLockedUsers }
        ]);
        var url = abp.appPath + 'api/services/app/UserNew/GetUsers' + queryparam + '';
        var storeUser = me.storeInfo.storeUser;
        storeUser.proxy.api.read = url;
        storeUser.currentPage = 1;
        storeUser.proxy.pageParam = undefined;
        storeUser.proxy.limitParam = undefined
        storeUser.proxy.startParam = undefined;
        storeUser.load({
            params: {
                skipCount: 0,
                maxResultCount: storeUser.pageSize
            },
            scope: this,
            callback: function (records, operation, success) {
            }
        });
    },

    onChangeGrid: function (grid, selected, eOpts) {
        var me = this;
        //var btnLogUser = me.ref.btnLogUser;
        //if (abp.auth.hasPermission('Pages.Administration.Users.Impersonation') && selected.length > 0 && selected[0].get('id') !== abp.session.userId) {
        //    btnLogUser.setVisible(abp.auth.hasPermission('Pages.Administration.Users.Impersonation'))
        //} else {
        //    btnLogUser.setVisible(!abp.auth.hasPermission('Pages.Administration.Users.Impersonation'))
        //}
    },

    onLogUsers: function () {
        var me = this;
        var grid = me.ref.gridUsers;
        var select = grid.getSelection();
        abp.ajax({
            url: abp.appPath + 'Account/Impersonate',
            data: JSON.stringify({
                tenantId: abp.session.tenantId,
                userId: select[0].get('id')
            })
        });
    },

    onAddUsers: function () {
        var me = this;
        var record = Ext.create('Admin.model.mThanhVien');
        record.set('id', 0);
        var _userService = abp.services.app.userNew;
        _userService.getUserForEdit({}).done(function (result) {
            record.set('password', '');
            record.set('roles', result.roles);
            record.set('SetRandomPassword', false);
            record.set('shouldChangePasswordOnNextLogin', true);
            record.set('sendActivationEmail', true);
            record.set('isActive', true);
            record.set('isTwoFactorEnabled', true);
            record.set('isLockoutEnabled', true);
            record.set('organizationUnits', result.allOrganizationUnits);
            record.set('memberedOrganizationUnits', result.memberedOrganizationUnits);
            var wnd = Ext.create('Admin.view.users.cnUsers', {
                title: app.localize('CreateNewUser'),
                wnd: wnd,
                viewModel: {
                    data: {
                        record: record,
                        fnSauKhiLoad: function (data) {
                            me.onLoadDSUsers();
                        }
                    }
                }
            });
            wnd.show();
        }).fail(function (err) {
        });
    },

    onEditUsers: function () {
        var me = this;
        var grid = me.ref.gridUsers;
        var select = grid.getSelection();
        var record = select[0];
        var _userService = abp.services.app.userNew;
        // abp.services.app.cMMSPhanQuyenPhongBan.getNguoiDungById({ id: record.data.id }).done(function (results) {
        //var arrayResult = results;
        _userService.getUserForEdit({ id: record.data.id }).done(function (result) {
            record.set('password', '');
            record.set('roles', result.roles);
            record.set('SetRandomPassword', false);
            record.set('shouldChangePasswordOnNextLogin', result.user.shouldChangePasswordOnNextLogin);
            //record.set('sendActivationEmail', true);
            record.set('isActive', JSON.parse(result.user.isActive));
            record.set('isTwoFactorEnabled', JSON.parse(result.user.isTwoFactorEnabled));
            record.set('isLockoutEnabled', JSON.parse(result.user.isLockoutEnabled));
            record.set('organizationUnits', result.allOrganizationUnits);
            record.set('memberedOrganizationUnits', result.memberedOrganizationUnits);
            record.set('profilePictureId', result.profilePictureId);
            var wnd = Ext.create('Admin.view.users.cnUsers', {
                title: app.localize('EditNguoiDung'),
                viewModel: {
                    data: {
                        record: record,
                        //isEmailConfirmed: arrayResult.isEmailConfirmed,
                        fnSauKhiLoad: function (data) {
                            me.onLoadDSUsers();
                        }
                    }
                }
            });
            wnd.show();
        }).fail(function (err) {
        });
    },

    onDeleteUsers: function () {
        var me = this;
        var grid = me.ref.gridUsers;
        var select = grid.getSelection();
        if (select.length == 0) {
            return;
        }
        var record = select[0];
        if (record.get('name').toLowerCase() == 'admin' || record.get('userName').toLowerCase() == 'admin') {
            abp.notify.info(app.localize('ExtnoRole'));
            return;
        }
        var _roleService = abp.services.app.role;
        abp.message.confirm(
            app.localize('UserDeleteWarningMessage', record.data.userName),
            app.localize('AreYouSure'),
            function (isConfirmed) {
                if (isConfirmed) {
                    me._userService.deleteUser({
                        id: record.data.id
                    }).done(function () {
                        me.onLoadDSUsers();
                        abp.notify.success(app.localize('SuccessfullyDeleted'));
                    });
                }
            }
        );
    },

    onPermissionsUsers: function () {
        var me = this;
        var grid = me.ref.gridUsers;
        var select = grid.getSelection();
        var record = select[0];
        var wnd = Ext.create('Admin.view.users.Permissions', {
            title: app.localize('Permissions') + " - " + record.get('userName'),
            viewModel: {
                data: {
                    record: record,
                    fnSauKhiLoad: function (data) {
                        me.onLoadDSUsers();
                    }
                }
            }
        });
        wnd.show();
    },

    onUnlockUsers: function () {
        var me = this;
        var grid = me.ref.gridUsers;
        var select = grid.getSelection();
        if (select.length == 0) {
            return;
        }
        var record = select[0];
        me._userService.unlockUser({
            id: record.data.id
        }).done(function () {
            abp.notify.success(app.localize('UnlockedTheUser', record.data.userName));
        });
    }
});

function ajaxFileUpload(a) {
    var inputElement = document.getElementById("ImportUsersFromExcelButton");
    $.ajax({
        type: "POST",
        timeout: 50000,
        url: abp.appPath + 'Users/ImportFromExcel',
        dataType: 'json',
        maxFileSize: 1048576 * 100,
        data: {
            files: inputElement.value
        },
        success: function (e, response) {
        }
    });

    return;
    inputElement.fileupload({
        url: abp.appPath + 'Users/ImportFromExcel',
        dataType: 'json',
        maxFileSize: 1048576 * 100,
        done: function (e, response) {
            var jsonResult = response.result;
            if (jsonResult.success) {
                abp.notify.info(app.localize('ImportUsersProcessStart'));
            } else {
                abp.notify.warn(app.localize('ImportUsersUploadFailed'));
            }
        }
    })
}

