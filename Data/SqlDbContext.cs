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

        public DbSet<Employees>? Employees { get; set; }

        public DbSet<Address>? Address { get; set; }

        public DbSet<Hours>? Hours { get; set; }

        public DbSet<Customers>? Customers { get; set; }

        public DbSet<Projects>? Projects { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<User>()
            .HasOne<Address>(x => x.Address);
            builder.Entity<Employees>().Property(x => x.Id);
        }
    }
}
