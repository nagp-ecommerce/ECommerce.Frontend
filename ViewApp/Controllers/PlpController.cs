using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using ViewApp.Models;

namespace ViewApp.Controllers
{
    [Route("[controller]")]
    public class PlpController(HttpClient httpClient, IConfiguration config) : Controller
    {
        //[BindProperty]
        //public string SearchTerm { get; set; }

        [Route("[action]")]
        [Route("{category?}")]
        [HttpGet]
        public async Task<IActionResult> Index(string? category)
        {
            var categoryResponse = await httpClient.GetAsync($"{config["ApiUrl:Category"]}/all");
            var Categories = new List<Category>();
            if (categoryResponse.IsSuccessStatusCode)
            {
                Categories = await categoryResponse.Content.ReadFromJsonAsync<List<Category>>();
            }
            ViewBag.Categories = Categories;

            // fetch all products in category
            var Products = new List<Product>();
            var res = await httpClient.GetAsync($"{config["ApiUrl:Category"]}/GetProductsByCategory?categoryName={category}");
            if (res.IsSuccessStatusCode)
            {
                 Products = await res.Content.ReadFromJsonAsync<List<Product>>();
            }
            ViewBag.Products = Products;
            
            return View();
        }


        [Route("")]
        [HttpGet]
        public async Task<IActionResult> Search(string search_term)
        {
            var token = Request.Cookies["AuthToken"];
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var res = await httpClient.GetAsync($"{config["ApiUrl:Search"]}/product?productName={search_term}");
            if (res.IsSuccessStatusCode)
            {
                var result = await res.Content.ReadFromJsonAsync<ProductSearchResponse>();
                ViewBag.Products = result?.Products;
            }
            return View("Index");
        }
     
    }
}
