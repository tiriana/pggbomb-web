import React from "react";
import NameInput from "../NameInput";

const Menu = ({ onNameEntered }) => (
  <React.Fragment>
        <h1>PGG BOMB</h1>
        <p>Witaj podróżnku. Zagrajmy w grę...</p>

        <p>
          Podaj swoje imię: <NameInput onEnter={onNameEntered} />
        </p>
  </React.Fragment>
);

export default Menu;
