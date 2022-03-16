using System.Collections.Generic;

namespace MazamerBadaway.Services.Models
{
    public class ReaderLevelModel
    {
        public string LevelName { get; set; }
        public int TotalOfReaders { get; set; }
        public int TotalOfPassedReaders { get; set; }
        public int TotalOfRemainReaders { get; set; }
    }
    public class ReaderDashboardModel
    {
        public int TotalOfReaders { get; set; }
        public int TotalOfPassedReaders { get; set; }
        public int TotalOfRemainReaders { get; set; }
        public List<ReaderLevelModel> LevelReaders { get; set; } = new List<ReaderLevelModel>();
    }
}