using Microsoft.EntityFrameworkCore;
using storeroom.Application.Catalog.MaterialGroups.Dtos;
using storeroom.Application.Dtos;
using storeroom.Data.EF;
using storeroom.Data.Entities;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.MaterialGroups
{
    public class MaterialGroupService : IMaterialGroupService
    {
        private storeroomDbContext _context;
        public MaterialGroupService(storeroomDbContext context)
        {
            _context = context;
        }
        public async Task<int> Create(MaterialGroupCreateRequest request)
        {
            var materialGroup = new MaterialGroup()
            {
                DisplayName = request.DisplayName,
                QRCode = request.QRCode
            };
            _context.MaterialGroups.Add(materialGroup);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int MaterialGroupId)
        {
            var materialGroup = await _context.MaterialGroups.FindAsync(MaterialGroupId);
            if (materialGroup == null) throw new StoreroomException($"Cannot find materialgroup : {MaterialGroupId}");
            _context.MaterialGroups.Remove(materialGroup);
            return await _context.SaveChangesAsync();
        }

        public async Task<PagedResult<MaterialGroupViewModel>> GetAllPaging(GetMaterialGroupPagingRequest request)
        {
            var query = from a in _context.MaterialGroups select new { a };
            //2. filter
            if (!string.IsNullOrEmpty(request.keyword))
            {
                query = query.Where(x => x.a.DisplayName.Contains(request.keyword));
            }
            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.page - 1) * request.limit)
                       .Take(request.limit)
                       .Select(x => new MaterialGroupViewModel()
                       {
                           Id = x.a.Id,
                           DisplayName = x.a.DisplayName,
                           QRCode=x.a.QRCode
                       }).ToListAsync();
            //4. Select and projection
            var pagedResult = new PagedResult<MaterialGroupViewModel>()
            {
                TotalRecord = totalRow,
                Items = data
            };
            return pagedResult;
        }

        public async Task<int> Update(MaterialGroupUpdateRequest request)
        {
            var materialGroupId = await _context.MaterialGroups.FindAsync(request.Id);
            var materialGroup = await _context.MaterialGroups.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (materialGroup == null) throw new StoreroomException($"Cannot find materialgroup:{request.Id}");
            materialGroup.Id = request.Id;
            materialGroup.DisplayName = request.DisplayName;
            materialGroup.QRCode = request.QRCode;
            return await _context.SaveChangesAsync();
        }
    }
}
