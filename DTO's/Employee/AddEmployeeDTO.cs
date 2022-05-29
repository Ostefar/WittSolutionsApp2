namespace WittSolutionsApp2.DTO_s.Employee
{
    public class AddEmployeeDTO { 

        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int Phone { get; set; }

        public string Email { get; set; }

        public int JobTitle { get; set; }

        public string BirthDateString { get; set; }

        public string HiringDateString { get; set; }

        public DateTime BirthDate { get; set; }

        public DateTime HiringDate { get; set; }

        public int Salary { get; set; }

        public int VacationDays { get; set; }

        public int VacationDaysLeft { get; set; }

        public int SickDays { get; set; }

        public string AddressLine1 { get; set; }

        public string? AddressLine2 { get; set; }

        public string City { get; set; }
  
        public string ZipCode { get; set; }

        public string Country { get; set; }
    }
}
