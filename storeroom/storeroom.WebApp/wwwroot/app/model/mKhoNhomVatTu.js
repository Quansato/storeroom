Ext.define("Admin.model.mKhoNhomVatTu", {
    extend: "Ext.data.Model",
    idProperty: "id",
    fields: [
        { name: "id", type: "int" },
        { name: "CreationTime", type: "date" },
        { name: "LastModificationTime", type: "date" },
        { name: "ma", type: "string" },
        { name: "moTa", type: "string" },
        { name: "qrCode", type: "string" }
    ]
});
