using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Outputs.Dtos
{
    public class OutputUpdateRequest
    {
        public int Id { get; set; }
        public string OutputCode { get; set; }
        public int StoreroomId { get; set; }
        public int? StoreroomReceiveId { get; set; }
        public string Recipient { get; set; }
        public string UserRecipient { get; set; }
        public DateTime Date { get; set; }
        public DateTime? DateDocument { get; set; }
        public DateTime CreationTime { get; set; }
        public string Description { get; set; }
        public Guid UserId { get; set; }
        public List<MaterialOutput> MaterialOutput { get; set; }
    }
}
