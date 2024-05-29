using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Review;
using api.Models;

namespace api.Services.ReviewService
{
    public interface IReviewService
    {
        Task<ServiceResponse<GetReviewDTO>> GetReviewById(int id);
        Task<ServiceResponse<List<GetReviewDTO>>> GetAllReviewsByUser(int userId);
        Task<ServiceResponse<List<GetReviewDTO>>> GetAllReviews();
        Task<ServiceResponse<GetReviewDTO>> AddReview(AddReviewDTO addReviewDTO);
        
    }
}