using System.Collections.Generic;

namespace Server.Services
{
    public interface IWeatherService
    {
        IEnumerable<WeatherForecast> Get();
    }
}