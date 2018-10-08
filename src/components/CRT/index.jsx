import React from "react";
import "./styles.global.less";
import backgroundListener from "./backgroundListener";

class CRT extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      outputClass: ""
    }
  }

  componentDidMount() {
    backgroundListener.onChanged(this.onBackgroundChanged);
  }

  onBackgroundChanged = outputClass => {
    this.setState({ outputClass });
  }

  componentWillUnmount() {
    backgroundListener.reset();
  }

  render() {
    return <div className="noisy">
      <div className="frame">
        <div className={ `piece output ${this.state.outputClass}` }>
          <div className="main-container">
            { this.props.children }
          </div>
          <div className="piece scanlines noclick" />
          <div className="piece glow noclick" />
        </div>
      </div>
    </div>
  }
}

export default CRT;
