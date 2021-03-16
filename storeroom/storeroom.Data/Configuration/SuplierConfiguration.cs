using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class SuplierConfiguration : IEntityTypeConfiguration<Suplier>
    {
        public void Configure(EntityTypeBuilder<Suplier> builder)
        {
            builder.ToTable("Supliers");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.DisplayName).IsRequired().IsUnicode(true).HasMaxLength(50);

            builder.Property(x => x.Phone).IsRequired().IsUnicode(true).HasMaxLength(50);

            builder.Property(x => x.Email).IsRequired().IsUnicode(true).HasMaxLength(50);

            builder.Property(x => x.ContractDate).IsRequired();

            builder.Property(x => x.Address).IsRequired().IsUnicode(true).HasMaxLength(200);

            builder.Property(x => x.MoreInfo).IsUnicode(true).HasMaxLength(200);

        }
    }
}
