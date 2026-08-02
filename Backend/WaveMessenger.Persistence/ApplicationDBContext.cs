using Microsoft.EntityFrameworkCore;
using WaveMessenger.Domain.Entities;

namespace WaveMessenger.Persistence.Context;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
}