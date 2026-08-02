using WaveMessenger.Domain.Entities;

namespace WaveMessenger.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);

    Task<User?> GetByUserNameAsync(string userName);

    Task AddAsync(User user);

    Task SaveChangesAsync();
}