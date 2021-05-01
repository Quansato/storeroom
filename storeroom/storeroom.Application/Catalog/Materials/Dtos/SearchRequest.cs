using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Materials.Dtos
{
    public class SearchRequest
    {
        public int page { set; get; }
        public int start { set; get; }
        public int limit { set; get; }
        public string keyword { get; set; }
        public int? MaterialGroupId { set; get; }
    }
}
