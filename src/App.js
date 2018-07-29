import React from "react";
import Game from "./components/Game";
import CRT from "./components/CRT";
import * as api from "./api/mock/game";

console.log(api);

const App = () => (
  // <CRT>
    <Game api={api} />
  // </CRT>
);

export default App;
