using WaveMessenger.Application.Contracts.User;

namespace WaveMessenger.Application.Interfaces;

public interface IUserService
{
    Task<GetProfileResponse?> GetProfileAsync(Guid userId);

    Task<UpdateProfileResponse?> UpdateProfileAsync(
        Guid userId,
        UpdateProfileRequest request);
}