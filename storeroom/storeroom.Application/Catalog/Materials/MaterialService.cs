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
using storeroom.Application.Catalog.Materials.Dtos.MStoreroom;

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

        public async Task<int> UpdateStock(MaterialStoreroomVm request)
        {
            var material = await _context.MaterialStorerooms.FirstOrDefaultAsync(x => x.MaterialId == request.MaterialId && x.StoreroomId ==request.StoreroomId);
            if (material == null) throw new StoreroomException($"Cannot find a material: {request.MaterialId}");
            material.StoreroomId = request.StoreroomId;
            material.MaterialId = request.MaterialId;
            material.Quantity = request.Quantity;
            material.QuantityMax = request.QuantityMax;
            material.QuantityMin = request.QuantityMin;
            return await _context.SaveChangesAsync();
        }

        public Task<int> GetQuantityMax(int MaterialId, int StoreroomId)
        {
            throw new NotImplementedException();
        }

        public Task<int> GetQuantityMin(int MaterialId, int StoreroomId)
        {
            throw new NotImplementedException();
        }
         
        public async Task<int> UpdateMaterialToStoreroom(MaterialStoreroomVm request)
        {
            var order = new MaterialStoreroom()
            {
                StoreroomId = request.StoreroomId,
                MaterialId=request.MaterialId,
                Quantity=request.Quantity,
                QuantityMax=request.QuantityMax,
                QuantityMin=request.QuantityMin,
            };
            _context.MaterialStorerooms.Add(order);
            return await _context.SaveChangesAsync();
        }

        public async Task<PagedResult<MaterialStoreroomVm>> GetAllMSPaging(MaterialStoreroomGetPaging request)
        {
            //1. Select join
            var query = from a in _context.Materials
                        join b in _context.Units on a.UnitId equals b.Id
                        join c in _context.MaterialStorerooms on a.Id equals c.MaterialId
                        join d in _context.Storerooms on c.StoreroomId equals d.Id
                        join e in _context.MaterialGroups on a.MaterialGroupId equals e.Id
                        select new { a, b, c, d, e };
            
            //err
            if (request.MaterialGroupId.HasValue)
            {
                query = query.Where(x => x.a.MaterialGroupId == request.MaterialGroupId);
            }
            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.page - 1) * request.limit)
                       .Take(request.limit)
                       .Select(x => new MaterialStoreroomVm()
                       {
                           StoreroomId=x.d.Id,
                           StoreroomName=x.d.DisplayName,
                           MaterialId=x.a.Id,
                           MaterialCode=x.a.MaterialCode,
                           DisplayName =x.a.DisplayName,
                           UnitName=x.b.DisplayName,
                           Quantity=x.c.Quantity,
                           QuantityMax=x.c.QuantityMax,
                           QuantityMin =x.c.QuantityMin,
                           Compartment=x.c.Compartment,
                           Rack=x.c.Rack,
                           Row=x.c.Row
                       }).ToListAsync();
            //4. Select and projection
            var pagedResult = new PagedResult<MaterialStoreroomVm>()
            {
                TotalRecord = totalRow,
                Items = data
            };
            return pagedResult;
        }

        public Task<PagedResult<MaterialStoreroomVm>> GetAllMaterialToAdd(MaterialStoreroomGetPaging request)
        {
            throw new NotImplementedException();
        }
    }
}
