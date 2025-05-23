public class ChatMessage
{
    public string ContractId { get; set; } = "";
    public string Sender { get; set; } = "";
    public string Message { get; set; } = "";
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
