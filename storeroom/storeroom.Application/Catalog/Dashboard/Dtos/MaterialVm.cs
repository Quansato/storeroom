using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Dashboard.Dtos
{
    public class MaterialVm
    {
        public int Id { get; set; }
        public string MaterialCode { get; set; }
        public int Quantity { get; set; }
    }
}
