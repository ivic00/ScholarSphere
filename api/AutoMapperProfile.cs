using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Paper;
using api.DTOs.Review;
using api.DTOs.UserDTO;
using api.Models;

namespace api
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Paper, GetPaperDTO>();
            CreateMap<AddPaperDTO, Paper>();

            CreateMap<User, GetUserDTO>();

            CreateMap<AddReviewDTO, Review>();
            CreateMap<Review, GetReviewDTO>();
        }
    }
}