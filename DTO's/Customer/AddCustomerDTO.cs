namespace WittSolutionsApp2.DTO_s.User
{
    public class AddCustomerDTO { 

        public int Id { get; set; }

        public string CompanyName { get; set; }

        public string WebsiteUrl { get; set; }

        public string? ContactPersonName { get; set; }

        public int Phone { get; set; }

        public string Email { get; set; }

        public int VatNumber { get; set; }

        public string AddressLine1 { get; set; }

        public string? AddressLine2 { get; set; }

        public string City { get; set; }
  
        public string ZipCode { get; set; }

        public string Country { get; set; }
    }
}
