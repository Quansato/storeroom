using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.PurchaseProposals.Dtos
{
    public class PurchaseProposalCreateRequest
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public int StoreroomId { get; set; }
        public string NameOfOrder { get; set; }
        public DateTime Date { get; set; }
        public int Status { get; set; }
        public int SuplierId { get; set; }
        public int Priority { get; set; }
        public Guid UserId { get; set; }
        public List<MaterialPurchaseProposal> MaterialPurchaseProposal { get; set; }
    }
}
