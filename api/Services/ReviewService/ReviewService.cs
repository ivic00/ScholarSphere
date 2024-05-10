using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Review;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace api.Services.ReviewService
{
    public class ReviewService : IReviewService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ReviewService(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public async Task<ServiceResponse<GetReviewDTO>> AddReview(AddReviewDTO addReviewDTO)
        {
            var serviceResponse = new ServiceResponse<GetReviewDTO>();

            if (await ReviewCheck(addReviewDTO.ReviewerId, addReviewDTO.PaperId))
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "You already reviewed this paper";
            }
            else
            {
                try
                {
                    Review review = _mapper.Map<Review>(addReviewDTO);
                    review.Paper = await _context.Papers.FirstOrDefaultAsync(x => x.Id == addReviewDTO.PaperId);
                    review.Reviewer = await _context.Users.FirstOrDefaultAsync(x => x.Id == addReviewDTO.ReviewerId);
                    review.SubmissionDate = DateTime.Now;

                    _context.Reviews.Add(review);
                    await _context.SaveChangesAsync();

                    serviceResponse.Data = _mapper.Map<GetReviewDTO>(_context.Entry(review).Entity);
                }
                catch (Exception ex)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = ex.Message;
                    throw;
                }
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetReviewDTO>>> GetAllReviewsByUser(int userId)
        {
            var serviceResponse = new ServiceResponse<List<GetReviewDTO>>();

            try
            {
                var reviews = await _context.Reviews.Where(x => x.Reviewer.Id == userId).ToListAsync();

                if (reviews.IsNullOrEmpty())
                {
                    serviceResponse.Message = "You have no reviews";
                    serviceResponse.Success = false;
                }
                else
                {
                    serviceResponse.Data = reviews.Select(x => _mapper.Map<GetReviewDTO>(x)).ToList();
                    serviceResponse.Message = "Reviews gathered successfully";
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Message = ex.Message;
                serviceResponse.Success = false;
                throw;
            }

            return serviceResponse;
        }

        public Task<ServiceResponse<GetReviewDTO>> GetReviewById(int id)
        {
            throw new NotImplementedException();
        }


        private async Task<bool> ReviewCheck(int reviewerId, int paperId)
        {
            return await _context.Reviews
                .AnyAsync(x => x.Reviewer.Id == reviewerId && x.Paper.Id == paperId);
        }
    }
}