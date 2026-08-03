using WaveMessenger.Domain.Entities;
namespace WaveMessenger.Application.Interfaces;
public interface ITokenGenerator
{
    string GenerateToken(User user);
}