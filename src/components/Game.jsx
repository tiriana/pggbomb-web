import React from "react";
import PropTypes from "prop-types";
import { SCENES } from "../consts";
import APIPropType from "./API.propType";
import IdleTimer from 'react-idle-timer'
import Loading from "./Loading";

import Menu from "./scenes/Menu";
import Main from "./scenes/Main";
import Win from "./scenes/Win";
import Lose from "./scenes/Lose";
import Idle from "./scenes/Idle";
import LeaderBoard from "./scenes/Leaderboard";

const SESSION_TIME = 10000;
const IDLE_MAX_TIME =  120 * 1000;
class Game extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      scene: SCENES.IDLE,
      playerName: "",
      sessionId: null,
      loading: false,
      leaderBoard: []
    };

    this.idleTimer = null;
  }

  componentDidMount() {
    setInterval(() => {
      var currentScene = this.state.scene;
      var idleTime = this.idleTimer.getElapsedTime();
      if (currentScene == SCENES.MENU || currentScene == SCENES.LEADERBOARD) {
        if (idleTime > IDLE_MAX_TIME) {
          this.reset();
        }
      } else if (currentScene == SCENES.LOSE || currentScene == SCENES.WIN) {
        if (idleTime > IDLE_MAX_TIME) {
          this.leaderBoard();
        }
      } else {
        this.idleTimer.reset();
      }
    }, 1000);
  }


  componentDidUpdate(prevProps) {
    if (this.props.scene !== prevProps.scene) {
      this.idleTimer.reset();
    }
  }



  reset = () => {
    this.setState({
      scene: SCENES.IDLE,
      playerName: "",
      sessionId: null,
      loading: false
    });
    this.idleTimer.reset();
  };

  leaderBoard = () => {
    this.setState({ loading: true }, () => {
      this.props.api.getLeaderboard().then(({ leaderBoard }) => {
        this.setState({
          leaderBoard,
          scene: SCENES.LEADERBOARD,
          playerName: "",
          sessionId: null,
          loading: false,
        });
      });
    });
    this.idleTimer.reset();
  };

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
        .saveWinGame({ sessionId: this.state.sessionId, score })
        .then(() => {
          this.setState({ scene: SCENES.WIN, loading: false });
          setTimeout(() => this.setState({ loading: true }), 1000);
          setTimeout(() => this.reset(), 2000);
        });
    });
  };

  onLose = score => {
    this.setState({ loading: true }, () => {
      this.props.api
        .saveLoseGame({ sessionId: this.state.sessionId, score })
        .then(() => {
          this.setState({ scene: SCENES.LOSE, loading: false });
        });
    });
  };

  onEnterPress = () => {
    this.setState({ loading: true }, () => {
      new Promise(resolve => {
        setTimeout(() => {
          this.setState({
            scene: SCENES.MENU,
            loading: false
          });
        }, 500);
      })
    });
  }

  onLoseSceneAnyKeyPress = () => {
    this.leaderBoard();
  }

  onLeaderboardSceneAnyKeyPress = () => {
    this.reset();
  }


  render() {
    return (
      <IdleTimer
        ref={ref => { this.idleTimer = ref }}
        onActive={this.onActive}
        onIdle={this.onIdle}
        timeout={this.state.timeout}
        startOnLoad>
        <React.Fragment>
          {this.state.scene === SCENES.WIN && (
            <Win
              sessionId={this.state.sessionId}
              playerName={this.state.playerName}
            />
          )}

          {this.state.scene === SCENES.LOSE && (
            <Lose
              playerId={this.state.sessionId}
              playerName={this.state.playerName}
              points={this.state.score}
              onAnyKeyPressed={this.onLoseSceneAnyKeyPress}
            />
          )}

          {this.state.scene === SCENES.MENU && (
            <Menu onNameEntered={this.onNameEntered} />
          )}

          {this.state.scene === SCENES.MAIN && (
            <Main
              playerName={this.state.playerName}
              sessionId={this.state.sessionId}
              onWin={this.onWin}
              onLose={this.onLose}
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

          {this.state.scene === SCENES.IDLE && (
            <Idle onEnterPress={this.onEnterPress} />
          )}


          {this.state.scene === SCENES.LEADERBOARD && (
            <LeaderBoard
              leaderBoard={this.state.leaderBoard}
              onAnyKeyPressed={this.onLeaderboardSceneAnyKeyPress}
            />
          )}

          {this.state.loading && <Loading />}
        </React.Fragment>
      </IdleTimer>
    );
  }
}

Game.propTypes = {
  api: APIPropType.isRequired
};

export default Game;
