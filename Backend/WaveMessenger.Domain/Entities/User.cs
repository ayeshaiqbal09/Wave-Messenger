namespace WaveMessenger.Domain.Entities;

public class User
{
    public Guid Id { get; set; }

    public string UserName { get; set; } = string.Empty;

    public string DisplayName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public string? ProfilePictureUrl { get; set; }

    public bool IsOnline { get; set; }

    public DateTime LastSeen { get; set; }

    public DateTime CreatedAt { get; set; }
}