using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class Input
    {
        public int Id { get; set; }
        public string InputCode { get; set; }
        public string DeliveryUnit { get; set; }
        public int StoreroomId { get; set; }
        public string Shipper { get; set; }
        public DateTime DateInput { get; set; }
        public DateTime CreationTime { get; set; }
        public string Description { get; set; }
        public Guid UserId { get; set; }

        public AppUser AppUser { get; set; }
        public List<MaterialInput> MaterialInputs { get; set; }
        public Storeroom Storeroom { get; set; }
        //user
    }
}
