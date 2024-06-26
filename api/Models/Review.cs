using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Review
    {
        public int Id { get; set; }
        public Paper Paper { get; set; }
        public User Reviewer { get; set; }
        public bool? Approved { get; set; }
        public string Comments { get; set; }
        public DateTime SubmissionDate { get; set; }
    }
}