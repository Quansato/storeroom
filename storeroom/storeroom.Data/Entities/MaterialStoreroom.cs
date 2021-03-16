using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class MaterialStoreroom
    {
        public Storeroom Storeroom { get; set; }
        public Material Material { get; set; }
        public int StoreroomId { get; set; }
        public int MaterialId { get; set; }
        public int Quantity { get; set; }
        public int QuantityMax { get; set; }
        public int QuantityMin { get; set; }
        public int Compartment { get; set; }
        public int Rack { get; set; }
        public int Row { get; set; }
    }
}
