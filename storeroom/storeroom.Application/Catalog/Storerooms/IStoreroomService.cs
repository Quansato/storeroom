using storeroom.Application.Catalog.Storerooms.Dtos;
using storeroom.Application.Catalog.Storerooms.InventoryDtos;
using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Storerooms
{
    public interface IStoreroomService
    {
        Task<int> Create(StoreroomCreateRequest request);
        Task<int> Update(StoreroomUpdateRequest request);
        Task<int> Delete(int StoreroomId);
        Task<StoreroomViewModel> GetDetail(int StoreroomId);
        Task<PagedResult<StoreroomViewModel>> GetAllPaging(GetStoreroomPagingRequest request);

        Task<int> CreateInventory(InventoryCreateRequest request);
        Task<int> UpdateInventoryDetail(InventoryDetailViewModel request);
        Task<PagedResult<InventoryDetailViewModel>> GetInventoryDetail(string keyword, DateTime? date,int? storeroomId);
    }
}
