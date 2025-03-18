using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using ViewApp.Models;

namespace ViewApp.Controllers
{
    [Route("[controller]")]
    public class PlpController(HttpClient httpClient, IConfiguration config) : Controller
    {

        [Route("[action]")]
        [Route("{category?}")]
        [HttpGet]
        public async Task<IActionResult> Index(string? category)
        {
            var baseUrl = Environment.GetEnvironmentVariable("BaseApiUrl") ?? config["ApiUrl:Base"];
            var categoryResponse = await httpClient.GetAsync($"{baseUrl}/api/category/all");
            var Categories = new List<Category>();
            if (categoryResponse.IsSuccessStatusCode)
            {
                Categories = await categoryResponse.Content.ReadFromJsonAsync<List<Category>>();
            }
            ViewBag.Categories = Categories;

            // fetch all products in category
            var Products = new List<Product>();
            var res = await httpClient.GetAsync($"{baseUrl}/api/category/GetProductsByCategory?categoryName={category}");
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
            var baseUrl = Environment.GetEnvironmentVariable("BaseApiUrl") ?? config["ApiUrl:Base"];
            var res = await httpClient.GetAsync($"{baseUrl}/api/search/product?productName={search_term}");
            if (res.IsSuccessStatusCode)
            {
                var result = await res.Content.ReadFromJsonAsync<ProductSearchResponse>();
                ViewBag.Products = result?.Products;
            }
            return View("Index");
        }
     
    }
}
