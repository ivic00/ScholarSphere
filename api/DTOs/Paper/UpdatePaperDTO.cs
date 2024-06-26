using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.DTOs.Paper
{
    public class UpdatePaperDTO
    {
         public int Id { get; set; }
        public string Title { get; set; }
        public string Abstract { get; set; }
        public string Keywords { get; set; }
        public string ScientificField { get; set; }
        public string PdfURL { get; set; }
        public bool ForPublishing { get; set; } = false;
    }
}