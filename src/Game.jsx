import React from 'react';

import { SCENES } from "./consts";
import Menu from "./scene/Menu";

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      scene: SCENES.MENU
    };
  }

  render() {
    console.log(this.state.scene);
    return (
      <React.Fragment>
        { this.state.scene === SCENES.MENU && <Menu/> }
      </React.Fragment>
    );
  }
}

export default Game;
