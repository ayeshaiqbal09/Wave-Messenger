namespace WaveMessenger.Application.Contracts.Message;

public class SendMessageRequest
{
    public Guid ConversationId { get; set; }

    public string Text { get; set; } = string.Empty;
}