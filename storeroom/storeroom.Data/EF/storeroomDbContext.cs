using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using storeroom.Data.Configuration;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.EF
{
    public class storeroomDbContext : IdentityDbContext<AppUser,AppRole,Guid>
    {
        public storeroomDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new BrandConfiguration());
            modelBuilder.ApplyConfiguration(new CountryConfiguration());
            modelBuilder.ApplyConfiguration(new InputConfiguration());
            modelBuilder.ApplyConfiguration(new MaterialConfiguration());
            modelBuilder.ApplyConfiguration(new MaterialGroupConfiguration());
            modelBuilder.ApplyConfiguration(new MaterialInputConfiguration());
            modelBuilder.ApplyConfiguration(new MaterialOutputConfiguration());
            modelBuilder.ApplyConfiguration(new MaterialPurchaseOrderConfiguration());
            modelBuilder.ApplyConfiguration(new MaterialPurchaseProposalConfiguration());
            modelBuilder.ApplyConfiguration(new MaterialStoreroomConfiguration());
            modelBuilder.ApplyConfiguration(new MaterialTransferConfiguration());
            modelBuilder.ApplyConfiguration(new OutputConfiguration());
            modelBuilder.ApplyConfiguration(new PurchaseOrderConfiguration());
            modelBuilder.ApplyConfiguration(new PurchaseProposalConfiguration());
            modelBuilder.ApplyConfiguration(new StoreroomConfiguration());
            modelBuilder.ApplyConfiguration(new SuplierConfiguration());
            modelBuilder.ApplyConfiguration(new TransferConfiguration());
            modelBuilder.ApplyConfiguration(new UnitConfiguration());
            modelBuilder.ApplyConfiguration(new AppUserConfiguration());
            modelBuilder.ApplyConfiguration(new AppRoleConfiguration());
            modelBuilder.ApplyConfiguration(new MaterialImageConfiguration());
            modelBuilder.Entity<IdentityUserClaim<Guid>>().ToTable("AppUserClaims");
            modelBuilder.Entity<IdentityUserRole<Guid>>().ToTable("AppUserRoles").HasKey(x => new { x.UserId, x.RoleId });
            modelBuilder.Entity<IdentityUserLogin<Guid>>().ToTable("AppUserLogins").HasKey(x => x.UserId);
            modelBuilder.Entity<IdentityRoleClaim<Guid>>().ToTable("AppRoleClaims");
            modelBuilder.Entity<IdentityUserToken<Guid>>().ToTable("AppUserToken").HasKey(x => x.UserId);
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
        public DbSet<MaterialImage> MaterialImages { get; set; }
    }
}
