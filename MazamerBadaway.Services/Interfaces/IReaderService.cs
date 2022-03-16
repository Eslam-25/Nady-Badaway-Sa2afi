using System.Collections.Generic;
using System.Threading.Tasks;
using MazamerBadaway.Core.Entities;
using MazamerBadaway.Core.Utilities;
using MazamerBadaway.Services.Models;

namespace MazamerBadaway.Services.Interfaces
{
    public interface IReaderService
    {
        Reader Login(UserLoginModel userLogin);
        ReaderDashboardModel GetDashboardModel();
        void EvaluateReader(ReaderDegree readerDegree);
        Reader GetReaderEvaluationByRulerId(string readerCode, int rulerId);
        Reader GetReaderByCode(string readerCode);
        Reader Create(Reader reader);
        void Update(Reader reader);
        void SoftDelete(int id);
        Reader GetById(int id);
        List<Reader> GetAll();
        Task<PagedListResult<Reader>> GetPagedListAsync(QueryParams queryParams);
    }
}