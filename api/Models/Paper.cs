using System;
using System.Collections.Generic;
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
        public User Author { get; set; }
        public DateTime PublicationDate { get; set; }
        /// <summary>
        /// PDF file of the Paper
        /// </summary>
        public byte[] PdfData { get; set; }
        public List<Review> Reviews { get; set; }

        public Paper(int id, string Title, string Abstract, string Keywords, User Author)
        {
            this.Id = id;
            this.Title = Title;
            this.Abstract = Abstract;
            this.Keywords = Keywords;
            this.Author = Author;
        }

    }
}