using storeroom.Application.Catalog.PurchaseOrders.Dtos;
using storeroom.Data.EF;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.PurchaseOrders
{
    public class PurchaseOrderService : IPurchaseOrderService
    {
        private storeroomDbContext _context;
        public PurchaseOrderService(storeroomDbContext context)
        {
            _context = context;
        }
        public async Task<int> Create(PurchaseOrderCreateRequest request)
        {
            var order = new PurchaseOrder()
            {
                Id = request.Id,
                Code=request.Code,
                NameOfOrder=request.NameOfOrder,
                StoreroomId=request.StoreroomId,
                Date=request.Date,
                Status=request.Status,
                SuplierId=request.SuplierId,
                Priority=request.Priority,
                UserId=request.UserId
            };
            _context.PurchaseOrders.Add(order);
            for(MaterialPurchaseOrder in request.MaterialPuchaseOrder)
            {

            }
            return await _context.SaveChangesAsync();
        }
    }
}
