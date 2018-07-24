import React from "react";
import OnSpecial from "./OnSpecial";

const OnSpace = ({ callback }) => (
  <OnSpecial callback={callback} keyCode={32} />
);

export default OnSpace;
