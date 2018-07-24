import React from "react";
import PropTypes from "prop-types";
import OnKeydown from "./OnKeydown";

const OnSpecial = ({ callback, keyCode }) => (
  <OnKeydown callback={e => e.keyCode === keyCode && callback()} />
);

OnSpecial.propTypes = {
  callback: PropTypes.func.isRequired
};

export default OnSpecial;
