using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Storerooms.Dtos
{
    public class StoreroomViewModel
    {
        public int Id { get; set; }
        public string StoreroomCode { get; set; }
        public string DisplayName { get; set; }
        public decimal Area { get; set; }
        public string Address { get; set; }
        public bool Status { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
    }
}
