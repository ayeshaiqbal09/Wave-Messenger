using WaveMessenger.Domain.Entities;

namespace WaveMessenger.Application.Interfaces;

public interface IMessageRepository
{
    Task<List<Message>> GetByConversationIdAsync(
        Guid conversationId);

    Task AddAsync(Message message);

    Task SaveChangesAsync();

    Task<Message?> GetByIdAsync(Guid messageId);

    void Update(Message message);

    
}