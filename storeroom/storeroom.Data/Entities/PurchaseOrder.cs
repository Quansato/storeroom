using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class PurchaseOrder
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public int StoreroomId { get; set; }
        public string NameOfOrder { get; set; }
        public DateTime Date { get; set; }
        public int Status { get; set; }
        public int SuplierId { get; set; }
        public int Priority { get; set; }

        public List<MaterialPurchaseOrder> MaterialPurchaseOrders { get; set; }

        public Storeroom Storeroom { get; set; }
        public Suplier Suplier { get; set; }
        //user
    }
}
