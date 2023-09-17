using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Paper;
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

        [HttpGet("GetPaperById")]
        public async Task<ActionResult<ServiceResponse<Paper>>> GetPaper(int Id)
        {
            var response = await _paperService.GetPaper(Id);

            if (response.Data is null)
                return NotFound(response);

            return Ok(response);
        }

        [HttpGet("GetAllPapers")]
        public async Task<ActionResult<ServiceResponse<List<Paper>>>> GetAllPapers()
        {
            return Ok(await _paperService.GetAllPapers());
        }

        /*[HttpGet("GetAllFromAuthor")]
        public async Task<ActionResult<ServiceResponse<List<Paper>>>> GetAllFromAuthor(int Id)
        {
            return Ok(await _paperService.GetAllFromAuthor(Id));
        }*/

        [HttpPost("AddPaper")]
        public async Task<ActionResult<ServiceResponse<List<GetPaperDTO>>>> AddPaper(AddPaperDTO newPaper)
        {
            return Ok(await _paperService.AddPaper(newPaper));
        }

        [HttpPut("UpdatePaper")]

        public async Task<ActionResult<ServiceResponse<GetPaperDTO>>> UpdatePaper(UpdatePaperDTO changedPaper)
        {
            var response = await _paperService.UpdatePaper(changedPaper);

            if (response.Data == null)
            {
                return NotFound(response);
            }

            return Ok(response);
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<ServiceResponse<List<GetPaperDTO>>>> DeletePaper(int id)
        {
            var response = await _paperService.DeleteCharacter(id);

            if (response.Data == null)
            {
                return NotFound(response);
            }

            return Ok(response);
        }
    }
}