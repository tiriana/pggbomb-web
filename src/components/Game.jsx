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
import LeaderBoard from "./scenes/LeaderBoard";

const SESSION_TIME = 30000;
const IDLE_MAX_TIME = 30 * 1000;
class Game extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      scene: SCENES.MENU,
      playerName: "",
      sessionId: null,
      loading: false,
      leaderBoard: [],
      errorMessage: "",
      score: 0,
      sessionTime: SESSION_TIME,
      idleMaxTime: IDLE_MAX_TIME
    };

    this.idleTimer = null;
  }

  componentDidMount() {
    setInterval(() => {
      var currentScene = this.state.scene;
      var idleTime = this.idleTimer.getElapsedTime();
      if (currentScene == SCENES.MENU || currentScene == SCENES.LEADERBOARD) {
        if (idleTime > this.state.idleMaxTime) {
          this.reset();
        }
      } else if (currentScene == SCENES.LOSE || currentScene == SCENES.WIN) {
        if (idleTime > this.state.idleMaxTime) {
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
    this.setState({ loading: true, errorMessage: "" }, () => {
      this.props.api.createSession(playerName).then(({ sessionId, timeLimit, correctAnswerTimeReward, wrongAnswerTimePenalty, skipAnswerTimePenalty }) => {
        this.setState({
          playerName,
          scene: SCENES.MAIN,
          sessionId,
          loading: false,
          sessionTime: timeLimit * 1000,
          correctAnswerReward: correctAnswerTimeReward,
          wrongAnswerPenalty: wrongAnswerTimePenalty,
          skipAnswerPenalty: skipAnswerTimePenalty,
        });
      })
        .catch(error => {
          if (error.response.status === 400) {
            var data = error.response.data;
            this.setState({
              loading: false,
              errorMessage: data.errorDesc
            });
          }
          throw error;
        });
    });
  };

  onWin = score => {
    this.setState({ loading: true }, () => {
      this.props.api
        .saveWinGame({ sessionId: this.state.sessionId, score })
        .then(({totalScore}) => {
          this.setState({ scene: SCENES.WIN, loading: false, score: totalScore  });
          setTimeout(() => this.setState({ loading: true }), 1000);
          setTimeout(() => this.reset(), 2000);
        });
    });
  };

  onLose = score => {
    this.setState({ loading: true }, () => {
      this.props.api
        .saveLoseGame({ sessionId: this.state.sessionId, score })
        .then(({totalScore}) => {
          this.setState({ scene: SCENES.LOSE, loading: false, score: totalScore });
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
            <Menu
              onNameEntered={this.onNameEntered}
              errorDesc={this.state.errorMessage} />
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
              onSkipAnswer={questionId =>
                this.props.api.skipQuestion({
                  sessionId: this.state.sessionId,
                  questionId
                })
              }
              correctAnswerReward={this.state.correctAnswerReward}
              wrongAnswerPenalty={this.state.wrongAnswerPenalty}
              skipQuestionPenalty={this.state.skipAnswerPenalty}
              time={this.state.sessionTime}
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
