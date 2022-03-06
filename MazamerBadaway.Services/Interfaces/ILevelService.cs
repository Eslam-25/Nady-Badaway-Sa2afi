using MazamerBadaway.Core.Entities;
using MazamerBadaway.Core.Utilities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MazamerBadaway.Services.Interfaces
{
    public interface ILevelService
    {
        void Create(Level level);
        void Update(Level level);
        void SoftDelete(int id);
        Level GetById(int id);
        List<Level> GetAll();
        Task<PagedListResult<Level>> GetPagedListAsync(QueryParams queryParams);
    }
}
