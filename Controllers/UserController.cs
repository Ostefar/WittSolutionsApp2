using Microsoft.AspNetCore.Mvc;
using System.Data;
using WittSolutionsApp2.Data;
using WittSolutionsApp2.Models;

namespace WittSolutionsApp2.Controllers
{
    [Route("api/[controller]")]
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
    }
}
