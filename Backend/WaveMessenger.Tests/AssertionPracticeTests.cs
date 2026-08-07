using Xunit;
namespace WaveMessenger.Tests;

public class AssertionPracticeTests
{
    [Fact]
    public void TenPlusFive_ShouldEqualFifteen ()
    {
        // Arrange
        int a = 10;
        int b = 5;

        // Act
        int result = a + b;

        // Assert
        Assert.Equal(15, result);

    }

    [Fact]
    public void FiveIsGreaterThanTwo_ShouldBeTrue()
    {
        //Arrange
        int a=5;
        int b = 2;

        //Act
        bool result = a> b;

        //assert
        Assert.True(result);
    }

    [Fact]
    public void NotNullString_ShouldNotBeNull()
    {
        //Arrange
        string str = "";

       

        //Assert
        Assert.NotNull(str);
    }

    [Fact]
    public void ListWithThreeItems_ShouldHaveCountThree()
    {
        //Arrange
        List<int> numbers = new List<int> { 1, 2, 3 };

        //Act
        int result = numbers.Count;

        //Assert
        Assert.Equal(3, result);
    }
}