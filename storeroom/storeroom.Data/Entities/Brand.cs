﻿using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class Brand
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }

        public List<Material> Materials { get; set; }
    }
}
