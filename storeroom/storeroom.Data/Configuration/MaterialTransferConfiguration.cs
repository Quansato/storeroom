using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class MaterialTransferConfiguration : IEntityTypeConfiguration<MaterialTransfer>
    {
        public void Configure(EntityTypeBuilder<MaterialTransfer> builder)
        {
            builder.HasKey(t => new { t.TransferId, t.MaterialId });

            builder.ToTable("MaterialTransfers");

            builder.HasOne(x => x.Transfer).WithMany(y => y.MaterialTransfers).HasForeignKey(y => y.TransferId);

            builder.HasOne(x => x.Material).WithMany(y => y.MaterialTransfers).HasForeignKey(y => y.MaterialId);

            builder.Property(x => x.Quantity).IsRequired();

            builder.Property(x => x.Description).IsUnicode(true).HasMaxLength(200);
        }
    }
}
