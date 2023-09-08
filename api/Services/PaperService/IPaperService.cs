using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Services.PaperService
{
    public interface IPaperService
    {
        Task<ServiceResponse<List<Paper>>> GetAllPapers();
    }
}