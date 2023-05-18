import React from "react";
import ReactDOM from "react-dom";

import { Main } from "./screens";

import "./css/index.scss";

import 'react-toastify/dist/ReactToastify.css';

import { UserWrapper } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <UserWrapper>
      <Main />
    </UserWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
