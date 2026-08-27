using WaveMessenger.Application.Contracts.Conversation;

namespace WaveMessenger.Application.Interfaces;

public interface IConversationService
{
    Task<ConversationResponse> CreateConversationAsync(
        Guid currentUserId,
        CreateConversationRequest request);

    Task<List<ConversationResponse>> GetMyConversationsAsync(
        Guid currentUserId);
}