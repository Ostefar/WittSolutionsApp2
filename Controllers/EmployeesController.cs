using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WittSolutionsApp2.Data;
using WittSolutionsApp2.DTO_s.Employee;
using WittSolutionsApp2.Models;

namespace WittSolutionsApp2.Controllers
{
    [Route("/employee")]
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
        [Route("ViewEmployees")]
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


        [HttpGet]
        [Route("GetEmployeeBy{id}")]
        public IActionResult GetById(int id)
        {
            var employee = _dbContext.Employees.Where(x => x.Id == id).FirstOrDefault();
            var addressId = employee.AddressId;
            var address = _dbContext.Address.Where(x => x.Id == addressId).FirstOrDefault();

            if (employee == null | address == null)
                return NotFound();

            AddEmployeeDTO employeeToEdit = new AddEmployeeDTO()
            {
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Phone = employee.Phone,
                Email = employee.Email,
                JobTitle = employee.JobTitle,
                BirthDateString = employee.BirthDate.ToString("yyyy-MM-dd"),
                HiringDateString = employee.HiringDate.ToString("yyyy-MM-dd"),
                Salary = employee.Salary,
                VacationDays = employee.VacationDays,
                VacationDaysLeft = employee.VacationDaysLeft,
                SickDays = employee.SickDays,
                AddressLine1 = address.AddressLine1,
                AddressLine2 = address.AddressLine2,
                Country = address.Country,
                City = address.City,
                ZipCode = address.ZipCode,
            };
            return Ok(employeeToEdit);
        }

        [HttpPost]
        [Route("CreateEmployee")]
        public async Task<IActionResult> Post(AddEmployeeDTO payload)
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

                Employees newEmployeeData = new Employees()
                {
                    FirstName = payload.FirstName,
                    LastName = payload.LastName,
                    Phone = payload.Phone,
                    Email = payload.Email,
                    JobTitle = payload.JobTitle,
                    BirthDate = payload.BirthDate,
                    HiringDate = payload.HiringDate,
                    Salary = payload.Salary,
                    VacationDays = payload.VacationDays,
                    VacationDaysLeft = payload.VacationDaysLeft,
                    SickDays = payload.SickDays,
                    Address = newAddressData,
                };

                _dbContext.Employees.Add(newEmployeeData);
                await _dbContext.SaveChangesAsync();
                return Ok(payload);
            }
            else
            {
                return BadRequest(payload);
            }
        }

        [HttpDelete]
        [Route("DeleteEmployee{id}")]
        public void DeleteEmployee(int id)
        {
            var employee = _dbContext.Employees.Where(x => x.Id == id).FirstOrDefault();
            var addressId = employee.AddressId;


            _dbContext.Employees.Remove(_dbContext.Employees.FirstOrDefault(x => x.Id == id));
            _dbContext.Address.Remove(_dbContext.Address.FirstOrDefault(x => x.Id == addressId));
            _dbContext.SaveChanges();

        }

        [HttpPut]
        [Route("UpdateEmployee{id}")]
        public async Task<IActionResult> UpdateEmployee(AddEmployeeDTO payload)
        {
            var employee = _dbContext.Employees
            .Where(x => x.Id == payload.Id)
            .Include(x => x.Address)
            .SingleOrDefault();

            var addressId = employee.AddressId;

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

                Employees employeeData = new Employees()
                {
                    Id = payload.Id,
                    FirstName = payload.FirstName,
                    LastName = payload.LastName,
                    Phone = payload.Phone,
                    Email = payload.Email,
                    JobTitle = payload.JobTitle,
                    BirthDate = payload.BirthDate,
                    HiringDate = payload.HiringDate,
                    Salary = payload.Salary,
                    VacationDays = payload.VacationDays,
                    VacationDaysLeft = payload.VacationDaysLeft,
                    SickDays = payload.SickDays,
                    AddressId = addressId,
                    Address = addressData,
                };
                _dbContext.Entry(employee).CurrentValues.SetValues(employeeData);
                _dbContext.Entry(address).CurrentValues.SetValues(addressData);
                await _dbContext.SaveChangesAsync();
                return Ok(payload);
            }
            else
            {
                return BadRequest(payload);
            }
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
