import React from "react";
import MultiKeyInput from "../MultiKeyInput";
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
    const { onEnterOrSpacePress } = this.props;

    return (
      <React.Fragment>
        <img src={logo} alt='Logo' />

        <div style={description}>
          NACIŚNIJ ENTER ABY ROZPOCZĄĆ<MultiKeyInput requiredKeyCodes={['enter', 'space']} onRequiredKeyPress={onEnterOrSpacePress} />
        </div>
      </React.Fragment>
    );
  }
}

export default Idle;
