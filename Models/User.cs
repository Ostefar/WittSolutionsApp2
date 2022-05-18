using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WittSolutionsApp2.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "First name field is required.")]
        [StringLength(maximumLength: 50, MinimumLength = 2)]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last field is required.")]
        [StringLength(maximumLength: 45, MinimumLength = 2)]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Username field is required.")]
        [StringLength(maximumLength: 20, MinimumLength = 2)]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password field is required.")]
        [StringLength(maximumLength: 100, MinimumLength = 2)]
        public string Password { get; set; }

        public int Phone { get; set; }

        [Required(ErrorMessage = "Email field is required.")]
        [StringLength(maximumLength: 45, MinimumLength = 2)]
        public string Email { get; set; }
        
        public int Address_id { get; set; }
    }
}





