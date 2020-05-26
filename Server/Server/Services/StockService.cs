using System;
using RestSharp;
using RestSharp.Authenticators;

namespace Server.Services
{
    public class StockService : IStockService
    {
        public StockService()
        {
            
        }
        
        public  string  GetStockData(string symb)
        {
            var url = $"https://sandbox.tradier.com/v1/markets/quotes?symbols={symb}";
            var client = new RestClient(url);
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Authorization", "Bearer eVKmfUC01igJEbrCPHmhnG0LNk4X");
            IRestResponse response = client.Execute(request);
            return response.Content;
            
        }
        
        
    }
}