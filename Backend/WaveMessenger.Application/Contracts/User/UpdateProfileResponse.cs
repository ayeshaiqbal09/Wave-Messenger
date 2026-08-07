namespace WaveMessenger.Application.Contracts.User;

public class UpdateProfileResponse
{
    public Guid Id { get; set; }

    public string DisplayName { get; set; } = string.Empty;

    public string? Bio { get; set; }

    public string? Status { get; set; }
}