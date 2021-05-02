Ext.define('Admin.model.mDonHang', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        //{ name: 'id', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'tenantId', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'creationTime', type: 'string' },
        //{ name: 'lastModificationTime', type: 'auto', defaultValue: null, allowNull: true },
        //{ name: 'lastModifierUserId', type: 'auto', defaultValue: null, allowNull: true },
        //{ name: 'creatorUserId', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'isDeleted', type: 'bool', defaultValue: null, allowNull: true },
        //{ name: 'deleterUserId', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'deletionTime', type: 'date', defaultValue: null, allowNull: true },
        //{ name: 'maDonViQuanLy', type: 'int', defaultValue: null, allowNull: true },
        //{
        //    name: 'thoiGian', dateFormat: 'date', defaultValue: null, allowNull: true,
        //    convert: function (value, record) {
        //        var text = value;
        //        if (value) {
        //            text = new Date(value);
        //        }
        //        return text;
        //    }
        //},
        //{ name: 'soPhieu', type: 'string' },
        //{ name: 'nhaCungCap', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'tenNhaCungCap', type: 'string' },
        //{ name: 'diaChi', type: 'string' },
        //{ name: 'maSoThue', type: 'string' },
        //{ name: 'nguoiMua', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'tenNguoiMua', type: 'string' },
        //{ name: 'lyDo', type: 'string' },
        //{ name: 'soDonHang', type: 'string' },
        //{ name: 'dieuKhoanThanhToan', type: 'string' },
        //{ name: 'tinhTrangDon', type: 'string' },
        //{ name: 'maCha', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'ngayGiao', type: 'date', defaultValue: null, allowNull: true },
        //{ name: 'makho', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'phanLoai', type: 'string' },
        //{ name: 'moTa', type: 'string' },
        //{ name: 'soNgayNo', type: 'date', defaultValue: null, allowNull: true },
        //{ name: 'mucDoKhanCap', type: 'string' },
        //{ name: 'khoanChi', type: 'int', defaultValue: null, allowNull: true },
        //{ name: 'tenKhoanChi', type: 'string' },
        //{ name: 'soLuongPhieuNhap', type: 'int', defaultValue: null, allowNull: true }

        { name: 'id', type: 'int', defaultValue: null, allowNull: true },
        {
            name: 'date', dateFormat: 'date', defaultValue: null, allowNull: true,
            convert: function (value, record) {
                var text = value;
                if (value) {
                    text = new Date(value);
                }
                return text;
            }
        },
        { name: 'code', type: 'string' },
        { name: 'nameOfOrder', type: 'string' },
        { name: 'status', type: 'int' },
        { name: 'storeroomId', type: 'int' },
        { name: 'storeroomName', type: 'string' },
        { name: 'suplierId', type: 'int' },
        { name: 'suplierName', type: 'string' },
        { name: 'priority', type: 'int' },
        { name: 'userID', type: 'string' },
        { name: 'userName', type: 'string' },
    ]
});