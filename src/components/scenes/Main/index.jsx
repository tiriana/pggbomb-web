import React from "react";
import PropTypes from "prop-types";
import Loading from "../../Loading";
import AnswerTiles from "./AnswerTiles";
import OnEnter from "../../KeyboardListener/OnEnter";

import Clock from "../../Clock";
import BombTimer from "../../lib/BombTimer";

const MAX_WRONG_LETTERS = 3;
const TIME_DIFF_FOR_CORRECT_ANSWER = 10;
const TIMES_DIFF_FOR_WRONG_LETTER = [-2, -3, -5];
const TIMES_DIFF_FOR_SKIP_QUESTION = -2;

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
      timeLeft: this.props.time
    };

    this.timer = new BombTimer({ time: this.props.time });
  }

  componentDidMount() {
    this.loadQuestion();
    this.timer.onTick(this.tick);
    this.timer.start();
    console.log("stargint timer");
  }

  componentDidUpdate() {
    this.setTimerTicking(
      !!(!this.state.loading && !this.state.correctAnswerAnimation)
    );
  }

  tick = () => {
    this.setState({ timeLeft: this.timer.ms });
    console.log("time left", this.timer.ms);
  };

  onWrongLetter = () => {};

  onCorrectAnswer = () => {
    this.setState({
      correctAnswerAnimation: true
    });
    setTimeout(() => this.loadQuestion(), 1000);
  };

  onNoMoreQuestions = () => {
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
    console.log("skip question");
    this.loadQuestion();
  };

  loadQuestion() {
    this.setState(
      {
        loading: true,
        correctAnswerAnimation: false
      },
      () => {
        this.props.questionGetter().then(({ id, question, answer } = {}) => {
          if (!id) {
            return this.onNoMoreQuestions();
          }

          return this.setState({
            questionId: id,
            questionText: question,
            correctAnswer: answer,
            wrongLettersGiven: 0,
            loading: false
          });
        });
      }
    );
  }

  setTimerTicking = isTicking => {
    // if (this._setTimerTicking) {
    //   this._setTimerTicking(isTicking);
    // }
  };

  applyTimeDiff = diff => {
    // if (this.__applyTimeDiff) {
    //   this.__applyTimeDiff(diff);
    // }
  };

  render() {
    return (
      <React.Fragment>
        {this.state.questionId && (
          <React.Fragment>
            <h2> {this.state.questionText} </h2>
            <AnswerTiles
              key={`answer_${this.state.questionId}`}
              correctAnswer={this.state.correctAnswer}
              onWrongLetter={this.onWrongLetter}
              onCorrectAnswer={this.onCorrectAnswer}
            />

            {!this.state.loading &&
              !this.state.correctAnswerAnimation && (
                <React.Fragment>
                  <p> Naciśnij ENTER aby pominąć pytanie </p>
                  <OnEnter callback={this.skipQuestion} />
                </React.Fragment>
              )}
          </React.Fragment>
        )}

        <Clock timeLeftMS={this.state.timeLeft} />

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