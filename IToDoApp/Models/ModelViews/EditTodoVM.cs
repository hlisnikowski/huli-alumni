using IToDoApp.Data.Settings;
using System.ComponentModel.DataAnnotations;

namespace IToDoApp.Models.ModelViews
{
    public class EditTodoVM
    {

        [Required, MaxLength(TodoSet.TITLE_MAX_LENGTH), MinLength(TodoSet.TITLE_MIN_LENGTH)]
        public string Title { get; set; } = string.Empty;
        [Required, MaxLength(TodoSet.DESC_MAX_LENGTH), MinLength(TodoSet.DESC_MIN_LENGTH)]
        public string Description { get; set; } = string.Empty;
        public bool Done { get; set; }
        [Required, DataType(DataType.DateTime)]
        public DateTime Start { get; set; }
        [Required, DataType(DataType.DateTime)]
        public DateTime Finish { get; set; }
    }
}
