global using AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Diagnostics.Tracing;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Paper;
using api.Enums;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace api.Services.PaperService
{
    public class PaperService : IPaperService
    {
        private static string kwords = "Testing, Keywords, These, Are, Just, Testings";
        private static List<Paper> papers = new List<Paper> {
            new Paper(0, "Test Paper0", "Sho jun hi lao yao xi, fung hao, mi lao tr, fing shi",
            /*new User(0, "AuthorTester23", "Stefan", "Ivic", UserRole.Author),*/
            DateTime.Now, "", Keywords: kwords, FullText: "sklda ksdkja ksjdkajs dkjakjkjksj dkajksjd kajskdjak sjdkajs kdj"),
            new Paper(1, "How to FAIL at YouTube", "I didnt know he was like that i swear...",
            /*new User(1, "DDobrik", "David", "Dobrik", UserRole.Author),*/
            DateTime.Now, "", Keywords: kwords, FullText: "sklda ksdkja ksjdkajs dkjakjkjksj dkajksjd kajskdjak sjdkajs kdj")
        };
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public PaperService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<List<GetPaperDTO>>> GetAllPapers()
        {
            var serviceResponse = new ServiceResponse<List<GetPaperDTO>>();
            var DbPapers = await _context.Papers.ToListAsync();
            serviceResponse.Data = DbPapers.Select(x => _mapper.Map<GetPaperDTO>(x)).ToList();

            return serviceResponse;
        }

        /* public async Task<ServiceResponse<List<GetPaperDTO>>> GetAllFromAuthor(int Id)
         {
             var serviceResponse = new ServiceResponse<List<GetPaperDTO>>();
             List<Paper> authPapers = new List<Paper>();

             authPapers = papers.Where(x => x.Author.Id == Id).ToList();

             serviceResponse.Data = authPapers.Select(x => _mapper.Map<GetPaperDTO>(x)).ToList();

             return serviceResponse;
         }*/

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

        public async Task<ServiceResponse<List<GetPaperDTO>>> AddPaper(AddPaperDTO newPaper)
        {
            var serviceResponse = new ServiceResponse<List<GetPaperDTO>>();
            
            var paper = _mapper.Map<Paper>(newPaper);
            paper.PublicationDate = DateTime.Now;

            _context.Papers.Add(paper);
            await _context.SaveChangesAsync();

            serviceResponse.Data = await _context.Papers.Select(x => _mapper.Map<GetPaperDTO>(x)).ToListAsync();

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
                paper.FullText = changedPaper.FullText;
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

        public async Task<ServiceResponse<List<GetPaperDTO>>> DeleteCharacter(int id)
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
    }
}