import React, { useState } from "react";
import "./BmiPage.scss";
import light from "../../assets/images/light.svg";
import dark from "../../assets/images/dark.svg";
import { Switch } from "antd";

interface StateValue {
  state: React.Dispatch<React.SetStateAction<number>>;
  min: number;
  max: number;
}

function BmiPage() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [weight, setWeight] = useState<number>(60);
  const [height, setHeight] = useState<number>(160);
  const [age, setAge] = useState<number>(25);

  const stateValues: StateValue[] = [
    { state: setWeight, min: 0, max: 600 },
    { state: setHeight, min: 0, max: 300 },
    { state: setAge, min: 0, max: 120 },
  ];

  const updateValue = (index: number, delta: number) => {
    const { state, min, max } = stateValues[index];
    state((prevValue) => Math.max(min, Math.min(max, prevValue + delta)));
  };

  const calculateBMI = () => {
    const bmi = (weight) / ((height / 100) * (height / 100));
    if (bmi <= 18.5) {
      alert(`Your bmi is: ${bmi}, underweight!`);
    } else if (bmi <= 24.9) {
      alert(`Your bmi is: ${bmi}, normal weight`);
    } else if (bmi <= 29.9) {
      alert(`Your bmi is: ${bmi}, Overweight`);
    } else if (bmi <= 34.9) {
      alert(`Your bmi is: ${bmi}, Obesity Class 1`);
    } else if (bmi <= 39.9) {
      alert(`Your bmi is: ${bmi}, Obesity Class 2`);
    } else {
      alert(`Your bmi is: ${bmi}, Obesity Class 3`);
    }
  };

  return (
    <div id="bmi-page" className="page">
      <h1 className="header">Apps</h1>
      <div className="page-content">
        <div className={`bmiContainer ${isDarkMode ? "dark" : "light"}`}>
          <Switch
            className="ant-switch"
            defaultChecked
            checkedChildren={<img src={light} alt="light" />}
            unCheckedChildren={<img src={dark} alt="dark" />}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
          <h2 className="title text-l">
            <span>Welcome 😊</span> <br />
            Bmi calculator
          </h2>

          <div className="bodyStats">
            <div className="card">
              <span className="text-md">Weight</span>
              <span>{weight}</span>
              <div className="buttonWrapper">
                <button onClick={() => updateValue(0, -1)}>-</button>
                <button onClick={() => updateValue(0, 1)}>+</button>
              </div>
            </div>

            <div className="card">
              <span className="text-md">Height</span>
              <span>{height}</span>
              <div className="buttonWrapper">
                <button onClick={() => updateValue(1, -1)}>-</button>
                <button onClick={() => updateValue(1, 1)}>+</button>
              </div>
            </div>

            <div className="card">
              <span className="text-md">Age</span>
              <span>{age}</span>
              <div className="buttonWrapper">
                <button onClick={() => updateValue(2, -1)}>-</button>
                <button onClick={() => updateValue(2, 1)}>+</button>
              </div>
            </div>
          </div>

          <button onClick={calculateBMI} className="calculateButton">
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
}

export default BmiPage;
