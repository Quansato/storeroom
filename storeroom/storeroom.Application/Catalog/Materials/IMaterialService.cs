using storeroom.Application.Catalog.Materials.Dtos;
using storeroom.Application.Catalog.Materials.Dtos.MStoreroom;
using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Materials
{
    public interface IMaterialService
    {
        Task<int> Create(MaterialCreateRequest request);
        Task<int> Update(MaterialUpdateRequest request);
        Task<int> Delete(int MaterialId);
        Task<PagedResult<MaterialViewModel>> GetDetail(int MaterialId);

        Task<PagedResult<MaterialViewModel>> GetAllPaging(SearchRequest request);
        Task<PagedResult<MaterialStoreroomVm>> GetAllMSPaging(MaterialStoreroomGetPaging request);
        Task<int> GetQuantityMax(int MaterialId, int StoreroomId);
        Task<int> GetQuantityMin(int MaterialId, int StoreroomId);

        Task<int> UpdateMaterialToStoreroom(MaterialStoreroomVm request);

        Task<int> UpdateStock(MaterialStoreroomVm request);
    }
}
