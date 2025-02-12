namespace ViewApp.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; } 
        public string? Description { get; set; }
        public string Category { get; set; }
        public int? InStockQuantity { get; set; }
        public double Price { get; set; }
        public string? Brand { get; set; }
        public string? MainImageUrl { get; set; }
        //public List<string> Reviews { get; set; } = new List<string>();
    }
}
