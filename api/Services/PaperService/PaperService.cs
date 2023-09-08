using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;
using api.Models;
using Microsoft.VisualBasic;

namespace api.Services.PaperService
{
    public class PaperService : IPaperService
    {
        List<Paper> papers = new List<Paper> {
            new Paper(0, "Test Paper0", "Sho jun hi lao yao xi, fung hao, mi lao tr, fing shi", "ya;bingchi;keywords;haha",
            new User(0, "AuthorTester23", "Stefan", "Ivic", UserRole.Author)),
            new Paper(0, "How to FAIL at YouTube", "I didnt know he was like that i swear...", "ya;bingchi;keywords;haha",
            new User(0, "DDobrik", "David", "Dobrik", UserRole.Author)),
        };
        public async Task<ServiceResponse<List<Paper>>> GetAllPapers()
        {
            var serviceResponse = new ServiceResponse<List<Paper>>();

            serviceResponse.Data = papers;

            return serviceResponse;
        }
    }
}