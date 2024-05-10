using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Review
{
    public class AddReviewDTO
    {
        public int PaperId { get; set; }
        public int ReviewerId { get; set; }
        public bool Approved { get; set; }
        public string Comments { get; set; }
    }
}