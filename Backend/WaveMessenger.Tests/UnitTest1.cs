using Xunit;
namespace WaveMessenger.Tests;

public class UnitTest1
{
    [Fact]
    public void TwoPlusTwo_ShouldEqualFour ()
    {
        // Arrange
        int a = 2;
        int b = 2;

        // Act
        int result = a + b;

        // Assert
        Assert.Equal(4, result);

    }
}
