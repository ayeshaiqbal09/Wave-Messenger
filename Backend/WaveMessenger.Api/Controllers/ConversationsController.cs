using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaveMessenger.Application.Contracts.Conversation;
using WaveMessenger.Application.Interfaces;

namespace WaveMessenger.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ConversationsController : ControllerBase
{
    private readonly IConversationService _conversationService;

    public ConversationsController(
        IConversationService conversationService)
    {
        _conversationService = conversationService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ConversationResponse>>> GetMyConversations()
    {
        var userIdClaim =
            User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        var userId = Guid.Parse(userIdClaim);

        var response =
            await _conversationService.GetMyConversationsAsync(userId);

        return Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<ConversationResponse>> CreateConversation(
        CreateConversationRequest request)
    {
        var userIdClaim =
            User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        var userId = Guid.Parse(userIdClaim);

        var response =
            await _conversationService.CreateConversationAsync(
                userId,
                request);

        return Ok(response);
    }
}