namespace WittSolutionsApp2.DTO_s.User
{
    public class AddUserDTO { 

        public int Id { get; set; }

        public string FirstName { get; set; }

     
        public string LastName { get; set; }

        public string UserName { get; set; }

     
        public string Password { get; set; }

        public int Phone { get; set; }

        public string Email { get; set; }

        public string AddressLine1 { get; set; }

        public string? AddressLine2 { get; set; }

        public string City { get; set; }
  
        public string ZipCode { get; set; }

        public string Country { get; set; }
    }
}
