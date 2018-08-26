import React from "react";
import "./styles.global.less";

const CRT = ({ children }) => (
  <div className="noisy">
    <div className="frame">
      <div className="piece output">
        <div className="main-container">
          {children}
        </div>
        <div className="piece scanlines noclick" />
        <div className="piece glow noclick" />
      </div>
    </div>
  </div>
);

export default CRT;
