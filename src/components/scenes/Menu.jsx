import React from "react";
import NameInput from "../NameInput";
import { playMachineSound } from "../lib/music";


const header = {
  fontSize: '5rem'
}

const description = {
  fontSize: '37px'
}

const error = {
  color: '#ff2a2a',
  textShadow: '0rem 0.2rem 1rem #ff4a15',
  fontSize: '49px'
}

class Menu extends React.Component {
  componentWillMount() {
    playMachineSound();
    this.setState({
      errorDesc: ""
    })
  }

  render() {
    const { onNameEntered } = this.props;

    return (
      <React.Fragment>
        <h1 style={header}>LOADING PROGRAM: PGG BOMB</h1>
        <p style={description}>Witaj podróżniku. Zagrajmy w grę...</p>

        <div style={description}>
          Podaj swoje imię: <NameInput onEnter={onNameEntered} />
        </div>
        {this.props.errorDesc.length > 0 &&
          <div style={error}>
            {this.props.errorDesc}
          </div>
        }
      </React.Fragment>
    );
  }
}

export default Menu;
