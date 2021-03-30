Ext.define("Admin.model.mKhoVatTu", {
    extend: "Ext.data.Model",
    idProperty: "id",
    fields: [
        { name: "id", type: "int" },
        { name: "CreationTime", type: "date" },
        { name: "LastModificationTime", type: "date" },

        { name: "ma", type: "string" },
        { name: "qrCode", type: "string" }, //
        { name: "maNhomVatTu", type: "int", defaultValue: null, allowNull: true },
        { name: "maNhom", type: "string" },
        { name: "tenNhom", type: "string" },
        { name: "giaTri", type: "float", defaultValue: null, allowNull: true },
        { name: "donViDatHang", type: "string" }, //
        { name: "donViPhatHanh", type: "string" }, //
        { name: "nuocSanXuat", type: "int", defaultValue: null, allowNull: true },
        { name: "tenNuocSanXuat", type: "string" },
        { name: "hangSanXuat", type: "int", defaultValue: null, allowNull: true },
        { name: "tenHangSanXuat", type: "string" },
        { name: "soLuongTrongKho", type: "float", defaultValue: null, allowNull: true },
        { name: "hanSuDung", type: "string" },
        { name: "trangThai", type: "string" }, //
        { name: "rotating", type: "bool", defaultValue: null, allowNull: true },
        { name: "taiLieu", type: "string" },
        { name: "thongSoKyThuat", type: "string" },

        { name: "moTa", type: "string" },
        { name: "phuTung", type: "bool", defaultValue: null, allowNull: true },
        { name: "namSanXuat", type: "string" }
    ]
});