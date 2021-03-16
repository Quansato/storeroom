using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class Country
    {
        public int Id { set; get; }
        public string DisplayName { set; get; }
        public List<Material> Materials { get; set; }
    }
}
