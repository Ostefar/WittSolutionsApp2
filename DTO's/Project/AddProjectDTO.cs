namespace WittSolutionsApp2.DTO_s.Project
{
    public class AddProjectDTO { 

        public int Id { get; set; }

        public string ProjectName { get; set; }

        public string Note { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime DeadlineDate { get; set; }

        public int EstimatedHours { get; set; }
        public int HourPrice { get; set; }
        public int ProjectPrice { get; set; }
        public int? HoursSpend { get; set; }
        public int? EmployeeId { get; set; }
        public int? CustomerId { get; set; }

    }
}
