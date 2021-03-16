using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class StoreroomConfiguration : IEntityTypeConfiguration<Storeroom>
    {
        public void Configure(EntityTypeBuilder<Storeroom> builder)
        {
            builder.ToTable("Storerooms");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.DisplayName).IsRequired().IsUnicode(true).HasMaxLength(50);

            builder.Property(x => x.Area).IsRequired();

            builder.Property(x => x.Address).IsRequired().IsUnicode(true).HasMaxLength(200);
        }
    }
}
