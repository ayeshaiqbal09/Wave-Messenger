using WaveMessenger.Application.Contracts.User;
using WaveMessenger.Domain.Entities;

namespace WaveMessenger.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);

    Task<User?> GetByUserNameAsync(string userName);

    Task AddAsync(User user);

    Task SaveChangesAsync();

    Task<User?> GetByIdAsync(Guid id);


    Task<List<User>> GetUsersAsync(Guid currentUserId);

    void Update(User user);
}