namespace WaveMessenger.Application.Contracts.Conversation;

public class ConversationResponse
{
    public Guid Id { get; set; }

    public Guid OtherUserId { get; set; }

    public DateTime CreatedAt { get; set; }
}