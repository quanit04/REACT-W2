import React from 'react';
import WeatherDashboard from './components/WeatherDashboard';
import Header from '../Header';

const AppWeather = () => {
  return (
    <div className="App">
      <Header />
      <WeatherDashboard />
    </div>
  );
};

export default AppWeather;
