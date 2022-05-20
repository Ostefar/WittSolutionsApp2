using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using WittSolutionsApp2.Data;
using WittSolutionsApp2.Models;

namespace WittSolutionsApp2.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : Controller
    {

        private readonly SqlDbContext _dbContext;
        private readonly IConfiguration _configuration;
        public UserController(SqlDbContext ctx, IConfiguration configuration)
        {
            _dbContext = ctx;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("ViewUsers")]
        public IQueryable<User> GetUsers()
        {
            return _dbContext.Users.GroupBy(user => user.Id)
                  .Select(group =>
                        new User
                        {
                            Id = group.Key,
                            FirstName = group.FirstOrDefault().FirstName,
                            LastName = group.FirstOrDefault().LastName,
                            UserName = group.FirstOrDefault().UserName,
                            Password = group.FirstOrDefault().Password,
                            Phone = group.FirstOrDefault().Phone,
                            Email = group.FirstOrDefault().Email,
                            Address_id = group.FirstOrDefault().Address_id,

                        })
                  .OrderBy(group => group.FirstName);
        }
        [HttpGet]
        [Route("GetUserBy{id}")]
        public IActionResult GetById(int id)
        {
            var user = _dbContext.Users.Where(x => x.Id == id).FirstOrDefault();
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPost]
        [Route("CreateUsers")]
        public async Task<IActionResult> Post(User payload)
        {
            if (payload is not null)
            {
                _dbContext.Users.Add(payload);
                await _dbContext.SaveChangesAsync();
                return Ok(payload);
            }
            else {
                return BadRequest(payload);
            }
        }
        [HttpDelete]
        [Route("DeleteUser{id}")]
        public void DeleteUser(int id)
        {
                _dbContext.Users.Remove(_dbContext.Users.FirstOrDefault(x => x.Id == id));
                _dbContext.SaveChanges();
            
        }

        [HttpPut]
        [Route("UpdateUser{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _dbContext.Entry(user).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        private bool UserExists(int id)
        {
            return _dbContext.Users.Any(x => x.Id == id);
        }
    }
}
