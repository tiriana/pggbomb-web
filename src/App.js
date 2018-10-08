import React from "react";
import Game from "./components/Game";
import CRT from "./components/CRT";
// import * as api from "./api/mock/game";
import * as api from "./api/game";
import { hot } from "react-hot-loader";

const App = () => (
  <CRT>
    <Game api={api} />
  </CRT>
);

export default hot(module)(App)
