using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        var contractId = Context.GetHttpContext()?.Request.Query["contractId"];
        if(string.IsNullOrEmpty(contractId))
        {
            Console.WriteLine("❌ No se proporcionó un contractId.");
            return;
        }

        if (!string.IsNullOrEmpty(contractId))
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, contractId);
            Console.WriteLine($"👥 Cliente conectado al contrato {contractId}");
        }

        await base.OnConnectedAsync();
    }

    public async Task SendMessage(ChatMessage message)
    {
        Console.WriteLine($"💬 Mensaje recibido del cliente: {message.Sender}: {message.Message}");

        await Clients.Group(message.ContractId).SendAsync("ReceiveMessage", message);
    }
}
