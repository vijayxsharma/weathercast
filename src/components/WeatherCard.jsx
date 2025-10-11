import React from "react";

const WeatherCard = ({ weather }) => {
  const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <img src={icon} alt="weather icon" />
      <h3>{weather.weather[0].main}</h3>
      <p>🌡️ {weather.main.temp}°C</p>
      <p>💨 Wind: {weather.wind.speed} m/s</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
    </div>
  );
};

export default WeatherCard;
