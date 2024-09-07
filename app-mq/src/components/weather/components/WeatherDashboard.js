import React, { useState } from 'react';
import WeatherInput from './WeatherInput';
import CurrentWeather from './CurrentWeather';
import WeatherCard from './WeatherCard';
import '../css/WeatherDashboard.css';

// Component chính của Dashboard thời tiết
const WeatherDashboard = () => {
  // Khai bao cac state để lưu trữ 
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const API_KEY = "9933c984f8baf58b430d65ed77d628cf"; 

  // Hàm tạo đối tượng weather cho mỗi ngày dự báo
  const createWeatherCard = (cityName, weatherItem, index) => {
    const weather = {
      cityName,
      date: weatherItem.dt_txt.split(" ")[0], 
      temperature: (weatherItem.main.temp - 273.15).toFixed(2), 
      wind: weatherItem.wind.speed,
      humidity: weatherItem.main.humidity, 
      iconUrl: `https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png`, 
      description: weatherItem.weather[0].description, 
      visibility: weatherItem.visibility 
    };
    return weather;
  };

  // Hàm gọi API để lấy thông tin thời tiết
  const fetchWeatherDetails = async (cityName) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${API_KEY}`;
    try {
      const response = await fetch(WEATHER_API_URL); // Gửi yêu cầu đến API
      const data = await response.json(); 
      const uniqueForecastDays = []; 
      const fiveDaysForecast = data.list.filter(forecast => {
        const forecastDate = new Date(forecast.dt_txt).getDate(); 
        if (!uniqueForecastDays.includes(forecastDate)) { 
          uniqueForecastDays.push(forecastDate); 
          return true; 
        }
        return false; 
      });
      // Cập nhật state với thông tin thời tiết hiện tại và dự báo 5 ngày
      setCurrentWeather(createWeatherCard(cityName, fiveDaysForecast[0], 0));
      setForecast(fiveDaysForecast.slice(1).map((item, index) => createWeatherCard(cityName, item, index)));
    } catch (error) {
      alert(`Đã xảy ra lỗi khi lấy dự báo thời tiết: ${error.message}`);
    }
  };

  // Hàm gọi API để lấy thời tiết theo tên thành phố
  const fetchCityWeather = () => {
    const cityName = city.trim(); 
    if (cityName === "") return; 
    fetchWeatherDetails(cityName); 
  };

  // Hàm gọi API để lấy thời tiết theo vị trí người dùng
  const fetchUserLocationWeather = () => {
    if (!navigator.geolocation) { 
      alert("Trình duyệt của bạn không hỗ trợ định vị.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords; // Lấy tọa độ từ vị trí người dùng
        const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`;
        try {
          const response = await fetch(WEATHER_API_URL); // Gửi yêu cầu đến API
          const data = await response.json(); 
          const cityName = data.city.name; 
          fetchWeatherDetails(cityName); 
        } catch (error) {
          alert(`Đã xảy ra lỗi khi lấy dự báo thời tiết: ${error.message}`); 
        }
      },
      error => {
        switch (error.code) { 
          case error.PERMISSION_DENIED:
            alert("Yêu cầu định vị bị từ chối. Vui lòng thiết lập lại quyền định vị để cấp quyền truy cập.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Thông tin vị trí không khả dụng.");
            break;
          case error.TIMEOUT:
            alert("Yêu cầu lấy vị trí của bạn đã hết thời gian.");
            break;
          case error.UNKNOWN_ERROR:
            alert("Đã xảy ra lỗi không xác định.");
            break;
          default:
            alert("Đã xảy ra lỗi khi lấy vị trí.");
        }
      }
    );
  };

  return (
    <div className={`container ${!currentWeather && forecast.length === 0 ? 'initial-state' : ''}`}>
      <WeatherInput
        city={city}
        setCity={setCity}
        fetchWeatherByCity={fetchCityWeather}
        fetchWeatherByLocation={fetchUserLocationWeather}
      />
      {currentWeather && <CurrentWeather weather={currentWeather} />}
      {forecast.length > 0 && (
        <div className="days-forecast">
          <div className='EF'> Dự báo 5 ngày tiếp theo </div>
          <ul className="weather-cards">
            {forecast.map((weatherItem, index) => (
              <WeatherCard key={index} forecast={weatherItem} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
