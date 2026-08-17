using Xunit;
using Moq;
using WaveMessenger.Application.Interfaces;
using Microsoft.AspNetCore.Identity;
using WaveMessenger.Domain.Entities;
using WaveMessenger.Application.Services;
using WaveMessenger.Application.Contracts.Auth;
using Microsoft.AspNetCore.Mvc;
using WaveMessenger.Application.Exceptions;
using WaveMessenger.Application.Validators;

namespace WaveMessenger.Tests;

public class AuthServiceTests
{
    private readonly Mock<IUserRepository> _userRepository;

    private readonly Mock<IPasswordHasher<User>> _passwordHasher;

    private readonly Mock<ITokenGenerator> _tokenGenerator;

    private readonly AuthService _authService;

    public AuthServiceTests()
    {
        _userRepository = new Mock<IUserRepository>();
        _passwordHasher = new Mock<IPasswordHasher<User>>();
        _tokenGenerator = new Mock<ITokenGenerator>();

        _authService = new AuthService(
            _userRepository.Object,
            _passwordHasher.Object,
            _tokenGenerator.Object);
    }

    [Fact]
    public async Task LoginAsync_ShouldThrowException_WhenUserDoesNotExist()
    {
        // Arrange
        var request= new LoginRequest
        {
            Email="nonexistent@example.com",
            Password="password123"
        };

        _userRepository.Setup(x=>x.GetByEmailAsync(request.Email))
            .ReturnsAsync((User?)null);

        // Act & Assert
        await Assert.ThrowsAsync<Exception>(() => _authService.LoginAsync(request));    

    }

    [Fact]
    public async Task LoginAsync_ShouldReturnLoginResponse_WhenCredentialsAreValid()
    {
        //Arrange
        var request=new LoginRequest
        {
            Email="example@mail.com",
            Password="Passs123"
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
        var fakeToken =  "fake-jwt-token";
        _userRepository.Setup(x=>x.GetByEmailAsync(request.Email)).ReturnsAsync(fakeUser);
        _passwordHasher
        .Setup(x => x.VerifyHashedPassword(
            fakeUser,
            fakeUser.PasswordHash,
            request.Password))
        .Returns(PasswordVerificationResult.Success);   
        _tokenGenerator.Setup(x=>x.GenerateToken(fakeUser)).Returns(fakeToken);
        _userRepository.Verify(x=>x.GetByEmailAsync(request.Email),Times.Once);
        _passwordHasher.Verify(x=>x.VerifyHashedPassword(fakeUser,
        fakeUser.PasswordHash,
        request.Password), Times.Once);
        _tokenGenerator.Verify(x=>x.GenerateToken(fakeUser),Times.Once);
        //Act & Assert
        var response= await _authService.LoginAsync(request);
        Assert.NotNull(response);
        Assert.Equal(fakeUser.Id, response.Id);
        Assert.Equal(fakeUser.Email, response.Email);

        Assert.Equal(fakeUser.UserName, response.UserName);
        //Assert.Equal(fakeUser.PasswordHash, response)
        Assert.Equal(fakeUser.DisplayName, response.DisplayName);
        Assert.Equal(fakeUser.HasCompletedProfile, response.HasCompletedProfile);
        Assert.Equal(fakeToken, response.Token);
        
        
    }

    [Fact]
    public async Task LoginAsync_ShouldThrowException_WhenPasswordIsIncorrect()
    {
        //Arrange
        var request = new LoginRequest
        {
            Email="example@mail.com",
            Password="Passs123"
        };
        var fakeUser = new User
        {
            Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
            Email = "string@exam.com",
            UserName = "ayesha",
            DisplayName = "Ayesha",
            PasswordHash = "hashed-password",
            HasCompletedProfile = true
        };

        _userRepository.Setup(x=>x.GetByEmailAsync(request.Email)).ReturnsAsync(fakeUser);
        _passwordHasher.Setup(x=>x.VerifyHashedPassword(
            fakeUser,
            fakeUser.PasswordHash,
            request.Password
        )).Returns(PasswordVerificationResult.Failed);
        _tokenGenerator.Verify(
        x => x.GenerateToken(It.IsAny<User>()),
        Times.Never);
        //Act && Assert
        await Assert.ThrowsAsync<UnauthorizedAccessException>(()=>_authService.LoginAsync(request));

    }
    [Fact]
    public async Task RegisterAsync_ShouldThrowConflict_WhenEmailAlreadyExists()
    {
       //Arrange
       var request = new RegisterRequest
       {
            UserName = "ayesha",
            Email = "string@exam.com",
            
            DisplayName = "Ayesha",
            Password = "Pass123"
        }; 
        var fakeUser = new User
        {
            Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
            Email = "string@exam.com",
            UserName = "ayesha",
            DisplayName = "Ayesha",
            PasswordHash = "hashed-password",
            HasCompletedProfile = true
        };

        _userRepository.Setup(x=>x.GetByEmailAsync(request.Email)).ReturnsAsync(fakeUser);
        await Assert.ThrowsAsync<ConflictException>(() => _authService.RegisterAsync(request));
        _userRepository.Verify(
            x => x.GetByEmailAsync(request.Email),
            Times.Once());

        _userRepository.Verify(
            x => x.GetByUserNameAsync(It.IsAny<string>()),
            Times.Never());

        _userRepository.Verify(
            x => x.AddAsync(It.IsAny<User>()),
            Times.Never());

        _userRepository.Verify(
            x => x.SaveChangesAsync(),
            Times.Never());
    }
        [Fact]
        public async Task RegisterAsync_ShouldThrowConflict_WhenuserAlreadyExists()
    {
        var request = new RegisterRequest
       {
            UserName = "ayesha",
            Email = "string@exam.com",
            
            DisplayName = "Ayesha",
            Password = "Pass123"
        }; 
        var fakeUser = new User
        {
            Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
            Email = "string@exam.com",
            UserName = "ayesha",
            DisplayName = "Ayesha",
            PasswordHash = "hashed-password",
            HasCompletedProfile = true
        };

        _userRepository.Setup(x=>x.GetByEmailAsync(request.Email)).ReturnsAsync((User?)null);
        _userRepository.Setup(x => x.GetByUserNameAsync(request.UserName))
    .ReturnsAsync(fakeUser);
        await Assert.ThrowsAsync<ConflictException>(() => _authService.RegisterAsync(request));
        
        _userRepository.Verify(
            x => x.GetByEmailAsync(request.Email),
            Times.Once());

        _userRepository.Verify(
            x => x.GetByUserNameAsync(It.IsAny<string>()),
            Times.Once());

        _userRepository.Verify(
            x => x.AddAsync(It.IsAny<User>()),
            Times.Never());

        _userRepository.Verify(
            x => x.SaveChangesAsync(),
            Times.Never());
    }
    [Fact]
         public async Task ResgisterAsync_ShouldReturnRegisterResponse_WhenCredentialsAreValid()
    {
        var request = new RegisterRequest
       {
            UserName = "ayesha",
            Email = "string@exam.com",
            
            DisplayName = "Ayesha",
            Password = "Pass123"
        }; 
        var fakeUser = new User
        {
            Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
            Email = "string@exam.com",
            UserName = "ayesha",
            DisplayName = "Ayesha",
            PasswordHash = "hashed-password",
            HasCompletedProfile = true
        };

        _userRepository.Setup(x=>x.GetByEmailAsync(request.Email)).ReturnsAsync((User?)null);
        _userRepository
        .Setup(x => x.GetByUserNameAsync(request.UserName))
        .ReturnsAsync((User?)null);
        _passwordHasher
    .Setup(x => x.HashPassword(
        It.IsAny<User>(),
        request.Password))
    .Returns("hashed-password");
        var response = await _authService.RegisterAsync(request);
        Assert.NotNull(response);

        Assert.Equal(request.Email, response.Email);

        Assert.Equal(request.UserName, response.UserName);

        Assert.Equal(request.DisplayName, response.DisplayName);
        _userRepository.Verify(
            x => x.GetByEmailAsync(request.Email),
            Times.Once());

        _userRepository.Verify(
            x => x.GetByUserNameAsync(It.IsAny<string>()),
            Times.Once());

        _userRepository.Verify(
            x => x.AddAsync(It.IsAny<User>()),
            Times.Once());

        _userRepository.Verify(
            x => x.SaveChangesAsync(),
            Times.Once());
    }

    
    [Theory]
    [InlineData("")]
    [InlineData(" ")]
    [InlineData("email")]
    [InlineData("@")]
    [InlineData("email@")]
    [InlineData("email.com")]
    [InlineData("@email.com")]
    [InlineData(null)]
    public async Task Register_ShouldThrow_WhenEmailIsInvalid(string? email)
    {
        var validator = new RegisterRequestValidator();

    var request = new RegisterRequest
    {
        Email = email!,
        UserName = "ayesha",
        DisplayName = "Ayesha",
        Password = "Password123"
    };

    var result = validator.Validate(request);

    Assert.False(result.IsValid);
    }

}