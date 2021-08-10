using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Dashboard.Dtos
{
    public class DashboardVm
    {
        public int TotalMaterial { get; set; }
        public int Employee { get; set; }
        public List<MaterialVm> Materials { get; set; }
        public List<PurchaseOrderVm> PurchaseOrders { get; set; }
        public decimal TotalReveneuOutput { get; set; }
        public MaterialStatus MaterialStatus { get; set; }
        public int[] Input { get; set; }
        public int[] Output { get; set; }
    }
}
