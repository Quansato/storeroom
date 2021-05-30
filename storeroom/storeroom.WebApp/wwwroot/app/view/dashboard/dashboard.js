Ext.define("Admin.view.dashboard.dashboardModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.dashboard",
    data: {
        rSelectNhomVatTu: null,
        rSelectVatTu: null
    },
    stores: {
        sNhomVatTu: { type: "skhonhomvattu" },
        sVatTu: { type: "skhovattu" },
        storeDonHang: { type: 'sdonhang' },

    }
});

Ext.define("Admin.view.dashboard.dashboard", {
    extend: "Ext.panel.Panel",
    xtype: "dashboard",
    requires: ["Admin.view.dashboard.dashboardController",
        "Admin.view.dashboard.dashboardModel",
        "Ext.ux.layout.ResponsiveColumn",
        "Ext.chart.CartesianChart",
        "Ext.chart.axis.Numeric",
        "Ext.chart.axis.Category",
        "Ext.chart.series.Bar",
        "Ext.chart.interactions.ItemEdit"],
    controller: "dashboard",
    viewModel: {
        type: "dashboard"
    },
    bodyStyle: { "background-color": "#f6f6f6" },
    height: window.innerHeight - 65,
    scrollable: true,
    layout: {
        type: "responsivecolumn"
    },
    items: [{
        xtype: 'panel',
        margin: '5 5 5 5',
        userCls: 'big-60 small-100',
        height: 420,
        cls:'shadow',
        title: 'Chi phí ước tính',
        ui: 'light',
        iconCls: 'x-fa fa-bar-chart-o',
        items: [{
            xtype: 'component',
            html: '<div>' +
                '<canvas id="myChart" ></canvas>' +
                '</div>',
            listeners: {
                afterRender: 'onChart'
            }
        }],
    },
    {
        xtype: 'panel',
        margin: '5 5 5 5',
        userCls: 'big-20 small-50',
        height: 100,
        title: 'Vật tư',
        bodyPadding: 15,
        ui: 'light',
        iconCls: 'x-fa fa-list',
        cls:'shadow',
        items: [{
            xtype: 'component',
            html: '<div style="text-align:center;font-size:50px;font-weight:600">900</div>'
        }]
    },
    {
        xtype: 'panel',
        margin: '5 5 5 5',
        userCls: 'big-20 small-50',
        height: 100,
        title: 'Nhân viên',
        bodyPadding: 15,
        ui: 'light',
        iconCls: 'x-fa fa-user',
        cls:'shadow',
        items: [{
            xtype: 'component',
            html: '<div style="text-align:center;font-size:50px;font-weight:600">900</div>'
        }]
    }, {
        xtype: 'panel',
        margin: '5 5 5 5',
        userCls: 'big-40 small-100',
        height: 100,
        title: 'Doanh số xuất kho',
        bodyPadding: 15,
        cls:'shadow',
        ui: 'light',
        iconCls: 'x-fa fa-user',
        items: [{
            xtype: 'component',
            html: '<div style="text-align:center;font-size:50px;font-weight:600">900.000 VND</div>'
        }]
    },
    {
        xtype: 'panel',
        margin: '5 5 5 5',
        userCls: 'big-40 small-100',
        height: 200,
        ui: 'light',
        cls:'shadow',
        items: [{
            xtype: 'component',
            html: '<div>' +
                '<canvas id="myLineChart" style="height: 200px;display: block;box-sizing: border-box;height: 200px;width: 470.4px;"></canvas>' +
                '</div>',
            listeners: {
                afterRender: 'onLineChart'
            }
        }],
    }
        ,
    {
        xtype: 'grid',
        margin: '5 5 5 5',
        userCls: 'big-50 small-100',
        height: 300,
        title: 'Doanh số xuất kho',
        bodyPadding: 15,
        ui: 'light',
        cls:'shadow',
        reference: 'panelDonHang',
        flex: 1,
        ui: 'light',
        title: 'Đơn mua hàng',
        iconCls: 'fa fa-file-text-o',
        layout: {
            type: 'fit',
            align: 'stretch'
        },
        reference: 'dsDonHang',
        bind: {
            store: '{storeDonHang}',
            selection: '{selectionDonHang}'
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
            sortable: false,
            align: 'center',
            width: 40,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                //if (record.get('soLuongPhieuNhap') > 0) {
                //    return '<a style="color:blue;cursor: pointer;" title="' + app.localize('CMMSDMKhoThongTinPhieuXuat') + '"><span class="fa fa-eye"></span></a>';
                //}
                return "";
            }
        }, {
            xtype: 'datecolumn',
            text: 'Ngày lên đơn',
            dataIndex: 'date',
            width: 140,
            align: 'center',
            format: 'd/m/Y'
        }, {
            xtype: 'gridcolumn',
            text: 'Số đơn hàng',
            dataIndex: 'code',
            sortable: true,
            width: 120
        }, {
            xtype: 'gridcolumn',
            text: 'Người mua',
            dataIndex: 'userName',
            sortable: true,
            flex: 1
        }, {
            xtype: 'gridcolumn',
            text: 'Đơn vị cung cấp',
            dataIndex: 'suplierName',
            sortable: true,
            flex: 1
        }, {
            xtype: 'gridcolumn',
            text: 'Lý do',
            dataIndex: 'nameOfOrder',
            sortable: true,
            flex: 1
        }, {
            xtype: 'gridcolumn',
            text: 'Tình trạng đơn',
            dataIndex: 'status',
            width: 120,
            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                if (value == null || value == 0) {
                    return '<div style="float: none;min-width:90px;" class="status assignment metadata-cell unassigned">' + 'Chờ duyệt' + '</div>'
                } else if (value == 1) {
                    return '<div style="float: none;min-width:90px;" class="status assignment metadata-cell completed">' + 'Hoàn thành' + '</div>'
                } else if (value == 2) {
                    return '<div style="float: none;min-width:90px;" class="status assignment metadata-cell khongduyet">' + 'Từ chối' + '</div>'
                }
            }
        }],
        viewConfig: {
            emptyText: 'Chưa có dữ liệu'
        },
    },
    {
        xtype: 'panel',
        margin: '5 5 5 5',
        userCls: 'big-50 small-100',
        height: 300,
        cls:'shadow',
        title: 'Vật tư',
        ui: 'light',
        iconCls: 'x-fa fa-bar-chart-o',
        items: [{
            xtype: 'component',
            style: 'display: flex;justify-content:center',
            html: '<div style="height:300px; width:300px">' +
                '<canvas id="myPieChart" ></canvas>' +
                '</div>',
            listeners: {
                afterRender: 'onPieChart'
            }
        }],
    }],
    listeners: {
        afterRender: 'onAfterrender',
        //tabchange: 'changeTab'
    }
});

Ext.define("Admin.view.dashboard.dashboardController", {
    extend: "Ext.app.ViewController",
    alias: "controller.dashboard",
    storeInfo: null,
    refs: null,
    init: function () {
        var me = this;
        me.callParent(arguments);
    },

    onAfterrender: function () {
        var me = this;
        me.refs = me.getReferences();
        me.storeInfo = me.getViewModel().storeInfo;
        //me.onLoadBarChart();
    },

    onLoadBarChart: function () {
        var me = this;
        var store = me.refs.chart.getStore();
        var data = [{ month: 'Jan, 2021', labor: 0, parts: 327 },
        { month: 'Feb, 2021', labor: 0, parts: 244 },
        { month: 'Mar, 2021', labor: 0, parts: 211 },
        { month: 'Apr, 2021', labor: 0, parts: 110 },
        { month: 'May, 2021', labor: 0, parts: 37 },
        { month: 'Jun, 2021', labor: 0, parts: 222 },
        { month: 'Jul, 2021', labor: 0, parts: 101 },
        { month: 'Aug, 2021', labor: 0, parts: 327 },
        { month: 'Sep, 2021', labor: 0, parts: 327 },
        { month: 'Oct, 2021', labor: 0, parts: 327 },
        { month: 'Nov, 2021', labor: 0, parts: 327 },
        { month: 'Dec, 2021', labor: 0, parts: 327 }]
        //store.loadData(data)
        console.log(store)
    },

    onBarTipRender: function (tooltip, record, item) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            browser = item.series.getTitle()[fieldIndex];

        tooltip.setHtml(
            'Labor: ' +
            record.get('labor') + '$' + 'Parts: ' +
            record.get(item.field).toFixed(1) + '$');
    },

    onChart: function () {
        const labels = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        const DATA_COUNT = 7;
        const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };
        const data = {
            labels: labels,
            datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: '#6610f2',
                borderWidth: 1
            },
            {
                label: 'My First Dataset2',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'orange',
                borderWidth: 1
            }]
        };
        const config = {
            type: 'bar',
            data: data,
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Chart.js Bar Chart - Stacked'
                    },
                },
                responsive: true,
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        };
        var myChart = new Chart(
            document.getElementById('myChart'),
            config
        );
    },

    onPieChart: function () {
        const DATA_COUNT = 5;
        const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

        const data = {
            labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [65, 59, 80, 81],
                    backgroundColor: [
                        'red',
                        'blue',
                        'yellow',
                        'green',
                        'orange',
                    ],
                }
            ]
        };

        const config = {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    /*title: {
                        display: true,
                        text: 'Chart.js Pie Chart'
                    }*/
                }
            },
        };

        var myChart = new Chart(
            document.getElementById('myPieChart'),
            config
        );
    },

    onLineChart: function () {
        const DATA_COUNT = 7;
        const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

        const labels = ["Hoạt động", "Không hoạt động"];
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [100, 150],
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                }
            ]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Line Chart'
                    }
                }
            },
        };

         var myChart = new Chart(
            document.getElementById('myLineChart'),
            config
        );
    }
})
