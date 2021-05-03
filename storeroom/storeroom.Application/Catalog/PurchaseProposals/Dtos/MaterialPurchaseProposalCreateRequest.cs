using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.PurchaseProposals.Dtos
{
    public class MaterialPurchaseProposalCreateRequest
    {
        public int PurchaseProposalId { get; set; }
        public int Unit { get; set; }
        public int MaterialId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
    }
}
