using IToDoApp.Database;
using IToDoApp.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace IToDoApp.Data
{
    public class Seed
    {
        public static async Task SeedUsersAndRolesAsync(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                //Roles
                var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
                if (!await roleManager.RoleExistsAsync(UserRoles.User))
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

                //Users
                var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
                string adminUserEmail = "mirko@gmail.com";

                var adminUser = await userManager.FindByEmailAsync(adminUserEmail);
                if (adminUser == null)
                {
                    var newAdminUser = new AppUser()
                    {
                        UserName = "teddysmithdev",
                        Email = adminUserEmail,
                        EmailConfirmed = true,
                    };
                    await userManager.CreateAsync(newAdminUser, "Coding@1234?");
                    await userManager.AddToRoleAsync(newAdminUser, UserRoles.Admin);
                }

                string appUserEmail = "mirek@gmail.com";

                var appUser = await userManager.FindByEmailAsync(appUserEmail);
                if (appUser == null)
                {
                    var newAppUser = new AppUser()
                    {
                        UserName = "app-user",
                        Email = appUserEmail,
                    };
                    await userManager.CreateAsync(newAppUser, "Coding@1234?");
                    await userManager.AddToRoleAsync(newAppUser, UserRoles.User);
                }
            }
        }
        public static async Task SeedTodos(IApplicationBuilder applicationBuilder)
        {
            using var ss = applicationBuilder.ApplicationServices.CreateScope();
            var ctx = ss.ServiceProvider.GetService<TodoContext>();
            await ctx!.Database.ExecuteSqlRawAsync("TRUNCATE TABLE dbo.Todos");
            await ctx.Todos.AddRangeAsync(GenerateRandomTodos(10));
            await ctx.SaveChangesAsync();
        }


        private static List<Todo> GenerateRandomTodos(int count)
        {
            var todos = new List<Todo>();
            var random = new Random();

            for (int i = 1; i <= count; i++)
            {
                var title = $"Todo {i}";
                var description = $"This is the description for Todo {i}";
                var done = random.Next(2) == 0;
                var start = DateTime.Now;
                var finish = start.AddDays(random.Next(1, 7));
                var userId = "bb38a17a-1daa-4a36-833e-b4961808ac9a";

                todos.Add(new Todo
                {
                    Title = title,
                    Description = description,
                    Done = done,
                    Start = start,
                    Finish = finish,
                    UserId = userId
                });
            }

            return todos;
        }
    }
}
