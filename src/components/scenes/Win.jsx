import React from "react";
import OnKeydown from "../KeyboardListener/OnKeydown";

const happyface = require('../../resources/img/happyface.png');

var titleStyle = {
  fontSize: '5rem',
  marginBotton: '1rem',
  marginTop: '-1rem',
}

var imgStyle = {
  height: '33rem',
  marginTop: '2rem'
}

class Win extends React.Component {

  skipSceneDisabled = true;
  onAnyKeyPressed = null;

  constructor(...args) {
    super(...args);
  }


  componentWillMount() {
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
          <div style={titleStyle}>GRATULACJE</div>
          <div>UDAŁO CI SIĘ DOTRWAĆ DO KOŃCA I WYCZERPAĆ ZESTAW PYTAŃ</div>
          <div>NIE WIELU GRACZY ZOBACZY TEN EKRAN</div>
          <div>Twój wynik: {this.props.points}</div>
          <div><span>Gracz: {this.props.playerName}</span><span> ID: {this.getPlayerId()}</span></div>
          <div>Odbierz wydruk z wynikiem</div>
          <img style={imgStyle} src={happyface} alt="happyface" />
          <OnKeydown callback={this.callback} />
        </div>
      </React.Fragment>
    );
  }
}

export default Win;
