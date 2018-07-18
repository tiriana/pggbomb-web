import React from "react";
const keycode = require('keycode');

class NameInput extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      name: ""
    };
  }

  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPressed.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }

  onKeyPressed(e) {
    if (keycode("Enter") === e.keyCode && this.state.name.length > 3) {
      this.props.onEnter(this.state.name);
    }
    if (keycode("backspace") === e.keyCode && this.state.name.length > 0) {
      return this.setState(state => ({
        name: state.name.slice(0, -1)
      }));
    }
    const char = keycode(e.keyCode);
    if (/[a-z]/.test(char) && char.length === 1) {
      return this.setState(state => ({
        name: state.name + char.toUpperCase()
      }));
    }
  }

  render() {
    return (
      <span onKeyDown={event => this.onKeyDown(event)}>
        {this.state.name}<span className="blinker">█</span>
      </span>
    );
  }
}

const Menu = ({ onNameEntered }) => (
  <React.Fragment>
        <h1>PGG BOMB</h1>
        <p>Welcome Traveler. I wanna play a game.</p>

        <p>
          Enter your name: <NameInput onEnter={onNameEntered} />
        </p>
  </React.Fragment>
);

export default Menu;
