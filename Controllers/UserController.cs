using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
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
                            Id = group.FirstOrDefault().Id,
                            FirstName = group.FirstOrDefault().FirstName,
                            LastName = group.FirstOrDefault().LastName
                        })
                  .OrderBy(group => group.FirstName);
        }

        [HttpPost]
        [Route("CreateUsers")]
        public JsonResult Post(User objUser)
        {
            string query = @"Insert into dbo.Student values
                ('" + objUser.FirstName + "','" + objUser.LastName + "')";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ConnStr");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }
    }
}
