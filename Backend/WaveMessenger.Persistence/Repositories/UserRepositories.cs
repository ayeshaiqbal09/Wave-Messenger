using Microsoft.EntityFrameworkCore;
using WaveMessenger.Application.Interfaces;
using WaveMessenger.Domain.Entities;
using WaveMessenger.Persistence.Context;

namespace WaveMessenger.Persistence.Repositories;

    public class UserRepository: IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

       public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetByUserNameAsync(string userName)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
        }

        public async Task AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await _context.Users.FindAsync(id);
        }

        public void Update(User user)
        {
            _context.Users.Update(user);
        }

        public async Task<List<User>> GetUsersAsync(Guid userId)
        {
            return await _context.Users
                .Where(user => user.Id != userId)
                .OrderBy(user => user.DisplayName)
                .ToListAsync();
        }
    }
