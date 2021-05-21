using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using storeroom.Application.Catalog.Brands;
using storeroom.Application.Catalog.Countries;
using storeroom.Application.Catalog.Inputs;
using storeroom.Application.Catalog.MaterialGroups;
using storeroom.Application.Catalog.Materials;
using storeroom.Application.Catalog.Outputs;
using storeroom.Application.Catalog.PurchaseOrders;
using storeroom.Application.Catalog.PurchaseProposals;
using storeroom.Application.Catalog.Storerooms;
using storeroom.Application.Catalog.Users;
using storeroom.Application.Catalog.Users.Dtos;
using storeroom.Application.Dtos;
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
                /*.AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;

            });*/
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Storeroom.WebApp", Version = "v1" });
            });
            services.AddSession(option =>
            {
                option.IdleTimeout = TimeSpan.FromMinutes(100);
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
            services.AddTransient<IUserApiClient, UserApiClient>();
            //services.AddTransient<IUserService,UserService>();
            services.AddTransient<ICountryService, CountryService>();
            services.AddTransient<IPurchaseOrderService, PurchaseOrderService>();
            services.AddTransient<IOutputService, OutputService>();
            services.AddTransient<IInputService, InputService>();
            services.AddTransient<IPurchaseProposalService, PurchaseProposalService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Storeroom.WebApp v1"));
                app.UseDeveloperExceptionPage();
            }
            app.UseExceptionHandler(c => c.Run(async context =>
            {
                var exception = context.Features
                    .Get<IExceptionHandlerPathFeature>()
                    .Error;

                if (exception is StoreroomException)
                {
                    var responseBadRequest = new
                    {
                        devMsg = exception.Message,
                        userMsg = exception.Message,
                        errorCode = "misa-400",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await context.Response.WriteAsJsonAsync(responseBadRequest);
                }

                var response = new
                {
                    devMsg = exception.Message,
                    userMsg = "Có lỗi xảy ra, vui lòng liên hệ MISA để được trợ giúp!",
                    errorCode = "misa-005",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };

                await context.Response.WriteAsJsonAsync(response);
            }));
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
