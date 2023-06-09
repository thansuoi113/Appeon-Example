using System;
using System.IO.Compression;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SnapObjects.Data;
using SnapObjects.Data.SqlServer;
using SnapObjects.Data.AspNetCore;
using Appeon.DataStoreDemo.Service.Datacontext;
using Appeon.DataStoreDemo.Services;

namespace Appeon.DataStoreDemo.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        
        public IConfiguration Configuration { get; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDataContext<OrderContext>(m => m.UseSqlServer(Configuration["ConnectionStrings:AdventureWorks2012"]));
            services.AddCors(opts =>
            {
                opts.AddPolicy("AllowCors", builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });
            services.AddScoped<ISalesOrderService, SalesOrderService>();
            services.AddScoped<IOrderReportService, OrderReportService>();
            services.AddScoped<IGenericServiceFactory, GenericServiceFactory>();
            
            services.AddScoped<ISalesOrderDetailService, SalesOrderDetailService>();
            services.AddScoped<ILoginService, LoginService>();
            
            services.AddControllers(m =>
            {
                m.UseCoreIntegrated();           
            });           

            services.AddGzipCompression(CompressionLevel.Fastest);
        }
        
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
			if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Adds middleware for redirecting HTTP Requests to HTTPS.
            // app.UseHttpsRedirection();

            
            app.UseRouting();
            app.UseCors("AllowCors");//注意放到Route和Endpoint之间
            app.UseAuthorization();
            
			app.UseResponseCompression();
			
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}