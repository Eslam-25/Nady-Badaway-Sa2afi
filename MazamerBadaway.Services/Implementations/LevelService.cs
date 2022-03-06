using MazamerBadaway.Core.Entities;
using MazamerBadaway.Core.Utilities;
using MazamerBadaway.GoogleSheet;
using MazamerBadaway.GoogleSheet.GoogleSheetMappers;
using MazamerBadaway.GoogleSheet.Helpers;
using MazamerBadaway.Services.Dtos;
using MazamerBadaway.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using X.PagedList;

namespace MazamerBadaway.Services.Implementations
{
    public class LevelService : BaseService<LevelDto, Level>, ILevelService
    {
        private readonly string sheetName;
        private readonly string lastIndexChar;
        public LevelService(IConfiguration configuration, GoogleSheetsHelper googleSheetsHelper, string SpreadSheetId)
            : base(googleSheetsHelper, SpreadSheetId)
        {
            sheetName = configuration.GetSection("sheets:level")["name"];
            lastIndexChar = configuration.GetSection("sheets:level")["lastIndexChar"];
        }

        public void Create(Level level)
        {
            level.Id = SheetsId.LastId[sheetName] + 1;
            level.IsActive = true;
            Create(LevelMapper.MapToRangeData(level), sheetName, lastIndexChar);
            SheetsId.LastId[sheetName]++;
        }
        public void Update(Level level) => Update(level.Id, LevelMapper.MapToRangeData(level), sheetName, lastIndexChar);
        public void SoftDelete(int id)
        {
            Level level = GetById(id);
            level.IsActive = false;
            Update(level);
        }
        public Level GetById(int id) => LevelMapper.MapFromRangeData(GetById(id, sheetName, lastIndexChar)).FirstOrDefault();
        public List<Level> GetAll()
        {
            List<Level> levels = LevelMapper.MapFromRangeData(GetAll(sheetName, lastIndexChar));
            return levels.Where(r => r.IsActive).ToList();
        }

        public async Task<PagedListResult<Level>> GetPagedListAsync(QueryParams queryParams)
        {
            IPagedList<IList<object>> items = await GetPagedListAsync(queryParams, sheetName, lastIndexChar);
            List<Level> levels = new List<Level>();
            foreach (var item in items)
            {
                if (item[0].ToString() == "id") continue;
                levels.Add(LevelMapper.MapFromSingleRow(item));
            }
            IPagedList<Level> levelsPaged = levels.Where(r => r.IsActive).ToPagedList();
            levelsPaged = new StaticPagedList<Level>(levelsPaged, levelsPaged.PageNumber, levelsPaged.PageSize, levelsPaged.TotalItemCount);

            return new PagedListResult<Level>(levelsPaged);
        }
    }
}
