namespace WaveMessenger.Application.Contracts.Auth;

public class LoginResponse
{
    public Guid Id { get; set; }

    public string UserName { get; set; } = string.Empty;

    public string DisplayName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Token { get; set; } = string.Empty;
}