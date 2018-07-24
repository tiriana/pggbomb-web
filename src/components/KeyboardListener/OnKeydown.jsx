import React from "react";
import PropTypes from "prop-types";

class OnKeydown extends React.Component {
  componentWillMount() {
    document.addEventListener("keydown", this.onKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown);
  }

  static propTypes = {
    callback: PropTypes.func.isRequired
  };

  onKeydown = e => this.props.callback(e);

  render() {
    return null;
  }
}

export default OnKeydown;
