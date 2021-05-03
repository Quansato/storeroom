var controlChonNguoiDung;
Ext.define("Admin.view.chondulieu.wdChonNguoiDungModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.chondulieu-wdchonnguoidung",
    data: {
        rSelected: null,
        rSelectedPB: null,
        fnSauKhiChon: null
    },
    stores: {
        sNhanVien: { type: "sdsthanhvien" }
    }
});

Ext.define("Admin.view.chondulieu.wdChonNguoiDung", {
    extend: "Ext.window.Window",
    requires: ["Admin.view.chondulieu.wdChonNguoiDungController", "Admin.view.chondulieu.wdChonNguoiDungModel"],
    controller: "chondulieu-wdchonnguoidung",
    viewModel: {
        type: "chondulieu-wdchonnguoidung"
    },
    title: 'Chọn người dùng',
    iconCls: 'x-fa fa-user',
    width: 1000,
    height: 550,
    modal: true,
    layout: {
        type: "hbox",
        align: "stretch"
    },
    bodyStyle: { "background-color": "#f6f6f6" },
    items: [
        //{
        //xtype: "treepanel",
        //ui: "light",
        //iconCls: "flaticon-shapes",
        //rootVisible: false,
        //reference: "treePhongBan",
        //bind: {
        //    store: "{sPhongBan}",
        //    selection: "{rSelectedPB}"
        //},
        //flex: 1,
        //layout: "fit",
        //title: app.localize("DanhMuc_Chon_PhongBan"),
        //columns: [{
        //    xtype: "treecolumn",
        //    flex: 1,
        //    dataIndex: "displayName"
        //}],
        //listeners: {
        //    selectionchange: "onSelect"
        //},
        //dockedItems: [{
        //    xtype: "toolbar",
        //    dock: "top",
        //    style: {
        //        borderTop: "solid 1px #d0d0d0 !important",
        //        paddingBottom: "0px",
        //        paddingTop: "2px"
        //    },
        //    items: [{
        //        xtype: "textfield",
        //        emptyText: app.localize("SearchWithThreeDot"),
        //        reference: "txtSeach",
        //        margin: "5 5 5 0",
        //        flex: 1,
        //        enableKeyEvents: true,
        //        triggers: {
        //            clear: {
        //                cls: "x-form-clear-trigger",
        //                handler: "onClearTriggerClick",
        //                hidden: true,
        //                scope: "this"
        //            },
        //            search: {
        //                cls: "x-form-search-trigger",
        //                weight: 1,
        //                handler: "onSearchTriggerClick",
        //                scope: "this"
        //            }
        //        },
        //        onClearTriggerClick: function () {
        //            var me = controlChonNguoiDung;
        //            me.ref.txtSeach.setValue();
        //            me.storeinfo.sPhongBan.clearFilter();
        //            me.ref.txtSeach.getTrigger("clear").hide();
        //        },
        //        onSearchTriggerClick: function () {
        //            var me = controlChonNguoiDung;
        //            var text = me.ref.txtSeach.getValue();
        //            if (text.length >= 3) {
        //                me.filterStore(text);
        //            }
        //        },
        //        listeners: {
        //            keyup: {
        //                fn: function (field, event, eOpts) {
        //                    var me = controlChonNguoiDung;
        //                    var value = field.getValue();
        //                    if (value == "") {
        //                        field.getTrigger("clear").hide();
        //                        me.filterStore(value);
        //                        me.lastFilterValue = value;
        //                    } else if (value && value !== me.lastFilterValue) {
        //                        field.getTrigger("clear")[value.length > 0 ? "show" : "hide"]();
        //                        me.filterStore(value);
        //                        me.lastFilterValue = value;
        //                    }
        //                    field.getTrigger("clear")[value.length > 0 ? "show" : "hide"]();
        //                    me.filterStore(value);
        //                },
        //                buffer: 300
        //            },
        //            render: function (field) {
        //                var me = controlChonNguoiDung;
        //                me.searchField = field;
        //            },
        //            scope: this
        //        }
        //    }]
        //}]
        //},
        {
        xtype: "grid",
        reference: "gridNhanVien",
        bind: {
            store: "{sNhanVien}",
            selection: "{rSelected}"
        },
        flex: 2,
        layout: "fit",
        ui: "light",
        iconCls: 'x-fa fa-users',
        margin: "0 0 0 5",
        title: "Danh sách người dùng",
        columns: [{
            xtype: "rownumberer",
            text: "#",
            width: 40,
            align: "center",
            sortable: false
        }, {
            xtype: "gridcolumn",
            text: "Họ tên",
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                return record.data.firstName + " " + record.data.lastName;
            },
            flex: 1
        }, {
            xtype: "gridcolumn",
            text: "UserName",
            dataIndex: "userName",
            flex: 1
        }, {
            xtype: "gridcolumn",
            header: "Email",
            dataIndex: "email",
            flex: 1
        }],
        viewConfig: {
            emptyText: "Chưa có dữ liệu"
        },
        dockedItems: [{
            xtype: "toolbar",
            dock: "bottom",
            items: [{
                xtype: "pagingtoolbar",
                displayInfo: true,
                bind: {
                    store: "{sNhanVien}"
                },
                style: "padding: 0px !important",
                //lastText: app.localize("ExtLastText"),
                //prevText: app.localize("ExtPrevText"),
                //firstText: app.localize("ExtFirstText"),
                //nextText: app.localize("ExtNextText"),
                //refreshText: app.localize("ExtRefreshText"),
                //beforePageText: app.localize("ExtBeforePageText"),
                //afterPageText: app.localize("ExtAfterPageText"),
                //displayMsg: app.localize("ExtDisplayMsg"),
                //emptyMsg: app.localize("ExtEmptyMsg"),
                listeners: {
                    beforechange: function (page, currentPage) {
                        var myProxy = this.store.getProxy();
                        myProxy.params = {
                            skipCount: 0,
                            maxResultCount: 0
                        };
                        myProxy.setExtraParam("skipCount", (currentPage - 1) * this.store.pageSize);
                        myProxy.setExtraParam("maxResultCount", this.store.pageSize);
                    }
                }
            }]
        }]
    }],
    buttons: [{
        text: "Chọn người dùng",
        handler: "onSelectDown",
        ui: "soft-blue",
        reference: "btnLuu",
        iconCls: "x-fa fa-floppy-o"
    }, {
        text: "Huỷ",
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
Ext.define("Admin.view.chondulieu.wdChonNguoiDungController", {
    extend: "Ext.app.ViewController",
    alias: "controller.chondulieu-wdchonnguoidung",
    storeInfo: null,
    refs: null,

    init: function () {
        var me = this;
        me.callParent(arguments);
        controlChonNguoiDung = me;
    },

    onAfterrender: function () {
        var me = this;
        me.refs = me.getReferences();
        me.storeInfo = me.getViewModel().storeInfo;
        me.fnLoadUser();
        //me.fnLoadTree();
    },

    fnLoadUser: function () {
        var me = this;
        var sNhanVien = me.storeInfo.sNhanVien;
        var url ="https://localhost:44390/api/User/paging?";
        sNhanVien.proxy.api.read = url;
        sNhanVien.proxy.pageParam = undefined;
        sNhanVien.proxy.limitParam = undefined;
        sNhanVien.proxy.startParam = undefined;
        sNhanVien.load({
            params: {
                PageIndex: 1,
                PageSize: sNhanVien.pageSize
            },
            scope: this,
            callback: function (records, operation, success) {
                if (records.length == 0) {
                    sNhanVien.removeAll();
                }
            }
        });
    },

    fnLoadTree: function () {
        var me = this;
        abp.services.app.cMMSPhanQuyenPhongBan.getPhongBanByPhanQuyen({}).done(function (result) {
            var arrayResult = result.items;
            var dataTree = app.gplatformutils.getTreeDataFromServer(arrayResult, "displayName", "parentId", "id");
            var storeTreePB = me.storeInfo.sPhongBan;
            var nodeRoot = storeTreePB.getRootNode();
            nodeRoot.removeAll();
            nodeRoot.appendChild(dataTree);
            if (nodeRoot.childNodes.length > 0) {
                nodeRoot.childNodes[0].expand();
                nodeRoot.cascadeBy(function (child) {
                    if (child.data.children.length == 0) child.set("leaf", true);
                });
            }
        });
    },

    onSelect: function (tree, selected, eOpts) {
        var me = this;
        var sNhanVien = me.storeInfo.sNhanVien;
        if (!selected) return;
        var idPhongBan = selected[0].get("id");
        var query = abp.utils.buildQueryString([{ name: "id", value: idPhongBan }]);
        var url = abp.appPath + "api/services/app/CMMSPhanQuyenPhongBan/GetPhongBanNguoiDung" + query;
        sNhanVien.proxy.api.read = url;
        sNhanVien.proxy.pageParam = undefined;
        sNhanVien.proxy.limitParam = undefined;
        sNhanVien.proxy.startParam = undefined;
        sNhanVien.load({
            params: {
                skipCount: 0,
                maxResultCount: sNhanVien.pageSize
            },
            scope: this,
            callback: function (records, operation, success) {
                if (records.length == 0) {
                    sNhanVien.removeAll();
                }
            }
        });
    },

    onSelectDown: function () {
        var me = this;
        var rSelected = me.getViewModel().get("rSelected");
        var fnSauKhiChon = me.getViewModel().get("fnSauKhiChon");
        var rSelectedPB = me.getViewModel().get("rSelectedPB");
        if (rSelected) {
            if (fnSauKhiChon) fnSauKhiChon(rSelected);
            me.getView().close();
        }
    },

    filterStore: function (value) {
        var me = this,
            store = me.storeInfo.sPhongBan,
            searchString = value.toLowerCase(),
            filterFn = function (node) {
                var children = node.childNodes,
                    len = children && children.length,
                    // visible = v.test(node.get('text')),
                    check = node
                        .get("text")
                        .toLowerCase()
                        .indexOf(v),
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
                            visible = children[i].get("visible");
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
                        children[i].set("visible", true);
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
    },

    strMarkRedPlus: function (search, subject) {
        return subject.replace(new RegExp("(" + search + ")", "gi"), "<span style='color: red;'><b>$1</b></span>");
    }
});
