using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Storerooms.InventoryDtos
{
    public class InventoryDetailViewModel
    {
        public int InventoryId { get; set; }
        public int MaterialId { get; set; }
        public int QuantityLT { get; set; }
        public int QuantityTT { get; set; }
        public string MaterialName { get; set; }
        public string MaterialCode { get; set; }
        public string UnitName { get; set; }
        public string Description { get; set; }
    }
}
