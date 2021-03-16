using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class MaterialGroupConfiguration : IEntityTypeConfiguration<MaterialGroup>
    {
        public void Configure(EntityTypeBuilder<MaterialGroup> builder)
        {
            builder.ToTable("MaterialGroups");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.DisplayName).IsRequired().IsUnicode(true).HasMaxLength(200);

            builder.Property(x => x.QRCode).IsRequired().IsUnicode(true).HasMaxLength(200);
        }
    }
}
