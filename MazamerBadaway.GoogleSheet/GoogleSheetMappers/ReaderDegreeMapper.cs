using System;
using System.Collections.Generic;
using System.Linq;
using MazamerBadaway.Core.Entities;

namespace MazamerBadaway.GoogleSheet.GoogleSheetMappers
{
    public static class ReaderDegreeMapper
    {
        public static ReaderDegree MapFromSingleRow(IList<object> row)
        {
            if (row == null) return new ReaderDegree();

            return GetReaderDegree(row);
        }

        public static List<ReaderDegree> MapFromRangeData(IList<IList<object>> values)
        {
            List<ReaderDegree> readerDegrees = new List<ReaderDegree>();
            if (values == null) return readerDegrees;

            foreach (var value in values.Where(r => r[0].ToString() != "creationDate"))
            {
                readerDegrees.Add(GetReaderDegree(value));
            }
            return readerDegrees;
        }

        private static ReaderDegree GetReaderDegree(IList<object> row)
        {
            return new ReaderDegree()
            {
                CreationDate = Convert.ToDateTime(row[0]),
                ReaderId = Convert.ToInt32(row[1]),
                RulerId = Convert.ToInt32(row[2]),
                Degree = Convert.ToInt32(row[3]),
                Note = row[4].ToString()
            };
        }

        public static IList<IList<object>> MapToRangeData(ReaderDegree readerDegree)
        {
            var objectList = new List<object>()
            {
                readerDegree.CreationDate,
                readerDegree.ReaderId,
                readerDegree.RulerId,
                readerDegree.Degree,
                readerDegree.Note
            };
            var rangeData = new List<IList<object>> { objectList };
            return rangeData;
        }
    }
}