using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WittSolutionsApp2.Models
{
    public class Employees
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
        public int Phone { get; set; }

        [Required(ErrorMessage = "Email field is required.")]
        [StringLength(maximumLength: 45, MinimumLength = 2)]
        public string Email { get; set; }

        public int JobTitle { get; set; }

        [Required(ErrorMessage = "Birth date field is required.")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime BirthDate { get; set; }

        [Required(ErrorMessage = "Hiring date field is required.")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime HiringDate { get; set; }

        public int Salary { get; set; }

        public int VacationDays { get; set; }

        public int VacationDaysLeft { get; set; }

        public int SickDays { get; set; }

        public ICollection<Projects>? Projects { get; set; }

        public ICollection<Hours>? Hours { get; set; }

        public int? AddressId { get; set; }

        [ForeignKey("AddressId")]
        public Address? Address { get; set; }
    }
}
