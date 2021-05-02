using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Outputs.Dtos
{
    public class OutputSearchRequest
    {
        public int page { set; get; }
        public int start { set; get; }
        public int limit { set; get; }
        public int? StoreroomId { set; get; }
        public string Code { get; set; }
        public int? Status { get; set; }
        public DateTime? Date { get; set; }
    }
}
