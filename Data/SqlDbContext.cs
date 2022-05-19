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

        public DbSet<Employee>? Employee { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<User>().Property(x => x.Id).HasDefaultValueSql("NEWID()");
            builder.Entity<Employee>().Property(x => x.Id).HasDefaultValueSql("NEWID()");
        }
    }
}
