import React from "react";
const keycode = require("keycode");
import Cursor from "../Cursor";

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
    if (keycode("Enter") === e.keyCode && this.state.name.length > 3) {
      this.props.onEnter(this.state.name);
    }
    if (keycode("backspace") === e.keyCode && this.state.name.length > 0) {
      return this.setState(state => ({
        name: state.name.slice(0, -1)
      }));
    }
    console.log(keycode(e.keyCode));
    let char = keycode(e.keyCode);
    if (keycode(e.keyCode) === "space") {
      char = " ";
    }
    if (/[ 0-9a-z]/.test(char) && char.length === 1) {
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
