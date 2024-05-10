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

        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public PaperService(IMapper mapper, DataContext context)
        {
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