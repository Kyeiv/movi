using System;
using System.ComponentModel.DataAnnotations;

namespace Project.Models
{
    public partial class Movie
    {
        public int MovieId { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public string Director { get; set; }
        public int Rate { get; set; }
        public int Year { get; set; }
        public string Rated { get; set; }
        public DateTime Released { get; set; }
        public string Writer { get; set; }
        public int Runtime { get; set; }
        public string Actors { get; set; }
        public string Plot { get; set; }
        public string Country { get; set; }
        public string Awards { get; set; }
        public string Metascore { get; set; }
        public string Poster { get; set; }
        public string imdbID { get; set; }
        public int UserId { get; set; }
        public UserInfo UserInfo { get; set; }
    }
}