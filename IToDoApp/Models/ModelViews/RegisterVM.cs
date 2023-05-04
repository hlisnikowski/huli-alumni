using System.ComponentModel.DataAnnotations;

namespace IToDoApp.Models.ModelViews
{
    public class RegisterVM
    {
        [Required( ErrorMessage ="Email address is required"),
         Display(Name = "Email Address"), DataType(DataType.EmailAddress)]
        public string EmailAddress { get; set; }

       // [RegularExpression(@"^(?=.*[A-Z])(?=.*\W)(?=.*\d)(?=.*[a-z]).{8,}$", ErrorMessage = "Heslo musí být minimálně 8 znaků a obsahovat alespoň jedno velké písmeno a jeden symbol.")]
        [Required, Display(Name = "Password"), DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Email address is required"), 
            Display(Name = "Confirm password"), DataType(DataType.Password),
            Compare("Password", ErrorMessage = "Password do not match")]
        public string PasswordConfirm { get; set; }
    }
}
