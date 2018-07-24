import React from "react";
import OnSpecial from "./OnSpecial";

const OnBackspace = ({ callback }) => (
  <OnSpecial callback={callback} keyCode={8} />
);

export default OnBackspace;
