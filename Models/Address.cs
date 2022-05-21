using System.ComponentModel.DataAnnotations;

namespace WittSolutionsApp2.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Address line 1 field is required.")]
        [StringLength(maximumLength: 50, MinimumLength = 2)]
        public string AddressLine1 { get; set; }


        public string? AddressLine2 { get; set; }

        [Required(ErrorMessage = "City field is required.")]
        [StringLength(maximumLength: 35, MinimumLength = 2)]
        public string City { get; set; }

        [Required(ErrorMessage = "Zip code field is required.")]
        [StringLength(maximumLength: 4, MinimumLength = 4)]
        public string ZipCode { get; set; }

        public string Country { get; set; }

        public ICollection<User> Users { get; set; }

    }
}
