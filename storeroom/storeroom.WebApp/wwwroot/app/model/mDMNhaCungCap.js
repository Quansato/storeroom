﻿Ext.define("Admin.model.mDMNhaCungCap", {
    extend: "Ext.data.Model",
    idProperty: "id",
    fields: [
        { name: "id", type: "int" },
        { name: "CreationTime", type: "date" },
        { name: "LastModificationTime", type: "date" },
        { name: "ma", type: "string" },
        { name: "ten", type: "string" },
        { name: "moTa", type: "string" },
        { name: "maSoThue", type: "string" },
        { name: "soDienThoai", type: "string" },
        { name: "fax", type: "string" },
        { name: "email", type: "string" },
        { name: "diaChi", type: "string" },
        { name: "maBuuChinh", type: "string" },
        { name: "tinhTP", type: "string" },
        { name: "vungMien", type: "string" },
        { name: "quocGia", type: "string" },
        { name: "website", type: "string" },
        { name: "linhVuc", type: "string", defaultValue: null, allowNull: true },
        { name: "dieuKienThanhToan", type: "string", defaultValue: null, allowNull: true },
        { name: "lienHe", type: "string" },
        { name: "lienHeChucVu", type: "string" },
        { name: "lienHeSoDienThoai", type: "string" },
        { name: "lienHeSoDiDong", type: "string" },
        { name: "lienHeEmail", type: "string" },
        { name: "phanLoai", type: "string" },
        { name: "taiLieu", type: "string" },
        { name: "trangThai", type: "string" },
        { name: "ghiChu", type: "string" }
    ]
});