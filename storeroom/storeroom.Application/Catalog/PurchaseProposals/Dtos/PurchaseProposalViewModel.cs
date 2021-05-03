using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.PurchaseProposals.Dtos
{
    public class PurchaseProposalViewModel
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public int StoreroomId { get; set; }
        public string StoreroomName { get; set; }
        public string NameOfOrder { get; set; }
        public DateTime Date { get; set; }
        public int Status { get; set; }
        public string Description { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        /// <summary>
        /// Id người phê duyệt
        /// </summary>
        public Guid? ApproverId { get; set; }
        public string ApproverName { get; set; }
    }
}
