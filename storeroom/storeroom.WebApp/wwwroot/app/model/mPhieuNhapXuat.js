Ext.define('Admin.model.mPhieuNhapXuat', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int', defaultValue: null, allowNull: true },
        { name: 'inputCode', type: 'string' },
        { name: 'storeroomId', type: 'int', defaultValue: null, allowNull: true },
        { name: 'deliveryUnit', type: 'string' },
        { name: 'shipper', type: 'string' },
        { name: 'dateInput', type: 'date', defaultValue: null, allowNull: true },
        { name: 'dateStatus', type: 'date', defaultValue: null, allowNull: true },
        //{ name: 'creationTime', type: 'date', defaultValue: null, allowNull: true },
        { name: 'description', type: 'string' },
        { name: 'userId', type: 'string', defaultValue: null, allowNull: true },


        //{ name: 'tenantId', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'creationTime', type: 'string' },
        //{ name: 'lastModificationTime', type: 'auto', defaultValue: null, allowNull: true },
        //{ name: 'lastModifierUserId', type: 'auto', defaultValue: null, allowNull: true },
        //{ name: 'creatorUserId', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'isDeleted', type: 'bool', defaultValue: null, allowNull: true },
        //{ name: 'deleterUserId', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'deletionTime', type: 'date', defaultValue: null, allowNull: true },
        //{ name: 'phanLoai', type: 'string' },
        //{ name: 'maDonViQuanLy', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'thoiGian', type: 'date', defaultValue: null, allowNull: true },
        //{ name: 'soPhieu', type: 'string' },
        //{ name: 'donViGiao', type: 'string' },
        //{ name: 'nguoiGiao', type: 'string' },
        //{
        //    name: 'tenNguoiGiao', type: 'string'
        //},
        //{ name: 'donViNhan', type: 'string' },
        //{ name: 'nguoiNhan', type: 'string' },
        //{
        //    name: 'tenNguoiNhan', type: 'string'
        //},
        //{ name: 'lyDo', type: 'string' },
        //{ name: 'maKhoNhap', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'maKhoXuat', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'ngayHachToan', type: 'date', defaultValue: null, allowNull: true },
        //{ name: 'ngayChungTu', type: 'date', defaultValue: null, allowNull: true },
        //{ name: 'diaChi', type: 'string' },
        //{ name: 'loaiPhieu', type: 'string' },
        //{ name: 'maPhieuCha', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'maPhieuLienQuan', type: 'string' },
        //{ name: 'maCongViec', type: 'string' },
        //{ name: 'soHoaDon', type: 'string' },
        //{ name: 'trangThai', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'nguoiDeXuat', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'nguoiPheDuyet', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'tenNguoiDeXuat', type: 'string' },
        //{
        //    name: 'tenNguoiPheDuyet', type: 'string',
        //    convert: function (value, record) {
        //        var text = value;
        //        if (record.get('loaiPhieu') == '-1') {
        //            text = record.get('nguoiNhan');
        //        }
        //        return text;
        //    }
        //},
        //{ name: 'soLuongXuatKho', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'tenLoaiPhieu', type: 'string' }

    ]
});

