import React from "react";

const CRT = ({ children }) => (
  <div className="noisy">
    <div className="frame">
      <div className="piece output">
        { children }
        <div className="piece scanlines noclick" />
        <div className="piece glow noclick" />
      </div>
    </div>
  </div>
);

export default CRT;
