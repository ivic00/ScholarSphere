using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.DTOs.Review;
using api.Models;
using api.Services.ReviewService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ReviewController(IReviewService reviewService, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _reviewService = reviewService;

        }

        [HttpGet("GetAllReviewsByUser")]
        public async Task<ActionResult<ServiceResponse<List<GetReviewDTO>>>> GetAllReviewsByUser()
        {
            int id = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            return await _reviewService.GetAllReviewsByUser(id);
        }

        [HttpPost("AddReview")]
        public async Task<ActionResult<ServiceResponse<GetReviewDTO>>> AddReview(AddReviewDTO addReviewDTO)
        {
            return await _reviewService.AddReview(addReviewDTO);
        }

        [AllowAnonymous]
        [HttpGet("GetAllReviews")]
        public async Task<ActionResult<ServiceResponse<List<GetReviewDTO>>>> GetAllReviews()
        {
            return await _reviewService.GetAllReviews();
        }
    }
}