using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace IToDoApp.Models.Entities
{
    public class Todo 
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool Done { get; set; }
        public DateTime Start { get; set;}
        public DateTime Finish { get; set;}
        public AppUser User { get; set; } = null!;
        [ForeignKey("User")]
        public string UserId { get; set; } = null!;

    }
}
