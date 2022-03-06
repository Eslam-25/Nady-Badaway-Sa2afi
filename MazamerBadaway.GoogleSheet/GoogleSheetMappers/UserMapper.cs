using System;
using System.Collections.Generic;
using System.Linq;
using MazamerBadaway.Core.Entities;
using MazamerBadaway.Core.Enums;

namespace MazamerBadaway.GoogleSheet.GoogleSheetMappers
{
    public static class UserMapper
    {
        public static User MapFromSingleRow(IList<object> row)
        {
            if (row == null) return new User();

            User user = new User()
            {
                Id = Convert.ToInt32(row[0]),
                IsActive = Convert.ToBoolean(row[1]),
                CreationDate = Convert.ToDateTime(row[2]),
                Name = row[3].ToString(),
                PhoneNumber = row[4].ToString(),
                Password = row[5].ToString(),
                Role = (UserRole)Convert.ToInt32(row[6]),
            };
            return user;
        }

        public static List<User> MapFromRangeData(IList<IList<object>> values)
        {
            List<User> users = new List<User>();
            if (values == null) return users;

            foreach (var value in values.Where(r => r[0].ToString() != "id"))
            {
                User user = new User()
                {
                    Id = Convert.ToInt32(value[0]),
                    IsActive = Convert.ToBoolean(value[1]),
                    CreationDate = Convert.ToDateTime(value[2]),
                    Name = value[3].ToString(),
                    PhoneNumber = value[4].ToString(),
                    Password = value[5].ToString(),
                    Role = (UserRole)Convert.ToInt32(value[6]),
                };
                users.Add(user);
            }
            return users;
        }

        public static IList<IList<object>> MapToRangeData(User user)
        {
            var objectList = new List<object>() { user.Id, user.IsActive, user.CreationDate, user.Name, user.PhoneNumber, user.Password, user.Role };
            var rangeData = new List<IList<object>> { objectList };
            return rangeData;
        }
    }
}