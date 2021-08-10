using storeroom.Application.Catalog.Outputs.Dtos;
using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Outputs
{
    public interface IOutputService
    {
        Task<int> Create(OutputCreateRequest request);
        Task<int> Update(OutputUpdateRequest request);
        Task<int> UpdateDetail(MaterialOutputCreateRequest request);
        Task<int> Delete(int OutputId);
        Task<PagedResult<OutputViewModel>> GetDetail(int OutputId);
        Task<PagedResult<OutputViewModel>> GetAllPaging(OutputSearchRequest request);
        Task<PagedResult<OutputViewModel>> GetAll();
        Task<PagedResult<MaterialOutputViewModel>> GetMaterialByOutputId(int OutputId);
        Task<int> DeleteDetail(int OutputId);
    }
}
