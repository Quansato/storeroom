using storeroom.Application.Catalog.Dashboard.Dtos;
using storeroom.Application.Catalog.Materials.Dtos;
using storeroom.Application.Dtos;
using storeroom.Data.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Dashboard
{
    public class DashboardService : IDashboardService
    {
        private storeroomDbContext _context;
        public DashboardService(storeroomDbContext context)
        {
            _context = context;
        }
        public async Task<DashboardVm> GetDataDashboard()
        {
            var data = new DashboardVm();
            //
            var materials = _context.Materials.Select(x => new MaterialVm()
            {
                MaterialCode = x.MaterialCode,
                Quantity=0
            }).ToList();
            data.Materials = materials;
            return data;
        }
    }
}
