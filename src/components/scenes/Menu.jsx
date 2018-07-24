import React from "react";
import NameInput from "../NameInput";

const Menu = ({ onNameEntered }) => (
  <React.Fragment>
        <h1>PGG BOMB</h1>
        <p>Welcome Traveler. I wanna play a game.</p>

        <p>
          Enter your name: <NameInput onEnter={onNameEntered} />
        </p>
  </React.Fragment>
);

export default Menu;
