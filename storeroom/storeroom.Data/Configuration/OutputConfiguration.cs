using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class OutputConfiguration : IEntityTypeConfiguration<Output>
    {
        public void Configure(EntityTypeBuilder<Output> builder)
        {
            builder.ToTable("Outputs");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.OutputCode).IsRequired().IsUnicode(true).HasMaxLength(50);

            //builder.Property(x => x.Recipient).IsRequired().IsUnicode(true).HasMaxLength(200);

            builder.HasOne(x => x.Storeroom).WithMany(y => y.Outputs).HasForeignKey(y => y.StoreroomId);

            builder.HasOne(x => x.Storeroom).WithMany(y => y.Outputs).HasForeignKey(y => y.StoreroomReceiveId);

            builder.Property(x => x.NameRecipient).IsRequired().IsUnicode(true).HasMaxLength(50);

            builder.Property(x => x.Description).IsUnicode(true).HasMaxLength(200);

            builder.HasOne(x => x.AppUser).WithMany(y => y.Outputs).HasForeignKey(y => y.UserId);

        }
    }
}
