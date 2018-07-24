import { Component } from "react";
import PropTypes from "prop-types";

class Main extends Component {
  render() {
    return (
      <p> Hello { playerName } </p>
    );
  }

  static propTypes = {
    playerName: PropTypes.string
  };
};

export default Main;
