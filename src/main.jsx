import React from "react";
import ReactDOM from "react-dom";

import { Main } from "./pages";

import "./assets/css/index.scss";
import { UserWrapper } from "./context";
import { viewAllConfig } from "./config";

viewAllConfig();

ReactDOM.render(
  <React.StrictMode>
    <UserWrapper>
      <Main />
    </UserWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
