namespace ViewApp.Models
{
    public class Category
    {
        public string CategoryName { get; set; }
        public string Description { get; set; }
        public string? ParentCategoryId { get; set; }
    }
}
