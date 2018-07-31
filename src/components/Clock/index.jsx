import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const pad = (number, len) =>
  String([...Array(len + 1)].join("0") + number).slice(-len);

class Timer extends React.Component {
  static propTypes = {
    timeLeftMS: PropTypes.number.isRequired,
    warningZoneMS: PropTypes.number
  };

  static defaultProps = {
    warningZone: 10000
  };

  render() {
    const isWarningZone = this.props.timeLeftMS < this.props.warningZone * 1000;
    const minutes = this.props.timeLeftMS / 1000 / 60;
    const seconds = this.props.timeLeftMS / 1000;
    const milliseconds = this.props.timeLeftMS % 1000;
    return (
      <span className={styles.timer}>
         { pad(0|minutes, 2)}:{ pad(0|seconds, 2)}:{ pad(milliseconds, 3)}
      </span>
    );
  }
}

export default Timer;
