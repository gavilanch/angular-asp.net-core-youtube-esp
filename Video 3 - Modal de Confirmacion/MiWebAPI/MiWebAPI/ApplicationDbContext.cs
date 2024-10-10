using Microsoft.EntityFrameworkCore;
using MiWebAPI.Entidades;

namespace MiWebAPI
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Laptop> Laptops { get; set; }
    }
}
