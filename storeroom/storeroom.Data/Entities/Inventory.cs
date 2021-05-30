using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class Inventory
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int StoreroomId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }

        public List<InventoryDetail> InventoryDetails { get; set; }
        public Storeroom Storeroom { get; set; }
    }
}
