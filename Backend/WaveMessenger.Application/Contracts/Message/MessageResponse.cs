namespace WaveMessenger.Application.Contracts.Message;

public class MessageResponse
{
    public Guid Id { get; set; }

    public Guid ConversationId { get; set; }

    public Guid SenderId { get; set; }

    public string Text { get; set; } = string.Empty;

    public DateTime SentAt { get; set; }

    public string Status { get; set; } = string.Empty;
}