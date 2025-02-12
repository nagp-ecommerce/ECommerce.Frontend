﻿using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using ViewApp.Models;

namespace ViewApp.Controllers
{
    [Route("[controller]")]
    public class PdpController(HttpClient httpClient, IConfiguration config) : Controller
    {
        [Route("{id}")]
        [Route("[action]")]
        public async Task<IActionResult> IndexAsync(string id)
        {
            var res = await httpClient.GetAsync($"{config["ApiUrl:Product"]}/{id}");
            if (res.IsSuccessStatusCode)
            {
                var product = await res.Content.ReadFromJsonAsync<Product>();
                ViewBag.Product = product;
            }
            return View();
        }
    }
}
