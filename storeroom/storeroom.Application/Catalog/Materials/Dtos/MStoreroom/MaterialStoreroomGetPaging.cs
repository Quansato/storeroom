using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Materials.Dtos.MStoreroom
{
    public class MaterialStoreroomGetPaging
    {
        public int page { set; get; }
        public int start { set; get; }
        public int limit { set; get; }
        public string keyword { get; set; }
        public int? StoreroomId { get; set; }
        public int? MaterialId { get; set; }
        public string MaterialCode { get; set; }
        public string DisplayName { get; set; }
        public string StoreroomName { get; set; }
        public int? MaterialGroupId { get; set; }
        public int? Quantity { get; set; }
    }
}
