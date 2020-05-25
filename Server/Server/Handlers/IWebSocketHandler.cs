using System.Net.WebSockets;
using System.Threading.Tasks;

namespace Server.Handlers
{
    public interface IWebSocketHandler
    {
        Task AddUser(WebSocket socket);
    }
}