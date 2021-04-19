﻿using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Users.Dtos
{
    public class UserViewModel
    {
        public Guid UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
