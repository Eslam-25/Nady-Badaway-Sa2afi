using System;

namespace MazamerBadaway.Core.Entities
{
    public class Reader : BaseEntity
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string SheikhName { get; set; }
        public DateTime BirthDate { get; set; }
        public int LevelId { get; set; }
        public string Level { get; set; }
        public string RulerName { get; set; }
        public double Degree { get; set; }
    }
}
