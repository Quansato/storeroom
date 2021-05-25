using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Inputs.Dtos
{
    public class InputSearchRequest
    {
        public int page { set; get; }
        public int start { set; get; }
        public int limit { set; get; }
        public int? StoreroomId { set; get; }
        public string InputCode { get; set; }
        /// <summary>
        /// Tìm theo ngày chứng từ hoặc ngày nhập kho
        /// </summary>
        public int? Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? Date { get; set; }
    }
}
