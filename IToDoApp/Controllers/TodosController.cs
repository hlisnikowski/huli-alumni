using IToDoApp.Database;
using IToDoApp.Helpers;
using IToDoApp.Models.Entities;
using IToDoApp.Models.ModelViews;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace IToDoApp.Controllers
{

    [Authorize]
    public class TodosController : Controller
    {

        private readonly TodoContext db;
        private readonly IHttpContextAccessor http;

        public TodosController(TodoContext db, IHttpContextAccessor http)
        {
            this.db = db;
            this.http = http;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var todos = await db.Todos.ToListAsync();
            return View(todos);
        }

        public IActionResult Delete(int id)
        {
            db.Todos.Remove(db.Todos.Single(t => t.Id == id));
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public IActionResult Check(int id)
        {
            var todo = db.Todos.Single(o => o.Id == id);
            todo.Done = !todo.Done;
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public IActionResult Create()
        {
            return View(new CreateTodoVM());
        }
        [HttpPost]
        public IActionResult Create(CreateTodoVM todoVM)
        {
            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("", "Unable to create todo");
                return View(todoVM);
            }

            db.Todos.Add(new Todo()
            {
                Title = todoVM.Title,
                Description = todoVM.Description,
                Done = todoVM.Done,
                Start = todoVM.Start,
                Finish = todoVM.Finish,
                UserId = http.HttpContext.User.GetUserId()
            }) ;
            db.SaveChanges();
            return RedirectToAction("Index");
        }


        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var todo = await db.Todos.SingleAsync(t => t.Id.Equals(id));
            return View(new EditTodoVM
            {
                 Done = todo.Done, Description= todo.Description, Finish= todo.Finish, Start = todo.Start, Title = todo.Title
            });
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id,EditTodoVM todoVM)
        {
            if(!ModelState.IsValid)
            {
                ModelState.AddModelError("", "Failed to edit todo");
                return View(todoVM);
            }

            var todo = await db.Todos.SingleAsync(t => t.Id.Equals(id));

            todo.Start = todoVM.Start;
            todo.Finish = todoVM.Finish;
            todo.Title = todoVM.Title;
            todo.Description = todoVM.Description;
            todo.Done = todoVM.Done;


            db.Update(todo);
            db.SaveChanges();

            return RedirectToAction("Index");
        }

    }

    
}
