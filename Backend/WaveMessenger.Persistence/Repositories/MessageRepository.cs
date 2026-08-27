using Microsoft.EntityFrameworkCore;
using WaveMessenger.Application.Interfaces;
using WaveMessenger.Domain.Entities;
using WaveMessenger.Persistence.Context;

namespace WaveMessenger.Persistence.Repositories;

public class MessageRepository : IMessageRepository
{
    private readonly ApplicationDbContext _context;

    public MessageRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Message>> GetByConversationIdAsync(
        Guid conversationId)
    {
        return await _context.Messages
            .Where(m => m.ConversationId == conversationId)
            .OrderBy(m => m.SentAt)
            .ToListAsync();
    }

    public async Task AddAsync(Message message)
    {
        await _context.Messages.AddAsync(message);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
    public async Task<Message?> GetByIdAsync(Guid messageId)
{
    return await _context.Messages
        .FirstOrDefaultAsync(m => m.Id == messageId);
}

public void Update(Message message)
{
    _context.Messages.Update(message);
}
}