using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WittSolutionsApp2.Data;
using WittSolutionsApp2.Models;

namespace WittSolutionsApp2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly SqlDbContext _dbContext;
        private readonly IConfiguration _configuration;
        public EmployeesController(SqlDbContext ctx, IConfiguration configuration)
        {
            _dbContext = ctx;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("ViewUsers")]
        public async Task<IActionResult> GetAll()
        {

            var result = (from employee in _dbContext.Employees
                          join address in _dbContext.Address on employee.AddressId equals address.Id
                          select new
                          {
                              Id = employee.Id,
                              FirstName = employee.FirstName,
                              LastName = employee.LastName,
                              JobTitle = employee.JobTitle,
                              Salary = employee.Salary,
                              Phone = employee.Phone,
                              Email = employee.Email,
                              AddressLine1 = address.AddressLine1,
                              AddressLine2 = address.AddressLine2,
                              Country = address.Country,
                              City = address.City,
                              ZipCode = address.ZipCode

                          }).ToList();

            return Ok(result);
        }

        /*// GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee()
        {
          if (_context.Employee == null)
          {
              return NotFound();
          }
            return await _context.Employee.ToListAsync();
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
          if (_context.Employee == null)
          {
              return NotFound();
          }
            var employee = await _context.Employee.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Employees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
          if (_context.Employee == null)
          {
              return Problem("Entity set 'SqlDbContext.Employee'  is null.");
          }
            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (_context.Employee == null)
            {
                return NotFound();
            }
            var employee = await _context.Employee.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return (_context.Employee?.Any(e => e.Id == id)).GetValueOrDefault();
        }*/
    }
}
