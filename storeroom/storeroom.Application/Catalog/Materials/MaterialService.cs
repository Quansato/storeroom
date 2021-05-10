using storeroom.Application.Catalog.Materials.Dtos;
using storeroom.Application.Dtos;
using storeroom.Data.EF;
using storeroom.Data.Entities;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
            var isExist = checkExistMaterialCode(request.MaterialCode);
            if (isExist != null)
            {
                throw new StoreroomException("MaterialCode is already exist");
            }
            var material = new Material()
            {
                MaterialCode = request.MaterialCode,
                Description = request.Description,
                DisplayName = request.DisplayName,
                Price = request.Price,
                YearManufacture = request.YearManufacture,
                UnitId = request.UnitId,
                UnitOrderId = request.UnitOrderId,
                MaterialGroupId = request.MaterialGroupId,
                CountryId = request.CountryId,
                BrandId = request.BrandId,
                ExperyDate = request.ExperyDate,
                Status = request.Status,
                Img = request.Img,
                QRCode = request.QRCode,
                Specification = request.Specification,
            };
            _context.Materials.Add(material);
            return await _context.SaveChangesAsync();
        }
        public ApiResult<Object> checkExistMaterialCode(string MaterialCode)
        {
            var existMaterial = _context.Materials.FirstOrDefault(x => x.MaterialCode == MaterialCode);

            if (existMaterial != null)
            {
                var result = new ApiResult<Object>()
                {
                    IsSuccessed = false,
                    Message = "MaterialCode is exist"
                };
                return result;
            }
            return null;
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

        public async Task<PagedResult<MaterialViewModel>> GetAllPaging(SearchRequest request)
        {
            //1. Select join
            var query = from a in _context.Materials
                        join b in _context.Units on a.UnitId equals b.Id
                        join c in _context.Units on a.UnitOrderId equals c.Id
                        join d in _context.MaterialGroups on a.MaterialGroupId equals d.Id
                        join e in _context.Countries on a.CountryId equals e.Id
                        join f in _context.Brands on a.BrandId equals f.Id
                        select new { a, b, c, d, e, f };
            //2. filter
            if (!string.IsNullOrEmpty(request.keyword))
            {
                query = query.Where(x => x.a.DisplayName.Contains(request.keyword));
            }
            //err
            if (request.MaterialGroupId.HasValue)
            {
                query = query.Where(x => x.a.MaterialGroupId == request.MaterialGroupId);
            }
            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.page - 1) * request.limit)
                       .Take(request.limit)
                       .Select(x => new MaterialViewModel()
                       {
                           Id = x.a.Id,
                           MaterialCode = x.a.MaterialCode,
                           Description = x.a.Description,
                           DisplayName=x.a.DisplayName,
                           Price = x.a.Price,
                           YearManufacture = x.a.YearManufacture,
                           UnitId = x.b.Id,
                           UnitName = x.b.DisplayName,
                           UnitOrderId = x.c.Id,
                           UnitOrderName = x.c.DisplayName,
                           MaterialGroupId = x.d.Id,
                           MaterialGroupName = x.d.DisplayName,
                           CountryId = x.e.Id,
                           CountryName = x.e.DisplayName,
                           BrandId = x.f.Id,
                           BrandName = x.f.DisplayName,
                           ExperyDate = x.a.ExperyDate,
                           Status = x.a.Status,
                           Img = x.a.Img,
                           Specification = x.a.Specification,
                           QRCode = x.a.QRCode
                       }).ToListAsync();
            //4. Select and projection
            var pagedResult = new PagedResult<MaterialViewModel>()
            {
                TotalRecord = totalRow,
                Items = data
            };
            return pagedResult;
        }

        public async Task<PagedResult<MaterialViewModel>> GetDetail(int MaterialId)
        {
            var query = from a in _context.Materials
                        join b in _context.Units on a.UnitId equals b.Id
                        join c in _context.Units on a.UnitOrderId equals c.Id
                        join d in _context.MaterialGroups on a.MaterialGroupId equals d.Id
                        join e in _context.Countries on a.CountryId equals e.Id
                        join f in _context.Brands on a.BrandId equals f.Id
                        select new { a, b, c, d, e, f };

            query = query.Where(x => x.a.Id == MaterialId);

            var data = await query
                       .Select(x => new MaterialViewModel()
                       {
                           Id = x.a.Id,
                           MaterialCode = x.a.MaterialCode,
                           Description = x.a.Description,
                           DisplayName= x.a.Description,
                           Price = x.a.Price,
                           YearManufacture = x.a.YearManufacture,
                           UnitId = x.b.Id,
                           UnitName = x.b.DisplayName,
                           UnitOrderId = x.c.Id,
                           UnitOrderName = x.c.DisplayName,
                           MaterialGroupId = x.d.Id,
                           MaterialGroupName = x.d.DisplayName,
                           CountryId = x.e.Id,
                           CountryName = x.e.DisplayName,
                           BrandId = x.f.Id,
                           BrandName = x.f.DisplayName,
                           ExperyDate = x.a.ExperyDate,
                           Status = x.a.Status,
                           Img = x.a.Img,
                           Specification = x.a.Specification,
                           QRCode = x.a.QRCode
                       }).ToListAsync();

            var pagedResult = new PagedResult<MaterialViewModel>()
            {
                TotalRecord = 1,
                Items = data
            };
            return pagedResult;

        }

        public async Task<int> Update(MaterialUpdateRequest request)
        {
            var materialId = await _context.Materials.FindAsync(request.Id);
            var material = await _context.Materials.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (material == null) throw new StoreroomException($"Cannot find a material: {request.Id}");
            material.MaterialCode = request.MaterialCode;
            material.Description = request.Description;
            material.Price = request.Price;
            material.YearManufacture = request.YearManufacture;
            material.UnitId = request.UnitId;
            material.UnitOrderId = request.UnitOrderId;
            material.MaterialGroupId = request.MaterialGroupId;
            material.CountryId = request.CountryId;
            material.BrandId = request.BrandId;
            material.ExperyDate = request.ExperyDate;
            material.Status = request.Status;
            material.Img = request.Img;
            material.Specification = request.Specification;
            material.QRCode = request.QRCode;

            return await _context.SaveChangesAsync();
        }

    }
}
