import React from "react";
import "./styles.scss";

class Loading extends React.Component {
  constructor() {
    super();
    this.state = {
      dots: 0
    };
  }

  incrementDots = () => {
    this.setState(state => {
      return {
        dots: (state.dots + 1) % 6
      };
    });
  };

  render() {
    setTimeout(this.incrementDots, 200);

    return <p>Loading{[...Array(this.state.dots + 1)].join(".")}</p>;
  }
}

export default Loading;
