using storeroom.Application.Catalog.Input.Dtos;
using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Input
{
    public interface IInputService
    {
        Task<int> Create(InputCreateRequest request);
        //Task<int> Update(InputUpdateRequest request);
        //Task<int> UpdateDetail(MaterialInputCreateRequest request);
        //Task<int> Delete(int PurchaseOrderId);
        //Task<PagedResult<PurchaseOrderViewModel>> GetDetail(int PurchaseOrderId);

        //Task<PagedResult<PurchaseOrderViewModel>> GetAllPaging(PurchaseOrderSearchRequest request);
        //Task<PagedResult<PurchaseOrderViewModel>> GetAll();
        //Task<PagedResult<MaterialPurchaseOrderViewModel>> GetMaterialByPurchaseId(int PurchaseId);
    }
}
