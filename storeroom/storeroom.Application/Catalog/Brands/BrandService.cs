using Microsoft.EntityFrameworkCore;
using storeroom.Application.Catalog.Brands.Dtos;
using storeroom.Application.Catalog.Materials.Dtos;
using storeroom.Application.Dtos;
using storeroom.Data.EF;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Brands
{
    public class BrandService : IBrandService
    {
        private storeroomDbContext _context;
        public BrandService(storeroomDbContext context)
        {
            _context = context;
        }
        public async Task<int> Create(BrandCreateRequest request)
        {
            var brand = new Brand()
            {
                DisplayName = request.DisplayName
            };
            _context.Brands.Add(brand);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int BrandId)
        {
            var brand = await _context.Brands.FindAsync(BrandId);
            if (brand == null) throw new StoreroomException($"Cannot find a brand :{BrandId}");
            _context.Brands.Remove(brand);
            return await _context.SaveChangesAsync();
        }

        public async Task<List<BrandViewModel>> GetAll()
        {
            var brands = await _context.Brands.Select(x => new BrandViewModel()
            {
                Id = x.Id,
                DisplayName = x.DisplayName
            }).ToListAsync();
            return brands;
        }

        public async Task<PagedResult<BrandViewModel>> GetAllPaging(GetBrandPagingRequest request)
        {
            var query = from a in _context.Brands select new { a };
            //2. filter
            if (!string.IsNullOrEmpty(request.keyword))
            {
                query = query.Where(x => x.a.DisplayName.Contains(request.keyword));
            }
            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.page - 1) * request.limit)
                       .Take(request.limit)
                       .Select(x => new BrandViewModel()
                       {
                           Id = x.a.Id,
                           DisplayName=x.a.DisplayName
                       }).ToListAsync();
            //4. Select and projection
            var pagedResult = new PagedResult<BrandViewModel>()
            {
                TotalRecord = totalRow,
                Items = data
            };
            return pagedResult;
        }

        public async Task<int> Update(BrandUpdateRequest request)
        {
            var brandId = await _context.Brands.FindAsync(request.Id);
            var brand = await _context.Brands.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (brand == null) throw new StoreroomException($"Cannot find brand:{request.Id}");
            brand.Id = request.Id;
            brand.DisplayName = request.DisplayName;
            return await _context.SaveChangesAsync();
        }
    }
}
