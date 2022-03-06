using System;

namespace MazamerBadaway.Services.Dtos
{
    public class BaseDto
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
