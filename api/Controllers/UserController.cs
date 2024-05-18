using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.DTOs.UserDTO;
using api.Enums;
using api.Models;
using api.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserController(IUserService userService, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _userService = userService;
        }

        [Authorize]
        [HttpGet("GetUser")]

        public async Task<ActionResult<ServiceResponse<GetUserDTO>>> GetUser()
        {
            int id = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

            var user = await _userService.GetUserById(id);

            if (user is null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("GetPaperAuthor")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO>>> GetPaperAuthor(int paperId)
        {
            var user = await _userService.GetPaperAuthor(paperId);

            return Ok(user);
        }

        [HttpGet("GetAllUsersByRole")]
        public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> GetAllUsersByRole(UserRole role)
        {
            var serviceResponse = new ServiceResponse<List<GetUserDTO>>();

            try
            {
                serviceResponse = await _userService.GetAllUsersByRole(role);
            }
            catch (System.Exception)
            {
                throw;
            }

            return Ok(serviceResponse);
        }

    }
}