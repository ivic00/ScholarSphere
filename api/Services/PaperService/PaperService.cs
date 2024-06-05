global using AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Diagnostics.Tracing;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Paper;
using api.DTOs.Review;
using api.DTOs.UserDTO;
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
        private readonly IWebHostEnvironment _webHostingEnvironment;

        public PaperService(IMapper mapper, DataContext context, IReviewService reviewService, IHttpContextAccessor httpContextAccessor, IWebHostEnvironment webHostingEnvironment)
        {
            _httpContextAccessor = httpContextAccessor;
            _reviewService = reviewService;
            _context = context;
            _mapper = mapper;
            _webHostingEnvironment = webHostingEnvironment;
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
                var file = newPaper.File;
                var paper = _mapper.Map<Paper>(newPaper);
                paper.PublicationDate = DateTime.Now;
                paper.Author = await _context.Users.FirstOrDefaultAsync(x => x.Id == AuthorId);

                if (file != null && file.Length > 0)
                {
                    
                    string uploadsFolder = Path.Combine(_webHostingEnvironment.ContentRootPath, "Uploads");

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

//+ Path.GetExtension(file.FileName);
                    string fileName = Guid.NewGuid().ToString();
                    string filePath = Path.Combine(uploadsFolder, fileName);

                    await using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    paper.PdfURL = filePath;
                    paper.OriginalFileName = file.FileName + Path.GetExtension(file.FileName);
                    paper.MimeType = file.ContentType;
                }

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
            .OrderByDescending(x => x.PublicationDate)
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

        public async Task<ServiceResponse<List<GetPaperDTO>>> GetAllFromAuthor(int userId)
        {

            var serviceResponse = new ServiceResponse<List<GetPaperDTO>>();

            try
            {

                var papers = await _context.Papers.Where(x => x.Author.Id == userId).Select(x => _mapper.Map<GetPaperDTO>(x)).ToListAsync();

                serviceResponse.Data = papers;

                if (papers.Count != 0)
                    serviceResponse.Message = "Your papers successfully retrieved";
                else
                {
                    serviceResponse.Message = "You have no Papers";
                    serviceResponse.Success = false;
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<Paper>> GetDownloadPaper(int paperId)
        {
            var serviceResponse = new ServiceResponse<Paper>();
            try
            {
                serviceResponse.Data = await _context.Papers.FirstOrDefaultAsync(x => x.Id == paperId);
                serviceResponse.Message = "paper exists";
            }
            catch (Exception ex)
            {
                serviceResponse.Message = ex.Message;
                serviceResponse.Success = false;
            }

            return serviceResponse;

        }

        /*public async Task<ServiceResponse<IEnumerable<Tuple<IEnumerable<Tuple<GetPaperDTO, int, int, int>>, int>>>> GetForPublishing(int pageNumber, int pageSize)
        {
            var serviceResponse = new ServiceResponse<IEnumerable<Tuple<IEnumerable<Tuple<GetPaperDTO, int, int, int>>, int>>>();

            try
            {
                ServiceResponse<List<GetReviewDTO>> allReviews = await _reviewService.GetAllReviews();
                var allPapers = await _context.Papers.Select(x => _mapper.Map<GetPaperDTO>(x)).ToListAsync();

                var pendingPapers = allPapers.Where(p => p.ForPublishing == false).Select(paper => Tuple.Create(paper,
                                                                              allReviews.Data.Count(r => r.PaperId == paper.Id),
                                                                              allReviews.Data.Count(r => r.PaperId == paper.Id && r.Approved == true),
                                                                              allReviews.Data.Count(r => r.PaperId == paper.Id && r.Approved == false)
                                                                              ));
                int totalCount = pendingPapers.Count();

                var query = pendingPapers.AsQueryable();

                var pendingPapersPagin = query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(x => _mapper.Map<GetPaperDTO>(x))
                .ToListAsync();


                var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);


                serviceResponse.Data = (IEnumerable<Tuple<IEnumerable<Tuple<GetPaperDTO, int, int, int>>, int>>?)Tuple.Create((IEnumerable<Tuple<GetPaperDTO, int, int, int>>?)pendingPapersPagin, totalPages);

            }
            catch (System.Exception ex)
            {
                serviceResponse.Message = ex.Message;
                serviceResponse.Success = false;
                throw;
            }

            return serviceResponse;
        }*/
        public async Task<ServiceResponse<IEnumerable<Tuple<IEnumerable<Tuple<GetPaperDTO, int, int, int>>, int>>>> GetForPublishing(int pageNumber, int pageSize)
        {
            var serviceResponse = new ServiceResponse<IEnumerable<Tuple<IEnumerable<Tuple<GetPaperDTO, int, int, int>>, int>>>();

            try
            {
                ServiceResponse<List<GetReviewDTO>> allReviews = await _reviewService.GetAllReviews();
                var allPapers = await _context.Papers.Select(x => _mapper.Map<GetPaperDTO>(x)).ToListAsync();

                var pendingPapers = allPapers
                    .Where(p => !p.ForPublishing)
                    .Select(paper => Tuple.Create(paper,
                                                  //uzmi ukupan broj pregleda
                                                  allReviews.Data.Count(r => r.PaperId == paper.Id),
                                                  //uzmi broj pozitivnih recenzija  
                                                  allReviews.Data.Count(r => r.PaperId == paper.Id && r.Approved),
                                                  //uzmi broj negativnih recenzija
                                                  allReviews.Data.Count(r => r.PaperId == paper.Id && !r.Approved)))
                    .OrderByDescending(x => x.Item2)
                    .ToList();

                int totalCount = pendingPapers.Count();

                var pendingPapersPagin = pendingPapers
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

                serviceResponse.Data = new List<Tuple<IEnumerable<Tuple<GetPaperDTO, int, int, int>>, int>>
        {
            Tuple.Create((IEnumerable<Tuple<GetPaperDTO, int, int, int>>)pendingPapersPagin, totalPages)
        };

                serviceResponse.Success = true;
            }
            catch (System.Exception ex)
            {
                serviceResponse.Message = ex.Message;
                serviceResponse.Success = false;
                throw;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<GetPaperDTO>> PublishPaper(int paperId)
        {
            var serviceResponse = new ServiceResponse<GetPaperDTO>();
            try
            {
                var paper = await _context.Papers.FirstOrDefaultAsync(x => x.Id == paperId);

                if (paper is null)
                    throw new Exception($"Paper with Id: '{paperId}' does not exist");

                paper.ForPublishing = true;
                paper.PublicationDate = DateTime.Now;

                await _context.SaveChangesAsync();

                serviceResponse.Data = _mapper.Map<GetPaperDTO>(paper);
                serviceResponse.Message = $"Successfully published {paper.Title}";
            }
            catch (System.Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

    }
}