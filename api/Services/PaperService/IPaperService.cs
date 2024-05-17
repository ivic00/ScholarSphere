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
        Task<ServiceResponse<Tuple<List<GetPaperDTO>, int>>> GetAllPublished(int pageNumber, int pageSize);
        Task<ServiceResponse<Tuple<List<GetPaperDTO>, int>>> GetAllPending(int pageNumber, int pageSize, string scientificField);
        Task<ServiceResponse<int>> GetPendingCount();
        Task<ServiceResponse<Tuple<List<GetPaperDTO>, int>>> GetAllPapers(int pageNumber, int pageSize);
        Task<ServiceResponse<List<GetPaperDTO>>> GetAllFromAuthor(int userId);
        Task<ServiceResponse<GetPaperDTO>> GetPaper(int Id);
        Task<ServiceResponse<List<GetPaperDTO>>> AddPaper(AddPaperDTO newPaper, int AuthorId);
        Task<ServiceResponse<GetPaperDTO>> UpdatePaper(UpdatePaperDTO newPaper);
        Task<ServiceResponse<List<GetPaperDTO>>> DeletePaper(int id);

    }
}