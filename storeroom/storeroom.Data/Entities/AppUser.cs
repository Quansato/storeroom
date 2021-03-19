using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class AppUser:IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Avatar { get; set; }
        public DateTime Dob { get; set; }
        public List<Storeroom> Storerooms { get; set; }
        public List<Transfer> Transfers { get; set; }
        public List<Input> Inputs { get; set; }
        public List<Output> Outputs { get; set; }
        public List<PurchaseOrder> PurchaseOrders { get; set; }
        public List<PurchaseProposal> PurchaseProposals { get; set; }

    }
}
