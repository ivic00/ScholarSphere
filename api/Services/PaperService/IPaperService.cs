using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Paper;
using api.Models;

namespace api.Services.PaperService
{
    public interface IPaperService
    {
        Task<ServiceResponse<List<GetPaperDTO>>> GetAllPapers();
        //Task<ServiceResponse<List<GetPaperDTO>>> GetAllFromAuthor(int Id);
        Task<ServiceResponse<GetPaperDTO>> GetPaper(int Id);
        Task<ServiceResponse<List<GetPaperDTO>>> AddPaper(AddPaperDTO newPaper);
        Task<ServiceResponse<GetPaperDTO>> UpdatePaper(UpdatePaperDTO newPaper);
        Task<ServiceResponse<List<GetPaperDTO>>> DeleteCharacter(int id);

    }
}