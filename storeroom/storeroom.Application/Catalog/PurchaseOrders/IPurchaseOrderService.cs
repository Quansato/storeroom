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
        /// <summary>
        /// Thêm mới phiếu
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<int> Create(PurchaseOrderCreateRequest request);

        /// <summary>
        /// Cập nhật phiếu
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<int> Update(PurchaseOrderUpdateRequest request);

        /// <summary>
        /// Cập nhật chi tiết phiếu
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<int> UpdateDetail(MaterialPurchaseOrderCreateRequest request);

        /// <summary>
        /// Xoá phiếu
        /// </summary>
        /// <param name="PurchaseOrderId"></param>
        /// <returns></returns>
        Task<int> Delete(int PurchaseOrderId);

        /// <summary>
        /// Xoá vật tư trong phiếu
        /// </summary>
        /// <param name="PurchaseOrderId"></param>
        /// <returns></returns>
        Task<int> DeleteDetail(int PurchaseOrderId);

        /// <summary>
        /// Lấy chi tiết theo id phiếu
        /// </summary>
        /// <param name="PurchaseOrderId"></param>
        /// <returns></returns>
        Task<PagedResult<PurchaseOrderViewModel>> GetDetail(int PurchaseOrderId);

        /// <summary>
        /// Phân trang dữ liệu
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<PagedResult<PurchaseOrderViewModel>> GetAllPaging(PurchaseOrderSearchRequest request);

        /// <summary>
        /// Lấy tất cả
        /// </summary>
        /// <returns></returns>
        Task<PagedResult<PurchaseOrderViewModel>> GetAll();

        /// <summary>
        /// Lấy vật tư trong phiếu
        /// </summary>
        /// <param name="PurchaseId"></param>
        /// <returns></returns>
        Task<PagedResult<MaterialPurchaseOrderViewModel>> GetMaterialByPurchaseId(int PurchaseId);

    }
}
