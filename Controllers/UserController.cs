using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using WittSolutionsApp2.Data;
using WittSolutionsApp2.DTO_s.User;
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
        public async Task<IActionResult> GetAll()
        {
            
            var user = await _dbContext.Users.ToListAsync();

            return Ok(user);
        }
        /*public IQueryable<User> GetUsers()
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
                            AddressId = group.FirstOrDefault().Address_id,

                        })
                  .OrderBy(group => group.FirstName);
        }*/
        [HttpGet]
        [Route("GetUserBy{id}")]
        public IActionResult GetById(int id)
        {
            var user = _dbContext.Users.Where(x => x.Id == id).FirstOrDefault();
            var addressId = user.AddressId;
            var address = _dbContext.Address.Where(x => x.Id == addressId).FirstOrDefault();

            if (user == null | address == null)
                return NotFound();

            AddUserDTO userToEdit = new AddUserDTO()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Password = user.Password,
                Phone = user.Phone,
                Email = user.Email,
                AddressLine1 = address.AddressLine1,
                AddressLine2 = address.AddressLine2,
                Country = address.Country,
                City = address.City,
                ZipCode = address.ZipCode,
            };
            return Ok(userToEdit);
        }

        [HttpPost]
        [Route("CreateUsers")]
        public async Task<IActionResult> Post(AddUserDTO payload)
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

                User newUserData = new User()
                {
                    FirstName = payload.FirstName,
                    LastName = payload.LastName,
                    UserName = payload.UserName,
                    Password = payload.Password,
                    Phone = payload.Phone,
                    Email = payload.Email,
                    Address = newAddressData,
                };

                _dbContext.Users.Add(newUserData);
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
            var user = _dbContext.Users.Where(x => x.Id == id).FirstOrDefault();
            var addressId = user.AddressId;
            

            _dbContext.Users.Remove(_dbContext.Users.FirstOrDefault(x => x.Id == id));
            _dbContext.Address.Remove(_dbContext.Address.FirstOrDefault(x => x.Id == addressId));
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
