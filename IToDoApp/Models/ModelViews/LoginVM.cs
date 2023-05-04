using System.ComponentModel.DataAnnotations;

namespace IToDoApp.Models.ModelViews
{
    public class LoginVM
    {
        [Required, Display( Name ="Email Address"), DataType(DataType.EmailAddress)]
        public string EmailAddress { get; set; }

        [Required, Display(Name = "Password"), DataType(DataType.Password)]
        public string Password { get; set; }

    }
}
