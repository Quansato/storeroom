using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class MaterialPurchaseOrder
    {
        public int PurchaseOrderId { get; set; }
        public int MaterialId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }

        public PurchaseOrder PurchaseOrder { get; set; }
        public Material Material { get; set; }
    }
}
