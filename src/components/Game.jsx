import React from "react";
import PropTypes from "prop-types";
import { SCENES } from "../consts";
import APIPropType from "./API.propType";

import Loading from "./Loading";

import Menu from "./scenes/Menu";
import Main from "./scenes/Main";
import Win from "./scenes/Win";

const SESSION_TIME = 60 + 3;

class Game extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      scene: SCENES.MENU,
      playerName: "",
      sessionId: null,
      loading: false
    };
  }

  onNameEntered = playerName => {
    this.setState({ loading: true }, () => {
      this.props.api.createSession(playerName).then(({ sessionId }) => {
        this.setState({
          playerName,
          scene: SCENES.MAIN,
          sessionId,
          loading: false
        });
      });
    });
  };

  onWin = score => {
    this.setState({ loading: true }, () => {
      this.props.api
        .saveWinGame({   sessionId: this.state.sessionId, score })
        .then(() => {
          this.setState({ scene: SCENES.WIN, loading: false });
        });
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.scene === SCENES.WIN && (
          <Win sessionId={this.state.sessionId} />
        )}

        {this.state.scene === SCENES.MENU && (
          <Menu onNameEntered={this.onNameEntered} />
        )}

        {this.state.scene === SCENES.MAIN && (
          <Main
            playerName={this.state.playerName}
            sessionId={this.state.sessionId}
            onWin={this.onWin}
            onLose={score =>
              this.props.api.saveLoseGame({
                sessionId: this.state.sessionId,
                score
              })
            }
            questionGetter={() =>
              this.props.api.getNextQuestion({
                sessionId: this.state.sessionId
              })
            }
            onCorrectAnswer={questionId =>
              this.props.api.saveGoodAnswer({
                sessionId: this.state.sessionId,
                questionId
              })
            }
            onWrongAnswer={questionId =>
              this.props.api.saveBadAnswer({
                sessionId: this.state.sessionId,
                questionId
              })
            }
            time={SESSION_TIME}
          />
        )}

        {this.state.loading && <Loading />}
      </React.Fragment>
    );
  }
}

Game.propTypes = {
  api: APIPropType.isRequired
};

export default Game;
