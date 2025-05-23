using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;


namespace ChatApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly IHubContext<ChatHub> _chatHub;

    public ChatController(IHubContext<ChatHub> chatHub)
    {
        _chatHub = chatHub;
    }

    private static readonly List<ChatMessage> messages = new();

    [HttpPost("send")]
    public async Task<IActionResult> Send([FromBody] ChatMessage message)
    {
        Console.WriteLine($"Mensaje recibido: {message.Message}");

        messages.Add(message); // aquí podrías persistir en DB

        // enviar al grupo correspondiente
        await _chatHub.Clients.Group(message.ContractId).SendAsync("ReceiveMessage", message);

        return Ok();
    }

    [HttpGet("history/{contractId}")]
    public IActionResult GetHistory(string contractId)
    {
        var contractMessages = messages.Where(m => m.ContractId == contractId).ToList();
        return Ok(contractMessages);
    }
}
