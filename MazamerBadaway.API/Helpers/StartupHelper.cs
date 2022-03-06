using System.Collections.Generic;
using MazamerBadaway.GoogleSheet;
using MazamerBadaway.GoogleSheet.Helpers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MazamerBadaway.API.Helpers
{
    public static class StartupHelper
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });
        }

        public static void PrepareSheetsNames(this IServiceCollection services, IConfiguration Configuration)
        {
            string levelSheetName = Configuration.GetSection("sheets:level")["name"];
            string readerSheetName = Configuration.GetSection("sheets:reader")["name"];
            string userSheetName = Configuration.GetSection("sheets:user")["name"];
            List<string> sheetNames = new List<string> { levelSheetName, readerSheetName, userSheetName };
            SheetsId.PrepareSheetsIds(services.BuildServiceProvider().GetService<GoogleSheetsHelper>(), Configuration.GetValue<string>("SpreadSheetId"), sheetNames);
        }
    }
}