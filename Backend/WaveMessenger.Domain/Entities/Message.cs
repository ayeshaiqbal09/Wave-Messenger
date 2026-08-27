namespace WaveMessenger.Domain.Entities;

public class Message
{
    public Guid Id { get; set; }

    public Guid ConversationId { get; set; }

    public Guid SenderId { get; set; }

    public string Text { get; set; } = string.Empty;

    public DateTime SentAt { get; set; }

    public MessageStatus Status { get; set; }
}