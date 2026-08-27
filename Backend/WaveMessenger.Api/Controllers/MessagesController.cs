using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaveMessenger.Application.Contracts.Message;
using WaveMessenger.Application.Interfaces;
using Microsoft.AspNetCore.SignalR;
using WaveMessenger.Api.Hubs;
namespace WaveMessenger.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MessagesController : ControllerBase
{
    private readonly IMessageService _messageService;
    private readonly IHubContext<ChatHub> _hubContext;
    private readonly IConversationRepository _conversationRepository;

   public MessagesController(
    IMessageService messageService,
    IHubContext<ChatHub> hubContext,
    IConversationRepository conversationRepository)
{
    _messageService = messageService;
    _hubContext = hubContext;
    _conversationRepository = conversationRepository;
}

    [HttpGet("{conversationId:guid}")]
    public async Task<ActionResult<List<MessageResponse>>> GetMessages(
        Guid conversationId)
    {
        var userIdClaim =
            User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        var userId = Guid.Parse(userIdClaim);

        var response =
            await _messageService.GetMessagesAsync(
                userId,
                conversationId);

        return Ok(response);
    }

    [HttpPost]
public async Task<ActionResult<MessageResponse>> SendMessage(
    SendMessageRequest request)
{
    var userIdClaim =
        User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    if (userIdClaim == null)
    {
        return Unauthorized();
    }

    var userId = Guid.Parse(userIdClaim);

    var response =
        await _messageService.SendMessageAsync(
            userId,
            request);

    var conversation =
        await _conversationRepository.GetByIdAsync(
            request.ConversationId);

    if (conversation != null)
    {
        var recipientId =
            conversation.UserOneId == userId
                ? conversation.UserTwoId
                : conversation.UserOneId;

        await _hubContext.Clients
            .User(recipientId.ToString())
            .SendAsync(
                "ReceiveMessage",
                response);
    }

    return Ok(response);
}
}