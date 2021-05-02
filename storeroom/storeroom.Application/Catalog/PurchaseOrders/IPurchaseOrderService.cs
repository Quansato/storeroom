using storeroom.Application.Catalog.PurchaseOrders.Dtos;
using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.PurchaseOrders
{
    public interface IPurchaseOrderService
    {
        Task<int> Create(PurchaseOrderCreateRequest request);
        Task<int> Update(PurchaseOrderUpdateRequest request);
        Task<int> UpdateDetail(MaterialPurchaseOrderCreateRequest request);
        Task<int> Delete(int PurchaseOrderId);
        Task<PagedResult<PurchaseOrderViewModel>> GetDetail(int PurchaseOrderId);

        Task<PagedResult<PurchaseOrderViewModel>> GetAllPaging(PurchaseOrderSearchRequest request);
        Task<PagedResult<PurchaseOrderViewModel>> GetAll();
        Task<PagedResult<MaterialPurchaseOrderViewModel>> GetMaterialByPurchaseId(int PurchaseId);

    }
}
