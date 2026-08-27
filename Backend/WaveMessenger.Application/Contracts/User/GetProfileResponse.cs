namespace WaveMessenger.Application.Contracts.User;

public class GetProfileResponse
{
    public Guid Id { get; set; }

    public string UserName { get; set; } = string.Empty;

    public string DisplayName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string? Bio { get; set; }

    public string? Status { get; set; }

    public string? ProfilePictureUrl { get; set; }
    public bool HasCompletedProfile { get; set; }
}