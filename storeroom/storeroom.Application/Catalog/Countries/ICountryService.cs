using storeroom.Application.Catalog.Brands.Dtos;
using storeroom.Application.Catalog.Countries.Dtos;
using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Countries
{
    public interface ICountryService
    {
        Task<int> Create(CountryCreateRequest request);
        Task<int> Update(CountryUpdateRequest request);
        Task<int> Delete(int CountryId);
        Task<PagedResult<CountryViewModel>> GetAllPaging(GetCountryPagingRequest request);
        Task<List<CountryViewModel>> GetAll();

    }
}
