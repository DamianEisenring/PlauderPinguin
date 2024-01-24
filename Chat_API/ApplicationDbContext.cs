using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Chat_API.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Message> Messages { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
    }
}