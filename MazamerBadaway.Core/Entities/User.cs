using MazamerBadaway.Core.Enums;

namespace MazamerBadaway.Core.Entities
{
    public class User : BaseEntity
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public UserRole Role { get; set; }
    }
}
