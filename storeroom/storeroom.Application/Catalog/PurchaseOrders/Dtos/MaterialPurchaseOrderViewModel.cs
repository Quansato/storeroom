using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.PurchaseOrders.Dtos
{
    public class MaterialPurchaseOrderViewModel
    {
        public int PurchaseOrderId { get; set; }
        public string Unit { get; set; }
        //public int Unit { get; set; }
        public int MaterialId { get; set; }
        public string MaterialName { get; set; }
        public string MaterialCode { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
    }
}
