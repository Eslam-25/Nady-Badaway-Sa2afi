using MazamerBadaway.Core.Enums;

namespace MazamerBadaway.Services.Dtos
{
    public class UserDto: BaseDto
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public UserRole Role { get; set; }
    }
}
