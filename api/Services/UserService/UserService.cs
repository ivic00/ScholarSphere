using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.UserDTO;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Services.UserService
{
    public class UserService : IUserService
    {

        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public UserService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<GetUserDTO>> GetUserById(int Id)
        {
            var serviceResponse = new ServiceResponse<GetUserDTO>();
            try
            {
                var User = await _context.Users.FirstOrDefaultAsync(x => x.Id == Id);
                if (User is null)
                    throw new Exception($"User with Id: '{Id}' does not exist");
                serviceResponse.Data = _mapper.Map<GetUserDTO>(User);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetUserDTO>> GetUserByUsername(string Username)
        {
            var serviceResponse = new ServiceResponse<GetUserDTO>();
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == Username);
                
                if(user is null)
                    throw new Exception($"User with username: '{Username}' does not exist");
                serviceResponse.Data = _mapper.Map<GetUserDTO>(user);
                
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }
    }
}