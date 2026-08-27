using WaveMessenger.Application.Contracts.Message;
using WaveMessenger.Application.Exceptions;
using WaveMessenger.Application.Interfaces;
using WaveMessenger.Domain.Entities;

namespace WaveMessenger.Application.Services;

public class MessageService : IMessageService
{
    private readonly IMessageRepository _messageRepository;
    private readonly IConversationRepository _conversationRepository;

    public MessageService(
        IMessageRepository messageRepository,
        IConversationRepository conversationRepository)
    {
        _messageRepository = messageRepository;
        _conversationRepository = conversationRepository;
    }

    public async Task<List<MessageResponse>> GetMessagesAsync(
        Guid currentUserId,
        Guid conversationId)
    {
        var conversation =
            await _conversationRepository.GetByIdAsync(
                conversationId);

        if (conversation == null)
        {
            throw new NotFoundException(
                "Conversation not found.");
        }

        EnsureParticipant(
            conversation,
            currentUserId);

        var messages =
            await _messageRepository.GetByConversationIdAsync(
                conversationId);

        return messages
            .Select(MapToResponse)
            .ToList();
    }

    public async Task<MessageResponse> SendMessageAsync(
        Guid currentUserId,
        SendMessageRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Text))
        {
            throw new ValidationException(
                "Message cannot be empty.");
        }

        var conversation =
            await _conversationRepository.GetByIdAsync(
                request.ConversationId);

        if (conversation == null)
        {
            throw new NotFoundException(
                "Conversation not found.");
        }

        EnsureParticipant(
            conversation,
            currentUserId);

        var message = new Message
        {
            Id = Guid.NewGuid(),
            ConversationId = request.ConversationId,
            SenderId = currentUserId,
            Text = request.Text.Trim(),
            SentAt = DateTime.UtcNow,
            Status = MessageStatus.Sent
        };

        await _messageRepository.AddAsync(message);

        await _messageRepository.SaveChangesAsync();

        return MapToResponse(message);
    }

    private static void EnsureParticipant(
        Conversation conversation,
        Guid userId)
    {
        var isParticipant =
            conversation.UserOneId == userId ||
            conversation.UserTwoId == userId;

        if (!isParticipant)
        {
            throw new UnauthorizedException(
                "You are not a participant in this conversation.");
        }
    }

    private static MessageResponse MapToResponse(
        Message message)
    {
        return new MessageResponse
        {
            Id = message.Id,
            ConversationId = message.ConversationId,
            SenderId = message.SenderId,
            Text = message.Text,
            SentAt = message.SentAt,
            Status = message.Status.ToString()
        };
    }
    public async Task<MessageResponse> MarkAsDeliveredAsync(
    Guid messageId,
    Guid userId)
{
    var message =
        await _messageRepository.GetByIdAsync(messageId);

    if (message == null)
    {
        throw new NotFoundException(
            "Message not found.");
    }

    var conversation =
        await _conversationRepository.GetByIdAsync(
            message.ConversationId);

    if (conversation == null)
    {
        throw new NotFoundException(
            "Conversation not found.");
    }

    EnsureParticipant(
        conversation,
        userId);

    // Only the recipient should mark the message delivered.
    if (message.SenderId == userId)
    {
        return MapToResponse(message);
    }

    if (message.Status == MessageStatus.Sent)
    {
        message.Status = MessageStatus.Delivered;

        _messageRepository.Update(message);

        await _messageRepository.SaveChangesAsync();
    }

    return MapToResponse(message);
}
public async Task<MessageResponse> MarkAsReadAsync(
    Guid messageId,
    Guid userId)
{
    var message =
        await _messageRepository.GetByIdAsync(messageId);

    if (message == null)
    {
        throw new NotFoundException(
            "Message not found.");
    }

    var conversation =
        await _conversationRepository.GetByIdAsync(
            message.ConversationId);

    if (conversation == null)
    {
        throw new NotFoundException(
            "Conversation not found.");
    }

    EnsureParticipant(
        conversation,
        userId);

    // Sender cannot mark their own message as read.
    if (message.SenderId == userId)
    {
        return MapToResponse(message);
    }

    if (message.Status == MessageStatus.Delivered)
    {
        message.Status = MessageStatus.Read;

        _messageRepository.Update(message);

        await _messageRepository.SaveChangesAsync();
    }

    return MapToResponse(message);
}
}