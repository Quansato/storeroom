using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class MaterialTransfer
    {
        public int TransferId { get; set; }
        public int MaterialId { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }

        public Transfer Transfer { get; set; }
        public Material Material { get; set; }

        //userid
    }
}
