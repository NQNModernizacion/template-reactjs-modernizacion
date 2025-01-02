import React from "react";
import ReactDOM from "react-dom/client";
import { UserWrapper } from "./context";
import App from "./App.jsx";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";

import { MODE } from "./config/index.js";

if (MODE !== "production") {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <UserWrapper>
      <App />
    </UserWrapper>
  );
} else {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <UserWrapper>
        <App />
      </UserWrapper>
    </React.StrictMode>
  );
}
