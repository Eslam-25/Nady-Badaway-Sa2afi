using System.Collections.Generic;
using MazamerBadaway.GoogleSheet.GoogleSheetMappers;

namespace MazamerBadaway.GoogleSheet.Helpers
{
    public class SheetsId
    {
        public static Dictionary<string, int> LastId = new Dictionary<string, int>();

        public static void PrepareSheetsIds(GoogleSheetsHelper googleSheetsHelper, string spreadSheetId, List<string> sheets)
        {
            foreach (var sheetName in sheets)
            {
                var range = $"{sheetName}!A1:A";
                var request = googleSheetsHelper.Service.Spreadsheets.Values.Get(spreadSheetId, range);
                int lastId = LastIdMapper.MapFromRangeData(request.Execute().Values);
                LastId.Add(sheetName, lastId);
            }
        }
    }
}