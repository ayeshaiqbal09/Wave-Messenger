using WaveMessenger.Application.Exceptions;

namespace WaveMessenger.Api.Middleware;
public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            context.Response.ContentType = "application/json";

            context.Response.StatusCode = ex switch
            {
                UnauthorizedException => StatusCodes.Status401Unauthorized,

                ValidationException => StatusCodes.Status400BadRequest,

                NotFoundException => StatusCodes.Status404NotFound,

                ConflictException => StatusCodes.Status409Conflict,

                _ => StatusCodes.Status500InternalServerError
            };

            await context.Response.WriteAsJsonAsync(new
            {
                StatusCode = context.Response.StatusCode,
                Message = ex.Message
            });
        }
    }
}