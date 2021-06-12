﻿Ext.define('Admin.view.users.cnUsersModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.users-mdcnusers',
    data: {
        record: null,
        fnSauKhiLoad: null,
        selection: null,
        wnd: null,
        isEmailConfirmed: null
    },
    stores: {
        storeTreeRoles: { type: 'sTreeRoles' },
        storeQuyen: { type: 'sdsQuyen' },
        storeQuyenKT: { type: 'sdsQuyen' }
    }
});
var cnUsers = null;
Ext.define('Admin.view.users.cnUsers', {
    extend: 'Ext.window.Window',
    requires: [
        'Admin.view.users.cnUsersController',
        'Admin.view.users.cnUsersModel',
        'Ext.tree.Panel',
        'Ext.data.proxy.Rest',
        'Ext.data.TreeStore',
        'Ext.form.FieldSet',
        'Ext.tab.Panel'
    ],
    controller: 'users-ccnusers',
    viewModel: {
        type: 'users-mdcnusers'
    },
    width: 800,
    height: 666,
    filterStore: null,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'tabpanel',
                flex: 2,
                cls: 'tabMain',
                reference: 'tabpanel',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                listeners: {
                    tabchange: "changetab"
                },
                items: [
                    {
                        xtype: 'form',
                        title: app.localize('UserInformations'),
                        reference: 'frmUsers',
                        bodyPadding: 0,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },

                        items: [
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [{
                                    xtype: 'container',
                                    margin: '0 0 0 0',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    flex: 1,
                                    items: [{
                                        xtype: 'textfield',
                                        fieldLabel: app.localize('Name') + app.eKMapConsts.var_required,
                                        margin: '5 5 5 5',
                                        labelAlign: 'right',
                                        bind: '{record.name}',
                                        labelWidth: 130,
                                        allowBlank: false,
                                        blankText: app.localize('Name') + app.localize('ExtNotText')
                                    }, {
                                        fieldLabel: app.localize('Surname') + app.eKMapConsts.var_required,
                                        xtype: 'textfield',
                                        labelAlign: 'right',
                                        labelWidth: 130,
                                        margin: '5 5 5 5',
                                        allowBlank: false,
                                        blankText: app.localize('surname') + app.localize('ExtNotText'),
                                        bind: '{record.surname}'
                                    }]
                                }]
                            },
                            {
                                fieldLabel: app.localize('EmailAddress') + app.eKMapConsts.var_required,
                                allowBlank: false,
                                blankText: app.localize('EmailAddress') + app.localize('ExtNotText'),
                                vtype: 'email',
                                labelAlign: 'right',
                                vtypeText: app.localize('ExtEmailFormat'),
                                xtype: 'textfield',
                                labelWidth: 130,
                                margin: '5 5 5 5',
                                bind: '{record.emailAddress}'
                            }, {
                                xtype: 'textfield',
                                margin: '5 5 5 5',
                                labelWidth: 130,
                                labelAlign: 'right',
                                maxLength: 64,
                                fieldLabel: app.localize('PhoneNumber'),
                                emptyText: app.localize('PhoneNumber'),
                                bind: '{record.phoneNumber}'
                            }, {
                                xtype: 'textfield',
                                margin: '5 5 5 5',
                                labelWidth: 130,
                                labelAlign: 'right',
                                reference: 'txtUserName',
                                allowBlank: false,
                                blankText: app.localize('UserName') + app.localize('ExtNotText'),
                                maxLength: 256,
                                fieldLabel: app.localize('UserName') + app.eKMapConsts.var_required,
                                emptyText: app.localize('UserName'),
                                bind: '{record.userName}'
                            }, {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [/*{
                                    xtype: 'checkboxfield',
                                    bind: '{record.SetRandomPassword}',
                                    margin: '0 0 0 140',
                                    listeners: {
                                        change: 'onCheckTandomPass'
                                    },
                                    boxLabel: app.localize('SetRandomPassword')
                                },*/
                                    {
                                        xtype: 'checkboxfield',
                                        hidden: true,
                                        boxLabel: app.localize('ChangePassword'),
                                        reference: 'cboChangePass',
                                        margin: '0 0 0 140',
                                        listeners: {
                                            change: 'onCheckPassWord'
                                        }
                                    }
                                ]
                            }, {
                                xtype: 'container',
                                reference: 'contaiPass',
                                hidden: true,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [{
                                    xtype: 'textfield',
                                    reference: 'textPassword',
                                    inputType: 'password',
                                    autoComplete: true,
                                    autoCapitalize: true,
                                    allowBlank: false,
                                    blankText: app.localize('password') + app.localize('ExtNotText'),
                                    margin: '5 5 5 5',
                                    labelAlign: 'right',
                                    minLength: 3,
                                    autoCorrect: true,
                                    labelWidth: 130,
                                    maxLength: 256,
                                    fieldLabel: app.localize('Password') + app.eKMapConsts.var_required,
                                    emptyText: app.localize('Password'),
                                    bind: '{record.password}'
                                }, {
                                    xtype: 'textfield',
                                    margin: '5 5 5 5',
                                    reference: 'PasswordRepeat',
                                    allowBlank: false,
                                    blankText: app.localize('PasswordRepeat') + app.localize('ExtNotText'),
                                    labelAlign: 'right',
                                    autoComplete: true,
                                    minLength: 3,
                                    inputType: 'password',
                                    labelWidth: 130,
                                    maxLength: 256,
                                    fieldLabel: app.localize('PasswordRepeat') + app.eKMapConsts.var_required,
                                    emptyText: app.localize('PasswordRepeat'),
                                    bind: '{record.passwordRepeat}',
                                    listeners: {
                                        blur: 'onBlur'
                                    }
                                }, {
                                    margin: '5 5 5 5',
                                    xtype: 'label',

                                    reference: 'labelPasswordRepeat',
                                    flex: 1,
                                    hidden: true
                                }]
                            },
                            //{
                            //    xtype: 'checkboxfield',
                            //    bind: '{record.shouldChangePasswordOnNextLogin}',
                            //    margin: '0 0 0 140',
                            //    boxLabel: app.localize('ShouldChangePasswordOnNextLogin')
                            //},
                            //{
                            //    xtype: 'checkboxfield',
                            //    bind: {
                            //        value: '{record.sendActivationEmail}',
                            //        hidden: '{record.id>0}'
                            //    },
                            //    margin: '0 0 0 140',
                            //    boxLabel: app.localize('SendActivationEmail')
                            //}
                            , {
                                xtype: 'checkboxfield',
                                bind: '{record.isActive}',
                                boxLabel: app.localize('Active'),
                                margin: '0 0 0 140'
                            }, {
                                hidden: true,
                                xtype: 'checkboxfield',
                                boxLabel: app.localize('IsTwoFactorEnabled'),
                                bind: '{record.isTwoFactorEnabled}',
                                margin: '0 0 0 140'
                            }, {
                                xtype: 'checkboxfield',
                                bind: '{record.isLockoutEnabled}',
                                margin: '0 0 0 140',
                                boxLabel: app.localize('IsLockoutEnabled')
                            },
                            {
                                xtype: 'container',
                                bind: { hidden: '{record.id==0}' },
                                reference: 'contaiDaXacThuc',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    //{
                                    //xtype: 'checkboxfield',
                                    //readOnly: true,
                                    //bind: {
                                    //    hidden: '{!record.isEmailConfirmed}',
                                    //    value: '{record.isEmailConfirmed}'
                                    //},
                                    //boxLabel: app.localize('ThongBaoEmaiLDaXacThuc'),
                                    //margin: '0 0 0 140'
                                    //},
                                    {
                                        xtype: 'container',
                                        bind: { hidden: '{isEmailConfirmed}' },
                                        reference: 'contaiChuaXacThuc',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [{
                                            xtype: 'checkboxfield',
                                            bind: '{record.isEmailConfirmed}',
                                            readOnly: true,
                                            boxLabel: app.localize('ThongBaoEmaiLChuaXacThuc'),
                                            margin: '0 0 0 140',
                                            flex: 1
                                        }, {
                                            margin: '0 5 0 5',
                                            xtype: 'button',
                                            text: app.localize('BtnThucHienXacThucEmailNguoiDung'),
                                            tooltip: app.localize('BtnThucHienXacThucEmailNguoiDung'),
                                            reference: 'btnXacThucEmail',
                                            handler: "onXacThucEmail",
                                            iconCls: 'fa fa-envelope'
                                        }]
                                    }]
                            }]
                    },
                    {
                        xtype: 'panel',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        reference: 'panelQuyen',
                        title: app.localize('Roles'),
                        items: [{
                            xtype: 'grid',
                            reference: 'gridQuyen',
                            ui: 'light',
                            bind: {
                                store: '{storeQuyen}'
                            },
                            selModel: {
                                selType: 'checkboxmodel',
                                checkOnly: 'true',
                                allowDeselect: false
                            },
                            columns: [{
                                xtype: 'rownumberer',
                                text: '#',
                                width: 40,
                                align: 'center',
                                style: {
                                    borderRight: '1px solid #CCCCCC'
                                }
                            }, {
                                xtype: 'gridcolumn',
                                text: app.localize('Roles'),
                                minWidth: 200,
                                flex: 1,
                                cellWrap: true,
                                align: 'left',
                                style: 'text-align:center',
                                dataIndex: 'displayName'
                            }],
                            viewConfig: {
                                emptyText: app.localize('ExtNoData'),
                                stripeRows: true,
                                listeners: {
                                    beforerefresh: function (view) {
                                        var store = view.getStore();
                                        var model = view.getSelectionModel();
                                        var s = [];
                                        store.queryBy(function (record) {
                                            if (record.get('checked') === true) {
                                                s.push(record);
                                            }
                                        });
                                        model.select(s);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'grid',
                            ui: 'light',
                            reference: 'gridQuyenKeThua',
                            title: app.localize('RoleIsInheritedFromOrganizationUnit'),
                            iconCls: 'x-fa fa-list-ul',
                            bind: {
                                store: '{storeQuyenKT}'
                            },
                            header: {
                                padding: 8,
                                style: "border-top: 1px solid #d0d0d0!important;"
                            },
                            selModel: {
                                selType: 'checkboxmodel',
                                checkOnly: 'true',
                                allowDeselect: false,
                                selectionchange: 'onselectionchangeSelModel'
                            },
                            columns: [{
                                xtype: 'rownumberer',
                                text: '#',
                                width: 40,
                                align: 'center',
                                style: {
                                    borderRight: '1px solid #CCCCCC'
                                }
                            }, {
                                xtype: 'gridcolumn',
                                text: app.localize('Role'),
                                minWidth: 200,
                                flex: 1,
                                cellWrap: true,
                                align: 'left',
                                style: 'text-align:center',
                                dataIndex: 'displayName'
                            }],
                            viewConfig: {
                                emptyText: app.localize('ExtNoData'),
                                stripeRows: true,
                                listeners: {
                                    beforerefresh: function (view) {
                                        var store = view.getStore();
                                        var model = view.getSelectionModel();
                                        var s = [];
                                        store.queryBy(function (record) {
                                            if (record.get('checked') === true) {
                                                s.push(record);
                                            }
                                        });
                                        model.select(s);
                                    }
                                }
                            }
                        }]
                    },
                    {
                        border: false,
                        region: 'center',
                        title: app.localize('OrganizationUnits'),
                        xtype: 'treepanel',
                        rootVisible: false,
                        flex: 1,
                        reference: 'treePermis',
                        bind: {
                            store: '{storeTreeRoles}',
                            selection: '{selection}'
                        },
                        layout: 'fit',
                        columns: [{
                            xtype: 'treecolumn',
                            flex: 1,
                            dataIndex: 'text',
                            scope: me,
                            renderer: function (value) {
                                var me = cnUsers;
                                var searchString = me.ref.txtSeachRoles.getValue();
                                if (searchString.length > 0) {
                                    return me.strMarkRedPlus(searchString, value);
                                }
                                return value;
                            }
                        }],
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [{
                                xtype: 'textfield',
                                //  emptyText: 'Nhập tên người dùng',
                                reference: 'txtSeachRoles',
                                flex: 1,
                                enableKeyEvents: true,
                                triggers: {
                                    clear: {
                                        cls: 'x-form-clear-trigger',
                                        handler: 'onClearTriggerClick',
                                        hidden: true,
                                        scope: 'this'
                                    },
                                    search: {
                                        cls: 'x-form-search-trigger',
                                        weight: 1,
                                        handler: 'onSearchTriggerClick',
                                        scope: 'this'
                                    }
                                },

                                onClearTriggerClick: function () {
                                    var me = cnUsers;
                                    var text = me.ref.txtSeachRoles.getValue();
                                    me.ref.txtSeachRoles.setValue();
                                    me.storeinfo.storeTreeRoles.clearFilter();
                                    me.ref.txtSeachRoles.getTrigger('clear').hide();
                                },

                                onSearchTriggerClick: function () {
                                    var me = cnUsers;
                                    var text = me.ref.txtSeachRoles.getValue();
                                    if (text.length >= 3) {
                                        me.filterStore(text)
                                    }

                                },
                                listeners: {
                                    keyup: {
                                        fn: function (field, event, eOpts) {
                                            var me = cnUsers;
                                            var value = field.getValue();
                                            if (value == '') {
                                                field.getTrigger('clear').hide();
                                                me.filterStore(value);
                                                me.lastFilterValue = value;
                                            } else if (value && value !== me.lastFilterValue) {
                                                field.getTrigger('clear')[(value.length > 0) ? 'show' : 'hide']();
                                                me.filterStore(value);
                                                me.lastFilterValue = value;
                                            }
                                            field.getTrigger('clear')[(value.length > 0) ? 'show' : 'hide']();
                                            me.filterStore(value);
                                        },
                                        buffer: 300
                                    },
                                    render: function (field) {
                                        me.searchField = field;
                                    },
                                    scope: this
                                }
                            }]
                        }]
                    }]
            }];
        this.callParent(arguments);
    },
    buttons: [{
        text: app.localize('Save'),
        iconCls: 'fa fa-floppy-o',
        ui: 'soft-blue',
        reference: 'btnThucHien',
        handler: 'onThucHien'
    }, {
        text: app.localize('Cancel'),
        ui: 'soft-red',
        handler: function () {
            this.up('window').close();
        },
        iconCls: 'fa fa-times'
    }],
    listeners: {
        boxready: 'onAfterrender',
        close: 'onDongWinDow'
    }
});


Ext.define('Admin.view.users.cnUsersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.users-ccnusers',
    ref: null,
    viewTab: false,
    storeinfo: null,
    init: function () {
        var me = this;
        me.ref = me.getReferences();
        me.callParent(arguments);
    },

    onAfterrender: function () {
        var me = this;
        cnUsers = me;
        me.ref = me.getReferences();
        me.storeinfo = me.getViewModel().storeInfo;
        var record = me.getViewModel().data.record;
        if (record.get('id') > 0) {
            me.ref.cboChangePass.setValue(false);
            me.ref.contaiPass.setVisible(false);
            me.ref.cboChangePass.setVisible(true);
            me.ref.textPassword.allowBlank = true;
            me.ref.PasswordRepeat.allowBlank = true;
            //Bổ sung nếu sửa -> Thì không cho sửa UserName
            me.ref.txtUserName.setReadOnly(true);
        } else {

        }
        var count = 0;
        var listRole = [];
        var listRoleKT = [];
        for (var i = 0; i < record.data.roles.length; i++) {
            if (record.data.roles[i].isAssigned == true && record.data.roles[i].inheritedFromOrganizationUnit == false) {
                count = count + 1;
                var obj = {
                    'checked': true,
                    'id': record.data.roles[i].roleId,
                    'displayName': record.data.roles[i].roleDisplayName,
                    'name': record.data.roles[i].roleName,
                    'isDefault': record.data.roles[i].isAssigned,
                    'isStatic': record.data.roles[i].nheritedFromOrganizationUnit
                }
                listRole.push(obj);
            } else if (record.data.roles[i].inheritedFromOrganizationUnit == true) {
                count = count + 1;
                var obj = {
                    'checked': true,
                    'id': record.data.roles[i].roleId,
                    'displayName': record.data.roles[i].roleDisplayName,
                    'name': record.data.roles[i].roleName,
                    'isDefault': record.data.roles[i].isAssigned,
                    'isStatic': record.data.roles[i].nheritedFromOrganizationUnit,
                    displayName: record.data.roles[i].roleDisplayName + " " + app.localize('RoleIsInheritedFromOrganizationUnit')
                }
                listRoleKT.push(obj);
            } else {
                var obj = {
                    'checked': false,
                    'id': record.data.roles[i].roleId,
                    'displayName': record.data.roles[i].roleDisplayName,
                    'name': record.data.roles[i].roleName,
                    'isDefault': record.data.roles[i].isAssigned,
                    'isStatic': record.data.roles[i].nheritedFromOrganizationUnit
                }
                listRole.push(obj);
            }
        }
        me.ref.panelQuyen.setTitle(app.localize('Roles') + " " + '<span _ngcontent-wcp-c39="" class="kt-badge kt-badge--success kt-badge--inline ng-star-inserted">' + count + '</span>');
        me.storeinfo.storeQuyen.loadData(listRole);
        me.storeinfo.storeQuyenKT.loadData(listRoleKT);
        //Hiển thị ảnh đại diện của người dùng
        var panelImag = me.ref.panelImag;
        if (record.get('profilePictureId')) {
            panelImag.setHtml('<img src="/Profile/GetProfilePictureById?id=' + record.get('profilePictureId') + '" style="height:108px;width:110px"  class="img-thumbnail img-rounded user-edit-dialog-profile-image">');
        }

        me.getTreeDataFromServer(record.get('organizationUnits'), record.get('memberedOrganizationUnits'));
        if (record.get('id') == 0) {
            setTimeout(function () {
                record.set('password', "");
                me.ref.cboChangePass.setValue(true)
                me.ref.cboChangePass.setVisible(false);
                me.ref.contaiPass.setVisible(true);
                me.ref.textPassword.allowBlank = false;
                me.ref.PasswordRepeat.allowBlank = false;
            }, 300);
        }
    },

    onXacThucEmail: function () {
        var me = this;
        var record = me.getViewModel().data.record;
        me.getView().setLoading(true);
        if (record.data.emailAddress == "") {
            abp.notify.info(app.localize('ThongBaoChuaCoDiaChiEmail'));
            return;
        }
        abp.services.app.account.sendEmailActivationLink({ emailAddress: record.data.emailAddress }).done(function (results) {
            me.getView().setLoading(false);
            abp.notify.info(app.localize('ThongBaoDaGuiThanhCong'));
        }).fail(function (err) {
            me.getView().setLoading(false);
        });
    },

    changetab: function (tabPanel, newCard, oldCard, eOpts) {
        var me = this;
        if (me.viewTab == false) {
            if (newCard.reference == "panelQuyen")
                me.viewTab = true;
        }
    },

    onLoadQuyen: function (listRole) {
        var me = this;
        var _roleService = abp.services.app.roleNew;
        _roleService.getRoles({}).done(function (result) {
            for (var i = 0; i < result.items.length; i++) {
                if (listRole.indexOf(result.items[i].id) != -1) {
                    result.items[i]['checked'] = true;
                } else {
                    result.items[i]['checked'] = false;
                }
            }
            me.storeinfo.storeQuyen.loadData(result.items);
        }).fail(function (err) {
        });
    },

    getTreeDataFromServer: function (result, memberedOrganizationUnits) {
        var me = this;
        var arrayPermissions = result;
        var dataTree = app.eKMapUtils.getTreeDataFromServer(arrayPermissions, "displayName", "parentId", "id");
        var storeTreePB = me.storeinfo.storeTreeRoles;
        var nodeRoot = storeTreePB.getRootNode();
        nodeRoot.removeAll();
        nodeRoot.appendChild(dataTree);
        if (nodeRoot.childNodes.length > 0) {
            for (var i = 0; i < nodeRoot.childNodes.length; i++) {
                nodeRoot.childNodes[i].expand();
            }
            nodeRoot.cascadeBy(function (child) {
                if (child.data.children.length == 0)
                    child.set('leaf', true);
            });
        }
        me.setChildNodeTree(nodeRoot, memberedOrganizationUnits);
    },

    setChildNodeTree: function (node, arrayGrantedPermissionNames) {
        for (var i = 0; i < node.childNodes.length; i++) {
            var cNode = node.childNodes[i];
            var checkQuyen = arrayGrantedPermissionNames.indexOf(cNode.get('code'));
            var checked = false;
            if (checkQuyen != -1) {
                checked = true;
            }
            cNode.set('checked', checked);
            this.setChildNodeTree(cNode, arrayGrantedPermissionNames);
        }
    },

    onCheckTandomPass: function (obj, newValue, oldValue, eOpts) {
        var me = this;
        var record = me.getViewModel().data.record;
        if (newValue == true && me.ref.cboChangePass.getValue() == true && record.get('id') > 0) {
            me.ref.cboChangePass.setValue(false);
            me.ref.contaiPass.setVisible(false);
            me.ref.textPassword.allowBlank = false;
            me.ref.PasswordRepeat.allowBlank = false;
        } else if (newValue == false && record.get('id') == 0) {
            me.ref.cboChangePass.setValue(true);
            me.ref.cboChangePass.setVisible(false);
            me.ref.contaiPass.setVisible(true);
            me.ref.textPassword.allowBlank = false;
            me.ref.PasswordRepeat.allowBlank = false;
        } else if (newValue == true && record.get('id') == 0) {
            me.ref.cboChangePass.setValue(false);
            me.ref.cboChangePass.setVisible(false);
            me.ref.contaiPass.setVisible(false);
            me.ref.textPassword.allowBlank = true;
            me.ref.PasswordRepeat.allowBlank = true;
        }
    },

    onCheckPassWord: function (obj, newValue, oldValue, eOpts) {
        var me = this;
        var record = me.getViewModel().data.record;
        if (newValue) {
            record.set('password', "")
        }
        //Không cần logic này??? record.set('SetRandomPassword', !newValue)
        me.ref.contaiPass.setVisible(newValue);
        me.ref.textPassword.allowBlank = !newValue;
        me.ref.PasswordRepeat.allowBlank = !newValue;
    },

    onBlur: function (obj, event, eOpts) {
        var me = this;
        me.ref.labelPasswordRepeat.setVisible(false)
        var record = me.getViewModel().data.record;
        if (record.get('password') != record.get('passwordRepeat')) {
            me.ref.labelPasswordRepeat.setVisible(true);
            me.ref.PasswordRepeat.allowBlank = false;
            var text = '<div style="font-weight: 400;font-size: 80%;color: #fd397a;width: 100%;margin-left: 130px;">' + app.localize('PasswordsDontMatch') + '.</div>';
            me.ref.labelPasswordRepeat.setHtml(text);
        } else {
            me.ref.PasswordRepeat.allowBlank = true;
        }
    },

    onThucHien: function () {
        var me = this;
        var form = me.ref.frmUsers;
        if (!form.getForm().isValid()) {
            abp.notify.warn(app.localize("Info_isValid"));
            return;
        }
        var trpanel = me.ref.treePermis;
        var _userService = abp.services.app.userNew;
        var nodeRoot = trpanel.getRootNode();
        var grantedPermissionNames = [];
        me.getChildNodeTree(nodeRoot, grantedPermissionNames);
        var grvQuyen = me.ref.gridQuyen;
        var selectedRole = grvQuyen.getSelectionModel().getSelection();
        var record = me.getViewModel().data.record;
        var user = {
            Name: record.get('name'),
            Surname: record.get('surname'),
            EmailAddress: record.get('emailAddress'),
            PhoneNumber: record.get('phoneNumber'),
            UserName: record.get('userName'),
            Password: null,
            PasswordRepeat: ""
        }
        if (record.get('id') > 0) {
            user['Id'] = record.get('id');
        } else {
            user['SetRandomPassword'] = record.get('SetRandomPassword');
        }

        if (!record.get('SetRandomPassword') && me.ref.cboChangePass.getValue() == true) {
            user.Password = record.get('password');
            user.PasswordRepeat = record.get('passwordRepeat');
        }
        //if (record.get('shouldChangePasswordOnNextLogin')) {
        user['shouldChangePasswordOnNextLogin'] = record.get('shouldChangePasswordOnNextLogin');
        // }
        //  if (record.get('sendActivationEmail')) {
        user['SendActivationEmail'] = record.get('sendActivationEmail');
        // }
        // if (record.get('isActive')) {
        user['IsActive'] = record.get('isActive');
        // }
        // if (record.get('isLockoutEnabled')) {
        user['IsLockoutEnabled'] = record.get('isLockoutEnabled');
        // }
        var assignedRoleNames = [];
        if (me.viewTab) {
            for (var i = 0; i < selectedRole.length; i++) {
                assignedRoleNames.push(selectedRole[i].get('name'));
            }
        } else {
            for (var i = 0; i < record.get('roles').length; i++) {
                if (record.get('roles')[i].isAssigned == true && record.get('roles')[i].inheritedFromOrganizationUnit == false) {
                    assignedRoleNames.push(record.get('roles')[i].roleName);
                }
            }
        }
        var organizationUnits = grantedPermissionNames;
        var fnSauKhiLoad = me.getViewModel().data.fnSauKhiLoad;
        var obj = {
            user: user,
            assignedRoleNames: assignedRoleNames,
            organizationUnits: organizationUnits
        }
        if (record.get('id') == 0) {
            obj['SetRandomPassword'] = record.get('SetRandomPassword');
            obj['sendActivationEmail'] = record.get('sendActivationEmail');
        }
        me.getView().setLoading(true);
        _userService.createOrUpdateUser(obj).done(function () {
            abp.notify.success(app.localize('SavedSuccessfully'));
            me.getView().setLoading(false);
            if (fnSauKhiLoad)
                fnSauKhiLoad();
            me.getView().close();
        }).fail(function (err) {
            me.getView().setLoading(false);
        });
    },

    getChildNodeTree: function (node, arrayData) {
        var children = [];
        for (var i = 0; i < node.childNodes.length; i++) {
            var cNode = node.childNodes[i];
            if (cNode.data.checked) {
                arrayData.push(cNode.data.id);
            }
            this.getChildNodeTree(cNode, arrayData);
        }
    },

    strMarkRedPlus: function (search, subject) {
        return subject.replace(
            new RegExp('(' + search + ')', "gi"), "<span style='color: red;'><b>$1</b></span>");
    },

    filterStore: function (value) {
        var me = this,
            store = me.storeinfo.storeTreeRoles,
            searchString = value.toLowerCase(),
            filterFn = function (node) {
                var children = node.childNodes,
                    len = children && children.length,
                    // visible = v.test(node.get('text')),
                    check = node.get('text').indexOf(v),
                    visible = true,
                    i;
                // If the current node does NOT match the search condition
                // specified by the user...
                if (check == -1) {
                    visible = false;
                } else {
                    visible = true;
                }
                if (!visible) {
                    for (i = 0; i < len; i++) {

                        if (children[i].isLeaf()) {
                            visible = children[i].get('visible');
                        } else {
                            visible = filterFn(children[i]);
                        }
                        if (visible) {
                            break;
                        }
                    }
                } else {
                    // Current node matches the search condition...

                    // Force all of its child nodes to be visible as well so
                    // that the user is able to select an example to display.
                    for (i = 0; i < len; i++) {
                        children[i].set('visible', true);
                    }
                }
                return visible;
            },
            v;
        if (searchString.length < 1) {
            store.clearFilter();
        } else {
            //  v = new RegExp(searchString, 'i');
            v = searchString;
            store.getFilters().replaceAll({
                filterFn: filterFn
            });
        }

        //this.storeinfo.storeTreeRoles.filterBy(function (item) {
        //    var item = item.childNodes
        //    if (item.get('root') === true) return true;
        //    else if (item.get('text').toLowerCase() === value.toLowerCase()) return true;
        //    else return false;
        //});

        //return;
    },

    onDongWinDow: function () {
        var me = this;
        var record = me.getViewModel().data.record;
        record.reject();
    }
});

