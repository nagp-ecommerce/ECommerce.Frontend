using System.Text.Json;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using ViewApp.Models;

namespace ViewApp.Controllers
{
    [Route("account")]
    public class AccountController(
        HttpClient httpClient, 
        IConfiguration config
    ) : Controller
    {
        [BindProperty]
        public LoginInput LoginDetail { get; set; }

        [HttpPost]
        [Route("login")]
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

            var res = await httpClient.PostAsync(
                $"{config["ApiUrl:Auth"]}/login", content);

            if (res.IsSuccessStatusCode)
            {
                var result = await res.Content.ReadFromJsonAsync<LoginResponse>();
                if (result.Success)
                {
                    Response.Cookies.Append(
                      "AuthToken",
                      result.Message ?? "",
                      new CookieOptions()
                      {
                          HttpOnly = true,
                          Secure = true
                      }
                  );

                    TempData["Message"] = "Logged in successfully";
                    TempData["MessageType"] = "success";
                }
                else 
                {
                    TempData["Message"] = result.Message;
                    TempData["MessageType"] = "danger";
                }
              
            }

            return RedirectToAction("Index", "Home");
        }

        [Route("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("AuthToken");
            return RedirectToAction("Index", "Home");
        }

        [Route("")]
        public IActionResult Index()
        {
            return View("Index", "Home");
        }
    }
}
