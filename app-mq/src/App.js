import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register'
import Home from './components/home/home';
import AppWeather from './components/weather/AppWeather';
import AppWorkList from './components/worklist/AppWorkList';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/weather" element={<AppWeather />} />
        <Route path="/worklist" element={<AppWorkList />} />
      </Routes>
    </>
  );
};

export default App;
  
