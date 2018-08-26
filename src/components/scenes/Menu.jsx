import React from "react";
import NameInput from "../NameInput";
import { playMachineSound } from "../lib/music";


const header = {
  fontSize: '5rem'
}

const description = {
  fontSize: '37px'
}

class Menu extends React.Component {
  componentWillMount() {
    playMachineSound();
  }

  render() {
    const { onNameEntered } = this.props;

    return (
      <React.Fragment>
        <h1 style={header}>LOADING PROGRAM: PGG BOMB</h1>
        <p style={description}>Witaj podróżniku. Zagrajmy w grę...</p>

        <div>
          Podaj swoje imię: <NameInput onEnter={onNameEntered} />
        </div>
      </React.Fragment>
    );
  }
}

export default Menu;
