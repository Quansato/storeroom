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
    width: 700,
    height: 500,
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
                '<pre id="coordinates" class="coordinates"></pre>' +
                '</div>'+
            '<div id="geocoder" class="geocoder"></div>',
            listeners: {
                afterRender: 'onMap'
            }
        }]
    }
    ],
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
Ext.define("Admin.view.danhmuckho.cnBanDoKhoV2Controller", {
    extend: "Ext.app.ViewController",
    alias: "controller.danhmuckho-cnbandokhov2",
    refs: null,
    storeInfo: null,

    init: function () {
        var me = this;
        me.accessToken = 'pk.eyJ1IjoicXVhbnNhdG8iLCJhIjoiY2tpZm90cG13MWQ5ZjMwbGc4bW1tNjUyNyJ9.6d54v3cuOaps7gJKUXbwXQ';
        me.callParent(arguments);
    },

    onAfterrender: function () {
        var me = this;
        me.refs = me.getReferences();
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

    onSaveAndNew: function () {
        var me = this;
        me.fnSave();
        var newRecord = Ext.create("Admin.model.mKhoNhomVatTu", { id: 0 });
        me.getViewModel().set("record", newRecord);
    },

    fnSave: function () {
        var me = this;
        var frm = me.refs.frmKhoNhomVatTu;
        if (!frm.getForm().isValid()) {
            abp.notify.warn(app.localize("TaiSan_isValid"));
            return;
        }
        var view = me.getView();
        var fnSauKhiSave = me.getViewModel().get("fnSauKhiSave");
        var record = me.getViewModel().get("record");
        console.log(record)
        view.setLoading(true);
        if (record.data.id != 0) {
            var url = "api/MaterialGroup"
            app.mUtils.fnPUTAjax(url, record.data, function (response) {
                console.log(response)
            })
        } else {
            var url = "api/MaterialGroup"
            app.mUtils.fnPOSTAjax(url, record.data, function (response) {
                console.log(response)
            })
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
