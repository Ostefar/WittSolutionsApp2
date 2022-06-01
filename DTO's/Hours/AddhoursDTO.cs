namespace WittSolutionsApp2.DTO_s.Hours
{
    public class AddHoursDTO { 

        public int Id { get; set; }

        public int HoursToRegistrate { get; set; }

        public DateTime RegistrationDate { get; set; }

        public string RegistrationDateString { get; set; }

        public string Note { get; set; }
        public int? CustomerId { get; set; }
        public int? EmployeeId { get; set; }
        public int? ProjectId { get; set; }

    }
}
