using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class InventoryDetail
    {
        public Material Material { get; set; }
        public Inventory Inventory { get; set; }
        public int InventoryId { get; set; }
        public int MaterialId { get; set; }
        public int QuantityLT { get; set; }
        public int QuantityTT { get; set; }
        public string Description { get; set; }
    }
}
