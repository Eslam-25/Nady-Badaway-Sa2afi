using System.Threading.Tasks;
using MazamerBadaway.Core.Entities;
using MazamerBadaway.Core.Utilities;
using MazamerBadaway.Services.Interfaces;
using MazamerBadaway.Services.Models;
using Microsoft.AspNetCore.Mvc;

namespace MazamerBadaway.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult Get() => Ok(_userService.GetAll());

        [HttpGet("paged")]
        public async Task<IActionResult> GetPaged([FromQuery] QueryParams queryParams)
        {
            var users = await _userService.GetPagedListAsync(queryParams);
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id < 1)
                return BadRequest();

            return Ok(_userService.GetById(id));
        }

        [HttpPut("add-user")]
        public IActionResult Post(User item)
        {
            _userService.Create(item);
            return Ok(true);
        }

        [HttpPost("login")]
        public IActionResult Login(UserLoginModel item)
        {
            User user = _userService.Login(item);
            if (user != null)
                return Ok(user);

            return Ok(null);
        }

        [HttpPut]
        public IActionResult Put(User item)
        {
            _userService.Update(item);
            return Ok(true);
        }

        [HttpPut("change-password")]
        public IActionResult ChangePassword(User user)
        {
            _userService.ChagePassword(user.Id, user.Password);
            return Ok(true);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id < 1)
                return BadRequest();

            _userService.SoftDelete(id);
            return Ok(true);
        }
    }
}
