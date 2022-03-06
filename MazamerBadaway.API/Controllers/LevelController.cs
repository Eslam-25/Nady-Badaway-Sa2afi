using System.Threading.Tasks;
using MazamerBadaway.Core.Entities;
using MazamerBadaway.Core.Utilities;
using MazamerBadaway.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MazamerBadaway.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LevelController : ControllerBase
    {
        private readonly ILevelService _levelService;
        public LevelController(ILevelService levelService)
        {
            _levelService = levelService;
        }

        [HttpGet]
        public IActionResult Get() => Ok(_levelService.GetAll());

        [HttpGet("paged")]
        public async Task<IActionResult> GetPaged([FromQuery] QueryParams queryParams)
        {
            var levels = await _levelService.GetPagedListAsync(queryParams);
            return Ok(levels);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id < 1)
                return BadRequest();

            return Ok(_levelService.GetById(id));
        }

        [HttpPost]
        public IActionResult Post(Level item)
        {
            _levelService.Create(item);
            return Ok(true);
        }

        [HttpPut]
        public IActionResult Put(Level item)
        {
            _levelService.Update(item);
            return Ok(true);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id < 1)
                return BadRequest();

            _levelService.SoftDelete(id);
            return Ok(true);
        }
    }
}
