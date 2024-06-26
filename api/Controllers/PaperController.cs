using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        private readonly IHttpContextAccessor _httpContextAccessor;
        public PaperController(IPaperService paperService, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _paperService = paperService;
        }

        [AllowAnonymous]
        [HttpGet("GetAllPublishedPapers")]
        public async Task<ActionResult<ServiceResponse<Tuple<List<GetPaperDTO>, int>>>> GetAllPublishedPapers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var tuple = await _paperService.GetAllPublished(pageNumber, pageSize);
            var serviceResponse = new ServiceResponse<Tuple<List<GetPaperDTO>, int>>()
            {
                Data = tuple.Data,
                Success = tuple.Success,
                Message = tuple.Message
            };
            return Ok(serviceResponse);
        }

        [HttpGet("DownloadPaper")]
        public async Task<IActionResult> DownloadFile(int paperId)
        {
            var serviceResponse = await _paperService.GetDownloadPaper(paperId);
            var paper = serviceResponse.Data;
            if (!serviceResponse.Success)
            {
                return NotFound(new { message = serviceResponse.Message });
            }

            var filePath = paper.PdfURL;
            var fileName = paper.OriginalFileName;
            var mimeType = paper.MimeType;

            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            return File(memory, mimeType, fileName);
        }

        [HttpGet("GetAllPendingPapers")]
        public async Task<ActionResult<ServiceResponse<Tuple<List<GetPaperDTO>, int>>>> GetAllPendingPapers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string scientificField = "Pharmacology")
        {
            var tuple = await _paperService.GetAllPending(pageNumber, pageSize, scientificField);
            var serviceResponse = new ServiceResponse<Tuple<List<GetPaperDTO>, int>>()
            {
                Data = tuple.Data,
                Success = tuple.Success,
                Message = tuple.Message
            };
            return Ok(serviceResponse);
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

        [HttpGet("GetAllFromAuthor")]
        public async Task<ActionResult<ServiceResponse<List<GetPaperDTO>>>> GetAllFromAuthor()
        {
            int userId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

            return Ok(await _paperService.GetAllFromAuthor(userId));
        }

        [HttpPost("AddPaper")]
        public async Task<ActionResult<ServiceResponse<List<GetPaperDTO>>>> AddPaper([FromForm] AddPaperDTO newPaper)
        {
            int AuthorId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

            return Ok(await _paperService.AddPaper(newPaper, AuthorId));
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
            var response = await _paperService.DeletePaper(id);

            if (response.Data == null)
            {
                return NotFound(response);
            }

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpGet("GetAllForPublishing")]
        public async Task<ActionResult<ServiceResponse<IEnumerable<Tuple<IEnumerable<Tuple<GetPaperDTO, int, int, int>>, int>>>>> GetForPublishing(int pageNumber, int pageSize)
        {
            return await _paperService.GetForPublishing(pageNumber, pageSize);
        }

        [HttpPut("PublishPaper")]
        public async Task<ActionResult<ServiceResponse<GetPaperDTO>>> PublishPaper(int paperId)
        {
            return Ok(await _paperService.PublishPaper(paperId));
        }
    }
}