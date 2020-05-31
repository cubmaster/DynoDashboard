using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.WebSockets;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;
using Microsoft.AspNetCore.Http;
using Server.Services;
 

namespace Server.Handlers
{
    public  class WebSocketHandler: SocketHandlerBase, IWebSocketHandler
    {

        private readonly IWeatherService _weatherService;
        private readonly IStockService _stockService;


        public WebSocketHandler(IWeatherService weatherService, IStockService stockService)
        {
            _weatherService = weatherService;
            _stockService = stockService;
        }
 
        public async Task AddUser(WebSocket socket)
        {
            try
            {
                var name = Guid.NewGuid().ToString();
                _users.Add(name, socket);
                GiveUserTheirName(name, socket).Wait(); //Send the calling user their name
                AnnounceNewUser(name, socket).Wait(); //Tell everyone else that a new user has joined
               
                
                
                while (socket.State == WebSocketState.Open)
                {
                    var buffer = new byte[1024 * 4];
                    WebSocketReceiveResult socketResponse;
                    var package = new List<byte>();
                    do
                    {
                        socketResponse =
                            await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                        package.AddRange(new ArraySegment<byte>(buffer, 0, socketResponse.Count));
                    } while (!socketResponse.EndOfMessage);

                    var bufferAsString = System.Text.Encoding.ASCII.GetString(package.ToArray());
                       if (!string.IsNullOrEmpty(bufferAsString))
                       {
                           //Respond to Events
                           var changeRequest = CommandRequest.FromJson(bufferAsString);
                           await HandleCommandRequest(changeRequest, socket);
                       }
                }

                await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
 
        private async Task HandleCommandRequest(CommandRequest request,WebSocket socket)
        {
            var tasks = new List<Task<int>>();
            if (request == null) throw new ArgumentNullException(nameof(request));
            switch (request.Command ?? string.Empty)
            {
                case "Stock":
                {
                    await SendStockData(socket, request.Data);
                    break;
                }
                case "Weather":
                {
                    await SendWeather(socket);
                    break;
                }
            }
            
     
        }
        private async Task SendStockData(WebSocket socket,string Symb)
        {
            do
            {
                var message = new SocketMessage<string>
                {
                    MessageType = "Stock",
                    Payload =  _stockService.GetStockData(Symb)
                };
                
                await Send(message.ToJson(),socket);
                await Task.Delay(5000);
            } while (socket.State == WebSocketState.Open);
        }
        private async Task SendWeather(WebSocket socket)
        {
            do
            {


                var message = new SocketMessage<string>
                {
                    MessageType = "Weather",
                    Payload = JsonSerializer.Serialize<IEnumerable<WeatherForecast>>(_weatherService.Get())
                };

                await Send(message.ToJson(), socket); 
                await Task.Delay(5000);
            } while (socket.State == WebSocketState.Open);

        }

        private async Task AnnounceNewUser(string name, WebSocket socket)
        {
            var message = new SocketMessage<string>
            {
                MessageType = "announce",
                Payload = $"{name} has joined"
            };
            await SendToOthers(message.ToJson(), socket);
        }
        private async Task GiveUserTheirName(string name, WebSocket socket)
        {
            var message = new SocketMessage<string>
            {
                MessageType = "name",
                Payload = name
            };
            await Send(message.ToJson(), socket);
        }
    }
}