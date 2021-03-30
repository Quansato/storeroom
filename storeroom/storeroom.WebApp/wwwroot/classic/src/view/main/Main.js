Ext.define('Admin.view.main.Main', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree'
    ],

    controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar shadow',
            height: 64,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    html: '<div class="main-logo"><img src="resources/images/ext-logo-full.png"></div>',
                    width: 250
                },
                {
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls: 'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },
                '->',
                {
                    ui: 'header',
                    //html: '<div style="padding-top: 10px;"><i class="' + abp.localization.currentLanguage.icon + '" title="' + abp.localization.currentLanguage.displayName + '"></i></div>',
                    menuAlign: 'tr-br?',
                    menu: {
                        xtype: 'menu',
                        items: [{
                            text: 'English',
                            iconCls: 'famfamfam-flags us',
                            href: '/AbpLocalization/ChangeCulture?cultureName=en&returnUrl=/manager'
                        }, {
                            text: 'Tiếng Việt',
                            iconCls: 'famfamfam-flags vn',
                            href: '/AbpLocalization/ChangeCulture?cultureName=vi&returnUrl=/manager'
                        }]
                    }
                },
                {
                    ui: 'header',
                    html: '<div style="padding-top: 10px;"><img style="width:35px;height:35px;margin-right:10px;float: left;margin-top: -5px;" src="/editor/resources/images/profile-icon.png"><span style="font-weight: bold;line-height: 25px;margin: 0px;font-size:14px;">Người dùng</span></div>',
                    menuAlign: 'tr-br?',
                    menu: {
                        xtype: 'menu',
                        items: [{
                            text: 'Hồ sơ của tôi',
                            iconCls: 'icon-m-t fa fa-user',
                            href: '/Manage/UserProfile'
                        }, {
                            text: 'Đổi mật khẩu',
                            iconCls: 'icon-m-t fa fa-key',
                            href: '/Users/ChangePassword'
                        }, '-', {
                            text: 'Đăng xuất',
                            iconCls: 'icon-m-t fa fa-power-off',
                            href: '/Account/Logout'
                        }]
                    }
                }
            ]
        },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'navigation',
                    store: 'NavigationTree',
                    width: 250,
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }
            ]
        }
    ]
});
