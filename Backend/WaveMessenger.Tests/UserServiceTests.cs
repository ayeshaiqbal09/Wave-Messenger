using Xunit;
using Moq;
using WaveMessenger.Application.Interfaces;
using WaveMessenger.Application.Contracts.User;
using Microsoft.AspNetCore.Identity;
using WaveMessenger.Domain.Entities;
using WaveMessenger.Application.Services;
using WaveMessenger.Application.Contracts.Auth;
using Microsoft.AspNetCore.Mvc;
using WaveMessenger.Application.Exceptions;
using WaveMessenger.Application.Validators;

namespace WaveMessenger.Tests;

public class UserServiceTests
{
    private readonly Mock<IUserRepository> _userRepository;


    private readonly UserService _userService;

    public UserServiceTests()
    {
        _userRepository = new Mock<IUserRepository>();
       

        _userService = new UserService(
            _userRepository.Object
          );
    }

    [Fact]
    public async Task GetProfileAsync_ShouldReturnProfile_WhenUserExists()
    {
        
        var fakeUser=new User
        {
            Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
            Email = "string@exam.com",
            UserName = "ayesha",
            DisplayName = "Ayesha",
            PasswordHash = "hashed-password",
            HasCompletedProfile = true

        };
        var userId = fakeUser.Id;
        _userRepository.Setup(x=>x.GetByIdAsync(fakeUser.Id)).ReturnsAsync(fakeUser);
        var response= await _userService.GetProfileAsync(userId);
        Assert.NotNull(response);

        Assert.Equal(fakeUser.Id, response.Id);

        Assert.Equal(fakeUser.Email, response.Email);

        Assert.Equal(fakeUser.UserName, response.UserName);

        Assert.Equal(fakeUser.DisplayName, response.DisplayName);

        Assert.Equal(fakeUser.Bio, response.Bio);

        Assert.Equal(fakeUser.Status, response.Status);
    }

    [Fact]
    public async Task GetProfileAsync_ShouldThrowException_WhenUserDoesNotExist()
    {
        
        var userId = Guid.Parse("11111111-1111-1111-1111-111111111111");
         _userRepository.Setup(x=>x.GetByIdAsync(userId)).ReturnsAsync((User?)null);
         await Assert.ThrowsAsync<Exception>(() => _userService.GetProfileAsync(userId));    
        _userRepository.Verify(
        x => x.GetByIdAsync(userId),
        Times.Once());

        
    }

    [Fact]
    public async Task UpdateProfileAsync_ShouldUpdateProfile_WhenUserExists()
    {
        var request = new UpdateProfileRequest
        {
           DisplayName="forDisplay",
           Bio="BioTest",
           Status="Good Status"  
        };
        var fakeUser=new User
        {
            Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
            Email = "string@exam.com",
            UserName = "ayesha",
            DisplayName = "Ayesha",
            PasswordHash = "hashed-password",
            HasCompletedProfile = true

        };
        var userId = fakeUser.Id;
        _userRepository.Setup(x=>x.GetByIdAsync(userId)).ReturnsAsync(fakeUser);

        var response = await _userService.UpdateProfileAsync(userId, request);
        Assert.NotNull(response);
        Assert.Equal(request.DisplayName, response.DisplayName);

        Assert.Equal(fakeUser.Bio, response.Bio);

        Assert.Equal(fakeUser.Status, response.Status);
        _userRepository.Verify(
            x => x.GetByIdAsync(userId),
            Times.Once());

        _userRepository.Verify(
            x => x.Update(It.IsAny<User>()),
            Times.Once());

        _userRepository.Verify(
            x => x.SaveChangesAsync(),
            Times.Once());

        
    }
    [Fact]
    public async Task UpdateProfileAsync_ShouldThrowException_WhenUserDoesNotExist()
    {
        var request = new UpdateProfileRequest
        {
           DisplayName="forDisplay",
           Bio="BioTest",
           Status="Good Status"  
        };
        var userId = Guid.Parse("11111111-1111-1111-1111-111111111111");
         _userRepository.Setup(x=>x.GetByIdAsync(userId)).ReturnsAsync((User?)null);
         await Assert.ThrowsAsync<Exception>(() => _userService.UpdateProfileAsync(userId, request));    
        _userRepository.Verify(
        x => x.GetByIdAsync(userId),
        Times.Once());
        _userRepository.Verify(
            x => x.Update(It.IsAny<User>()),
            Times.Never());
            _userRepository.Verify(
            x => x.SaveChangesAsync(),
            Times.Never());
    }
}