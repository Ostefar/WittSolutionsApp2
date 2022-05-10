using Microsoft.AspNetCore.Mvc;
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
        [Route("GetUsers")]
        public IQueryable<User> GetUsers()
        {
            return _dbContext.Users.GroupBy(user => user.Id)
                  .Select(group =>
                        new User
                        {
                            Id = group.FirstOrDefault().Id,
                            FirstName = group.FirstOrDefault().FirstName,
                            LastName = group.FirstOrDefault().LastName
                        })
                  .OrderBy(group => group.FirstName);
        }
    }
}
