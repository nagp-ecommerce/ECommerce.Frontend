using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using ViewApp.Models;

namespace ViewApp.Controllers
{
    [Route("product-details/{id}")]
    public class PdpController(HttpClient httpClient, IConfiguration config) : Controller
    {
        [HttpGet]
        //[Route("{id}")]
        //[Route("[action]")]
        public IActionResult Index(string id)
        {
            // maybe call productdetail api
            ViewBag.Product =  new Product {
                Name="Pdproduct", Category="Electronics", Description="Good fragrance",
                ImageUrl= "https://shop.azelab.com/images/home-4/1.jpg" ,
                Price=5000, Reviews = new List<string>(){ "","", "", ""}, Id=id
            };
            return View();
        }
    }
}
