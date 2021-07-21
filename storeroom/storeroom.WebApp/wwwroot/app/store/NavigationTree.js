Ext.define('Admin.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [
            {
                text: 'Dashboard',
                iconCls: 'x-fa fa-database',
                rowCls: 'nav-tree-badge',
                viewType: 'dashboard',
                routeId: 'dashboard', 
                leaf: true
            },
            {
                text: 'Quản lý kho vật tư',
                iconCls: 'x-fa fa-inbox',
                rowCls: 'nav-tree-badge',
                viewType: 'dsCMMSKhoVatTu',
                routeId: 'dsCMMSKhoVatTu', 
                leaf: true
            },
            /*{
                text: 'Đề xuất vật tư',
                iconCls: 'x-fa fa-bars',
                rowCls: 'nav-tree-badge',
                viewType: 'quanLyDeXuatVatTu',
                routeId: 'quanLyDeXuatVatTu',
                leaf: true
            },*/
            {
                text: 'Phiếu xuất, nhập',
                iconCls: 'x-fa fa-cloud-upload',
                rowCls: 'nav-tree-badge',
                viewType: 'quanLyPhieuNhapKho',
                routeId: 'quanLyPhieuNhapKho',
                leaf: true
            },
            {
                text: 'Mua sắm',
                iconCls: 'x-fa fa-shopping-cart',
                rowCls: 'nav-tree-badge',
                viewType: 'quanLyDonMuaHang',
                routeId: 'quanLyDonMuaHang',
                leaf: true
            },
            {
                text: 'Danh mục kho',
                iconCls: 'x-fa fa-archive',
                rowCls: 'nav-tree-badge',
                viewType: 'dsCMMSKho',
                routeId: 'dsCMMSKho',
                leaf: true
            },
            {
                text: 'Danh mục vật tư',
                iconCls: 'x-fa fa-th-list',
                rowCls: 'nav-tree-badge',
                viewType: 'dsCMMSKhoDMVatTu',
                routeId: 'dsCMMSKhoDMVatTu',
                leaf: true
            },
            /*{
                text: 'Bản đồ kho',
                iconCls: 'x-fa fa-globe',
                rowCls: 'nav-tree-badge',
                viewType: 'dsBanDoKho',
                routeId: 'dsBanDoKho',
                leaf: true
            },*/
            {
                text: 'Quản trị',
                iconCls: 'x-fa fa-users',
                rowCls: 'nav-tree-badge',
                children: [
                    {
                        text: 'Bản đồ kho',
                        iconCls: 'x-fa fa-globe',
                        rowCls: 'nav-tree-badge',
                        viewType: 'dsBanDoKho',
                        routeId: 'dsBanDoKho',
                        leaf: true
                    }, {
                        text: 'Người dùng',
                        iconCls: 'x-fa fa-user',
                        rowCls: 'nav-tree-badge',
                        viewType: 'dsUsers',
                        routeId: 'dsUsers',
                        leaf: true
                    }
                ]
            }
        ]
    }
});
