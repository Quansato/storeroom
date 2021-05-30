using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Dashboard.Dtos
{
    /// <summary>
    /// Số lượng vật tư xuất kho theo tháng
    /// </summary>
    public class QuantityOutput
    {
        public int Month { get; set; }
        public int Quantity { get; set; }
    }
}
