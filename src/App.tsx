import React, { useEffect, useState } from "react";
import "./App.scss";
import AppLayout from "./components/Layout/AppLayout";
import WeatherPage from "./pages/WeatherPage/WeatherPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { router } from "./core/utils/router";
import MenuPage from "./pages/MenuPage/MenuPage";
import BmiPage from "./pages/BmiPage/BmiPage";

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const mouseXpercentage = Math.round((event.pageX / windowWidth) * 100);
      const mouseYpercentage = Math.round((event.pageY / windowHeight) * 100);

      setMousePosition({ x: mouseXpercentage, y: mouseYpercentage });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const radialGradientStyle = {
    background: `radial-gradient(at ${mousePosition.x}% ${mousePosition.y}%, #3498db, #9b59b6)`,
  };

  const renderLayout = () => {
    return (
      <AppLayout>
        <Routes>
          <Route path={router.MENU} element={<MenuPage />} />
          <Route path={router.WEATHER} element={<WeatherPage />} />
          <Route path={router.BMI} element={<BmiPage />} />
          <Route path="*" element={<Navigate to={router.MENU} />} />
        </Routes>
      </AppLayout>
    );
  };

  return <div id="app" style={radialGradientStyle}>{renderLayout()}</div>;
}

export default App;
