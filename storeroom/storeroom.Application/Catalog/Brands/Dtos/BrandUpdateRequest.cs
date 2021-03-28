using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Brands.Dtos
{
    public class BrandUpdateRequest
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
    }
}
