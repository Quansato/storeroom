using Microsoft.EntityFrameworkCore;
using storeroom.Application.Catalog.PurchaseProposals.Dtos;
using storeroom.Application.Dtos;
using storeroom.Data.EF;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.PurchaseProposals
{
    public class PurchaseProposalService : IPurchaseProposalService
    {
        private storeroomDbContext _context;
        public PurchaseProposalService(storeroomDbContext context)
        {
            _context = context;
        }
        public async Task<int> Create(PurchaseProposalCreateRequest request)
        {
            var order = new PurchaseProposal()
            {
                Id = request.Id,
                Code = request.Code,
                Name= request.NameOfOrder,
                StoreroomId = request.StoreroomId,
                Date = request.Date,
                Status = 0,
                UserId = request.UserId,
                Description=request.Description,
                MaterialPurchaseProposals = request.MaterialPurchaseProposal
            };
            _context.PurchaseProposals.Add(order);
            return await _context.SaveChangesAsync();
        }

        public Task<int> Delete(int PurchaseProposalId)
        {
            throw new NotImplementedException();
        }

        public Task<PagedResult<PurchaseProposalViewModel>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<PagedResult<PurchaseProposalViewModel>> GetAllPaging(PurchaseProposalSearchRequest request)
        {
            //1. Select join
            var query = from a in _context.PurchaseProposals
                        join b in _context.Storerooms on a.StoreroomId equals b.Id
                        join c in _context.Users on a.UserId equals c.Id
                        select new { a, b, c };
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
                       .Select(x => new PurchaseProposalViewModel()
                       {
                           Id = x.a.Id,
                           Code = x.a.Code,
                           NameOfOrder = x.a.Name,
                           Date = x.a.Date,
                           Status = x.a.Status,
                           StoreroomId = x.a.StoreroomId,
                           StoreroomName = x.b.DisplayName,
                           UserId = x.a.UserId,
                           UserName = x.c.UserName,
                           ApproverId=x.a.ApproverId,
                           ApproverName=x.c.UserName
                       }).ToListAsync();
            //4. Select and projection
            var pagedResult = new PagedResult<PurchaseProposalViewModel>()
            {
                TotalRecord = totalRow,
                Items = data
            };
            return pagedResult;
        }

        public Task<PagedResult<PurchaseProposalViewModel>> GetDetail(int PurchaseProposalId)
        {
            throw new NotImplementedException();
        }

        public async Task<PagedResult<MaterialPurchaseProposalViewModel>> GetMaterialByPurchaseId(int PurchaseId)
        {
            var query = from a in _context.MaterialPurchaseOrders
                        join b in _context.Materials on a.MaterialId equals b.Id
                        join c in _context.Units on b.UnitId equals c.Id
                        select new { a, b, c };
            query = query.Where(x => x.a.PurchaseOrderId == PurchaseId);
            int totalRow = await query.CountAsync();
            var materials = await query.Select(x => new MaterialPurchaseProposalViewModel()
            {
                PurchaseProposalId = PurchaseId,
                Unit = x.c.DisplayName,
                MaterialId = x.a.MaterialId,
                MaterialName = x.b.Description,
                MaterialCode = x.b.MaterialCode,
                Quantity = x.a.Quantity,
                Price = x.a.Price,
                Description = x.a.Description

            }).ToListAsync();
            var pagedResult = new PagedResult<MaterialPurchaseProposalViewModel>()
            {
                TotalRecord = totalRow,
                Items = materials
            };
            return pagedResult;
        }

        public async Task<int> Update(PurchaseProposalUpdateRequest request)
        {
            var purchaseProposal = await _context.PurchaseProposals.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (purchaseProposal == null) throw new StoreroomException($"Cannot find a purchaseOrder: {request.Id}");
            purchaseProposal.Id = request.Id;
            purchaseProposal.Name = request.NameOfOrder;
            purchaseProposal.Date = request.Date;
            purchaseProposal.Status = request.Status;
            purchaseProposal.UserId = request.UserId;
            _context.PurchaseProposals.Attach(purchaseProposal);
            _context.PurchaseProposals.Update(purchaseProposal);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateDetail(MaterialPurchaseProposalCreateRequest request)
        {
            var materialDetail = await _context.MaterialPurchaseOrders
                .FirstOrDefaultAsync(x => x.PurchaseOrderId == request.PurchaseProposalId && x.MaterialId == request.MaterialId);
            if (materialDetail == null)
            {
                var materialPurchaseProposal = new MaterialPurchaseProposal()
                {
                    PurchaseProposalId = request.PurchaseProposalId,
                    MaterialId = request.MaterialId,
                    Quantity = request.Quantity,
                    Price = request.Price,
                    Description = request.Description
                };
                _context.MaterialPurchaseProposals.Add(materialPurchaseProposal);
                return await _context.SaveChangesAsync();
            }

            materialDetail.Quantity = request.Quantity;
            materialDetail.Price = request.Price;
            materialDetail.Description = request.Description;
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateStatus(PurchaseProposalUpdateRequest request)
        {
            var purchaseProposal = await _context.PurchaseProposals.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (purchaseProposal == null) throw new StoreroomException($"Cannot find a purchaseOrder: {request.Id}");
            purchaseProposal.Status = request.Status;
            purchaseProposal.ApproverId = request.ApproverId;
            _context.PurchaseProposals.Attach(purchaseProposal);
            _context.PurchaseProposals.Update(purchaseProposal);
            return await _context.SaveChangesAsync();
        }
    }
}
