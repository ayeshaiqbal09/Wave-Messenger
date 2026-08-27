using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using WaveMessenger.Application.Interfaces;

namespace WaveMessenger.Api.Hubs;

[Authorize]
public class ChatHub : Hub
{
    private readonly IMessageService _messageService;

    public ChatHub(IMessageService messageService)
    {
        _messageService = messageService;
    }

    public async Task MarkMessageAsDelivered(
        string messageId)
    {
        var userIdClaim =
            Context.User?.FindFirst(
                ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            throw new HubException(
                "User is not authenticated.");
        }

        var userId = Guid.Parse(userIdClaim);
        var id = Guid.Parse(messageId);

        var message =
            await _messageService.MarkAsDeliveredAsync(
                id,
                userId);

        await Clients.User(
            message.SenderId.ToString())
            .SendAsync(
                "MessageStatusUpdated",
                message);
    }
    public async Task MarkMessageAsRead(
    string messageId)
{
    var userIdClaim =
        Context.User?.FindFirst(
            ClaimTypes.NameIdentifier)?.Value;

    if (userIdClaim == null)
    {
        throw new HubException(
            "User is not authenticated.");
    }

    var userId = Guid.Parse(userIdClaim);
    var id = Guid.Parse(messageId);

    var message =
        await _messageService.MarkAsReadAsync(
            id,
            userId);

    await Clients.User(
        message.SenderId.ToString())
        .SendAsync(
            "MessageStatusUpdated",
            message);
}
}