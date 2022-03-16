using System;
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
using MazamerBadaway.Services.Models;
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

        public Reader Create(Reader reader)
        {
            reader.Id = SheetsId.LastId[sheetName] + 1;
            reader.IsActive = true;
            reader.Code = $"{reader.BirthDate.Year}-{reader.LevelId}-{reader.Id}";
            Random rand = new Random();
            reader.Password = $"{rand.Next(1, 100000)}";
            //reader.CreationDate = DateHelper.Now();
            Create(ReaderMapper.MapToRangeData(reader), sheetName, lastIndexChar);
            SheetsId.LastId[sheetName]++;

            return reader;
        }
        public void Update(Reader reader) => Update(reader.Id, ReaderMapper.MapToRangeData(reader), sheetName, lastIndexChar);
        public void SoftDelete(int id)
        {
            Reader reader = GetById(id);
            reader.IsActive = false;
            Update(reader);
        }
        public Reader GetById(int id) => ReaderMapper.MapFromRangeData(GetById(id, sheetName, lastIndexChar)).FirstOrDefault();

        public Reader GetReaderEvaluationByRulerId(string readerCode, int rulerId)
        {
            if (!readerCode.Contains("-")) return null;

            int readerId = Convert.ToInt32(readerCode.Substring(readerCode.LastIndexOf("-") + 1));
            Reader reader = ReaderMapper.MapFromRangeData(GetById(readerId, sheetName, lastIndexChar)).FirstOrDefault();
            string readerDegreeSheetName = _configuration.GetSection("sheets:readerDegree")["name"];
            string readerDegreeLastIndexChar = _configuration.GetSection("sheets:readerDegree")["lastIndexChar"];
            List<ReaderDegree> readerDegrees = ReaderDegreeMapper.MapFromRangeData(GetAll(readerDegreeSheetName, readerDegreeLastIndexChar)).ToList();
            if (readerDegrees.Any(r => r.RulerId == rulerId && r.ReaderId == readerId))
            {
                reader.Degree = readerDegrees.FirstOrDefault(r => r.RulerId == rulerId && r.ReaderId == readerId).Degree;
                reader.Note = readerDegrees.FirstOrDefault(r => r.RulerId == rulerId && r.ReaderId == readerId).Note;
            }

            return reader;
        }

        public Reader GetReaderByCode(string readerCode)
        {
            if (!readerCode.Contains("-")) return null;

            int readerId = Convert.ToInt32(readerCode.Substring(readerCode.LastIndexOf("-") + 1));
            Reader reader = ReaderMapper.MapFromRangeData(GetById(readerId, sheetName, lastIndexChar)).FirstOrDefault();
            string readerDegreeSheetName = _configuration.GetSection("sheets:readerDegree")["name"];
            string readerDegreeLastIndexChar = _configuration.GetSection("sheets:readerDegree")["lastIndexChar"];
            List<ReaderDegree> readerDegrees = ReaderDegreeMapper.MapFromRangeData(GetAll(readerDegreeSheetName, readerDegreeLastIndexChar)).ToList();
            if (readerDegrees.Any(r => r.ReaderId == readerId))
            {
                readerDegrees = readerDegrees.Where(r => r.ReaderId == readerId).ToList();
                reader.Degree = readerDegrees.Sum(r => r.Degree) / readerDegrees.Count;
                foreach (var readerDegree in readerDegrees)
                    reader.Note += $"{readerDegree.Note}\n";
            }
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
                    foreach (var note in rulersDegree.Select(e => e.Note))
                        reader.Note += $"{note},";

                    reader.Degree = rulersDegree.Sum(r => r.Degree) / rulersDegree.Count();
                    var readerRules = rulers.Where(r => rulersDegree.Select(r => r.RulerId).Contains(r.Id)).Select(r => r.Name);

                    foreach (var item in readerRules)
                        reader.RulerName += $"{item},";

                    reader.RulerName = reader.RulerName.Remove(reader.RulerName.Length - 1);
                    reader.Note = reader.Note.Remove(reader.Note.Length - 1);
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

        public Reader Login(UserLoginModel userLogin)
        {
            List<Reader> readers = GetAll();
            return readers.FirstOrDefault(r => r.Code == userLogin.PhoneNumber && r.Password == userLogin.Password);
        }
    }
}