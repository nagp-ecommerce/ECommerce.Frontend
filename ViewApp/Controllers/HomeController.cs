using System.Diagnostics;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using ViewApp.Models;

namespace ViewApp.Controllers
{
    [Route("[controller]")]

    public class HomeController(
        HttpClient httpClient,
        IConfiguration config,
        ILogger<HomeController> logger
        ) : Controller
    {
        public List<Product> Products = new List<Product>();

        [Route("[action]")]
        [Route("")]
        [Route("~/")]
        public IActionResult Index()
        {
            ViewBag.Categories = new List<string>() { "Jackets", "Shirts", "Bags", "Purse", "Trousers", "Belt", "Watch" };
            return View();
        }

        [Route("[action]")]
        public IActionResult Privacy()
        {
            return View();
        }

        [Route("[action]")]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
