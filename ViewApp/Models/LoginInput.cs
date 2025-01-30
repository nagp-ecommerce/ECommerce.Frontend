using System.ComponentModel.DataAnnotations;

namespace ViewApp.Models
{
    public class LoginInput
    {
        [Required(ErrorMessage ="Email is required for signin")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required for signin")]

        public string Password { get; set; }
    }
}
