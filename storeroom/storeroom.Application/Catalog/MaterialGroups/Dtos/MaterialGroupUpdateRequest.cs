using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.MaterialGroups.Dtos
{
    public class MaterialGroupUpdateRequest
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string QRCode { get; set; }
    }
}
