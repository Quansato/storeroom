using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Brands.Dtos
{
    public class GetBrandPagingRequest: PagingRequestBase
    {
        public int page { set; get; }
        public int start { set; get; }
        public int limit { set; get; }
        public string keyword { get; set; }
    }
}
