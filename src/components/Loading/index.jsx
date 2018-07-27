import React from "react";
import "./styles.scss";

import { PacmanLoader } from 'react-spinners';

const SPPINNER = "|/-\\";
const MAX_STEPS = SPPINNER.length;

class Loading extends React.Component {
  constructor() {
    super();
    this.state = {
      step: 0
    };
  }

  componentWillMount() {
    // this.intereval = setInterval(this.incrementStep, 200);
  }

  componentWillUnmount() {
    // clearInterval(this.intereval);
  }

  incrementStep = () => {
    this.setState(state => {
      return {
        step: (state.step + 1) % MAX_STEPS
      };
    });
  };

  render() {
    return <PacmanLoader size={ 25 } color={'#14fdce'} />;
  }
}

export default Loading;
