import React from "react";
import "./MenuPage.scss";
import AppImage from "../../components/AppImage/AppImage";
import weather from "../../assets/images/weatherapp.png";
import bmi from "../../assets/images/bmiapp.png";
import { Link } from "react-router-dom";
import { router } from "../../core/utils/router";

function MenuPage() {
  return (
    <div id="menu-page" className="page">
      <h1 className="header">Apps</h1>
      <div className="page-content">
        <div className="caseWrapper">
          <Link to={router.WEATHER}>
            <AppImage src={weather} alt="WeatherApp" subText="WeatherApp" />
          </Link>
        </div>
        
        <div className="caseWrapper">
          <Link to={router.BMI}>
            <AppImage src={bmi} alt="bmicalc" subText="Bmi Calculator" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
