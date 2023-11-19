import React, { useEffect, useState } from "react";
import "./WeatherPage.scss";
import search from "../../assets/images/search.svg";
import axios from "axios";
interface Location {
  id: number;
  name: string;
}

interface WeatherData {
  location?: {
    name: string;
    country: string;
    localtime: string;
  };
  current?: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    pressure_mb: number;
    uv: 1;
    condition: {
      icon: string;
    };
  };
  forecast?: {
    forecastday: Array<{
      date: string;
      day: {
        avgtemp_c: number;
        condition: {
          icon: string;
        };
      };
    }>;
  };
}

function WeatherPage() {
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = React.useState<string>("");
  const [weatherData, setWeatherData] = React.useState<WeatherData>(
    {} as WeatherData
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Hava durumu bilgilerini çekmek için bir fonksiyon
    const fetchWeatherData = async (location: string) => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/search.json?key=9d874d179f534785bf3195202231811&q=${location}`
        );
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    // Kullanıcının seçtiği konuma göre hava durumu bilgilerini çekmek
    if (searchQuery) {
      fetchWeatherData(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Hava durumu bilgilerini çekmek için bir fonksiyon
    const fetchSelectedData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=9d874d179f534785bf3195202231811&q=${selectedLocation}&days=5&aqi=no&alerts=no`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    // Kullanıcının seçtiği konuma göre hava durumu bilgilerini çekmek
    if (selectedLocation) {
      fetchSelectedData();
    }
  }, [selectedLocation]);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location.name);
    setLocations([]); // Liste seçildikten sonra temizle
    setSearchQuery(""); // Search bar'ı sıfırla
  };

  return (
    <div id="weather-page" className="page">
      <h1 className="title">Weather App</h1>
      <div className="page-content">
        <div className="container">
          <div className="appWrapper">
            <div className="searchBar">
              <input
                prefix={search}
                type="text"
                placeholder="Search location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="location-list">
              {locations.map((location) => (
                <div
                  className="item"
                  key={location.id}
                  onClick={() => handleLocationClick(location)}
                >
                  {location.name}
                </div>
              ))}
            </div>

            <span className="text-sm">{weatherData.location?.localtime}</span>
            <span className="province text-xl">
              {weatherData.location?.name}
            </span>
            <span className="text-l">{weatherData.location?.country}</span>

            {weatherData.current ? (
              <div className="weatherCelcius">
                <img
                  className="weatherIcon"
                  src={weatherData.current?.condition.icon}
                  alt="cloudy"
                />
                <span>{weatherData.current?.temp_c}°C</span>
              </div>
            ) : (
              <div className="weatherCelcius">
                <img className="weatherIcon" src={search} alt="cloudy" />
              </div>
            )}

            {weatherData.current ? (
              <div className="weatherStats">
                <div className="weatherStat">
                  <span className="text-sm">Humidity</span>
                  <span className="text-sm">
                    {weatherData.current?.humidity}%
                  </span>
                </div>
                <div className="weatherStat">
                  <span className="text-sm">Wind</span>
                  <span className="text-sm">
                    {weatherData.current?.wind_kph} kph
                  </span>
                </div>
                <div className="weatherStat">
                  <span className="text-sm">Pressure</span>
                  <span className="text-sm">
                    {weatherData.current?.pressure_mb} XhPa
                  </span>
                </div>
                <div className="weatherStat">
                  <span className="text-sm">Uv Index</span>
                  <span className="text-sm">{weatherData.current?.uv}</span>
                </div>
              </div>
            ) : (
              <h1>Choose your location</h1>
            )}
          </div>

          <div className="weatherFiveDays">
            {weatherData.forecast?.forecastday.map((index) => (
              <div className="weatherDaily" key={index.date}>
                <span className="text-sm">{index.date}</span>
                <img
                  className="weatherIcon"
                  src={index.day.condition.icon}
                  alt="cloudy"
                />
                <span className="text-sm">{index.day.avgtemp_c}°C</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
