using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class Transfer
    {
        public int Id { get; set; }
        public string TransferCode { get; set; }
        public string Receipient { get; set; }
        public int StoreroomId { get; set; }
        public int StoreroomNewId { get; set; }
        public DateTime DateTransfer { get; set; }
        public string Desciption { get; set; }
        public DateTime CreationTime { get; set; }
        public Storeroom Storeroom { get; set; }
    }
}
