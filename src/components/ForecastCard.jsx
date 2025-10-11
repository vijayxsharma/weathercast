import React from "react";

const ForecastCard = ({ data }) => {
  const date = new Date(data.dt_txt).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="forecast-card">
      <h4>{date}</h4>
      <img src={icon} alt="forecast" />
      <p>{data.weather[0].main}</p>
      <p>{data.main.temp}°C</p>
    </div>
  );
};

export default ForecastCard;
