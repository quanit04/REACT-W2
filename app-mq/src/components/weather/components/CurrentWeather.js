import React from 'react';
import '../css/CurrentWeather.css';

const translateDescription = (description) => {
  switch (description.toLowerCase()) {
    case 'clear sky':
      return 'Trời quang đãng';
    case 'few clouds':
      return 'Một vài đám mây';
    case 'scattered clouds':
      return 'Mây rải rác';
    case 'broken clouds':
      return 'Mây đen';
    case 'shower rain':
      return 'Mưa rào';
    case 'rain':
      return 'Mưa';
    case 'light rain':
      return 'Mưa nhỏ'
    case 'thunderstorm':
      return 'Giông bão';
    case 'snow':
      return 'Tuyết';
    case 'mist':
      return 'Sương mù';
    default:
      return description; 
  }
};
const CurrentWeather = ({ weather }) => { // Khai báo component CurrentWeather với prop là 'weather'.
  const roundedTemperature = Math.round(weather.temperature); 
  const translatedDescription = translateDescription(weather.description); 

  return (
    <div className="weather-container">
      <div className="header">
        <div className="section-title">Thời tiết hiện tại</div> 
      </div>
      
      <div className="current-weather-container">
        <div className="current-weather-status">
          <h1>{weather.cityName}</h1> 
          <b>({weather.date})</b> 
          
          <div className="weather-icon-temp">
            <img 
              src={weather.iconUrl}  
              alt="weather-icon" 
              className='w-full'  
            />
          </div>
          <span>
            {roundedTemperature}
            <sup>&deg;</sup> 
          </span>
          <h6>{translatedDescription}</h6> 
        </div>
        
        <div className="current-weather-info">
          <div className="info-row">
            <div>
              <h4>Độ ẩm: {weather.humidity} %</h4>
            </div>
          </div>
          
          <div className="info-row">
            <div>
              <h4>Tốc độ gió: {weather.wind} M/S</h4> 
            </div>
          </div>
          
          <div className="info-row">
            <div>
              <h4>Tầm nhìn: {weather.visibility}m</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
