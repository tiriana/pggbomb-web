import React from "react";
import PropTypes from "prop-types";
import OnAlphanumerical from "../../KeyboardListener/OnAlphanumerical";
import styles from "./AnswerTiles.scss";

// const AnswerTiles = ({ correctAnswer, onWrongLetter, onCorrectAnswer }) => <div>
// Tutaj będzie komponent odpowiedzi.
// Poprawna odpowiedź to "{ correctAnswer }"
// </div>;

class Letter extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    expected: PropTypes.string.isRequired,
    visible: PropTypes.string,
    hasFocus: PropTypes.bool.isRequired,
    incorrect: PropTypes.string,
    onCorrect: PropTypes.func.isRequired,
    onIncorrect: PropTypes.func.isRequired
  };

  static defaultProps = {
    visible: " ",
    incorrect: false
  };

  onLetter = letter => {
    letter = letter.toUpperCase();
    const expected = this.props.expected.toUpperCase();
    if (letter === expected) {
      this.props.onCorrect(letter);
    } else {
      this.props.onIncorrect(letter);
    }
  };

  render() {
    return (
      <div
        className={[
          styles.letter,
          this.props.incorrect && styles.incorrect
        ].join(" ")}
      >
        {this.props.visible} {this.props.incorrect}
        {this.props.hasFocus && <OnAlphanumerical callback={this.onLetter} />}
      </div>
    );
  }
}

class AnswerTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canType: true,
      focusedLetter: 0,
      visibleLetters: [],
      incorrectLetterIndex: null,
      incorrectLetter: "",
      isCorrectAnswer: false
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.isCorrectAnswer === false &&
      this.state.isCorrectAnswer === true
    ) {
      this.props.onCorrectAnswer();
    }
  }

  renderLettersTiles = () => {
    let letters = 0;
    return this.props.correctAnswer.split(" ").map((word, idx) => (
      <div className={styles.word} key={`word_${idx}`}>
        {word.split("").map(letter => {
          let letterIdx = letters++;
          return (
            <Letter
              key={`letter_${letterIdx}`}
              expected={letter}
              visible={this.state.visibleLetters[letterIdx]}
              incorrect={letterIdx === this.state.incorrectLetterIndex && this.state.incorrectLetter}
              hasFocus={
                !this.state.isCorrectAnswer &&
                this.state.canType &&
                this.state.focusedLetter === letterIdx
              }
              onCorrect={letter => {
                this.setState(state => {
                  const visibleLetters = [...state.visibleLetters];
                  visibleLetters[letterIdx] = letter;

                  return {
                    visibleLetters,
                    focusedLetter: state.focusedLetter + 1,
                    isCorrectAnswer: state.focusedLetter === letters - 1
                  };
                });
              }}
              onIncorrect={letter => {
                this.setState(
                  {
                    canType: false,
                    incorrectLetterIndex: letterIdx,
                    incorrectLetter: letter
                  },
                  () => {
                    setTimeout(() => {
                      this.setState({
                        canType: true,
                        incorrectLetterIndex: null,
                        incorrectLetter: ""
                      });
                    }, 500);
                  }
                );
              }}
            />
          );
        })}
      </div>
    ));
  };

  render() {
    return (
      <div className={[this.state.isCorrectAnswer && styles.correctAnswer]}>
        {this.renderLettersTiles()}
      </div>
    );
  }

  static propTypes = {
    correctAnswer: PropTypes.string.isRequired,
    onWrongLetter: PropTypes.func.isRequired,
    onCorrectAnswer: PropTypes.func.isRequired
  };
}

export default AnswerTiles;
