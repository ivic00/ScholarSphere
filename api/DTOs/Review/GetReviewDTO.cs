using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.UserDTO;
using api.Models;
namespace api.DTOs.Review
{
    public class GetReviewDTO
    {
        public int Id { get; set; }
        public bool Approved { get; set; }
        public string Comments { get; set; }
        public DateTime SubmissionDate { get; set; }
        public GetUserDTO Reviewer { get; set; }
        public int PaperId { get; set; }

    }
}