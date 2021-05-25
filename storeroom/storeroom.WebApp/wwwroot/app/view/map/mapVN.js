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


Ext.define("Admin.view.map.mapVN", {
    extend: "Ext.container.Container",
    alias: "widget.dsBanDoKho",
    controller: "mapVN",
    layout: 'fit',
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
    }]
});

Ext.define("Admin.view.map.mapVNController", {
    extend: "Ext.app.ViewController",
    alias: "controller.mapVN",
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
        var obj = [];
        app.mUtils.fnGETAjax('api/Storeroom?page=1&start=0&limit=25', function (response) {
            obj = response.items;
        })
        var map = new mapboxgl.Map({
            container: 'divMapId',
            center: [105.82397460937636, 21.03589385426021], // starting position
            zoom: 7
        });
        var vnMap = new mapboxgl.ekmap.TiledVietNamMapLayer({
            token: tokenVN
        }).addTo(map);

        /*var marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([105.82397460937636, 21.03589385426021])
            .addTo(map);*/

        //var marker1 = new mapboxgl.Marker()
        //    .setLngLat([105.82397460937636, 21.03589385426021])
        //    .addTo(map);

        function onDragEnd() {
            var lngLat = marker.getLngLat();
            coordinates.style.display = 'block';
            coordinates.innerHTML =
                'Kinh độ: ' + lngLat.lng + '<br />Vĩ độ: ' + lngLat.lat;
        }

        //marker.on('dragend', onDragEnd);
        // create DOM element for the marker
        var el = document.createElement('div');
        el.id = 'marker';

        //map.on('click', function (e) {
        //    console.log(e)
        //    var obj = map.queryRenderedFeatures(
        //        e.point
        //    );
        //    console.log(obj)
        //})

        for (var i = 0; i < obj.length; i++) {
            var popup = new mapboxgl.Popup({ offset: 25 }).setText(
                'Construction on the Washington Monument began in 1848.'
            ).setLngLat([obj[i].x, obj[i].y]);
            var marker = new mapboxgl.Marker({
                draggable: true
            })
                .setLngLat([obj[i].x, obj[i].y])
                .setPopup(popup)
                .addTo(map);
        }
        map.addControl(new mapboxgl.NavigationControl(), "top-left");
        map.addControl(new mapboxgl.GeolocateControl({
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

        document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    }
});
