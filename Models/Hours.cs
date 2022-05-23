using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WittSolutionsApp2.Models
{
    public class Hours
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int HoursToRegistrate { get; set; }

        [Required(ErrorMessage = "Registration date field is required.")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime RegistrationDate { get; set; }

        [Required(ErrorMessage = "Note field is required.")]
        [StringLength(maximumLength: 100, MinimumLength = 2)]
        public string? Note { get; set; }

        public int? EmployeeId { get; set; }

        [ForeignKey("EmployeeId")]
        public Employees? Employees { get; set; }

        public int? CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public Customers? Customers { get; set; }

        public int? ProjectId { get; set; }

        [ForeignKey("ProjectId")]
        public Projects? Projects { get; set; }
    }
}
