using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using ViewApp.Models;

namespace ViewApp.Controllers
{
    [Route("[controller]")]
    public class PlpController(HttpClient httpClient, IConfiguration config) : Controller
    {
        [BindProperty]
        public string SearchTerm { get; set; }

        [Route("[action]")]
        [Route("{category?}")]
        [HttpGet]
        public async Task<IActionResult> Index(string? category)
        {
            // fetch all products in category

            //var res = await httpClient.GetAsync($"{config["ApiURL:Search"]}/api/search/SearchByCategory?categoryName={selectedCategory}");
            //if (res.IsSuccessStatusCode)
            //{
            //    Products = await res.Content.ReadFromJsonAsync<List<Product>>();
            //}
            ViewBag.Products = new List<Product>() { new Product { 
                Name="Perfume", Category=category, Description="Good fragrance", 
                ImageUrl= "https://shop.azelab.com/images/home-4/1.jpg" ,
                Price=5000, Reviews = new List<string>(){ "","", "", ""}, Id="1"
            } } ;
            return View();
        }


        [Route("")]
        [HttpGet]
        public async Task<IActionResult> Search()
        {
            //var token = Request.Cookies["AuthToken"];
            //httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            //var res = await httpClient.GetAsync($"{config["ApiURL:Search"]}/api/search/SearchByProduct?productName={SearchTerm}");
            //if (res.IsSuccessStatusCode)
            //{
            //    ViewBag.Products = await res.Content.ReadFromJsonAsync<List<Product>>();
            //}
            ViewBag.Products = new List<Product>() { new Product {
                Name="Perfume", Category="Electronics", Description="Good fragrance",
                ImageUrl= "https://shop.azelab.com/images/home-4/1.jpg" ,
                Price=5000, Reviews = new List<string>(){ "","", "", ""}, Id="2"
            } , new Product {
                Name="Perfume", Category="Hardware", Description="Good fragrance",
                ImageUrl= "https://shop.azelab.com/images/home-4/1.jpg" ,
                Price=5000, Reviews = new List<string>(){ "","", "", ""}, Id ="3"
            }};
            return View("Index");
        }
     
    }
}
