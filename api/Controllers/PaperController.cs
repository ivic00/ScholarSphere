using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Services.PaperService;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaperController : ControllerBase
    {
        private readonly IPaperService _paperService;
        public PaperController(IPaperService paperService)
        {
            _paperService = paperService;
        }
        [HttpGet("GetAllPapers")]
        public async Task<ActionResult<ServiceResponse<List<Paper>>>> GetAllPapers()
        {
            return Ok(await _paperService.GetAllPapers());
        }
    }
}