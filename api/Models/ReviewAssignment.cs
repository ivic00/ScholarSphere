using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ReviewAssignment
    {
        public int Id { get; set; }
        public Paper ScientificPaper { get; set; }
        public User Reviewer1 { get; set; }
        public bool Reviewer1Reviewed { get; set; } = false;
        public User Reviewer2 { get; set; }
        public bool Reviewer2Reviewed { get; set; } = false;
        public User Reviewer3 { get; set; }
        public bool Reviewer3Reviewed { get; set; } = false;
    }
}