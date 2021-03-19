using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class AppRoleConfiguration : IEntityTypeConfiguration<AppRole>
    {
        public void Configure(EntityTypeBuilder<AppRole> builder)
        {
            builder.ToTable("AppRoles");

            builder.Property(x => x.Desciption).IsRequired().IsUnicode(true).HasMaxLength(200);

        }
    }
}
