using storeroom.Application.Catalog.Storerooms.Dtos;
using storeroom.Application.Dtos;
using storeroom.Data.EF;
using storeroom.Data.Entities;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using storeroom.Application.Catalog.Storerooms.InventoryDtos;

namespace storeroom.Application.Catalog.Storerooms
{
    public class StoreroomService : IStoreroomService
    {
        private storeroomDbContext _context;
        public StoreroomService(storeroomDbContext context)
        {
            _context = context;
        }
        public async Task<int> Create(StoreroomCreateRequest request)
        {
            var storeroom = new Storeroom()
            {
                StoreroomCode = request.StoreroomCode,
                DisplayName = request.DisplayName,
                Area = request.Area,
                Address = request.Address,
                Status = request.Status,
                UserId = request.UserId
            };
            _context.Storerooms.Add(storeroom);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> CreateInventory(InventoryCreateRequest request)
        {
            var inventoryExist = await _context.Inventories.FirstOrDefaultAsync(x => x.Date == request.Date);
            if (inventoryExist != null)
            {
                return -1;
            }
            var inventory = new Inventory()
            {
                Date = request.Date,
                StoreroomId = request.StoreroomId,
                CreatedBy = request.CreatedBy,
                CreatedDate = DateTime.Now,
                InventoryDetails = request.InventoryDetails
            };
            _context.Inventories.Add(inventory);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int StoreroomId)
        {
            var sMaterial= await _context.MaterialStorerooms.FirstOrDefaultAsync(x=>x.StoreroomId==StoreroomId);
            if (sMaterial != null)
            {
                return -1;
            }
            var storeroom = await _context.Storerooms.FindAsync(StoreroomId);
            if (storeroom == null) throw new StoreroomException($"Cannot find storeroom {StoreroomId}");
            _context.Storerooms.Remove(storeroom);
            return await _context.SaveChangesAsync();
        }

        public async Task<PagedResult<StoreroomViewModel>> GetAllPaging(GetStoreroomPagingRequest request)
        {
            //1. Select join
            var query = from a in _context.Storerooms
                        join b in _context.Users on a.UserId equals b.Id
                        select new { a, b };
            //2. filter
            if (!string.IsNullOrEmpty(request.keyword))
            {
                query = query.Where(x => x.a.DisplayName.Contains(request.keyword));
            }
            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.page - 1) * request.limit)
                       .Take(request.limit)
                       .Select(x => new StoreroomViewModel()
                       {
                           Id = x.a.Id,
                           DisplayName = x.a.DisplayName,
                           StoreroomCode = x.a.StoreroomCode,
                           UserId = x.b.Id,
                           UserName = x.b.UserName,
                           FirstName = x.b.FirstName,
                           LastName = x.b.LastName,
                           Area = x.a.Area,
                           Address = x.a.Address,
                           Status = x.a.Status,
                           x = x.a.x,
                           y = x.a.y
                       }).ToListAsync();
            //4. Select and projection
            var pagedResult = new PagedResult<StoreroomViewModel>()
            {
                TotalRecord = totalRow,
                Items = data
            };
            return pagedResult;
        }

        public async Task<StoreroomViewModel> GetDetail(int StoreroomId)
        {
            var storeroom = await _context.Storerooms.FindAsync(StoreroomId);
            var listDetail = new StoreroomViewModel()
            {
                Id = storeroom.Id,
                DisplayName = storeroom.DisplayName,
                Area = storeroom.Area,
                Address = storeroom.Address,
                Status = storeroom.Status,
                UserId = storeroom.UserId,
                StoreroomCode = storeroom.StoreroomCode,
                x = storeroom.x,
                y = storeroom.y
            };
            return listDetail;
        }

        public async Task<PagedResult<InventoryDetailViewModel>> GetInventoryDetail(string keyword, DateTime? date, int? storeroomId)
        {
            var query = from a in _context.InventoryDetails
                        join c in _context.Materials on a.MaterialId equals c.Id
                        join f in _context.Inventories on a.InventoryId equals f.Id
                        join b in _context.Units on c.UnitId equals b.Id
                        join d in _context.Storerooms on f.StoreroomId equals d.Id
                        join e in _context.MaterialGroups on c.MaterialGroupId equals e.Id
                        select new { a, b, c, d, e, f };

            if (storeroomId.HasValue)
            {
                query = query.Where(x => x.f.StoreroomId == storeroomId);
            }

            if (date.HasValue)
            {
                query = query.Where(x => x.f.Date == date);
            }

            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query
                       .Select(x => new InventoryDetailViewModel()
                       {
                           MaterialId = x.a.MaterialId,
                           MaterialCode = x.c.MaterialCode,
                           InventoryId=x.a.InventoryId,
                           MaterialName=x.c.DisplayName,
                           QuantityTT =x.a.QuantityTT,
                           QuantityLT=x.a.QuantityLT,
                           UnitName=x.b.DisplayName,
                           Description=x.a.Description
                       }).ToListAsync();
            //4. Select and projection
            var pagedResult = new PagedResult<InventoryDetailViewModel>()
            {
                TotalRecord = totalRow,
                Items = data
            };
            return pagedResult;
        }

        public async Task<int> Update(StoreroomUpdateRequest request)
        {
            var storeroomId = await _context.Storerooms.FindAsync(request.Id);
            var storeroom = await _context.Storerooms.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (storeroom == null) throw new StoreroomException($"Cannot find storeroom:{request.Id}");
            storeroom.Id = request.Id;
            storeroom.DisplayName = request.DisplayName;
            storeroom.Area = request.Area;
            storeroom.Address = request.Address;
            storeroom.Status = request.Status;
            storeroom.UserId = request.UserId;
            storeroom.StoreroomCode = request.StoreroomCode;
            storeroom.x = request.x;
            storeroom.y = request.y;
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateInventoryDetail(InventoryDetailViewModel request)
        {
            var inventoryDetail = await _context.InventoryDetails.FirstOrDefaultAsync(x => x.InventoryId == request.InventoryId && x.MaterialId == request.MaterialId);
            if (inventoryDetail == null) throw new StoreroomException($"Cannot find material: {request.MaterialId}");
            inventoryDetail.QuantityLT = request.QuantityLT;
            inventoryDetail.QuantityTT = request.QuantityTT;
            inventoryDetail.Description = request.Description;
            return await _context.SaveChangesAsync();
        }
    }
}
