import React from "react";
import { playTimeEndExplosionSound } from "../lib/music";
import OnKeydown from "../KeyboardListener/OnKeydown";

const explosionImage = require('../../resources/img/end_explosion.png');

class Lose extends React.Component {

  skipSceneDisabled = true;
  onAnyKeyPressed = null;

  constructor(...args) {
    super(...args);
  }


  componentWillMount() {
    playTimeEndExplosionSound();

    setTimeout(() => {
      this.skipSceneDisabled = false;
    }, 5000)
  }

  callback = (e) => {
    if (!this.skipSceneDisabled) {
      this.props.onAnyKeyPressed();
    }
  }

  getPlayerId() {
    const re = /(?!.*\/)(.*)$/;
    return re.exec(this.props.playerId);
  }

  render() {
    return (
      <React.Fragment>
        <div className='regular-text'>
          <div>KONIEC CZASU</div>
          <div>Twój wynik: {this.props.points}</div>
          <div><span>Gracz: {this.props.playerName}</span><span> ID: {this.getPlayerId()}</span></div>
          <div>Odbierz wydruk z wynikiem</div>
          <img src={explosionImage} alt="Explosion" />
          <OnKeydown callback={this.callback} />
        </div>
      </React.Fragment>
    );
  }
}

export default Lose;
