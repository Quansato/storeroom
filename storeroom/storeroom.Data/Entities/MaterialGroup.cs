using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class MaterialGroup
    {
        public int Id { get; set; }
        public string DisplayName  { get; set; }
        public string QRCode  { get; set; }
        public List<Material> Materials { get; set; }
    }
}
