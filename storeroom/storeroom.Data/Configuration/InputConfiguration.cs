using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class InputConfiguration : IEntityTypeConfiguration<Input>
    {
        public void Configure(EntityTypeBuilder<Input> builder)
        {
            builder.ToTable("Inputs");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.InputCode).IsRequired().IsUnicode(true).HasMaxLength(50);

            builder.Property(x => x.DeliveryUnit).IsRequired().IsUnicode(true).HasMaxLength(200);

            builder.HasOne(x => x.Storeroom).WithMany(y => y.Inputs).HasForeignKey(y => y.Id);

            builder.Property(x => x.Shipper).IsRequired().IsUnicode(true).HasMaxLength(50);

            builder.Property(x => x.Description).IsUnicode(true).HasMaxLength(200);

        }
    }
}
