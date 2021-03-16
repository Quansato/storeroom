using Microsoft.EntityFrameworkCore;
using storeroom.Data.Configuration;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.EF
{
    public class storeroomDbContext : DbContext
    {
        public storeroomDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new BrandConfiguration());
            modelBuilder.ApplyConfiguration(new CountryConfiguration());
            /*base.OnModelCreating(modelBuilder);*/
        }

        public DbSet<Brand> Brands { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<MaterialGroup> MaterialGroups { get; set; }
        public DbSet<Suplier> Supliers { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<Storeroom> Storerooms { get; set; }
        public DbSet<MaterialStoreroom> MaterialStorerooms { get; set; }
        public DbSet<Transfer> Transfers { get; set; }
        public DbSet<MaterialTransfer> MaterialTransfers { get; set; }
        public DbSet<Input> Inputs { get; set; }
        public DbSet<MaterialInput> MaterialInputs { get; set; }
        public DbSet<Output> Outputs { get; set; }
        public DbSet<MaterialOutput> MaterialOutputs { get; set; }
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }
        public DbSet<MaterialPurchaseOrder> MaterialPurchaseOrders { get; set; }
        public DbSet<PurchaseProposal> PurchaseProposals { get; set; }
        public DbSet<MaterialPurchaseProposal> MaterialPurchaseProposals { get; set; }
    }
}
