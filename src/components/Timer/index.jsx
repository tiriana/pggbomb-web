import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

class Timer extends Reacy.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeftMS: this.props.initialTime * 1000,
      itTicking: true,
      externalTimeDiffs: []
    };

    this.props.registerPauseResume(this.setTicking);
    this.props.registerApplyTimeDiff(this.applyTimeDiffExternal);
  }

  setTicking = isTicking => this.setState({ itTicking });

  applyTimeDiffExternal = externalTimeDiff => {
    // this.setState(({ externalTimeDiffs: prevExternalTimeDiffs }) => {
    //
    // });
    //
    //
    // this.setState({ externalTimeDiff }, () =>
    //   this.applyTimeDiff(externalTimeDiff, () =>
    //     this.setState({ externalTimeDiff: null })
    //   )
    // );

    // Muszę jakoś rozkinić informowanie gracza o zmianie czasu, ale teraz nie mam na to pomysłu

    this.applyTimeDiff(externalTimeDiff);
  };

  applyTimeDiff = (timeDiff, cb) =>
    this.setState(
      ({ timeLeftMS: prevTimeLeftMS }) => ({
        timeLeftMS: prevTimeLeftMS + timeDiff * 1000
      }),
      cb
    );

  tick = () => this.applyTimeDiff(-1);

  static propTypes = {
    initialTime: PropTypes.number.isRequired,
    warningZone: PropTypes.number,
    onTimesOut: PropTypes.func.isRequired,
    registerPauseResume: PropTypes.func.isRequired,
    registerApplyTimeDiff: PropTypes.func.isRequired
  };

  static defaultProps = {
    warningZone: 10
  };
  //str.padStart(targetLength [, padString])
  render() {
    const isWarningZone = this.state.timeLeftMS < this.props.warningZone * 1000;
    const minutes = (this.state.timeLeftMS / (1000 * 60)) % 60;
    const seconds = (this.state.timeLeftMS / 1000) % 60;
    const milliseconds = this.state.timeLeftMS % 1000;
    return (
      <span>
        {minutes.padString(2, "0")}:{seconds.padString(2, "0")}:{milliseconds.padString(
          3,
          "0"
        )}
      </span>
    );
  }
}

export default Clock;
