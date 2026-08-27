using Microsoft.AspNetCore.Mvc;
using WaveMessenger.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using WaveMessenger.Application.Contracts.User;

namespace WaveMessenger.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }
    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<GetProfileResponse>> GetProfile()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        var userId = Guid.Parse(userIdClaim);

        var response = await _userService.GetProfileAsync(userId);

        return Ok(response);
    }
    [Authorize]
    [HttpPut("profile")]
    public async Task<ActionResult<UpdateProfileResponse>> UpdateProfile(
        UpdateProfileRequest request)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        var userId = Guid.Parse(userIdClaim);

        var response = await _userService.UpdateProfileAsync(
            userId,
            request);

        return Ok(response);
    }

    [Authorize]
[HttpGet]
public async Task<ActionResult<List<UserListResponse>>> GetUsers()
{
    var userIdClaim =
        User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    if (userIdClaim == null)
    {
        return Unauthorized();
    }

    var userId = Guid.Parse(userIdClaim);

    var response =
        await _userService.GetUsersAsync(userId);

    return Ok(response);
}
}