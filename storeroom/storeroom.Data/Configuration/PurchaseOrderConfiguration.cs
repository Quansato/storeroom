using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class PurchaseOrderConfiguration : IEntityTypeConfiguration<PurchaseOrder>
    {
        public void Configure(EntityTypeBuilder<PurchaseOrder> builder)
        {
            builder.ToTable("PurchaseOrders");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.Code).IsRequired().IsUnicode(true).HasMaxLength(50);

            builder.Property(x => x.NameOfOrder).IsRequired().IsUnicode(true).HasMaxLength(200);

            builder.HasOne(x => x.Storeroom).WithMany(y => y.PurchaseOrders).HasForeignKey(y => y.StoreroomId);

            builder.HasOne(x => x.Suplier).WithMany(y => y.PurchaseOrders).HasForeignKey(y => y.SuplierId);

            builder.HasOne(x => x.AppUser).WithMany(y => y.PurchaseOrders).HasForeignKey(y => y.UserId);

        }
    }
}
