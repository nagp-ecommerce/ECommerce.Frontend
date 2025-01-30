using System.Text.Json;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using ViewApp.Models;

namespace ViewApp.Controllers
{
    public class AccountController(
        HttpClient httpClient, 
        IConfiguration config
    ) : Controller
    {
        [BindProperty]
        public LoginInput LoginDetail { get; set; }

        public void OnGet()
        {
        }

        [HttpPost]
        public async Task<IActionResult> Login()
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            var requestData = new
            {
                Email = LoginDetail.Email,
                Password = LoginDetail.Password
            };

            var content = new StringContent(
                    JsonSerializer.Serialize(requestData),
                    Encoding.UTF8,
            "application/json"
            );
            
            //var res = await httpClient.PostAsync(
            //    $"{config["ApiURL:Auth"]}/login", content);

            //if (res.IsSuccessStatusCode)
            //{
            //    var result = await res.Content.ReadFromJsonAsync<LoginResponse>();
            //    Response.Cookies.Append(
            //        "AuthToken",
            //        result?.token!,
            //        new CookieOptions()
            //        {
            //            HttpOnly = true,
            //            Secure =true
            //        }
            //    );
            //}

            return View("Index");
        }

        public IActionResult Logout()
        {
            Response.Cookies.Delete("AuthToken");
            return RedirectToAction("Index", "Account");
        }
        public IActionResult Index()
        {
            return View("Index");
        }
    }
}
