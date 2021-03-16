using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class MaterialInputConfiguration : IEntityTypeConfiguration<MaterialInput>
    {
        public void Configure(EntityTypeBuilder<MaterialInput> builder)
        {
            builder.HasKey(t => new { t.InputId, t.MaterialId });

            builder.ToTable("MaterialInputs");

            builder.HasOne(x => x.Input).WithMany(y => y.MaterialInputs).HasForeignKey(y => y.InputId);

            builder.HasOne(x => x.Material).WithMany(y => y.MaterialInputs).HasForeignKey(y => y.MaterialId);

            builder.Property(x => x.Quantity).IsRequired();

            builder.Property(x => x.Price).IsRequired();

            builder.Property(x => x.Description).IsUnicode(true).HasMaxLength(200);


        }
    }
}
