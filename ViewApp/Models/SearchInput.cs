using System.ComponentModel.DataAnnotations;

namespace ViewApp.Models
{
    public class SearchInput
    {
        [Required]
        public string SearchTerm { get; set; }
    }
}
