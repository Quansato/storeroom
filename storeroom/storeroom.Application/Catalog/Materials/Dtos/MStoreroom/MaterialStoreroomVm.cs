using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Materials.Dtos.MStoreroom
{
    public class MaterialStoreroomVm
    {
        public int StoreroomId { get; set; }
        public string StoreroomName { get; set; }
        public int MaterialId { get; set; }
        public string MaterialCode { get; set; }
        public string DisplayName { get; set; }
        public string UnitName { get; set; }
        public int Quantity { get; set; }
        public int QuantityMax { get; set; }
        public int QuantityMin { get; set; }
        public int Compartment { get; set; }
        public int Rack { get; set; }
        public int Row{ get; set; }
    }
}
