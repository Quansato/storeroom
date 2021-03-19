using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder.ToTable("AppUsers");

            builder.Property(x => x.FirstName).IsRequired().IsUnicode(true).HasMaxLength(50);

            builder.Property(x => x.LastName).IsRequired().IsUnicode(true).HasMaxLength(50);

            builder.Property(x => x.Dob).IsRequired();
        }
    }
}
