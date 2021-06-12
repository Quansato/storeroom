using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Storerooms.InventoryDtos
{
    public class InventoryCreateRequest
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int StoreroomId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }

        public List<InventoryDetail> InventoryDetails { get; set; }
    }
}
