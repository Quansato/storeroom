using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using storeroom.Application.Catalog.Brands;
using storeroom.Application.Catalog.Countries;
using storeroom.Application.Catalog.MaterialGroups;
using storeroom.Application.Catalog.Materials;
using storeroom.Application.Catalog.PurchaseOrders;
using storeroom.Application.Catalog.Storerooms;
using storeroom.Application.Catalog.Users;
using storeroom.Application.Catalog.Users.Dtos;
using storeroom.Data.EF;
using storeroom.Data.Entities;
using storeroom.WebApp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace storeroom.WebApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddHttpClient();
            services.AddControllersWithViews().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<LoginRequestValidator>());
            services.AddSession(option=> {
                option.IdleTimeout = TimeSpan.FromMinutes(30);
            });
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.LoginPath = "/Login/Login/";
                    options.AccessDeniedPath = "/User/Forbidden/";
                    //options.Cookie.IsEssential = true;
                    //options.Cookie.Name = "Microsoft.Authentication";
                    //options.ReturnUrlParameter = CookieAuthenticationDefaults.ReturnUrlParameter;
                    //options.SlidingExpiration = true;

                });
            //services.AddAuthorization(options=>
            //{
            //    options.AddPolicy("UserPolicy", policyBuilder =>
            //    {
            //        policyBuilder.RequireUserName(ClaimTypes.Name);
            //    });
            //});
            services.AddDbContext<storeroomDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("storeroomDBTest")));
            //services.AddIdentity<AppUser, AppRole>()
            //    .AddEntityFrameworkStores<storeroomDbContext>()
            //    .AddDefaultTokenProviders();
            services.AddTransient<IMaterialService, MaterialService>();
            services.AddTransient<IBrandService, BrandService>();
            services.AddTransient<IMaterialGroupService, MaterialGroupService>();
            services.AddTransient<IStoreroomService, StoreroomService>();
            //services.AddTransient<IUserService, UserService>();
            //services.AddTransient<UserManager<AppUser>, UserManager<AppUser>>();
            //services.AddTransient<SignInManager<AppUser>, SignInManager<AppUser>>();
            //services.AddTransient<RoleManager<AppRole>, RoleManager<AppRole>>();
            services.AddTransient<IUserApiClient,UserApiClient>();
            services.AddTransient<ICountryService, CountryService>();
            services.AddTransient<IPurchaseOrderService, PurchaseOrderService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseSession();

            app.UseCookiePolicy();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
