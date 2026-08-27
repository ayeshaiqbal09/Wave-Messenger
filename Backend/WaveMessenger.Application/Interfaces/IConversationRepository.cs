using WaveMessenger.Domain.Entities;

namespace WaveMessenger.Application.Interfaces;

public interface IConversationRepository
{
    Task<Conversation?> GetByIdAsync(
        Guid conversationId);
    Task<Conversation?> GetBetweenUsersAsync(
        Guid userOneId,
        Guid userTwoId);

    Task<List<Conversation>> GetByUserIdAsync(
        Guid userId);

    Task AddAsync(Conversation conversation);

    Task SaveChangesAsync();
}