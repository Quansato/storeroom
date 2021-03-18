using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace storeroom.Data.EF
{
    public class storeroomDbContextFactory : IDesignTimeDbContextFactory<storeroomDbContext>
    {
        public storeroomDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("storeroomDBTest");
            var optionsBuilder = new DbContextOptionsBuilder<storeroomDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new storeroomDbContext(optionsBuilder.Options);
        }
    }
}
