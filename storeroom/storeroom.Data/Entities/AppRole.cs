using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class AppRole:IdentityRole<Guid>
    {
        public string Desciption { get; set; }
    }
}
