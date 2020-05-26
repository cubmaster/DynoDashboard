using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace Server.Handlers
{
    public abstract class SocketHandlerBase
    {
        public Dictionary<string, WebSocket> _users = new Dictionary<string, WebSocket>();
        public async Task SendAll(string message)
        {
            await Send(message, _users.Values.ToArray());
        }

        public async Task Send(string message, params WebSocket[] socketsToSendTo)
        {
            var sockets = socketsToSendTo.Where(s => s.State == WebSocketState.Open);
            foreach (var theSocket in sockets)
            {
                var stringAsBytes = System.Text.Encoding.ASCII.GetBytes(message);
                var byteArraySegment = new ArraySegment<byte>(stringAsBytes, 0, stringAsBytes.Length);
                await theSocket.SendAsync(byteArraySegment, WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }
    }
}