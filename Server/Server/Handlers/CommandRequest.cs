using System.Collections.Generic;
using Newtonsoft.Json;

namespace Server.Handlers
{
    public class CommandRequest
    {
      
        public string Command { get; set; } 
        public string Data { get; set; }
        public static CommandRequest FromJson(string json)
        {
            return JsonConvert.DeserializeObject<CommandRequest>(json);
        }
    }
}