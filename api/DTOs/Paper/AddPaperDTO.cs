using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.DTOs.Paper
{
    public class AddPaperDTO
    {
        public string Title { get; set; }
        public string Abstract { get; set; }
        public string Keywords { get; set; }
        public string FullText { get; set; }
        public int AuthorId { get; set; }
        //public DateTime PublicationDate { get; set; }
        public string PdfURL { get; set; }
    }
}