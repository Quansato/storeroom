using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class MaterialPurchaseOrderConfiguration : IEntityTypeConfiguration<MaterialPurchaseOrder>
    {
        public void Configure(EntityTypeBuilder<MaterialPurchaseOrder> builder)
        {
            builder.HasKey(t => new { t.PurchaseOrder, t.MaterialId });

            builder.ToTable("MaterialPurchaseOrders");

            builder.HasOne(x => x.PurchaseOrder).WithMany(y => y.MaterialPurchaseOrders).HasForeignKey(y => y.PurchaseOrderId);

            builder.HasOne(x => x.Material).WithMany(y => y.MaterialPurchaseOrders).HasForeignKey(y => y.MaterialId);

            builder.Property(x => x.Quantity).IsRequired();

            builder.Property(x => x.Price).IsRequired();

            builder.Property(x => x.Description).IsUnicode(true).HasMaxLength(200);

        }
    }
}
