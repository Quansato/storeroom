using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class MaterialInput
    {
        public int InputId { get; set; }
        public int MaterialId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }

        public Input Input { get; set; }
        public Material Material { get; set; }

    }
}
