import React from "react";
import PropTypes from "prop-types";
import Loading from "../../Loading";
import AnswerTiles from "./AnswerTiles";
import OnEnter from "../../KeyboardListener/OnEnter";

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
      questionId: null,
      questionText: null,
      correctAnswer: null,
      wrongLettersGiven: 0,
      isTimerRunning: true
    };
  }

  componentDidMount() {
    this.loadQuestion();
  }

  onWrongLetter = () => {};

  onCorrectAnswer = () => {
    this.props.onCorrectAnswer();
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
        loading: true
      },
      () => {
        this.props.questionGetter().then(({ id, question, answer } = {}) => {
          console.log({ id, question, answer });
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

  render() {
    return (
      <React.Fragment>
        {this.state.questionId && (
          <React.Fragment>
            <p> {this.state.questionText} </p>
            <AnswerTiles
              correctAnswer={this.state.correctAnswer}
              onWrongLetter={this.onWrongLetter}
              onCorrectAnswer={this.onCorrectAnswer}
            />

            {!this.state.loading && (
              <React.Fragment>
                <p> Naciśnij ENTER aby pominąć pytanie </p>
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
