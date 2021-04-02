using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Users.Dtos
{
    public class LoginRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}
