using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WittSolutionsApp2.Data;
using WittSolutionsApp2.DTO_s.Project;
using WittSolutionsApp2.Models;

namespace WittSolutionsApp2.Controllers
{
    [Route("/project")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly SqlDbContext _dbContext;
        private readonly IConfiguration _configuration;
        public ProjectController(SqlDbContext ctx, IConfiguration configuration)
        {
            _dbContext = ctx;
            _configuration = configuration;
        }

        
        [HttpGet]
        [Route("ViewProjects")]
        public async Task<IActionResult> GetAll()
        {

            var result = (from project in _dbContext.Projects
                          select new
                          {
                              Id = project.Id,
                              ProjectName = project.ProjectName,
                              StartDate = project.StartDate,
                              DeadlineDate = project.DeadlineDate,
                              EstimatedHours = project.EstimatedHours,
                              HourPrice = project.HourPrice,
                              ProjectPrice = project.ProjectPrice,
                              HoursSpend = project.HoursSpend,
                              CustomerId = project.CustomerId,
                              EmployeeId = project.EmployeeId,

                          }).ToList();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetAllEmployeeNames")]
        public async Task<IActionResult> GetAllEmployeeNames()
        {

            var result = (from employee in _dbContext.Employees
                          select new
                          {
                              Id = employee.Id,
                              FirstName = employee.FirstName,
                              LastName = employee.LastName,

                          }).ToList();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetAllCustomerNames")]
        public async Task<IActionResult> GetAllCustomerNames()
        {

            var result = (from customer in _dbContext.Customers
                          select new
                          {
                              Id = customer.Id,
                              CompanyName = customer.CompanyName,

                          }).ToList();

            return Ok(result);
        }

        
        [HttpGet]
        [Route("GetProjectBy{id}")]
        public IActionResult GetById(int id)
        {
            var project = _dbContext.Projects.Where(x => x.Id == id).FirstOrDefault();

            if (project == null)
                return NotFound();

            AddProjectDTO projectToEdit = new AddProjectDTO()
            {
                ProjectName = project.ProjectName,
                Note = project.Note,
                StartDate = project.StartDate,
                DeadlineDate = project.DeadlineDate,
                EstimatedHours = project.EstimatedHours,
                HourPrice = project.HourPrice,
                ProjectPrice = project.ProjectPrice,
                HoursSpend = project.HoursSpend,
                CustomerId = project.CustomerId,
                EmployeeId = project.EmployeeId,
            };
            return Ok(projectToEdit);
        } 

        [HttpPost]
        [Route("CreateProject")]
        public async Task<IActionResult> Post(AddProjectDTO payload)
        {
            if (payload is not null)
            {
                Projects newProjectData = new Projects()
                {
                    ProjectName = payload.ProjectName,
                    Note = payload.Note,
                    StartDate = payload.StartDate,
                    DeadlineDate = payload.DeadlineDate,
                    EstimatedHours = payload.EstimatedHours,
                    HourPrice = payload.HourPrice,
                    ProjectPrice = payload.ProjectPrice,
                    HoursSpend = payload.HoursSpend,
                    CustomerId = payload.CustomerId,
                    EmployeeId = payload.EmployeeId,
                };

                // failer fordi customerid og empoyeeid 1 ikke eksistere. tilføj evt også customer/employee field og hent/udfyld
                // dataen fra databasen til disse felter

                _dbContext.Projects.Add(newProjectData);
                await _dbContext.SaveChangesAsync();
                return Ok(payload);
            }
            else
            {
                return BadRequest(payload);
            }
        }
        
         /*
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
        } */
    }
}
