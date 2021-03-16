using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class Suplier
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string MoreInfo { get; set; }
        public DateTime ContractDate { get; set; }
        public List<PurchaseOrder> PurchaseOrders { get; set; }
    }
}
