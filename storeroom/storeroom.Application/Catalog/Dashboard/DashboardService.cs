using storeroom.Application.Catalog.Dashboard.Dtos;
using storeroom.Application.Catalog.Materials.Dtos;
using storeroom.Application.Catalog.PurchaseOrders.Dtos;
using storeroom.Application.Dtos;
using storeroom.Data.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
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
                Id = x.Id,
                MaterialCode = x.MaterialCode,
                Quantity = 0
            }).ToList();
            var storeroom = _context.Storerooms.Select(x => x.Id).ToList();
            foreach (var item in storeroom)
            {
                foreach (var vt in materials.Select((value, i) => (value, i)))
                {
                    var isExist = _context.MaterialStorerooms.FirstOrDefault(x => x.StoreroomId == item && x.MaterialId == vt.value.Id);
                    if (isExist != null)
                    {
                        var dataVT = (from a in _context.MaterialStorerooms
                                      join b in _context.Materials on a.MaterialId equals b.Id
                                      select new { a, b })
                                    .Where(x => x.a.StoreroomId == item && x.b.MaterialCode == vt.value.MaterialCode)
                                    .Select(x => x.a.Quantity).ToList();
                        materials[vt.i].Quantity += dataVT[0];
                        data.TotalMaterial += dataVT[0];
                    }
                }
            }

            var dataPO = (from a in _context.PurchaseOrders
                          join b in _context.Storerooms on a.StoreroomId equals b.Id
                          join c in _context.Supliers on a.SuplierId equals c.Id
                          join d in _context.Users on a.UserId equals d.Id
                          select new { a, b, c, d })
                                    .Select(x => new PurchaseOrderVm()
                                    {
                                        Id = x.a.Id,
                                        Code = x.a.Code,
                                        NameOfOrder = x.a.NameOfOrder,
                                        Date = x.a.Date,
                                        Status = x.a.Status,
                                        StoreroomId = x.a.StoreroomId,
                                        StoreroomName = x.b.DisplayName,
                                        SuplierId = x.c.Id,
                                        SuplierName = x.c.DisplayName,
                                        Priority = x.a.Priority,
                                        UserId = x.a.UserId,
                                        UserName = x.d.FirstName + ' ' + x.d.LastName
                                    }).ToList();

            var dataOutput = (from a in _context.MaterialOutputs
                              join b in _context.Materials on a.MaterialId equals b.Id
                              join c in _context.Units on b.UnitId equals c.Id
                              join d in _context.Outputs on a.OutputId equals d.Id
                              select new { a, b, c, d }).Where(x => x.d.DateOutput.Year == DateTime.Now.Year)
                            .Select(x => x.a.Quantity * x.b.Price);
            foreach (var dO in dataOutput)
            {
                data.TotalReveneuOutput += dO;
            }
            var dataInput = (from a in _context.MaterialInputs
                             join b in _context.Materials on a.MaterialId equals b.Id
                             join c in _context.Units on b.UnitId equals c.Id
                             join d in _context.Inputs on a.InputId equals d.Id
                             select new { a, b, c, d }).Where(x => x.d.DateInput.Year == DateTime.Now.Year)
                            .Select(x => new
                            {
                                Quantity = x.a.Quantity,
                                Date = x.d.DateInput
                            });
            data.Input = new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
            data.Output = new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
            foreach (var dO in dataInput)
            {
                data.Input[Convert.ToInt32(dO.Date.Month)] += dO.Quantity;
            }
            var dataOutput2 = (from a in _context.MaterialOutputs
                               join b in _context.Materials on a.MaterialId equals b.Id
                               join c in _context.Units on b.UnitId equals c.Id
                               join d in _context.Outputs on a.OutputId equals d.Id
                               select new { a, b, c, d }).Where(x => x.d.DateOutput.Year == DateTime.Now.Year)
                            .Select(x => new
                            {
                                Quantity = x.a.Quantity,
                                Date = x.d.DateOutput
                            });
            foreach (var dO in dataOutput2)

            {
                data.Output[Convert.ToInt32(dO.Date.Month) - 1] += dO.Quantity;
            }
            data.PurchaseOrders = dataPO;
            data.Materials = materials;
            return data;
        }
    }
}
