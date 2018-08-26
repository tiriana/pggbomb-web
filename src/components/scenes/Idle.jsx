import React from "react";
import OneKeyInput from "../OneKeyInput";
import { playMachineSound } from "../lib/music";

const logo = require('../../resources/img/pggbomb_logo.png');

const description  = {
  fontSize: '3rem',
  marginTop: '1rem'
}

class Idle extends React.Component {
  componentWillMount() {
    playMachineSound();
  }

  render() {
    const { onEnterPress } = this.props;

    return (
      <React.Fragment>
        <img src={logo} alt='Logo' />

        <div style={description}>
          NACIŚNIJ ENTER ABY ROZPOCZĄĆ<OneKeyInput requiredKeyCode='ENTER' onRequiredKeyPress={onEnterPress} />
        </div>
      </React.Fragment>
    );
  }
}

export default Idle;
