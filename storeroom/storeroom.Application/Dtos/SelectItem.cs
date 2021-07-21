using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Dtos
{
    public class SelectItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool Selected { get; set; }
    }
}
