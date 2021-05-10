Ext.define("Admin.model.mKhoVatTu", {
    extend: "Ext.data.Model",
    idProperty: "id",
    fields: [
        { name: "id", type: "int" },
        { name: "CreationTime", type: "date" },
        { name: "LastModificationTime", type: "date" },

        { name: "materialCode", type: "string" },
        { name: "qrCode", type: "string" }, //
        { name: "materialGroupId", type: "int", defaultValue: null, allowNull: true },
        { name: "maNhom", type: "string" },
        { name: "materialGroupName", type: "string" },
        { name: "price", type: "float", defaultValue: null, allowNull: true },
        { name: "donViDatHang", type: "string" }, //
        { name: "donViPhatHanh", type: "string" }, //
        { name: "countryId", type: "int", defaultValue: null, allowNull: true },
        { name: "countryName", type: "string" },
        { name: "brandId", type: "int", defaultValue: null, allowNull: true },
        { name: "brandName", type: "string" },
        { name: "soLuongTrongKho", type: "float", defaultValue: null, allowNull: true },
        { name: "expryDate", type: "string" },
        { name: "status", type: "bool" }, //
        { name: "taiLieu", type: "string" },
        { name: "specification", type: "string" },

        { name: "description", type: "string" },
        { name: "yearManufature", type: "string" }
    ]
});