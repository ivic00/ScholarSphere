using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.UserDTO;
using api.Models;
using api.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("Auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IUserService _userService;
        public AuthController(IAuthRepository authRepository, IUserService userService)
        {
            _userService = userService;
            _authRepository = authRepository;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<ServiceResponse<int>>> Register(RegisterUserDto request)
        {
            var response = await _authRepository.Register(
                new User { UserName = request.UserName, FirstName = request.FirstName, LastName = request.LastName, Role = request.Role, Expertise = request.Expertise },
                request.Password
            );

            if (!response.Success)
            { return BadRequest(response); }
            return Ok(response);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<ServiceResponse<int>>> Register(LoginUserDto request)
        {
            var response = await _authRepository.Login(request.username, request.password);

            if (!response.Success)
            { return BadRequest(response); }
            return Ok(response);
        }
    }
}