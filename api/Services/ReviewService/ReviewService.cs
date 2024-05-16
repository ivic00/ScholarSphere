using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Security.Claims;
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
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ReviewService(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
            _context = context;

        }
        public async Task<ServiceResponse<GetReviewDTO>> AddReview(AddReviewDTO addReviewDTO)
        {
            var serviceResponse = new ServiceResponse<GetReviewDTO>();

            int reviewerId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (await ReviewCheck(reviewerId, addReviewDTO.PaperId))
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
                    review.Reviewer = await _context.Users.FirstOrDefaultAsync(x => x.Id == reviewerId);
                    review.Approved = addReviewDTO.Approved;
                    review.SubmissionDate = DateTime.Now;

                    _context.Reviews.Add(review);
                    await _context.SaveChangesAsync();

                    serviceResponse.Data = _mapper.Map<GetReviewDTO>(_context.Entry(review).Entity);
                    serviceResponse.Message = "Succesfully uploaded review!";
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
                var reviews = await _context.Reviews
                .Include(x => x.Paper)
                .Where(x => x.Reviewer.Id == userId).ToListAsync();

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


        //Da li je korisnik vec napisao recenziju
        private async Task<bool> ReviewCheck(int reviewerId, int paperId)
        {
            return await _context.Reviews
                .AnyAsync(x => x.Reviewer.Id == reviewerId && x.Paper.Id == paperId);
        }
    }
}