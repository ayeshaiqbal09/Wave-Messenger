namespace WaveMessenger.Contracts.Auth;

public class LoginResponse
{
    public string Token { get; set; } = string.Empty;

    public string UserName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;
}