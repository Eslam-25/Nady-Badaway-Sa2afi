using System;
using System.Collections.Generic;
using System.Linq;
using MazamerBadaway.Core.Entities;

namespace MazamerBadaway.GoogleSheet.GoogleSheetMappers
{
    public static class ReaderMapper
    {
        public static Reader MapFromSingleRow(IList<object> row)
        {
            if (row == null) return new Reader();
            return GetReader(row);
        }

        public static List<Reader> MapFromRangeData(IList<IList<object>> values)
        {
            List<Reader> readers = new List<Reader>();
            if (values == null) return readers;

            foreach (var value in values.Where(r => r[0].ToString() != "id"))
            {
                readers.Add(GetReader(value));
            }
            return readers;
        }

        private static Reader GetReader(IList<object> value)
        {
            return new Reader()
            {
                Id = value.Count > 0 ? Convert.ToInt32(value[0]) : 0,
                IsActive = value.Count > 1 ? Convert.ToBoolean(value[1]) : true,
                CreationDate = value.Count > 2 ? Convert.ToDateTime(value[2]) : DateTime.Now,
                Name = value.Count > 3 ? value[3].ToString() : "",
                PhoneNumber = value.Count > 4 ? value[4].ToString() : "",
                Address = value.Count > 5 ? value[5].ToString() : "",
                SheikhName = value.Count > 6 ? value[6].ToString() : "",
                BirthDate = value.Count > 7 ? Convert.ToDateTime(value[7]) : DateTime.Now,
                LevelId = value.Count > 8 ? Convert.ToInt32(value[8]) : 0,
                Level = value.Count > 9 ? value[9].ToString() : "",
            };
        }

        public static IList<IList<object>> MapToRangeData(Reader reader)
        {
            var objectList = new List<object>()
            {
                reader.Id,
                reader.IsActive,
                reader.CreationDate,
                reader.Name,
                reader.PhoneNumber,
                reader.Address,
                reader.SheikhName,
                reader.BirthDate,
                reader.LevelId,
                reader.Level
            };
            var rangeData = new List<IList<object>> { objectList };
            return rangeData;
        }
    }
}