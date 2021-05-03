using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Inputs.Dtos
{
    public class MaterialInputCreateRequest
    {
        public int InputId { get; set; }
        public int MaterialId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
    }
}
