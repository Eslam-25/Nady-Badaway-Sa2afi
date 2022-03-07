using MazamerBadaway.Core.Entities;
using MazamerBadaway.Core.Utilities;
using MazamerBadaway.GoogleSheet;
using MazamerBadaway.GoogleSheet.GoogleSheetMappers;
using MazamerBadaway.GoogleSheet.Helpers;
using MazamerBadaway.Services.Dtos;
using MazamerBadaway.Services.Interfaces;
using MazamerBadaway.Services.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using X.PagedList;

namespace MazamerBadaway.Services.Implementations
{
    public class UserService : BaseService<UserDto, User>, IUserService
    {
        private readonly string sheetName;
        private readonly string lastIndexChar;
        public UserService(IConfiguration configuration, GoogleSheetsHelper googleSheetsHelper, string SpreadSheetId)
            : base(googleSheetsHelper, SpreadSheetId)
        {
            sheetName = configuration.GetSection("sheets:user")["name"];
            lastIndexChar = configuration.GetSection("sheets:user")["lastIndexChar"];
        }

        public void Create(User user)
        {
            user.Id = SheetsId.LastId[sheetName] + 1;
            user.IsActive = true;
            Create(UserMapper.MapToRangeData(user), sheetName, lastIndexChar);
            SheetsId.LastId[sheetName]++;
        }
        public void Update(User user) => Update(user.Id, UserMapper.MapToRangeData(user), sheetName, lastIndexChar);
        public void ChagePassword(int id, string newPassword)
        {
            User user = GetById(id + 1);
            user.Password = newPassword;
            Update(user.Id + 1, UserMapper.MapToRangeData(user), sheetName, lastIndexChar);
        }

        public void SoftDelete(int id)
        {
            User user = GetById(id);
            user.IsActive = false;
            Update(user);
        }
        public User GetById(int id) => UserMapper.MapFromRangeData(GetById(id, sheetName, lastIndexChar)).FirstOrDefault();
        public List<User> GetAll()
        {
            List<User> users = UserMapper.MapFromRangeData(GetAll(sheetName, lastIndexChar));
            return users.Where(r => r.IsActive).ToList();
        }

        public async Task<PagedListResult<User>> GetPagedListAsync(QueryParams queryParams)
        {
            IPagedList<IList<object>> items = await GetPagedListAsync(queryParams, sheetName, lastIndexChar);
            List<User> users = new List<User>();
            foreach (var item in items)
            {
                if (item[0].ToString() == "id") continue;
                users.Add(UserMapper.MapFromSingleRow(item));
            }
            IPagedList<User> usersPaged = users.Where(r => r.IsActive).ToPagedList();
            usersPaged = new StaticPagedList<User>(usersPaged, usersPaged.PageNumber, usersPaged.PageSize, usersPaged.TotalItemCount);

            return new PagedListResult<User>(usersPaged);
        }

        public User Login(UserLoginModel userLogin)
        {
            List<User> users = GetAll();
            return users.FirstOrDefault(r => r.PhoneNumber == userLogin.PhoneNumber && r.Password == userLogin.Password);
        }
    }
}
