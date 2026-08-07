using Xunit;
using Moq;
namespace WaveMessenger.Tests;

public interface ICalculator
{
    int Add(int a, int b);
    int Subtract(int a, int b);
}

public class MockperfectTests
{
    [Fact]
    public void Mock_ShouldReturnConfiguredValue()
    {
        // Arrange
        var calcMock = new Mock<ICalculator>();
        calcMock.Setup(x=>x.Add(2,3)).Returns(100);

        //Act
        var result =calcMock.Object.Add(2,3);

        //Assert
        Assert.Equal(100, result);
    }
}


