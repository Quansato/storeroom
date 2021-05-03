using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Inputs.Dtos
{
    public class InputViewModel
    {
        public int Id { get; set; }
        public string InputCode { get; set; }
        public int StoreroomId { get; set; }
        public string DeliveryUnit { get; set; }
        public string Shipper { get; set; }
        /// <summary>
        /// Ngày giao
        /// </summary>
        public DateTime DateInput { get; set; }
        /// <summary>
        /// Ngày chứng từ
        /// </summary>
        public DateTime? DateStatus { get; set; }
        public DateTime CreationTime { get; set; }
        public string Description { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
    }
}
