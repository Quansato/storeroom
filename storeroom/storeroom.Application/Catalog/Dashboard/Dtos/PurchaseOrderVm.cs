using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Dashboard.Dtos
{
    public class PurchaseOrderVm
    {
        public int PurchaseOrderId { get; set; }
        public DateTime Date { get; set; }
        public string Code { get; set; }
        public int Status { get; set; }
    }
}
