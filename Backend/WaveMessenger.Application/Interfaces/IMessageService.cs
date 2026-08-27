using WaveMessenger.Application.Contracts.Message;

namespace WaveMessenger.Application.Interfaces;

public interface IMessageService
{
    Task<List<MessageResponse>> GetMessagesAsync(
        Guid currentUserId,
        Guid conversationId);

    Task<MessageResponse> SendMessageAsync(
        Guid currentUserId,
        SendMessageRequest request);

    Task<MessageResponse> MarkAsDeliveredAsync(
    Guid messageId,
    Guid userId);

    Task<MessageResponse> MarkAsReadAsync(
    Guid messageId,
    Guid userId);
}