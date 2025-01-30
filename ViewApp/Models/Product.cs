﻿namespace ViewApp.Models
{
    public class Product
    {
        public string Id { get; set; }
        public string Name { get; set; } 
        public string Description { get; set; }
        public string Category { get; set; }
        public string ImageUrl { get; set; }
        public double Price { get; set; }
        public List<string> Reviews { get; set; } = new List<string>();
    }
}
