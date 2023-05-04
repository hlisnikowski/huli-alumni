using IToDoApp.Models.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace IToDoApp.Database
{
    public class TodoContext : IdentityDbContext<AppUser>
    {
        public TodoContext(DbContextOptions<TodoContext> o) : base(o)  
        {
        }

        public DbSet<Todo> Todos { get; set; }

    }
}
