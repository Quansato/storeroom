using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class Material
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string MaterialCode { get; set; }
        public int UnitId { get; set; }
        public int UnitOrderId { get; set; }
        public int MaterialGroupId { get; set; }
        public int CountryId { get; set; }
        public int BrandId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public Boolean Status { get; set; }
        public string Img { get; set; }
        public int YearManufacture { get; set; }
        public DateTime ExperyDate { get; set; }
        public string Specification { get; set; }
        public string QRCode { get; set; }
        public string Description { get; set; }

        public List<MaterialInput> MaterialInputs { get; set; }
        public List<MaterialOutput> MaterialOutputs { get; set; }
        public List<MaterialPurchaseOrder> MaterialPurchaseOrders { get; set; }
        public List<MaterialPurchaseProposal> MaterialPurchaseProposals { get; set; }
        public List<MaterialTransfer> MaterialTransfers { get; set; }
        public List<MaterialStoreroom> MaterialStorerooms { get; set; }
        public List<MaterialImage> MaterialImages { get; set; }



        public Unit Unit { get; set; }
        public MaterialGroup MaterialGroup { get; set; }
        public Country Country { get; set; }
        public Brand Brand { get; set; }

    }
}
