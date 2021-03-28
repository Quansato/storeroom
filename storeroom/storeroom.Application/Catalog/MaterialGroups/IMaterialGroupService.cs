using storeroom.Application.Catalog.MaterialGroups.Dtos;
using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.MaterialGroups
{
    public interface IMaterialGroupService
    {
        Task<int> Create(MaterialGroupCreateRequest request);
        Task<int> Update(MaterialGroupUpdateRequest request);
        Task<int> Delete(int MaterialGroupId);
        Task<PagedResult<MaterialGroupViewModel>> GetAllPaging(GetMaterialGroupPagingRequest request);
    }
}
