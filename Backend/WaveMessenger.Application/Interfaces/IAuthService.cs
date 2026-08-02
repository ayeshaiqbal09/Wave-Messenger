
using WaveMessenger.Application.Contracts.Auth;

namespace WaveMessenger.Application.Interfaces;

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
    Task<RegisterResponse?> RegisterAsync(RegisterRequest request);
}