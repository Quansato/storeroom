using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Users.Dtos
{
    public class GetUserPagingRequest:PagingRequestBase
    {
        public string keyword { get; set; }

    }
}
