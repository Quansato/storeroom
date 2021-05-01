using storeroom.Application.Catalog.PurchaseOrders.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.PurchaseOrders
{
    public interface IPurchaseOrderService
    {
        Task<int> Create(PurchaseOrderCreateRequest request);
    }
}
