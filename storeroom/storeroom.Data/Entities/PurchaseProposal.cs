using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class PurchaseProposal
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int StoreroomId { get; set; }
        public DateTime Date { get; set; }
        public int Status { get; set; }
        public string Description { get; set; }
        public DateTime CreationTime { get; set; }

        public List<MaterialPurchaseProposal> MaterialPurchaseProposals { get; set; }

        public Storeroom Storeroom { get; set; }
        //2user
    }
}
