using Microsoft.AspNetCore.Identity;
using WaveMessenger.Application.Contracts.Auth;
using WaveMessenger.Application.Exceptions;
using WaveMessenger.Application.Interfaces;
using WaveMessenger.Domain.Entities;

namespace WaveMessenger.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly ITokenGenerator _jwtTokenGenerator;

    public AuthService(
        IUserRepository userRepository,
        IPasswordHasher<User> passwordHasher,
        ITokenGenerator jwtTokenGenerator)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<RegisterResponse?> RegisterAsync(RegisterRequest request)
    {
        var existingUser = await _userRepository.GetByEmailAsync(request.Email);
        if (existingUser != null)
        {
            throw new ConflictException("Email is already registered.");
        }

        var existingUserName =
        await _userRepository.GetByUserNameAsync(request.UserName);

        if (existingUserName != null)
        {
            throw new ConflictException("Username is already taken.");
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
        var user = await _userRepository.GetByEmailAsync(request.Email);
        if (user == null)
        {
            throw new UnauthorizedException("Invalid email or password.");
        }

        var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            request.Password);

        if (passwordVerificationResult != PasswordVerificationResult.Success)
        {
            throw new UnauthorizedException("Invalid email or password.");
        }
        
        return new LoginResponse
        {
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            DisplayName = user.DisplayName,
            Token = _jwtTokenGenerator.GenerateToken(user)
        };
    }
}