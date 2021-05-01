using storeroom.Application.Catalog.Brands.Dtos;
using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Brands
{
    public interface IBrandService
    {
        Task<int> Create(BrandCreateRequest request);
        Task<int> Update(BrandUpdateRequest request);
        Task<int> Delete(int BrandId);
        Task<PagedResult<BrandViewModel>> GetAllPaging(GetBrandPagingRequest request);
        Task<List<BrandViewModel>> GetAll();

    }
}
