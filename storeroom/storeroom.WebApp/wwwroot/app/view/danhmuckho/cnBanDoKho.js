/*Ext.define("Admin.view.yeucau.dsDMYeuCauModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.configs-dsdmyeucau",
    data: {
        rSelected: null
    },
    stores: {
        store: { type: "sdmyeucau" }
    }
});*/


Ext.define("Admin.view.danhmuckho.cnBanDoKho", {
    extend: "Ext.panel.Panel",
    //alias: "widget.cnBanDoKho",
    controller: "cnBanDoKho",
    //layout: 'vbox',
    width: 500,
    height: '100%',
    title:'kho',
    //layout: 'fit',
    //items: [{
    //    //xtype: 'panel',
    //    //padding: '5 5 5 5',
    //    //width: '100%',
    //    //items: [{
    //    //    xtype: 'component',
    //    //    height: '80%',
    //    //    width: 1600,
    //    //    html: '<div style="width: 100%;">' +
    //    //        '<div id="divMapId" class= "map" ></div>' +
    //    //        '<pre id="coordinates" class="coordinates"></pre>' +
    //    //        '</div>',
    //    //    //'<div id="geocoder" class="geocoder"></div>',
    //    //    listeners: {
    //    //        afterRender: 'onMap'
    //    //    }
    //    //}]
    //}]
    iconCls: 'x-fa fa-list',
    modal: true,
    items: [{
        xtype: "form",
        padding: 5,
        reference: "frmKhoNhomVatTu",
        layout: {
            type: "vbox",
            align: "stretch"
        },
        defaults: {
            flex: 1,
            labelAlign: "right",
            labelWidth: 70
        },
        items: [{
            xtype: "textfield",
            name: "ma",
            fieldLabel: 'Mã' /*+ app.gplatformconsts.var_required*/,
            allowBlank: false,
            bind: {
                value: "{record.qrCode}",
                disabled: "{record.id != 0}"
            },
            listeners: {
                blur: "blurMa"
            }
        }, {
            xtype: "textarea",
            name: "moTa",
            fieldLabel: 'Tên' /*+ app.gplatformconsts.var_required*/,
            allowBlank: false,
            bind: "{record.displayName}"
        }, {
            xtype: "textfield",
            name: "ma",
            fieldLabel: 'QRCode',
            bind: "{record.qrCode}"
        }]
    }],
    buttons: [{
        text: 'Lưu và thêm mới',
        iconCls: "fa fa-floppy-o",
        ui: "soft-green",
        reference: "btnSaveAndNew",
        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
        handler: "onSaveAndNew"
    }, {
        text: 'Lưu thông tin',
        iconCls: "fa fa-floppy-o",
        ui: "soft-blue",
        reference: "btnSave",
        //hidden: !(abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Edit') || abp.auth.hasPermission('CMMS.Inventory.DanhMuc.Manager')),
        handler: "onSave"
    }, {
        text: 'Huỷ bỏ',
        ui: "soft-red",
        handler: function () {
            this.up("window").close();
        },
        iconCls: "fa fa-times"
    }],
    listeners: {
        afterRender: "onAfterrender"
    }
});

Ext.define("Admin.view.danhmuckho.cnBanDoKhoController", {
    extend: "Ext.app.ViewController",
    alias: "controller.cnBanDoKho",
    storeInfo: null,
    refs: null,
    init: function () {
        var me = this;
        me.accessToken = 'pk.eyJ1IjoicXVhbnNhdG8iLCJhIjoiY2tpZm90cG13MWQ5ZjMwbGc4bW1tNjUyNyJ9.6d54v3cuOaps7gJKUXbwXQ';
        //me.accessToken = 'pk.eyJ1IjoibG9uZ2NoZWxzZWF0OSIsImEiOiJja2Q5eGgzZ2swNnh2Mnd0MW9xdG5vbDFuIn0.G4kTs0XK20VSLMTF9iCc_Q;
        me.callParent(arguments);
    },
    onAfterrender: function () {
        var me = this;
        me.refs = me.getReferences();
        me.storeInfo = me.getViewModel().storeInfo;
        me.onSearch();
    },

    specialkey: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onSearch();
        }
    },

    geocodeThis: function () {
        var text = document.getElementById('search').value;
        if (text.length >= 5) {
            geocoder.query(text, showMap);
        }
    },

    onMap: function () {
        var me = this;
        var obj = [{
            x: '105.42577357457799',
            y: '20.766890032968846'
        }, {
            x: '105.63080535317425',
            y: '20.755689459622573'
        }, {
            x: '106.01286933530952',
            y: '20.857007602846537'
        }]
        var map = new mapboxgl.Map({
            container: 'divMapId',
            center: [105.82397460937636, 21.03589385426021], // starting position
            zoom: 7
        });
        var vnMap = new mapboxgl.ekmap.TiledVietNamMapLayer({
            token: tokenVN
        }).addTo(map);

        var marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([105.82397460937636, 21.03589385426021])
            .addTo(map);

        var marker1 = new mapboxgl.Marker()
            .setLngLat([105.82397460937636, 21.03589385426021])
            .addTo(map);

        function onDragEnd() {
            var lngLat = marker.getLngLat();
            coordinates.style.display = 'block';
            coordinates.innerHTML =
                'Kinh độ: ' + lngLat.lng + '<br />Vĩ độ: ' + lngLat.lat;
        }

        marker.on('dragend', onDragEnd);
        //
        var popup = new mapboxgl.Popup({ offset: 25 }).setText(
            'Construction on the Washington Monument began in 1848.'
        );

        // create DOM element for the marker
        var el = document.createElement('div');
        el.id = 'marker';
        //
        for (var i = 0; i < obj.length; i++) {
            var marker = new mapboxgl.Marker({
                draggable: true
            })
                .setLngLat([obj[i].x, obj[i].y])
                .setPopup(popup)
                .addTo(map);
        }
        map.addControl(new mapboxgl.NavigationControl(), "top-left");
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            })
        );
        //var geocoder = new MapboxGeocoder({
        //    accessToken: me.accessToken,
        //    //origin: me.settingbasemap.geoname.url,
        //    target: 'geocoder',
        //    placeholder: 'Tìm kiếm...'
        //});
        //document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    }
});
