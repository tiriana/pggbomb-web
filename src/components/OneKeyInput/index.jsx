import React from "react";
import Cursor from "../Cursor";

import { playTypingSound } from "../lib/sounds";

const keycode = require("keycode");

class OneKeyInput extends React.Component {
  constructor(...args) {
    super(...args);
  }

  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed);
  }

  onKeyPressed = (e) => {
    playTypingSound();
    if (keycode(this.props.requiredKeyCode) === e.keyCode) {
      this.props.onRequiredKeyPress();
    }
  }

  render() {
    return (
      <span onKeyDown={event => this.onKeyDown(event)}>
        <Cursor />
      </span>
    );
  }
}

export default OneKeyInput;
