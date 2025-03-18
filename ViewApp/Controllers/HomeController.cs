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
        public async Task<IActionResult> IndexAsync()
        {
            var baseUrl = Environment.GetEnvironmentVariable("BaseApiUrl") ?? config["ApiUrl:Base"];
            var res = await httpClient.GetAsync($"{baseUrl}/api/category/all");
            var Categories = new List<Category>();
            if (res.IsSuccessStatusCode)
            {
                Categories = await res.Content.ReadFromJsonAsync<List<Category>>();
            }
            ViewBag.Categories = Categories;
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
