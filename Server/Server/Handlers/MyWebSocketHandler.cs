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
    public  class WebSocketHandler: IWebSocketHandler
    {
        private Dictionary<string, WebSocket> _users = new Dictionary<string, WebSocket>();
        private readonly IWeatherService _weatherService;


        public WebSocketHandler(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }
 
        public async Task AddUser(WebSocket socket)
        {
            try
            {
                var name = Guid.NewGuid().ToString();
                _users.Add(name, socket);
                GiveUserTheirName(name, socket).Wait();  //Send the calling user their name
                AnnounceNewUser(name).Wait();  //Tell everyone else that a new user has joined
                //SendWeather(socket).Wait();//Send weather to new user
                var aTimer = new System.Timers.Timer(2000);
                aTimer.Elapsed += OnTimedEvent;
                aTimer.AutoReset = true;
                aTimer.Enabled = true;
                while (socket.State == WebSocketState.Open)
                {
                    var buffer = new byte[1024 * 4];
                    WebSocketReceiveResult socketResponse;
                    var package = new List<byte>();
                    do
                    {
                        socketResponse = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                        package.AddRange(new ArraySegment<byte>(buffer, 0, socketResponse.Count));
                    } while (!socketResponse.EndOfMessage);
                    var bufferAsString = System.Text.Encoding.ASCII.GetString(package.ToArray());
                    if (!string.IsNullOrEmpty(bufferAsString))
                    {
                        //Respond to Events
                        //var changeRequest = SquareChangeRequest.FromJson(bufferAsString);
                        //await HandleSquareChangeRequest(changeRequest);
                    }
                }
                await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None);
            }
            catch (Exception ex)
            { }
        }
        private  void OnTimedEvent(Object source, ElapsedEventArgs e)
        {
              SendWeathertoAll().Wait();
        }
        private async Task SendWeathertoAll()
        {
            var message = new SocketMessage<string>
            {
                MessageType = "Weather",
                Payload = JsonSerializer.Serialize<IEnumerable<WeatherForecast>>(_weatherService.Get())
            };
            
            await SendAll(message.ToJson());
        }
        private async Task SendWeather(WebSocket socket)
        {
            var message = new SocketMessage<string>
            {
                MessageType = "Weather",
                Payload = JsonSerializer.Serialize<IEnumerable<WeatherForecast>>(_weatherService.Get())
            };
            
            await Send(message.ToJson(), socket);
        }
        private async Task SendAll(string message)
        {
            await Send(message, _users.Values.ToArray());
        }

        private async Task Send(string message, params WebSocket[] socketsToSendTo)
        {
            var sockets = socketsToSendTo.Where(s => s.State == WebSocketState.Open);
            foreach (var theSocket in sockets)
            {
                var stringAsBytes = System.Text.Encoding.ASCII.GetBytes(message);
                var byteArraySegment = new ArraySegment<byte>(stringAsBytes, 0, stringAsBytes.Length);
                await theSocket.SendAsync(byteArraySegment, WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }
        private async Task AnnounceNewUser(string name)
        {
            var message = new SocketMessage<string>
            {
                MessageType = "announce",
                Payload = $"{name} has joined"
            };
            await SendAll(message.ToJson());
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