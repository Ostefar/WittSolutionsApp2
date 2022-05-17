using Microsoft.EntityFrameworkCore;
using WittSolutionsApp2.Models;

namespace WittSolutionsApp2.Data
{
    public class SqlDbContext : DbContext
    {
        public SqlDbContext(DbContextOptions<SqlDbContext> options)
               : base(options)
        {
        }
        public DbSet<User>? Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<Employee>? Employee { get; set; }
    }
}
