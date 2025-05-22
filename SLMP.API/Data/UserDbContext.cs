using Microsoft.EntityFrameworkCore;
using SLMP.API.Models.Domain;

namespace SLMP.API.Data
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; } 

        public DbSet<PantryItem> PantryItems { get; set; }

        public DbSet<ShoppingItem> ShoppingItems { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }

    }
}
 //db context for all the items we need