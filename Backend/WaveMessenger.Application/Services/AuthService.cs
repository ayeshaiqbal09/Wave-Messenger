using Microsoft.AspNetCore.Identity;
using WaveMessenger.Application.Contracts.Auth;
using WaveMessenger.Application.Interfaces;
using WaveMessenger.Domain.Entities;

namespace WaveMessenger.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher<User> _passwordHasher;

    public AuthService(
        IUserRepository userRepository,
        IPasswordHasher<User> passwordHasher)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task<RegisterResponse?> RegisterAsync(RegisterRequest request)
    {
        var existingUser = await _userRepository.GetByEmailAsync(request.Email);
        if (existingUser != null)
        {
            throw new Exception("Email is already registered.");
        }

        var existingUserName =
        await _userRepository.GetByUserNameAsync(request.UserName);

        if (existingUserName != null)
        {
            throw new Exception("Username is already taken.");
        }

        var user = new User
        {
            Email = request.Email,
            UserName = request.UserName,
            DisplayName = request.DisplayName,
            CreatedAt = DateTime.UtcNow,
            LastSeen = DateTime.UtcNow,
            IsOnline = false
        };

        user.PasswordHash = _passwordHasher.HashPassword(
            user,
            request.Password);

        await _userRepository.AddAsync(user);
        await _userRepository.SaveChangesAsync();

        return new RegisterResponse
        {
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            DisplayName = user.DisplayName
        };
    }

    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        throw new NotImplementedException();
    }
}