namespace WaveMessenger.Application.Contracts.User;

public class UserListResponse
{
    public Guid Id { get; set; }

    public string UserName { get; set; } = string.Empty;

    public string DisplayName { get; set; } = string.Empty;

    public string? Bio { get; set; }

    public string? Status { get; set; }

    public string? ProfilePictureUrl { get; set; }

    public bool IsOnline { get; set; }

    public DateTime LastSeen { get; set; }
}