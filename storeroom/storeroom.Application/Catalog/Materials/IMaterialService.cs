using storeroom.Application.Catalog.Materials.Dtos;
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
        Task<MaterialViewModel> GetDetail(int MaterialId);

        Task<PagedResult<MaterialViewModel>> GetAllPaging(GetMaterialPagingRequest request);
    }
}
