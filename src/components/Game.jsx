import { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { SCENES } from "../consts";
import APIPropType from "./API.propType";

import Menu from "./scenes/Menu";
import Main from "./scenes/Main";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      scene: SCENES.MENU,
      playerName: ""
    };
  }

  render() {
    return (
      <Fragment>
        { this.state.scene === SCENES.MENU && <Menu onNameEntered={ playerName => {
          this.setState({ playerName, scene: SCENES.MAIN })
        }}/> }

        { this.state.scene === SCENES.MAIN && <Main playerName={ this.state.playerName } /> }
      </Fragment>
    );
  }
}

Game.propTypes = {
  api: APIPropType.isRequired
}

export default Game;
