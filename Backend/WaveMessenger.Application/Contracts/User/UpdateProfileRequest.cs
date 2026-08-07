namespace WaveMessenger.Application.Contracts.User;

public class UpdateProfileRequest
{
    public string DisplayName { get; set; } = string.Empty;

    public string? Bio { get; set; }

    public string? Status { get; set; }
}