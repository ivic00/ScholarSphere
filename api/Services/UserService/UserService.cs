using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.UserDTO;
using api.Enums;
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

        public async Task<ServiceResponse<List<GetUserDTO>>> GetAllUsersByRole(UserRole role)
        {
            var serviceResponse = new ServiceResponse<List<GetUserDTO>>();
            try
            {
                var users = await _context.Users.Where(x => x.Role == role).ToListAsync();
                serviceResponse.Message = $"users with role {role} successfully retrieved";
                serviceResponse.Data = _mapper.Map<List<GetUserDTO>>(users);
            }
            catch (Exception ex)
            {
                serviceResponse.Message = ex.Message;
                serviceResponse.Success = false;
                throw;
            }

            return serviceResponse;
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

                if (user is null)
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

        public async Task<ServiceResponse<GetUserDTO>> GetPaperAuthor(int paperId)
        {
            var serviceResponse = new ServiceResponse<GetUserDTO>();

            try
            {
                Paper paper = await _context.Papers.Include(x => x.Author).FirstOrDefaultAsync(x => x.Id == paperId);
                if (paper == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Paper doesnt exist";
                    return serviceResponse;
                }

                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == paper.Author.Id);

                serviceResponse.Data = _mapper.Map<GetUserDTO>(user);
                serviceResponse.Message = "Author retrieved successfuly";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                return serviceResponse;
            }

            return serviceResponse;

        }
    }
}