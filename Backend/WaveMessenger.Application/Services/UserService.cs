using WaveMessenger.Application.Interfaces;
using WaveMessenger.Application.Contracts.User;

namespace WaveMessenger.Application.Services;

public class UserService: IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<GetProfileResponse?> GetProfileAsync(Guid userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);

        if (user == null)
        {
            throw new Exception("User not found.");
        }

        return new GetProfileResponse
        {
            Id = user.Id,
            UserName = user.UserName,
            DisplayName = user.DisplayName,
            Email = user.Email,
            Bio = user.Bio,
            Status = user.Status,
            ProfilePictureUrl = user.ProfilePictureUrl
        };
    }

    public async Task<UpdateProfileResponse?> UpdateProfileAsync(
    Guid userId,
    UpdateProfileRequest request)
    {
        var user = await _userRepository.GetByIdAsync(userId);

        if (user == null)
        {
            throw new Exception("User not found.");
        }

        user.DisplayName = request.DisplayName;
        user.Bio = request.Bio;
        user.Status = request.Status;

        _userRepository.Update(user);

        await _userRepository.SaveChangesAsync();

        return new UpdateProfileResponse
        {
            Id = user.Id,
            DisplayName = user.DisplayName,
            Bio = user.Bio,
            Status = user.Status
        };
    }
    
}