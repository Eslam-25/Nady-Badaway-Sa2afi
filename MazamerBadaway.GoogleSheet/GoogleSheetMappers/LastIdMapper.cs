using System;
using System.Collections.Generic;
using System.Linq;

namespace MazamerBadaway.GoogleSheet.GoogleSheetMappers
{
    public class LastIdMapper
    {
        public static int MapFromRangeData(IList<IList<object>> values)
        {
            List<int> ids = new List<int>();
            if (values == null) return 0;

            foreach (var value in values.Where(r => r[0].ToString() != "id"))
            {
                ids.Add(Convert.ToInt32(value[0]));
            }
            return ids.LastOrDefault();
        }
    }
}