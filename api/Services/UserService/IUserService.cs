using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.UserDTO;
using api.Models;

namespace api.Services.UserService
{
    public interface IUserService
    {
        Task<ServiceResponse<GetUserDTO>> GetUserById(int id);
        Task<ServiceResponse<GetUserDTO>> GetUserByUsername(string Username);

    }
}