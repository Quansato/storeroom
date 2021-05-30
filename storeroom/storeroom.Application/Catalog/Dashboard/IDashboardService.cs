using storeroom.Application.Catalog.Dashboard.Dtos;
using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Dashboard
{
    public interface IDashboardService
    {
        public Task<DashboardVm> GetDataDashboard();
    }
}
