using Microsoft.AspNetCore.Identity;

namespace IToDoApp.Models.Entities
{
    public class AppUser : IdentityUser
    {
        public List<Todo>? Todos { get; set; }
    }
}
