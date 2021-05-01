using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Countries.Dtos
{
    public class CountryUpdateRequest
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
    }
}
