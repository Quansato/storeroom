using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class InventoryDetailConfiguration : IEntityTypeConfiguration<InventoryDetail>
    {
        public void Configure(EntityTypeBuilder<InventoryDetail> builder)
        {
            builder.HasKey(t => new { t.InventoryId, t.MaterialId });

            builder.ToTable("InventoryDetail");

            builder.HasOne(x => x.Inventory).WithMany(y => y.InventoryDetails).HasForeignKey(y => y.InventoryId);

            builder.HasOne(x => x.Material).WithMany(y => y.InventoryDetails).HasForeignKey(y => y.MaterialId);

            builder.Property(x => x.Description).IsUnicode(true).HasMaxLength(200);
        }
    }
}
