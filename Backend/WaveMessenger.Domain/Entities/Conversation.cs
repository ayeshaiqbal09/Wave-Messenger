namespace WaveMessenger.Domain.Entities;

public class Conversation
{
    public Guid Id { get; set; }

    public Guid UserOneId { get; set; }

    public Guid UserTwoId { get; set; }

    public DateTime CreatedAt { get; set; }
}