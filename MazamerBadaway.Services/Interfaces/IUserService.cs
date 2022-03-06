using MazamerBadaway.Core.Entities;
using MazamerBadaway.Core.Utilities;
using MazamerBadaway.Services.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MazamerBadaway.Services.Interfaces
{
    public interface IUserService
    {
        void Create(User user);
        void Update(User user);
        void ChagePassword(int id, string newPassword);
        void SoftDelete(int id);
        User GetById(int id);
        List<User> GetAll();
        User Login(UserLoginModel userLogin);
        Task<PagedListResult<User>> GetPagedListAsync(QueryParams queryParams);
    }
}
