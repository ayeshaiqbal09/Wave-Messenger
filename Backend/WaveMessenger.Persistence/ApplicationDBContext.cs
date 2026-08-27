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
    public DbSet<Conversation> Conversations => Set<Conversation>();

    public DbSet<Message> Messages => Set<Message>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Conversation>()
        .HasOne<User>()
        .WithMany()
        .HasForeignKey(c => c.UserOneId)
        .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<Conversation>()
        .HasOne<User>()
        .WithMany()
        .HasForeignKey(c => c.UserTwoId)
        .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<Message>()
        .HasOne<User>()
        .WithMany()
        .HasForeignKey(m => m.SenderId)
        .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<Message>()
        .HasOne<Conversation>()
        .WithMany()
        .HasForeignKey(m => m.ConversationId)
        .OnDelete(DeleteBehavior.Cascade);
}
}