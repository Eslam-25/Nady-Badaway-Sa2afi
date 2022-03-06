using System;

namespace MazamerBadaway.Services.Dtos
{
    public class ReaderDto: BaseDto
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string SheikhName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Level { get; set; }
    }
}
