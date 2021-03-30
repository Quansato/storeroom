using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Storerooms.Dtos
{
    public class StoreroomUpdateRequest
    {
        public int Id { get; set; }
        public string StoreroomCode { get; set; }
        public string DisplayName { get; set; }
        public decimal Area { get; set; }
        public string Address { get; set; }
        public bool Status { get; set; }
        public Guid UserId { get; set; }
    }
}
