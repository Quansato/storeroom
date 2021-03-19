using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class TransferConfiguration : IEntityTypeConfiguration<Transfer>
    {
        public void Configure(EntityTypeBuilder<Transfer> builder)
        {
            builder.ToTable("Transfers");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.Receipient).IsRequired().IsUnicode(true).HasMaxLength(200);

            builder.HasOne(x => x.Storeroom).WithMany(y => y.Transfers).HasForeignKey(y => y.StoreroomId);

            builder.HasOne(x => x.Storeroom).WithMany(y => y.Transfers).HasForeignKey(y => y.StoreroomNewId);

            builder.Property(x => x.DateTransfer).IsRequired();

            builder.Property(x => x.Desciption).IsUnicode(true).HasMaxLength(200);

            builder.HasOne(x => x.AppUser).WithMany(y => y.Transfers).HasForeignKey(y => y.UserId);

        }
    }
}
