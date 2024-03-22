using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Paper
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Abstract { get; set; }
        public string Keywords { get; set; }
        public string FullText { get; set; }
        //public User Author { get; set; }
        public DateTime PublicationDate { get; set; }
        public DateTime? LastEditDateTime { get; set; }
        public string PdfURL { get; set; }
        public User? Author { get; set; }

        public Paper(int id, string Title, string Abstract/*, User Author*/, DateTime PublicationDate, string PdfURL, string Keywords, string FullText)
        {
            Id = id;
            this.Title = Title;
            this.Abstract = Abstract;
            //this.Author = Author;
            this.PublicationDate = PublicationDate;
            this.PdfURL = PdfURL;
            this.Keywords = Keywords;
            this.FullText = FullText;
        }

        public Paper()
        {

        }
    }
}