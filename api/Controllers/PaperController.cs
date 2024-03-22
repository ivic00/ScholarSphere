using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Paper;
using api.Models;
using api.Services.PaperService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize]
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

        [AllowAnonymous]
        [HttpGet("GetAllPapers")]
        public async Task<ActionResult<ServiceResponse<Tuple<List<GetPaperDTO>, int>>>> GetAllPapers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var tuple = await _paperService.GetAllPapers(pageNumber, pageSize);
            var serviceResponse = new ServiceResponse<Tuple<List<GetPaperDTO>, int>>()
            {
                Data = tuple.Data,
                Success = tuple.Success,
                Message = tuple.Message
            };
            return Ok(serviceResponse);
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