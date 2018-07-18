import React from 'react';

import { SCENES } from "./consts";
import Menu from "./scene/Menu";
import Main from "./scene/Main";

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      scene: SCENES.MENU,
      playerName: ""
    };
  }

  render() {
    return (
      <React.Fragment>
        { this.state.scene === SCENES.MENU && <Menu onNameEntered={ playerName => {
          this.setState({ playerName, scene: SCENES.MAIN })
        }}/> }

        { this.state.scene === SCENES.MAIN && <Main playerName={ this.state.playerName } /> }
      </React.Fragment>
    );
  }
}

export default Game;
