Ext.define('Admin.view.Users.UserManager', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.usermanager',
    layout: 'fit',
    controller: 'usermanagercontroller',
    viewModel: 'usermanagermodel'
})


Ext.define('Admin.view.Users.UserManagerModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.usermanagermodel',
    data: {
    },
    stores: {
    }
});


Ext.define('Admin.view.Users.UserManagerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usermanagercontroller',
    init: function () {
    }
})