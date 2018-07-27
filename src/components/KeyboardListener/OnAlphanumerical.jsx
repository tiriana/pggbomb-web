import React from "react";
import PropTypes from "prop-types";
import OnKeydown from "./OnKeydown";
const keycode = require("keycode");

const OnAlphanumerical = ({ callback }) => (
  <OnKeydown
    callback={e => {
      let char = keycode(e.keyCode);
      if (/[0-9a-z]/i.test(char) && char.length === 1) {
        callback(char);
      }
    }}
  />
);

OnAlphanumerical.propTypes = {
  callback: PropTypes.func.isRequired
};

export default OnAlphanumerical;
