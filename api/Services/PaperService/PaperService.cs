global using AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Diagnostics.Tracing;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Paper;
using api.DTOs.Review;
using api.Enums;
using api.Models;
using api.Services.ReviewService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace api.Services.PaperService
{
    public class PaperService : IPaperService
    {

        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IReviewService _reviewService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PaperService(IMapper mapper, DataContext context, IReviewService reviewService, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _reviewService = reviewService;
            _context = context;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<Tuple<List<GetPaperDTO>, int>>> GetAllPapers(int pageNumber, int pageSize)
        {
            var serviceResponse = new ServiceResponse<Tuple<List<GetPaperDTO>, int>>();
            var query = _context.Papers.AsQueryable();
            var totalCount = await query.CountAsync();

            var papers = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => _mapper.Map<GetPaperDTO>(x))
            .ToListAsync();

            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            var result = Tuple.Create(papers, totalPages);

            serviceResponse.Data = result;

            return serviceResponse;
        }
        public async Task<ServiceResponse<GetPaperDTO>> GetPaper(int Id)
        {
            var serviceResponse = new ServiceResponse<GetPaperDTO>();
            try
            {
                var paper = await _context.Papers.FirstOrDefaultAsync(x => x.Id == Id);
                if (paper is null)
                    throw new Exception($"Paper with Id: '{Id}' does not exist");
                serviceResponse.Data = _mapper.Map<GetPaperDTO>(paper);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetPaperDTO>>> AddPaper(AddPaperDTO newPaper, int AuthorId)
        {

            var serviceResponse = new ServiceResponse<List<GetPaperDTO>>();

            try
            {
                var paper = _mapper.Map<Paper>(newPaper);
                paper.PublicationDate = DateTime.Now;
                paper.Author = await _context.Users.FirstOrDefaultAsync(x => x.Id == AuthorId);

                _context.Papers.Add(paper);
                await _context.SaveChangesAsync();

                serviceResponse.Message = "Paper uploaded successfully";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = $"Failed to add paper: {ex.Message}";
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<GetPaperDTO>> UpdatePaper(UpdatePaperDTO changedPaper)
        {
            ServiceResponse<GetPaperDTO> serviceResponse = new ServiceResponse<GetPaperDTO>();
            try
            {
                var paper = await _context.Papers.FirstOrDefaultAsync(x => x.Id == changedPaper.Id);
                if (paper is null)
                    throw new Exception($"Paper with Id: '{changedPaper.Id}' does not exist");

                paper.Abstract = changedPaper.Abstract;
                paper.ScientificField = changedPaper.ScientificField;
                paper.Keywords = changedPaper.Keywords;
                paper.PdfURL = changedPaper.PdfURL;
                paper.Title = changedPaper.Title;
                paper.LastEditDateTime = DateTime.Now;

                await _context.SaveChangesAsync();

                serviceResponse.Data = _mapper.Map<GetPaperDTO>(paper);
                serviceResponse.Message = "Successfully updated Paper";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetPaperDTO>>> DeletePaper(int id)
        {
            ServiceResponse<List<GetPaperDTO>> serviceResponse = new ServiceResponse<List<GetPaperDTO>>();
            try
            {

                var paper = await _context.Papers.FirstOrDefaultAsync(x => x.Id == id);
                if (paper is null)
                    throw new Exception($"Paper with Id: '{id}' does not exist");

                _context.Papers.Remove(paper);
                await _context.SaveChangesAsync();

                serviceResponse.Data = await _context.Papers.Select(x => _mapper.Map<GetPaperDTO>(x)).ToListAsync();
                serviceResponse.Message = "Successfully deleted Paper";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<Tuple<List<GetPaperDTO>, int>>> GetAllPublished(int pageNumber, int pageSize)
        {
            var serviceResponse = new ServiceResponse<Tuple<List<GetPaperDTO>, int>>();
            var query = _context.Papers.AsQueryable();

            //bez uslova racuna i radove koji nisu objavljeni
            var totalCount = await query.CountAsync(x => x.ForPublishing == true);

            var papers = await query
            .Where(x => x.ForPublishing == true)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => _mapper.Map<GetPaperDTO>(x))
            .ToListAsync();

            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            var result = Tuple.Create(papers, totalPages);

            serviceResponse.Data = result;

            return serviceResponse;
        }

        public async Task<ServiceResponse<Tuple<List<GetPaperDTO>, int>>> GetAllPending(int pageNumber, int pageSize, string scientificField)
        {
            ServiceResponse<List<GetReviewDTO>> userReviews = new ServiceResponse<List<GetReviewDTO>>();

            var serviceResponse = new ServiceResponse<Tuple<List<GetPaperDTO>, int>>();
            var query = _context.Papers.AsQueryable();

            //bez uslova racuna i radove koji nisu objavljeni

            userReviews = await _reviewService.GetAllReviewsByUser(int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));

            List<int> reviewedPaperIds;

            if (userReviews.Data != null)
            {
                reviewedPaperIds = userReviews.Data.Select(ur => ur.PaperId).ToList();
                
                var totalCount = await query.CountAsync(x => x.ForPublishing == false && !reviewedPaperIds.Contains(x.Id) && x.ScientificField == scientificField);

                var papers = await query
                .Where(x => x.ForPublishing == false && x.ScientificField == scientificField && !reviewedPaperIds.Contains(x.Id))
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(x => _mapper.Map<GetPaperDTO>(x))
                .ToListAsync();



                var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

                var result = Tuple.Create(papers, totalPages);

                serviceResponse.Data = result;
                serviceResponse.Message = "User probably has reviews";
                return serviceResponse;
            }
            else
            {
                var totalCount = await query.CountAsync(x => x.ForPublishing == false && x.ScientificField == scientificField);

                var papers = await query
               .Where(x => x.ForPublishing == false && x.ScientificField == scientificField)
               .Skip((pageNumber - 1) * pageSize)
               .Take(pageSize)
               .Select(x => _mapper.Map<GetPaperDTO>(x))
               .ToListAsync();



                var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

                var result = Tuple.Create(papers, totalPages);

                serviceResponse.Data = result;
                serviceResponse.Message = "Total Count = " + totalCount;
                return serviceResponse;
            }

        }

        //za badge
        public async Task<ServiceResponse<int>> GetPendingCount()
        {
            int userId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            var response = new ServiceResponse<int>();

            string scientificField = await _context.Users
            .Where(x => x.Id == userId)
            .Select(x => x.Expertise)
            .FirstOrDefaultAsync();

            var query = _context.Papers.AsQueryable();

            //DODAJ UPIT AKO IMA REVIEW OD TOG KORISNIKA reviewService

            response.Data = 1;
            return response;
        }
    }
}