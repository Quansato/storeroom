using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class MaterialOutputConfiguration : IEntityTypeConfiguration<MaterialOutput>
    {
        public void Configure(EntityTypeBuilder<MaterialOutput> builder)
        {
            builder.HasKey(t => new { t.OutputId, t.MaterialId });

            builder.ToTable("MaterialOutputs");

            builder.HasOne(x => x.Output).WithMany(y => y.MaterialOutputs).HasForeignKey(y => y.OutputId);

            builder.HasOne(x => x.Material).WithMany(y => y.MaterialOutputs).HasForeignKey(y => y.MaterialId);

            builder.Property(x => x.Quantity).IsRequired();

            builder.Property(x => x.Price).IsRequired();

            builder.Property(x => x.Description).IsUnicode(true).HasMaxLength(200);

        }
    }
}
