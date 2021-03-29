using storeroom.Application.Catalog.Storerooms.Dtos;
using storeroom.Application.Dtos;
using storeroom.Data.EF;
using storeroom.Data.Entities;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<int> Delete(int StoreroomId)
        {
            var storeroom = await _context.Storerooms.FindAsync(StoreroomId);
            if (storeroom == null) throw new StoreroomException($"Cannot find storeroom {StoreroomId}");
            _context.Storerooms.Remove(storeroom);
            return await _context.SaveChangesAsync();
        }

        public async Task<PagedResult<StoreroomViewModel>> GetAllPaging(GetStoreroomPagingRequest request)
        {
            throw new NotImplementedException();
        }

        public async Task<StoreroomViewModel> GetDetail(int MaterialGroupId)
        {
            throw new NotImplementedException();
        }

        public async Task<int> Update(StoreroomUpdateRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
