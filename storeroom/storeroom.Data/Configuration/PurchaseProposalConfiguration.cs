using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class PurchaseProposalConfiguration : IEntityTypeConfiguration<PurchaseProposal>
    {
        public void Configure(EntityTypeBuilder<PurchaseProposal> builder)
        {
            builder.ToTable("PurchaseProposals");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.Code).IsRequired().IsUnicode(true).HasMaxLength(50);

            builder.Property(x => x.Name).IsRequired().IsUnicode(true).HasMaxLength(200);

            builder.HasOne(x => x.Storeroom).WithMany(y => y.PurchaseProposals).HasForeignKey(y => y.StoreroomId);

            builder.Property(x => x.Description).IsUnicode(true).HasMaxLength(200);

            builder.Property(x => x.Status).HasDefaultValue(0);

            builder.HasOne(x => x.AppUser).WithMany(y => y.PurchaseProposals).HasForeignKey(y => y.UserId);

            builder.HasOne(x => x.AppUser).WithMany(y => y.PurchaseProposals).HasForeignKey(y => y.ApproverId);

        }
    }
}
