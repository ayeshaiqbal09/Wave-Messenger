using WaveMessenger.Application.Contracts.Conversation;
using WaveMessenger.Application.Exceptions;
using WaveMessenger.Application.Interfaces;
using WaveMessenger.Domain.Entities;

namespace WaveMessenger.Application.Services;

public class ConversationService : IConversationService
{
    private readonly IConversationRepository _conversationRepository;
    private readonly IUserRepository _userRepository;

    public ConversationService(
        IConversationRepository conversationRepository,
        IUserRepository userRepository)
    {
        _conversationRepository = conversationRepository;
        _userRepository = userRepository;
    }

    public async Task<ConversationResponse> CreateConversationAsync(
        Guid currentUserId,
        CreateConversationRequest request)
    {
        if (currentUserId == request.OtherUserId)
        {
            throw new ValidationException(
                "You cannot create a conversation with yourself.");
        }

        var otherUser = await _userRepository.GetByIdAsync(
            request.OtherUserId);

        if (otherUser == null)
        {
            throw new NotFoundException("User not found.");
        }

        var existingConversation =
            await _conversationRepository.GetBetweenUsersAsync(
                currentUserId,
                request.OtherUserId);

        if (existingConversation != null)
        {
            return MapToResponse(
                existingConversation,
                currentUserId);
        }

        var conversation = new Conversation
        {
            Id = Guid.NewGuid(),
            UserOneId = currentUserId,
            UserTwoId = request.OtherUserId,
            CreatedAt = DateTime.UtcNow
        };

        await _conversationRepository.AddAsync(conversation);

        await _conversationRepository.SaveChangesAsync();

        return MapToResponse(
            conversation,
            currentUserId);
    }

    public async Task<List<ConversationResponse>> GetMyConversationsAsync(
        Guid currentUserId)
    {
        var conversations =
            await _conversationRepository.GetByUserIdAsync(
                currentUserId);

        return conversations
            .Select(c => MapToResponse(c, currentUserId))
            .ToList();
    }

    private static ConversationResponse MapToResponse(
        Conversation conversation,
        Guid currentUserId)
    {
        var otherUserId =
            conversation.UserOneId == currentUserId
                ? conversation.UserTwoId
                : conversation.UserOneId;

        return new ConversationResponse
        {
            Id = conversation.Id,
            OtherUserId = otherUserId,
            CreatedAt = conversation.CreatedAt
        };
    }
}