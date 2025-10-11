import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  // ✅ Put your OpenWeather API key here
  const API_KEY = "ce86f52ea56e76ed5424fa4468511e38";

  const fetchWeather = async () => {
    if (!city) return;

    try {
      setError("");

      // 🌡️ Current weather
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      // 📅 5-day forecast (3-hour intervals)
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      // ✅ Filter for one reading per day (12:00 PM)
      const dailyForecast = forecastResponse.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setWeather(weatherResponse.data);
      setForecast(dailyForecast.slice(0, 5)); // Limit to 5 days
    } catch (err) {
      setError("City not found. Try again!");
      setWeather(null);
      setForecast([]);
    }
  };

  return (
    <div className="app">
      <h1>🌤️ WeatherCast</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && <WeatherCard weather={weather} />}

      {forecast.length > 0 && (
        <div className="forecast">
          <h3>5-Day Forecast</h3>
          <div className="forecast-list">
            {forecast.map((item, index) => (
              <ForecastCard key={index} data={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
