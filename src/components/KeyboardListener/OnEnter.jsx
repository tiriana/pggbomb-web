import React from "react";
import OnSpecial from "./OnSpecial";

const OnEnter = ({ callback }) => (
  <OnSpecial callback={callback} keyCode={13} />
);

export default OnEnter;
