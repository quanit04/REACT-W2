import React from 'react';
import '../css/WeatherCard.css';

const WeatherCard = ({ forecast }) => {
  const roundedTemperature = Math.round(forecast.temperature); //Làm tròn nhiệt độ 
  return (
    <li className="card">
      <h3>({forecast.date})</h3>
      <img src={forecast.iconUrl} alt="weather-icon" />
      <h5>Nhiệt độ: {roundedTemperature}°C</h5>
      <h5>Tốc độ gió: {forecast.wind} M/S</h5>
      <h5>Độ ẩm: {forecast.humidity}%</h5>
    </li>
  );
};

export default WeatherCard;
