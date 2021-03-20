using storeroom.Application.Catalog.Materials.Dtos;
using storeroom.Application.Dtos;
using storeroom.Data.EF;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Materials
{
    public class MaterialService : IMaterialService
    {
        private storeroomDbContext _context;
        public MaterialService(storeroomDbContext context)
        {
            _context = context;
        }
        public async Task<int> Create(MaterialCreateRequest request)
        {
            var material = new Material()
            {
                MaterialCode = request.MaterialCode,
                Description = request.Description,
                Price = request.Price,
                YearManufacture = request.YearManufacture,
                UnitId = request.UnitId,
                UnitOrderId=request.UnitOrderId,
                MaterialGroupId=request.MaterialGroupId,
                CountryId=request.CountryId,
                BrandId=request.BrandId,
                ExperyDate=request.ExperyDate,
                Status=request.Status,
                Img=request.Img,
                Specification=request.Specification,
            };
            _context.Materials.Add(material);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int MaterialId)
        {
            var material = await _context.Materials.FindAsync(MaterialId);
            if (material == null) throw new StoreroomException($"Cannot find a material: {MaterialId}"); 
            _context.Materials.Remove(material);
            return await _context.SaveChangesAsync();
        }

        public async Task<List<MaterialViewModel>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<PagedResult<MaterialViewModel>> GetAllPaging(GetMaterialPagingRequest request)
        {
            //1. Select join
            var query = from a in _context.YeuCaus
                        join b in _context.Loais on a.MaLoai equals b.MaLoai
                        join c in _context.TrangThais on a.MaTrangThai equals c.MaTrangThai
                        join d in _context.NhanViens on a.MaNV equals d.MaNV
                        join e in _context.KhachHangs on a.MaKH equals e.MaKH
                        join f in _context.MucDos on a.MaMucDo equals f.MaMucDo
                        select new { a, b, c, d, e, f };
            //2. filter
            if (!string.IsNullOrEmpty(request.Noidung))
            {
                query = query.Where(x => x.a.Noidung.Contains(request.Noidung));
            }
            if (!string.IsNullOrEmpty(request.TenKH))
            {
                query = query.Where(x => x.e.TenKH.Contains(request.TenKH));
            }
            if (request.MaLoai.HasValue)
            {
                query = query.Where(x => x.a.MaLoai == request.MaLoai);
            }
            if (request.NgayBatDau.HasValue)
            {
                query = query.Where(x => x.a.NgayTiepNhan >= request.NgayBatDau);
            }
            if (request.NgayKetThuc.HasValue)
            {
                query = query.Where(x => x.a.NgayTiepNhan <= request.NgayKetThuc);
            }
            if (request.MaTrangThai.HasValue)
            {
                query = query.Where(x => x.a.MaTrangThai == request.MaTrangThai);
            }
            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.page - 1) * request.limit)
                       .Take(request.limit)
                       .Select(x => new YeuCauViewModel()
                       {
                           MaYeuCau = x.a.MaYeuCau,
                           MaLoai = x.b.MaLoai,
                           TenLoai = x.b.TenLoai,
                           MaTrangThai = x.c.MaTrangThai,
                           TenTrangThai = x.c.TenTrangThai,
                           MaMucDo = x.f.MaMucDo,
                           TenMucDo = x.f.TenMucDo,
                           MaNV = x.d.MaNV,
                           TenNV = x.d.TenNV,
                           MaKH = x.e.MaKH,
                           TenKH = x.e.TenKH,
                           NgayTiepNhan = x.a.NgayTiepNhan,
                           Noidung = x.a.Noidung,
                           DiaDiem = x.a.DiaDiem,
                           MoTa = x.a.MoTa,
                           SDT = x.e.SDT,
                           Email = x.e.Email
                       }).ToListAsync();
            //4. Select and projection
            var pagedResult = new PagedResult<YeuCauViewModel>()
            {
                TotalRecord = totalRow,
                Items = data
            };
            return pagedResult;
        }

        public async Task<int> Update(MaterialUpdateRequest request)
        {
            throw new NotImplementedException();
        }

    }
}
