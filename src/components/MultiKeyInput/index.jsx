import React from "react";
import Cursor from "../Cursor";

import { playTypingSound } from "../lib/sounds";

const keycode = require("keycode");

class MultiKeyInput extends React.Component {
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
    this.props.requiredKeyCodes.map((requiredKeyCode) => {
      if (requiredKeyCode === keycode(e.keyCode)) {
        this.props.onRequiredKeyPress(keycode(e.keyCode));
      }
    });
  }

  render() {
    return (
      <span onKeyDown={event => this.onKeyDown(event)}>
        <Cursor />
      </span>
    );
  }
}

export default MultiKeyInput;
