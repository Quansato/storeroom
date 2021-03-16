using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class MaterialStoreroomConfiguration : IEntityTypeConfiguration<MaterialStoreroom>
    {
        public void Configure(EntityTypeBuilder<MaterialStoreroom> builder)
        {
            builder.HasKey(t => new { t.StoreroomId, t.MaterialId });

            builder.ToTable("MaterialStorerooms");

            builder.HasOne(x => x.Storeroom).WithMany(y => y.MaterialStorerooms).HasForeignKey(y => y.StoreroomId);

            builder.HasOne(x => x.Material).WithMany(y => y.MaterialStorerooms).HasForeignKey(y => y.MaterialId);

            builder.Property(x => x.Quantity).IsRequired();

        }
    }
}
