using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WittSolutionsApp2.Models
{
    public class Projects
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Project name field is required.")]
        [StringLength(maximumLength: 45, MinimumLength = 2)]
        public string ProjectName { get; set; }

        [Required(ErrorMessage = "Note field is required.")]
        [StringLength(maximumLength: 150, MinimumLength = 2)]
        public string Note { get; set; }

        [Required(ErrorMessage = "Start date field is required.")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "Deadline date field is required.")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime DeadlineDate { get; set; }

        public int EstimatedHours { get; set; }

        public int HourPrice { get; set; }

        public int ProjectPrice { get; set; }

        public int? HoursSpend { get; set; }

        public int? EmployeeId { get; set; }

        [ForeignKey("EmployeeId")]
        public Employees? Employees { get; set; }

        public int? CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public Customers? Customers { get; set; }
    }
}
