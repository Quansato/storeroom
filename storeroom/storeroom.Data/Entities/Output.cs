using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class Output
    {
        public int Id { get; set; }
        public string OutputCode { get; set; }
        public string Recipient { get; set; }
        public int StoreroomId { get; set; }
        public int? StoreroomReceiveId { get; set; }
        public string NameRecipient { get; set; }
        public DateTime DateOutput { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? DateDocument { get; set; } 
        public string Description { get; set; }
        public Guid UserId { get; set; }

        public AppUser AppUser { get; set; }
        public List<MaterialOutput> MaterialOutputs { get; set; }

        public Storeroom Storeroom { get; set; }
        //user
    }
}
