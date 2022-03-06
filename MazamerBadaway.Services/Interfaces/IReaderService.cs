using System.Collections.Generic;
using System.Threading.Tasks;
using MazamerBadaway.Core.Entities;
using MazamerBadaway.Core.Utilities;

namespace MazamerBadaway.Services.Interfaces
{
    public interface IReaderService
    {
        void EvaluateReader(ReaderDegree readerDegree);
        Reader GetReaderEvaluationByRulerId(int readerId, int rulerId);
        void Create(Reader reader);
        void Update(Reader reader);
        void SoftDelete(int id);
        Reader GetById(int id);
        List<Reader> GetAll();
        Task<PagedListResult<Reader>> GetPagedListAsync(QueryParams queryParams);
    }
}