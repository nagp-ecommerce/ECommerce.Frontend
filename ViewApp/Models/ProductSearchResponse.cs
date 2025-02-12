
namespace ViewApp.Models
{
    public class ProductSearchResponse
    {
        public IEnumerable<Product> Products { get; set; }
        public long TotalCount { get; set; }
    }
}
