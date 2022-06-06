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
                              StartDate = project.StartDate.ToShortDateString(),
                              DeadlineDate = project.DeadlineDate.ToShortDateString(),
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
                StartDateString = project.StartDate.ToString("yyyy-MM-dd"),
                DeadlineDateString = project.StartDate.ToString("yyyy-MM-dd"),
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

                _dbContext.Projects.Add(newProjectData);
                await _dbContext.SaveChangesAsync();
                return Ok(payload);
            }
            else
            {
                return BadRequest(payload);
            }
        }
        
         
        [HttpDelete]
        [Route("DeleteProject{id}")]
        public void DeleteProject(int id)
        {
            var project = _dbContext.Projects.Where(x => x.Id == id).FirstOrDefault();
            var hoursList = _dbContext.Hours.Where(x => x.ProjectId == id).ToList();

            

            if (hoursList != null) { 
                foreach (var hour in hoursList) { 
                _dbContext.Hours.Remove(hour);
                }
            }

            _dbContext.Projects.Remove(project);
            _dbContext.SaveChanges();

        }

        [HttpPut]
        [Route("UpdateProject{id}")]
        public async Task<IActionResult> UpdateProject(AddProjectDTO payload)
        {
            var project = _dbContext.Projects.Where(x => x.Id == payload.Id).FirstOrDefault();

            if (payload is not null)
            {
                Projects projectData = new Projects()
                {
                    Id = payload.Id,
                    ProjectName = payload.ProjectName,
                    Note = payload.Note,
                    StartDate = payload.StartDate,
                    DeadlineDate = payload.DeadlineDate,
                    EstimatedHours = payload.EstimatedHours,
                    HourPrice = payload.HourPrice,
                    ProjectPrice = payload.ProjectPrice,
                    HoursSpend = payload.HoursSpend,
                    CustomerId = payload.CustomerId,
                    EmployeeId = payload.EmployeeId

                };
                _dbContext.Entry(project).CurrentValues.SetValues(projectData);
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
