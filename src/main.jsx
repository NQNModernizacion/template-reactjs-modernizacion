import React from "react";
import ReactDOM from "react-dom";

import { Main } from "./pages";

import "./assets/css/index.scss";
import { UserWrapper } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <UserWrapper>
      <Main />
    </UserWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
