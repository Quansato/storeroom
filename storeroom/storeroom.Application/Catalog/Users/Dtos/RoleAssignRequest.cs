using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Users.Dtos
{
    public class RoleAssignRequest
    {
        public Guid Id { get; set; }
        public List<SelectItem> Roles { get; set; }
    }
}
