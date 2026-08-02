
using WaveMessenger.Application.Interfaces;
using WaveMessenger.Contracts.Auth;

namespace WaveMessenger.Application.Services;

public class AuthService : IAuthService
{
    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        throw new NotImplementedException();
    }
}