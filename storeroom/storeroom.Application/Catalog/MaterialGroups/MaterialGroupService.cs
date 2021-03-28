using storeroom.Application.Catalog.MaterialGroups.Dtos;
using storeroom.Application.Dtos;
using storeroom.Data.EF;
using storeroom.Data.Entities;
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
            var materialGroup = _context.MaterialGroups.FindAsync(MaterialGroupId);
            if (materialGroup == null) throw new StoreroomException($"Cannot find materialgroup : {MaterialGroupId}");
            _context.MaterialGroups.Remove(materialGroup);
            return await _context.SaveChangesAsync();
        }

        public async Task<PagedResult<MaterialGroupViewModel>> GetAllPaging(GetMaterialGroupPagingRequest request)
        {
            throw new NotImplementedException();
        }

        public async Task<int> Update(MaterialGroupUpdateRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
