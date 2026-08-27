using Microsoft.EntityFrameworkCore;
using WaveMessenger.Application.Interfaces;
using WaveMessenger.Domain.Entities;
using WaveMessenger.Persistence.Context;

namespace WaveMessenger.Persistence.Repositories;

public class ConversationRepository : IConversationRepository
{
    private readonly ApplicationDbContext _context;

    public ConversationRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<Conversation?> GetByIdAsync(
    Guid conversationId)
{
    return await _context.Conversations
        .FirstOrDefaultAsync(c => c.Id == conversationId);
}
    public async Task<Conversation?> GetBetweenUsersAsync(
        Guid userOneId,
        Guid userTwoId)
    {
        return await _context.Conversations.FirstOrDefaultAsync(
            c =>
                (c.UserOneId == userOneId &&
                 c.UserTwoId == userTwoId)
                ||
                (c.UserOneId == userTwoId &&
                 c.UserTwoId == userOneId)
        );
    }

    public async Task<List<Conversation>> GetByUserIdAsync(
        Guid userId)
    {
        return await _context.Conversations
            .Where(c =>
                c.UserOneId == userId ||
                c.UserTwoId == userId)
            .ToListAsync();
    }

    public async Task AddAsync(Conversation conversation)
    {
        await _context.Conversations.AddAsync(conversation);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}