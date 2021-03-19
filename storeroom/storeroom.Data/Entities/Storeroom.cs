using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class Storeroom
    {
        public int Id { get; set; }
        public string StoreroomCode { get; set; }
        public string DisplayName { get; set; }
        public decimal Area { get; set; }
        public string Address { get; set; }
        public bool Status { get; set; }
        public Guid UserId { get; set; }

        public AppUser AppUser { get; set; }
        public List<Transfer> Transfers { get; set; }
        public List<Input> Inputs { get; set; }
        public List<Output> Outputs { get; set; }
        public List<PurchaseOrder> PurchaseOrders { get; set; }
        public List<PurchaseProposal> PurchaseProposals { get; set; }
        public List<MaterialStoreroom> MaterialStorerooms { get; set; }


        //iduser
    }
}
