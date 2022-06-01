using Microsoft.AspNetCore.Mvc;
using WittSolutionsApp2.Data;
using WittSolutionsApp2.DTO_s.Hours;
using WittSolutionsApp2.Models;

namespace WittSolutionsApp2.Controllers
{
    [Route("/hours")]
    [ApiController]
    public class HoursController : ControllerBase
    {
        private readonly SqlDbContext _dbContext;
        private readonly IConfiguration _configuration;
        public HoursController(SqlDbContext ctx, IConfiguration configuration)
        {
            _dbContext = ctx;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("RegistrateHours")]
        public async Task<IActionResult> Post(AddHoursDTO payload)
        {
            var project = _dbContext.Projects.Where(x => x.Id == payload.ProjectId).FirstOrDefault();
            var employeeId = project.EmployeeId;
            var customerId = project.CustomerId;

            if (payload is not null)
            {
                Hours newHoursData = new Hours()
                {
                    HoursToRegistrate = payload.HoursToRegistrate,
                    RegistrationDate = payload.RegistrationDate,
                    Note = payload.Note,
                    CustomerId =customerId,
                    EmployeeId = employeeId,
                    ProjectId = payload.ProjectId,
                };

                _dbContext.Hours.Add(newHoursData);
                await _dbContext.SaveChangesAsync();
                return Ok(payload);
            }
            else
            {
                return BadRequest(payload);
            }
        }

        [HttpGet]
        [Route("ViewHours{id}")]
        public async Task<IActionResult> GetAll(int id)
        {
            // skal kun loade timer fra et project
            var result = (from hours in _dbContext.Hours where hours.ProjectId == id
                          join project in _dbContext.Projects on hours.ProjectId equals project.Id
                          join customer in _dbContext.Customers on hours.CustomerId equals customer.Id
                          join employee in _dbContext.Employees on hours.EmployeeId equals employee.Id
                          select new
                          {
                              Id = hours.Id,
                              HoursToRegistrate = hours.HoursToRegistrate,
                              RegistrationDate = hours.RegistrationDate.ToShortDateString(),
                              Note = hours.Note,
                              CompanyName = customer.CompanyName,
                              EmployeeName = employee.FirstName + " " + employee.LastName,
                              ProjectName = project.ProjectName,
                              

                          }).ToList();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetHoursById{id}")]
        public IActionResult GetById(int id)
        {
            var hours = _dbContext.Hours.Where(x => x.Id == id).FirstOrDefault();

            if (hours == null)
                return NotFound();

            AddHoursDTO hoursToEdit = new AddHoursDTO()
            {
                HoursToRegistrate = hours.HoursToRegistrate,
                RegistrationDateString = hours.RegistrationDate.ToString("yyyy-MM-dd"),
                Note = hours.Note,
                ProjectId = hours.ProjectId,
                CustomerId = hours.CustomerId,
                EmployeeId = hours.EmployeeId,
            };
            return Ok(hoursToEdit);
        }

        [HttpDelete]
        [Route("DeleteRegistration{id}")]
        public void DeleteRegistration(int id)
        {
            var project = _dbContext.Hours.Where(x => x.Id == id).FirstOrDefault();

            _dbContext.Hours.Remove(project);
            _dbContext.SaveChanges();

        }

        [HttpPut]
        [Route("UpdateHours{id}")]
        public async Task<IActionResult> UpdateProject(AddHoursDTO payload)
        {
            var hours = _dbContext.Hours.Where(x => x.Id == payload.Id).FirstOrDefault();

            if (payload is not null)
            {
                Hours hoursData = new Hours()
                {
                    Id = payload.Id,
                    HoursToRegistrate = payload.HoursToRegistrate,
                    RegistrationDate = payload.RegistrationDate,
                    Note = payload.Note,
                    CustomerId = payload.CustomerId,
                    EmployeeId = payload.EmployeeId,
                    ProjectId = payload.ProjectId,

                };
                _dbContext.Entry(hours).CurrentValues.SetValues(hoursData);
                await _dbContext.SaveChangesAsync();
                return Ok(payload);
            }
            else
            {
                return BadRequest(payload);
            }
        }

        /*
        

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
        [Route("GetAllProjectNames")]
        public async Task<IActionResult> GetAllProjectNames()
        {

            var result = (from project in _dbContext.Projects
                          select new
                          {
                              Id = project.Id,
                              ProjectName = project.ProjectName,

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

                _dbContext.Projects.Add(newProjectData);
                await _dbContext.SaveChangesAsync();
                return Ok(payload);
            }
            else
            {
                return BadRequest(payload);
            }
        }

        */
    }
}
