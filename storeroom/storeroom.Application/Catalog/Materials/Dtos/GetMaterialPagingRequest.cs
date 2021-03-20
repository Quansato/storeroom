using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Materials.Dtos
{
    public class GetMaterialPagingRequest: PagingRequestBase
    {
        public int page { set; get; }
        public int start { set; get; }
        public int limit { set; get; }
        public string keyword { get; set; }
    }
}
