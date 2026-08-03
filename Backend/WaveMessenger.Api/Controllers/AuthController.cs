using Microsoft.AspNetCore.Mvc;
using WaveMessenger.Application.Contracts.Auth;
using WaveMessenger.Application.Interfaces;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace WaveMessenger.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }
    [HttpPost("register")]
    public async Task<ActionResult<RegisterResponse?>> Register(RegisterRequest request)
    {
        var response = await _authService.RegisterAsync(request);
        return Ok(response);
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse?>> Login(LoginRequest request)
    {
        var response = await _authService.LoginAsync(request);
        return Ok(response);
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult Me()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var userName = User.FindFirst(ClaimTypes.Name)?.Value;

        var email = User.FindFirst(ClaimTypes.Email)?.Value;

        return Ok(new
        {
            UserId = userId,
            UserName = userName,
            Email = email
        });
    }
}