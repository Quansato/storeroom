using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class MaterialOutput
    {
        public int OutputId { get; set; }
        public int MaterialId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }

        public Output Output { get; set; }
        public Material Material { get; set; }
    }
}
