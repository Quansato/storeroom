using Microsoft.EntityFrameworkCore;
using storeroom.Application.Catalog.PurchaseOrders.Dtos;
using storeroom.Application.Dtos;
using storeroom.Data.EF;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
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
                Code = request.Code,
                NameOfOrder = request.NameOfOrder,
                StoreroomId = request.StoreroomId,
                Date = request.Date,
                Status = request.Status,
                SuplierId = request.SuplierId,
                Priority = request.Priority,
                UserId = request.UserId,
                MaterialPurchaseOrders = request.MaterialPuchaseOrder
            };
            _context.PurchaseOrders.Add(order);
            //var orderNew = _context.PurchaseOrders.FirstOrDefault(x => x.Code == request.Code);
            //foreach(var MaterialPurchaseOrder in request.MaterialPuchaseOrder)
            //{
            //    var materialOrder = new MaterialPurchaseOrder()
            //    {
            //        MaterialId=MaterialPurchaseOrder.MaterialId,
            //        PurchaseOrderId=MaterialPurchaseOrder.PurchaseOrderId,
            //        Quantity=MaterialPurchaseOrder.Quantity,
            //        Price=MaterialPurchaseOrder.Price,
            //        Description=MaterialPurchaseOrder.Description
            //    };
            //    _context.MaterialPurchaseOrders.Add(materialOrder);
            //}
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int PurchaseOrderId)
        {
            var purchaseOrder = await _context.PurchaseOrders.FindAsync(PurchaseOrderId);
            if (purchaseOrder == null) throw new StoreroomException($"Cannot find a purchaseOrder: {PurchaseOrderId}");
            _context.PurchaseOrders.Remove(purchaseOrder);
            return await _context.SaveChangesAsync();
        }

        public Task<PagedResult<PurchaseOrderViewModel>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<PagedResult<PurchaseOrderViewModel>> GetAllPaging(PurchaseOrderSearchRequest request)
        {
            //1. Select join
            var query = from a in _context.PurchaseOrders
                        join b in _context.Storerooms on a.StoreroomId equals b.Id
                        join c in _context.Supliers on a.SuplierId equals c.Id
                        join d in _context.Users on a.UserId equals d.Id
                        select new { a, b, c, d };
            //2. filter
            //if (!string.IsNullOrEmpty(request.keyword))
            //{
            //    query = query.Where(x => x.a.DisplayName.Contains(request.keyword));
            //}
            if (request.StoreroomId.HasValue)
            {
                query = query.Where(x => x.a.StoreroomId == request.StoreroomId);
            }
            if (!string.IsNullOrEmpty(request.Code))
            {
                query = query.Where(x => x.a.Code == request.Code);
            }
            if (request.Status.HasValue)
            {
                query = query.Where(x => x.a.StoreroomId == request.StoreroomId);
            }
            if (request.Date.HasValue)
            {
                query = query.Where(x => x.a.Date == request.Date);
            }
            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.page - 1) * request.limit)
                       .Take(request.limit)
                       .Select(x => new PurchaseOrderViewModel()
                       {
                           Id = x.a.Id,
                           Code = x.a.Code,
                           NameOfOrder = x.a.NameOfOrder,
                           Date = x.a.Date,
                           Status = x.a.Status,
                           StoreroomId = x.a.StoreroomId,
                           StoreroomName = x.b.DisplayName,
                           SuplierId = x.a.Id,
                           SuplierName = x.c.DisplayName,
                           Priority=x.a.Priority,
                           UserId = x.a.UserId,
                           UserName = x.d.UserName
                       }).ToListAsync();
            //4. Select and projection
            var pagedResult = new PagedResult<PurchaseOrderViewModel>()
            {
                TotalRecord = totalRow,
                Items = data
            };
            return pagedResult;
        }

        public async Task<PagedResult<PurchaseOrderViewModel>> GetDetail(int PurchaseOrderId)
        {
            throw new NotImplementedException();
        }

        public async Task<PagedResult<MaterialPurchaseOrderViewModel>> GetMaterialByPurchaseId(int PurchaseId)
        {
            var query = from a in _context.MaterialPurchaseOrders
                        join b in _context.Materials on a.MaterialId equals b.Id
                        join c in _context.Units on b.UnitId equals c.Id
                        select new { a, b, c };
            query = query.Where(x => x.a.PurchaseOrderId == PurchaseId);
            int totalRow = await query.CountAsync();
            var materials = await query.Select(x => new MaterialPurchaseOrderViewModel()
            {
                PurchaseOrderId=PurchaseId,
                Unit = x.c.DisplayName,
                MaterialId = x.a.MaterialId,
                MaterialName = x.b.Description,
                MaterialCode = x.b.MaterialCode,
                Quantity = x.a.Quantity,
                Price = x.a.Price,
                Description = x.a.Description

            }).ToListAsync();
            var pagedResult = new PagedResult<MaterialPurchaseOrderViewModel>()
            {
                TotalRecord = totalRow,
                Items = materials
            };
            return pagedResult;
        }

        public async Task<int> Update(PurchaseOrderUpdateRequest request)
        {
            var purchaseOrderId = await _context.PurchaseOrders.FindAsync(request.Id);
            var purchaseOrder = await _context.PurchaseOrders.FirstOrDefaultAsync(x => x.Id == request.Id);

            //foreach(var material in request.MaterialPuchaseOrder)
            //{
            //    var materialPurchaseOrder = await _context.MaterialPurchaseOrders.FindAsync(material.MaterialId);
            //    if (materialPurchaseOrder == null) throw new StoreroomException($"Cannot find material: {material.MaterialId}");
            //    _context.MaterialPurchaseOrders.Remove(materialPurchaseOrder);
            //}

            if (purchaseOrder == null) throw new StoreroomException($"Cannot find a purchaseOrder: {request.Id}");
            purchaseOrder.Id = request.Id;
            purchaseOrder.NameOfOrder = request.NameOfOrder;
            purchaseOrder.Date = request.Date;
            purchaseOrder.Status = request.Status;
            purchaseOrder.UserId = request.UserId;
            purchaseOrder.SuplierId = request.SuplierId;
            purchaseOrder.Priority = request.Priority;
            _context.PurchaseOrders.Attach(purchaseOrder);
            _context.PurchaseOrders.Update(purchaseOrder);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateDetail(MaterialPurchaseOrderCreateRequest request)
        {
            var materialDetail = await _context.MaterialPurchaseOrders
                .FirstOrDefaultAsync(x => x.PurchaseOrderId == request.PurchaseOrderId && x.MaterialId == request.MaterialId);
            if (materialDetail == null)
            {
                var materialPurchaseOder = new MaterialPurchaseOrder()
                {
                    PurchaseOrderId = request.PurchaseOrderId,
                    MaterialId = request.MaterialId,
                    Quantity = request.Quantity,
                    Price = request.Price,
                    Description = request.Description
                };
                _context.MaterialPurchaseOrders.Add(materialPurchaseOder);
                return await _context.SaveChangesAsync();
            }

            materialDetail.Quantity = request.Quantity;
            materialDetail.Price = request.Price;
            materialDetail.Description = request.Description;
            return await _context.SaveChangesAsync();
        }
    }
}
