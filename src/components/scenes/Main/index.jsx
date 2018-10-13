import React from "react";
import PropTypes from "prop-types";
import Loading from "../../Loading";
import AnswerTiles from "./AnswerTiles";
import OnEnter from "../../KeyboardListener/OnEnter";

import backgroundListener from "../../CRT/backgroundListener";

import Clock from "../../Clock";
import BombTimer from "../../lib/BombTimer";
import styles from "./mainScene.scss";

import { playHackingTime } from "../../lib/music";
import {
  playCorrectAnswerSound,
  playSkippedQuestionSound,
  playBeep
} from "../../lib/sounds";

const MAX_WRONG_LETTERS = 3;


class Main extends React.Component {

  constructor(props) {
    super(props);

    this.maxWrongLetters = 3;

    this.state = {
      loading: false,
      correctAnswerAnimation: false,
      questionId: null,
      questionText: null,
      correctAnswer: null,
      wrongLettersGiven: 0,
      timeLeft: this.props.time,
      correctAnswerReward: this.props.correctAnswerReward,
      wrongAnswerPenalty: -this.props.wrongAnswerPenalty,
      skipQuestionPenalty: -this.props.skipQuestionPenalty,
      timeDiffs: {},
      maxTimeLimit: this.props.maxTimeLimit,
      score: 0
    };

    this.timer = new BombTimer({ time: this.props.time, maxTimeLimit: this.props.maxTimeLimit });
  }

  componentWillMount() {
    playHackingTime();
    this.tickingSound = setInterval(() => {
      if (this.timer.isRunning()) {
        playBeep();
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.timer.unbindTick();
    clearInterval(this.tickingSound);
    backgroundListener.setNormal();
  }

  componentDidMount() {
    this.loadQuestion();
    this.timer.onTick(this.tick);
    this.timer.onDone(this.props.onLose);
  }

  tick = () => {
    this.setState({ timeLeft: this.timer.ms });

    if (this.timer.ms > 20 * 1000) {
      backgroundListener.setNormal();
    } else if (this.timer.ms > 10 * 1000) {
        backgroundListener.setWarning();
    } else {
      backgroundListener.setDanger();
    }

  };

  changeTimeLeft = diff => {
    this.indicateTimeDiff(diff);
    this.setState(({ timeLeft: prev }) => {
      var time = prev + diff;
      console.log(time);
      return ({ timeLeft: time > 0 ? time : 0 });
    });
    this.timer.changeTime(diff * 1000);
  };

  onWrongLetter = () => {
    var self = this;
    this.changeTimeLeft(this.state.wrongAnswerPenalty);
    this.props.onWrongAnswer(this.state.questionId);
  };

  indicateTimeDiff = diff => {
    const diffNotificationId = setTimeout(() => {
      this.removeTimeDiffNotification(diffNotificationId);
    }, 3000);
    this.addTimeDiffNotification(diffNotificationId, diff);
  };

  addTimeDiffNotification = (id, diff) => {
    this.setState(prevState => {
      const timeDiffs = { ...prevState.timeDiffs };
      timeDiffs[id] = diff;

      return {
        timeDiffs
      };
    });
  };

  removeTimeDiffNotification = id => {
    this.setState(prevState => {
      const timeDiffs = { ...prevState.timeDiffs };
      delete timeDiffs[id];

      return {
        timeDiffs
      };
    });
  };

  onCorrectAnswer = () => {
    playCorrectAnswerSound();
    this.timer.stop();
    this.setState({
      loading: true,
      correctAnswerAnimation: true
    }, () => {
      this.props.onCorrectAnswer(this.state.questionId).then(({ timeShift, totalScore }) => {
        this.changeTimeLeft(timeShift);
        setTimeout(() => this.loadQuestion(totalScore), 1000);
      });
    })
  };

  onNoMoreQuestions = () => {
    this.timer.stop();
    this.setState(
      {
        loading: false,
        questionId: null,
        questionText: null,
        correctAnswer: null,
        wrongLettersGiven: 0
      },
      () => this.props.onWin()
    );
  };

  skipQuestion = () => {
    this.timer.stop();
    this.props.onSkipAnswer(this.state.questionId).then(({ timeShift, totalScore }) => {
      playSkippedQuestionSound();
      this.changeTimeLeft(timeShift);
      this.loadQuestion(totalScore);
    });
  };

  loadQuestion(totalScore = 0) {
    this.setState(
      {
        loading: true,
        correctAnswerAnimation: false
      },
      () => {
        this.timer.stop();
        this.props.questionGetter().then(({ id, question, answer, category } = {}) => {
          this.timer.start();

          return this.setState({
            questionId: id,
            questionText: question,
            categoryName: category,
            correctAnswer: answer,
            wrongLettersGiven: 0,
            loading: false,
            score: totalScore
          });
        })
          .catch(error => {
            if (error.response.status === 400) {
              var data = error.response.data;
              if (data.errorCode === 3) {
                return this.onNoMoreQuestions();
              }
            }
          });
      }
    );
  }

  renderTimeDiffNotifications = () => {
    return Object.keys(this.state.timeDiffs).map(timeDiffId => {
      const timeDiff = this.state.timeDiffs[timeDiffId];
      const style = timeDiff < 0 ? styles.red : styles.blue;
      const sign = timeDiff < 0 ? "" : "+";
      return (
        <span
          className={[styles.timeDiff, style].join(" ")}
          key={`notification_${timeDiffId}`}
        >
          {timeDiff}
          {" " + sign}
        </span>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.questionId && (
          <React.Fragment>
            <div className={styles.clockWrapper}>
              <Clock timeLeftMS={this.state.timeLeft} />
              {this.renderTimeDiffNotifications()}
            </div>
            <div className={styles.points + ' regular-text'}>Punkty: {this.state.score}</div>

            <p className={styles.categoryName}>KATEGORIA: {this.state.categoryName}</p>
            <div className={styles.questionContent}> {this.state.questionText} </div>
            <AnswerTiles
              key={`answer_${this.state.questionId}`}
              correctAnswer={this.state.correctAnswer}
              onWrongLetter={this.onWrongLetter}
              onCorrectAnswer={this.onCorrectAnswer}
            />


            {!this.state.loading &&
              !this.state.correctAnswerAnimation && (
                <React.Fragment>
                  <p className={styles.description}> Naciśnij ENTER aby pominąć pytanie (Tracisz od razu 5 sekund) </p>
                  <OnEnter callback={this.skipQuestion} />
                </React.Fragment>
              )}
          </React.Fragment>
        )}

        {this.state.loading && <Loading />}
      </React.Fragment>
    );
  }

  static propTypes = {
    playerName: PropTypes.string.isRequired,
    sessionId: PropTypes.number.isRequired,
    onWin: PropTypes.func.isRequired,
    onLose: PropTypes.func.isRequired,
    questionGetter: PropTypes.func.isRequired,
    onCorrectAnswer: PropTypes.func.isRequired,
    onWrongAnswer: PropTypes.func.isRequired,
    time: PropTypes.number.isRequired
  };
}

export default Main;
