using Microsoft.EntityFrameworkCore;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class MaterialImageConfiguration : IEntityTypeConfiguration<MaterialImage>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<MaterialImage> builder)
        {
            builder.ToTable("MaterialImages");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.ImgPath).IsRequired().HasMaxLength(200);

            builder.HasOne(x => x.Material).WithMany(y => y.MaterialImages).HasForeignKey(y => y.MaterialId);
        }
    }
}
