using System.Threading.Tasks;
using MazamerBadaway.Core.Entities;
using MazamerBadaway.Core.Utilities;
using MazamerBadaway.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MazamerBadaway.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReaderController : ControllerBase
    {
        private readonly IReaderService _readerService;
        public ReaderController(IReaderService readerService)
        {
            _readerService = readerService;
        }

        [HttpGet]
        public IActionResult Get() => Ok(_readerService.GetAll());

        [HttpGet("paged")]
        public async Task<IActionResult> GetPaged([FromQuery] QueryParams queryParams)
        {
            var levels = await _readerService.GetPagedListAsync(queryParams);
            return Ok(levels);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id < 1)
                return BadRequest();

            return Ok(_readerService.GetById(id));
        }

        [HttpGet("reader-evaluation-byRuler")]
        public IActionResult GetReaderEvaluationByRuler(string readerCode, int rulerId)
        {
            return Ok(_readerService.GetReaderEvaluationByRulerId(readerCode, rulerId));
        }

        [HttpGet("by-code/{readerCode}")]
        public IActionResult GetReaderByCode(string readerCode)
        {
            return Ok(_readerService.GetReaderByCode(readerCode));
        }

        [HttpPost]
        public IActionResult Post(Reader item)
        {
            return Ok(_readerService.Create(item));
        }

        [HttpPost("evaluate")]
        public IActionResult EvaluateReader(ReaderDegree item)
        {
            _readerService.EvaluateReader(item);
            return Ok(true);
        }

        [HttpPut]
        public IActionResult Put(Reader item)
        {
            _readerService.Update(item);
            return Ok(true);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id < 1)
                return BadRequest();

            _readerService.SoftDelete(id);
            return Ok(true);
        }
    }
}
