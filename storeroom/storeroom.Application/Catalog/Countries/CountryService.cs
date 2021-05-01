using Microsoft.EntityFrameworkCore;
using storeroom.Application.Catalog.Brands.Dtos;
using storeroom.Application.Catalog.Countries;
using storeroom.Application.Catalog.Countries.Dtos;
using storeroom.Application.Catalog.Materials.Dtos;
using storeroom.Application.Dtos;
using storeroom.Data.EF;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Countries
{
    public class CountryService : ICountryService
    {
        private storeroomDbContext _context;
        public CountryService(storeroomDbContext context)
        {
            _context = context;
        }
        public async Task<int> Create(CountryCreateRequest request)
        {
            var brand = new Brand()
            {
                DisplayName = request.DisplayName
            };
            _context.Brands.Add(brand);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int CountryId)
        {
            var country = await _context.Brands.FindAsync(CountryId);
            if (country == null) throw new StoreroomException($"Cannot find a brand :{CountryId}");
            _context.Brands.Remove(country);
            return await _context.SaveChangesAsync();
        }

        public async Task<List<CountryViewModel>> GetAll()
        {
            var countries = await _context.Countries.Select(x => new CountryViewModel()
            {
                Id = x.Id,
                DisplayName = x.DisplayName
            }).ToListAsync();
            return countries;
        }

        public async Task<PagedResult<CountryViewModel>> GetAllPaging(GetCountryPagingRequest request)
        {
            var query = from a in _context.Countries select new { a };
            //2. filter
            if (!string.IsNullOrEmpty(request.keyword))
            {
                query = query.Where(x => x.a.DisplayName.Contains(request.keyword));
            }
            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.page - 1) * request.limit)
                       .Take(request.limit)
                       .Select(x => new CountryViewModel()
                       {
                           Id = x.a.Id,
                           DisplayName=x.a.DisplayName
                       }).ToListAsync();
            //4. Select and projection
            var pagedResult = new PagedResult<CountryViewModel>()
            {
                TotalRecord = totalRow,
                Items = data
            };
            return pagedResult;
        }

        public async Task<int> Update(CountryUpdateRequest request)
        {
            var countryId = await _context.Countries.FindAsync(request.Id);
            var country = await _context.Countries.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (country == null) throw new StoreroomException($"Cannot find country:{request.Id}");
            country.Id = request.Id;
            country.DisplayName = request.DisplayName;
            return await _context.SaveChangesAsync();
        }
    }
}
