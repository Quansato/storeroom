using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class MaterialConfiguration : IEntityTypeConfiguration<Material>
    {
        public void Configure(EntityTypeBuilder<Material> builder)
        {
            builder.ToTable("Materials");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.DisplayName).IsRequired().IsUnicode(true).HasMaxLength(200);

            builder.Property(x => x.MaterialCode).IsRequired().IsUnicode(true).HasMaxLength(50);

            builder.Property(x => x.Quantity).IsRequired().HasDefaultValue(0);

            builder.Property(x => x.Price).IsRequired().HasDefaultValue(0);

            builder.Property(x => x.Status).IsRequired().HasDefaultValue(true);

            builder.Property(x => x.YearManufacture).IsRequired();

            builder.Property(x => x.ExperyDate).IsRequired();

            builder.Property(x => x.QRCode).IsRequired();

            builder.HasOne(x => x.Unit).WithMany(y => y.Materials).HasForeignKey(y => y.UnitId);

            builder.HasOne(x => x.Unit).WithMany(y => y.Materials).HasForeignKey(y => y.UnitOrderId);

            builder.HasOne(x => x.MaterialGroup).WithMany(y => y.Materials).HasForeignKey(y => y.MaterialGroupId);

            builder.HasOne(x => x.Country).WithMany(y => y.Materials).HasForeignKey(y => y.CountryId);

            builder.HasOne(x => x.Brand).WithMany(y => y.Materials).HasForeignKey(y => y.BrandId);

        }
    }
}
