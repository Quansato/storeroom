using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Outputs.Dtos
{
    public class MaterialOutputCreateRequest
    {
        public int OutputId { get; set; }
        public int MaterialId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
    }
}
