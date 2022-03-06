using MazamerBadaway.API.Helpers;
using MazamerBadaway.GoogleSheet;
using MazamerBadaway.Services.Implementations;
using MazamerBadaway.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace MazamerBadaway.API
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

            services.ConfigureCors();
            services.AddSingleton(typeof(GoogleSheetsHelper));
            services.AddTransient<ILevelService>(x => new LevelService(x.GetService<IConfiguration>(), x.GetService<GoogleSheetsHelper>(), Configuration.GetValue<string>("SpreadSheetId")));
            services.AddTransient<IReaderService>(x => new ReaderService(x.GetService<IConfiguration>(), x.GetService<GoogleSheetsHelper>(), Configuration.GetValue<string>("SpreadSheetId")));
            services.AddTransient<IUserService>(x => new UserService(x.GetService<IConfiguration>(), x.GetService<GoogleSheetsHelper>(), Configuration.GetValue<string>("SpreadSheetId")));

            services.PrepareSheetsNames(Configuration);
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MazamerBadaway.API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MazamerBadaway.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseCors("CorsPolicy");
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
