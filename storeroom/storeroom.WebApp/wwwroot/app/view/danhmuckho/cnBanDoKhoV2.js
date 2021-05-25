Ext.define("Admin.view.danhmuckho.cnBanDoKhoV2Model", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.danhmuckho-cnbandokhov2",
    data: {
        record: null,
        fnSauKhiSave: null
    }
});

Ext.define("Admin.view.danhmuckho.cnBanDoKhoV2", {
    extend: "Ext.window.Window",
    requires: ["Admin.view.danhmuckho.cnBanDoKhoV2Controller", "Admin.view.danhmuckho.cnBanDoKhoV2Model"],
    controller: "danhmuckho-cnbandokhov2",
    viewModel: {
        type: "danhmuckho-cnbandokhov2"
    },
    width: 900,
    height: 650,
    iconCls: 'x-fa fa-list',
    modal: true,
    items: [{
        xtype: 'panel',
        padding: '5 5 5 5',
        width: '100%',
        items: [{
            xtype: 'component',
            height: '80%',
            width: 1600,
            html: '<div style="width: 100%;">' +
                '<div id="divMapId" class= "map" ></div>' +
                '<div id="selectedFeatures" class="leaflet-bar map-text">' +
                '<div id="geocoder"></div>' +
                '</div>' +
                '<pre id="coordinates" class="coordinates"></pre>' +
                '</div>',
            //'<div id="geocoder" class="geocoder"></div>',
            listeners: {
                afterRender: 'onMap'
            }
        }]
    }
    ],
    buttons: [{
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
Ext.define("Admin.view.danhmuckho.cnBanDoKhoV2Controller", {
    extend: "Ext.app.ViewController",
    alias: "controller.danhmuckho-cnbandokhov2",
    refs: null,
    storeInfo: null,

    init: function () {
        var me = this;
        me.accessToken = 'pk.eyJ1IjoicXVhbnNhdG8iLCJhIjoiY2tpZm90cG13MWQ5ZjMwbGc4bW1tNjUyNyJ9.6d54v3cuOaps7gJKUXbwXQ';
        me.result = { x: null, y: null };
        me.callParent(arguments);
    },

    onAfterrender: function () {
        var me = this;
        me.refs = me.getReferences();
        var record = me.getViewModel().get("record");
        me.result.x = record.get("x");
        me.result.y = record.get("y");
        me.storeInfo = me.getViewModel().storeInfo;
    },

    //blurMa: function () {
    //    var me = this;
    //    var record = me.getViewModel().get("record");
    //    var ma = app.gplatformutils.BoDauBoKhoangTrangGiuNguyenHoaThuong(record.get("ma"));
    //    record.set("ma", ma);
    //},

    onSave: function () {
        this.fnSave();
    },

    fnSave: function () {
        var me = this;
        var fnSauKhiChon = me.getViewModel().get("fnSauKhiChon");
        fnSauKhiChon(me.result);
        me.getView().doClose();
    },

    /*geocodeThis: function () {
        var text = document.getElementById('search').value;
        if (text.length >= 5) {
            geocoder.query(text, showMap);
        }
    },
*/
    onMap: function () {
        var me = this;
        var map2 = new mapboxgl.Map({
            container: 'divMapId',
            center: [105.82397460937636, 21.03589385426021], // starting position
            zoom: 7
        });
        var vnMap = new mapboxgl.ekmap.TiledVietNamMapLayer({
            token: tokenVN
        }).addTo(map2);

        var layers = map2.getStyle().layers;
        console.log(layers)
        var marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([105.82397460937636, 21.03589385426021])
            .addTo(map2);

        //var marker1 = new mapboxgl.Marker()
        //    .setLngLat([105.82397460937636, 21.03589385426021])
        //    .addTo(map);

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
        //for (var i = 0; i < obj.length; i++) {
        //    var marker = new mapboxgl.Marker({
        //        draggable: true
        //    })
        //        .setLngLat([obj[i].x, obj[i].y])
        //        .setPopup(popup)
        //        .addTo(map);
        //}
        map2.addControl(new mapboxgl.NavigationControl(), "top-left");
        map2.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }), 'top-left');
        //var geocoder = new MapboxGeocoder({
        //    origin: 'https://api.mapbox.com',
        //    accessToken: me.accessToken,
        //    target: 'geocoder'
        //})

        //map.addControl(geocoder);

        var geocoder = new MapboxGeocoder({
            accessToken: me.accessToken,
            origin: 'https://api.mapbox.com',
            target: 'geocoder',
            placeholder: 'Tìm kiếm...'
        });
        console.log(document.getElementById('geocoder'))

        document.getElementById('geocoder').appendChild(geocoder.onAdd(map2));
    }

    //onMap: function () {
    //    var me = this;
    //    var record = me.getViewModel().get("record");
    //    var map = new mapboxgl.Map({
    //        container: 'divMapId',
    //        center: [105.82397460937636, 21.03589385426021], // starting position
    //        zoom: 7
    //    });
    //    var vnMap = new mapboxgl.ekmap.TiledVietNamMapLayer({
    //        token: tokenVN
    //    }).addTo(map);

    //    if (record.get("x") != null) {
    //        console.log(record.get("x"))
    //        var marker = new mapboxgl.Marker({
    //            draggable: true
    //        })
    //            .setLngLat([record.get("x"), record.get("y")])
    //            .addTo(map);
    //    } else {
    //        var marker = new mapboxgl.Marker({
    //            draggable: true
    //        })
    //            .setLngLat([105.82397460937636, 21.03589385426021])
    //            .addTo(map);
    //    }
    //    //var marker1 = new mapboxgl.Marker()
    //    //    .setLngLat([105.82397460937636, 21.03589385426021])
    //    //    .addTo(map);

    //    function onDragEnd() {
    //        var lngLat = marker.getLngLat();
    //        coordinates.style.display = 'block';
    //        coordinates.innerHTML =
    //            'Kinh độ: ' + lngLat.lng + '<br />Vĩ độ: ' + lngLat.lat;
    //        me.result.x = lngLat.lng;
    //        me.result.y = lngLat.lat
    //    }

    //    marker.on('dragend', onDragEnd);

    //    var popup = new mapboxgl.Popup({ offset: 25 }).setText(
    //        'Construction on the Washington Monument began in 1848.'
    //    );

    //    marker.on('dragend', onDragEnd);

    //    map.addControl(new mapboxgl.NavigationControl(), "top-left");

    //    //// create DOM element for the marker
    //    //var el = document.createElement('div');
    //    //el.id = 'marker';
    //    //////
    //    ////for (var i = 0; i < obj.length; i++) {
    //    ////    var marker = new mapboxgl.Marker({
    //    ////        draggable: true
    //    ////    })
    //    ////        .setLngLat([obj[i].x, obj[i].y])
    //    ////        .setPopup(popup)
    //    ////        .addTo(map);
    //    ////}
    //    //map.addControl(new mapboxgl.NavigationControl(), "top-left");
    //    //map.addControl(new mapboxgl.GeolocateControl({
    //    //    positionOptions: {
    //    //        enableHighAccuracy: true
    //    //    },
    //    //    trackUserLocation: true
    //    //}), 'top-left');

    //    //var geocoder = new MapboxGeocoder({
    //    //    accessToken: me.accessToken,
    //    //    origin: 'https://api.mapbox.com',
    //    //    target: 'geocoder',
    //    //    placeholder: 'Tìm kiếm...'
    //    //});
    //    //console.log(document.getElementById('geocoder'))

    //    //document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    //}
});
