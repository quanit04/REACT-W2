import React from 'react';
import '../css/WeatherInput.css';
import { FaLocationCrosshairs } from "react-icons/fa6";

const WeatherInput = ({ city, setCity, fetchWeatherByCity, fetchWeatherByLocation }) => { // Nhận các props từ component cha
  return (
    <div className="search-element">
      <button className="location-btn" onClick={fetchWeatherByLocation}>
        <FaLocationCrosshairs />
        </button>
      <div className="search-icon" />
      <input
        className="city-input"
        type="text"
        placeholder="Nhập tên thành phố..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="search-btn" onClick={fetchWeatherByCity}>Tìm kiếm</button>
    </div>
  );
};

export default WeatherInput;
