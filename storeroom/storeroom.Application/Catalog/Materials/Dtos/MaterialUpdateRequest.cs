using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Materials
{
    public class MaterialUpdateRequest
    {
        public int Id { get; set; }
        public string MaterialCode { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int YearManufacture { get; set; }
        public int? UnitId { get; set; }
        public int? UnitOrderId { get; set; }
        public int? CountryId { get; set; }
        public int? BrandId { get; set; }
        public DateTime? ExperyDate { get; set; }
        public bool Status { get; set; }
        public string Img { get; set; }
        public string Specification { get; set; }
        public string QRCode { get; set; }
    }
}
