using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class MaterialPurchaseProposal
    {
        public int PurchaseProposalId { get; set; }
        public int MaterialId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }

        public PurchaseProposal PurchaseProposal { get; set; }
        public Material Material { get; set; }
    }
}
