using MazamerBadaway.Core.Entities;
using MazamerBadaway.Core.Utilities;
using MazamerBadaway.Services.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;
using X.PagedList;

namespace MazamerBadaway.Services.Interfaces
{
    public interface IBaseService<Dto, Entity> where Dto : BaseDto where Entity : BaseEntity
    {
        void Create(IList<IList<object>> item, string sheetName, string lastIndexChar);
        void HardDelete(int id, string sheetName, string lastIndexChar);
        void Update(int id, IList<IList<object>> item, string sheetName, string lastIndexChar);
        IList<IList<object>> GetById(int id, string sheetName, string lastIndexChar);
        IList<IList<object>> GetAll(string sheetName, string lastIndexChar);
        Task<IPagedList<IList<object>>> GetPagedListAsync(QueryParams queryParams, string sheetName, string lastIndexChar);
    }
}
