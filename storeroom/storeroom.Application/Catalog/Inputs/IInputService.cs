using storeroom.Application.Catalog.Inputs.Dtos;
using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Inputs
{
    public interface IInputService
    {
        Task<int> Create(InputCreateRequest request);
        Task<int> Update(InputUpdateRequest request);
        Task<int> UpdateDetail(MaterialInputCreateRequest request);
        Task<int> Delete(int InputId);
        Task<PagedResult<InputViewModel>> GetDetail(int InputId);
        Task<PagedResult<InputViewModel>> GetAllPaging(InputSearchRequest request);
        Task<PagedResult<InputViewModel>> GetAll();
        Task<PagedResult<MaterialInputViewModel>> GetMaterialByInputId(int InputId);
    }
}
