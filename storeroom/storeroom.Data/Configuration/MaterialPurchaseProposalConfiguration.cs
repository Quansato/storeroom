using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Configuration
{
    public class MaterialPurchaseProposalConfiguration : IEntityTypeConfiguration<MaterialPurchaseProposal>
    {
        public void Configure(EntityTypeBuilder<MaterialPurchaseProposal> builder)
        {
            builder.HasKey(t => new { t.PurchaseProposal, t.MaterialId });

            builder.ToTable("MaterialPurchaseProposals");

            builder.HasOne(x => x.PurchaseProposal).WithMany(y => y.MaterialPurchaseProposals).HasForeignKey(y => y.PurchaseProposalId);

            builder.HasOne(x => x.Material).WithMany(y => y.MaterialPurchaseProposals).HasForeignKey(y => y.MaterialId);

            builder.Property(x => x.Quantity).IsRequired();

            builder.Property(x => x.Price).IsRequired();

            builder.Property(x => x.Description).IsUnicode(true).HasMaxLength(200);
        }
    }
}
