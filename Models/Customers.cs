using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WittSolutionsApp2.Models
{
    public class Customers
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Company name field is required.")]
        [StringLength(maximumLength: 50, MinimumLength = 2)]
        public string CompanyName { get; set; }

        [Required(ErrorMessage = "Website url field is required.")]
        [StringLength(maximumLength: 75, MinimumLength = 2)]
        public string? WebsiteUrl { get; set; }

        public string? ContactPersonName { get; set; }

        public int Phone { get; set; }

        [Required(ErrorMessage = "Email field is required.")]
        [StringLength(maximumLength: 45, MinimumLength = 2)]
        public string Email { get; set; }

        [Required(ErrorMessage = "Vat number field is required.")]
        [StringLength(maximumLength: 14, MinimumLength = 2)]
        public string VatNumber { get; set; }

        public int? AddressId { get; set; }

        [ForeignKey("AddressId")]
        public Address? Address { get; set; }

        public int? ProjectId { get; set; }

        public ICollection<Projects>? Projects { get; set; }

        public ICollection<Hours>? Hours { get; set; }
    }
}
