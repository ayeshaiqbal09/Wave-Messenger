
using WaveMessenger.Contracts.Auth;

namespace WaveMessenger.Application.Interfaces;

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
}