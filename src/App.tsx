import React from 'react';
import './App.scss';
import AppLayout from './components/Layout/AppLayout';
import WeatherPage from './pages/WeatherPage/WeatherPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { router } from './core/utils/router';
import MenuPage from './pages/MenuPage/MenuPage';

function App() {

  const renderLayout = () => {
    return (
      <AppLayout>
        <Routes>
          <Route path={router.MENU} element={<MenuPage />} />
          <Route path={router.WEATHER} element={<WeatherPage />} />
          <Route path='*' element={<Navigate to={router.MENU} />} />
        </Routes>
        <WeatherPage />
      </AppLayout>
    );
  }

  return (
    <div id='app'>
      {renderLayout()}
    </div>
  );
}

export default App;
