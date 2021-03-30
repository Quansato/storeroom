Ext.define('Admin.view.Roles.RoleManager', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rolemanager',
    layout: 'fit',
    controller: 'rolemanagercontroller',
    viewModel: 'rolemanagermodel'
})


Ext.define('Admin.view.Roles.RoleManagerModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.rolemanagermodel',
    data: {
    },
    stores: {
    }
});


Ext.define('Admin.view.Roles.RoleManagerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rolemanagercontroller',
    init: function () {
    }
})