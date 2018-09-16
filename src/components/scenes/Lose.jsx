import React from "react";
import { playTimeEndExplosionSound } from "../lib/music";
import OnKeydown from "../KeyboardListener/OnKeydown";

const explosionImage = require('../../resources/img/end_explosion.png');


var titleStyle = {
  fontSize: '5rem',
  marginBotton: '1rem',
  marginTop: '-1rem',
}

var imgStyle = {
  height: '35rem',
  marginTop: '2rem'
}

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
    return re.exec(this.props.playerId)[0];
  }

  render() {
    return (
      <React.Fragment>
        <div className='regular-text'>
          <div style={titleStyle}>KONIEC CZASU</div>
          <div>Twój wynik: {this.props.points}</div>
          <div><span>Gracz: {this.props.playerName}</span><span> ID: {this.getPlayerId()}</span></div>
          <div>Odbierz wydruk z wynikiem</div>
          <img style={imgStyle} src={explosionImage} alt="Explosion" />
          <OnKeydown callback={this.callback} />
        </div>
      </React.Fragment>
    );
  }
}

export default Lose;
