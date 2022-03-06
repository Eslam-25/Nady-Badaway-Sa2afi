using MazamerBadaway.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MazamerBadaway.GoogleSheet.GoogleSheetMappers
{
    public static class LevelMapper
    {
        public static Level MapFromSingleRow(IList<object> row)
        {
            if (row == null) return new Level();

            Level level = new Level()
            {
                Id = Convert.ToInt32(row[0]),
                IsActive = Convert.ToBoolean(row[1]),
                Name = row[2].ToString(),
                Degree = Convert.ToInt32(row[3]),
            };
            return level;
        }

        public static List<Level> MapFromRangeData(IList<IList<object>> values)
        {
            List<Level> levels = new List<Level>();
            if (values == null) return levels;

            foreach (var value in values.Where(r => r[0].ToString() != "id"))
            {
                Level level = new Level()
                {
                    Id = Convert.ToInt32(value[0]),
                    IsActive = Convert.ToBoolean(value[1]),
                    Name = value[2].ToString(),
                    Degree = Convert.ToInt32(value[3]),
                };
                levels.Add(level);
            }
            return levels;
        }

        public static IList<IList<object>> MapToRangeData(Level level)
        {
            var objectList = new List<object>() { level.Id, level.IsActive, level.Name, level.Degree };
            var rangeData = new List<IList<object>> { objectList };
            return rangeData;
        }
    }
}
