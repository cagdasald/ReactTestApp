import React from "react";
import "./AppImage.scss";

interface IProps {
  src: string;
  alt: string;
  subText: string;
}

function AppImage(props: IProps) {
  return (
    <div className="container">
      <img src={props.src} alt={props.alt} className="image" />
      <div className="middle">
        <div className="text">{props.subText}</div>
      </div>
    </div>
  );
}

export default AppImage;
