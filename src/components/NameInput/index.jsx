import React from "react";
import Cursor from "../Cursor";

import { playTypingSound } from "../lib/sounds";

const keycode = require("keycode");

class NameInput extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      name: ""
    };
  }

  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed);
  }

  onKeyPressed = (e) => {
    if (keycode("enter") === e.keyCode) {
      this.props.onEnter(this.state.name);
      playTypingSound();
    }
    if (keycode("backspace") === e.keyCode && this.state.name.length > 0) {
      playTypingSound();
      return this.setState(state => ({
        name: state.name.slice(0, -1)
      }));
    }

    if (keycode(e.keyCode) === "esc") {
      playTypingSound();
      this.props.onEscapePress();
    }

    let char = keycode(e.keyCode);
    if (keycode(e.keyCode) === "space") {
      char = " ";
    }



    if (/[ 0-9a-z]/.test(char) && char.length === 1) {
      playTypingSound();
      return this.setState(state => ({
        name: (state.name + char.toUpperCase()).slice(0, 20)
      }));
    }
  }

  render() {
    return (
      <span onKeyDown={event => this.onKeyDown(event)}>
        { this.state.name }
        <Cursor />
      </span>
      
    );
  }
}

export default NameInput;
