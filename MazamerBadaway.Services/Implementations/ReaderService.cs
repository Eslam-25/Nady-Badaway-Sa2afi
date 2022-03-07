using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MazamerBadaway.Core.Entities;
using MazamerBadaway.Core.Utilities;
using MazamerBadaway.GoogleSheet;
using MazamerBadaway.GoogleSheet.GoogleSheetMappers;
using MazamerBadaway.GoogleSheet.Helpers;
using MazamerBadaway.Services.Dtos;
using MazamerBadaway.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using X.PagedList;

namespace MazamerBadaway.Services.Implementations
{
    public class ReaderService : BaseService<ReaderDto, Reader>, IReaderService
    {
        private readonly string sheetName;
        private readonly IConfiguration _configuration;
        private readonly string lastIndexChar;
        public ReaderService(IConfiguration configuration, GoogleSheetsHelper googleSheetsHelper, string spreadSheetId)
            : base(googleSheetsHelper, spreadSheetId)
        {
            sheetName = configuration.GetSection("sheets:reader")["name"];
            _configuration = configuration;
            lastIndexChar = configuration.GetSection("sheets:reader")["lastIndexChar"];
        }

        public void EvaluateReader(ReaderDegree readerDegree)
        {
            //readerDegree.CreationDate = DateHelper.Now();
            string sheetName = _configuration.GetSection("sheets:readerDegree")["name"];
            string lastIndexChar = _configuration.GetSection("sheets:readerDegree")["lastIndexChar"];
            Create(ReaderDegreeMapper.MapToRangeData(readerDegree), sheetName, lastIndexChar);
        }

        public void Create(Reader reader)
        {
            reader.Id = SheetsId.LastId[sheetName] + 1;
            reader.IsActive = true;
            //reader.CreationDate = DateHelper.Now();
            Create(ReaderMapper.MapToRangeData(reader), sheetName, lastIndexChar);
            SheetsId.LastId[sheetName]++;
        }
        public void Update(Reader reader) => Update(reader.Id, ReaderMapper.MapToRangeData(reader), sheetName, lastIndexChar);
        public void SoftDelete(int id)
        {
            Reader reader = GetById(id);
            reader.IsActive = false;
            Update(reader);
        }
        public Reader GetById(int id) => ReaderMapper.MapFromRangeData(GetById(id, sheetName, lastIndexChar)).FirstOrDefault();

        public Reader GetReaderEvaluationByRulerId(int readerId, int rulerId)
        {
            Reader reader = ReaderMapper.MapFromRangeData(GetById(readerId, sheetName, lastIndexChar)).FirstOrDefault();
            string readerDegreeSheetName = _configuration.GetSection("sheets:readerDegree")["name"];
            string readerDegreeLastIndexChar = _configuration.GetSection("sheets:readerDegree")["lastIndexChar"];
            List<ReaderDegree> readerDegrees = ReaderDegreeMapper.MapFromRangeData(GetAll(readerDegreeSheetName, readerDegreeLastIndexChar)).ToList();
            if (readerDegrees.Any(r => r.RulerId == rulerId && r.ReaderId == readerId))
                reader.Degree = readerDegrees.FirstOrDefault(r => r.RulerId == rulerId && r.ReaderId == readerId).Degree;

            return reader;
        }

        public List<Reader> GetAll()
        {
            string readerDegreeSheetName = _configuration.GetSection("sheets:readerDegree")["name"];
            string readerDegreeLastIndexChar = _configuration.GetSection("sheets:readerDegree")["lastIndexChar"];
            List<ReaderDegree> readerDegrees = ReaderDegreeMapper.MapFromRangeData(GetAll(readerDegreeSheetName, readerDegreeLastIndexChar)).ToList();

            string userSheetName = _configuration.GetSection("sheets:user")["name"];
            string userLastIndexChar = _configuration.GetSection("sheets:user")["lastIndexChar"];
            List<User> rulers = UserMapper.MapFromRangeData(GetAll(userSheetName, userLastIndexChar)).ToList();

            List<Reader> readers = ReaderMapper.MapFromRangeData(GetAll(sheetName, lastIndexChar)).Where(r => r.IsActive).ToList();
            foreach (var reader in readers)
            {
                var rulersDegree = readerDegrees.Where(r => r.ReaderId == reader.Id).ToList();
                if (rulersDegree.Any())
                {
                    reader.Degree = rulersDegree.Sum(r => r.Degree) / rulersDegree.Count();
                    var readerRules = rulers.Where(r => rulersDegree.Select(r => r.RulerId).Contains(r.Id)).Select(r => r.Name);

                    foreach (var item in readerRules)
                        reader.RulerName += $"{item} ,";

                    reader.RulerName = reader.RulerName.Remove(reader.RulerName.Length - 2, 2);
                }
            }
            return readers;
        }
        public async Task<PagedListResult<Reader>> GetPagedListAsync(QueryParams queryParams)
        {
            IPagedList<IList<object>> items = await GetPagedListAsync(queryParams, sheetName, lastIndexChar);
            List<Reader> readers = new List<Reader>();
            foreach (var item in items)
            {
                if (item[0].ToString() == "id") continue;
                readers.Add(ReaderMapper.MapFromSingleRow(item));
            }
            IPagedList<Reader> readersPaged = readers.Where(r => r.IsActive).ToPagedList();
            readersPaged = new StaticPagedList<Reader>(readersPaged, readersPaged.PageNumber, readersPaged.PageSize, readersPaged.TotalItemCount);

            return new PagedListResult<Reader>(readersPaged);
        }
    }
}