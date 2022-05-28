using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WittSolutionsApp2.Data;
using WittSolutionsApp2.DTO_s.User;
using WittSolutionsApp2.Models;

namespace WittSolutionsApp2.Controllers
{
    [Route("/customer")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly SqlDbContext _dbContext;
        private readonly IConfiguration _configuration;
        public CustomerController(SqlDbContext ctx, IConfiguration configuration)
        {
            _dbContext = ctx;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("ViewCustomers")]
        public async Task<IActionResult> GetAll()
        {

            var result = (from customer in _dbContext.Customers
                          join address in _dbContext.Address on customer.AddressId equals address.Id
                          select new
                          {
                              Id = customer.Id,
                              CompanyName = customer.CompanyName,
                              WebsiteUrl = customer.WebsiteUrl,
                              ContactPersonName = customer.ContactPersonName,
                              Phone = customer.Phone,
                              Email = customer.Email,
                              VatNumber = customer.VatNumber,
                              AddressLine1 = address.AddressLine1,
                              AddressLine2 = address.AddressLine2,
                              Country = address.Country,
                              City = address.City,
                              ZipCode = address.ZipCode

                          }).ToList();

            return Ok(result);
        }

        
        [HttpGet]
        [Route("GetCustomerBy{id}")]
        public IActionResult GetById(int id)
        {
            var customer = _dbContext.Customers.Where(x => x.Id == id).FirstOrDefault();
            var addressId = customer.AddressId;
            var address = _dbContext.Address.Where(x => x.Id == addressId).FirstOrDefault();

            if (customer == null | address == null)
                return NotFound();

            AddCustomerDTO customerToEdit = new AddCustomerDTO()
            {
                CompanyName = customer.CompanyName,
                WebsiteUrl = customer.WebsiteUrl,
                ContactPersonName = customer.ContactPersonName,
                Phone = customer.Phone,
                Email = customer.Email,
                VatNumber = customer.VatNumber,
                AddressLine1 = address.AddressLine1,
                AddressLine2 = address.AddressLine2,
                Country = address.Country,
                City = address.City,
                ZipCode = address.ZipCode,
            };
            return Ok(customerToEdit);
        }

        [HttpPost]
        [Route("CreateCustomer")]
        public async Task<IActionResult> Post(AddCustomerDTO payload)
        {
            if (payload is not null)
            {
                Address newAddressData = new Address()
                {
                    AddressLine1 = payload.AddressLine1,
                    AddressLine2 = payload.AddressLine2,
                    Country = payload.Country,
                    City = payload.City,
                    ZipCode = payload.ZipCode
                };

                Customers newCustomerData = new Customers()
                {
                    CompanyName = payload.CompanyName,
                    WebsiteUrl = payload.WebsiteUrl,
                    ContactPersonName = payload.ContactPersonName,
                    Phone = payload.Phone,
                    Email = payload.Email,
                    VatNumber = payload.VatNumber,
                    Address = newAddressData,
                };

                _dbContext.Customers.Add(newCustomerData);
                await _dbContext.SaveChangesAsync();
                return Ok(payload);
            }
            else
            {
                return BadRequest(payload);
            }
        }
        
         
        [HttpDelete]
        [Route("DeleteCustomer{id}")]
        public void DeleteEmployee(int id)
        {
            var customer = _dbContext.Customers.Where(x => x.Id == id).FirstOrDefault();
            var addressId = customer.AddressId;


            _dbContext.Customers.Remove(_dbContext.Customers.FirstOrDefault(x => x.Id == id));
            _dbContext.Address.Remove(_dbContext.Address.FirstOrDefault(x => x.Id == addressId));
            _dbContext.SaveChanges();

        }

        [HttpPut]
        [Route("UpdateCustomer{id}")]
        public async Task<IActionResult> UpdateCustomer(AddCustomerDTO payload)
        {
            var customer = _dbContext.Customers
            .Where(x => x.Id == payload.Id)
            .Include(x => x.Address)
            .SingleOrDefault();

            var addressId = customer.AddressId;

            var address = _dbContext.Address.Where(x => x.Id == addressId).SingleOrDefault();

            if (payload is not null)
            {
                Address addressData = new Address()
                {
                    Id = addressId,
                    AddressLine1 = payload.AddressLine1,
                    AddressLine2 = payload.AddressLine2,
                    Country = payload.Country,
                    City = payload.City,
                    ZipCode = payload.ZipCode
                };

                Customers customerData = new Customers()
                {
                    Id = payload.Id,
                    CompanyName = payload.CompanyName,
                    WebsiteUrl = payload.WebsiteUrl,
                    ContactPersonName = payload.ContactPersonName,
                    Phone = payload.Phone,
                    Email = payload.Email,
                    VatNumber = payload.VatNumber,
                    AddressId = addressId,
                    Address = addressData,
                };
                _dbContext.Entry(customer).CurrentValues.SetValues(customerData);
                _dbContext.Entry(address).CurrentValues.SetValues(addressData);
                await _dbContext.SaveChangesAsync();
                return Ok(payload);
            }
            else
            {
                return BadRequest(payload);
            }
        } 
    }
}
