import React from "react"
import ReactDOM from "react-dom/client"
import "./index.scss"
import "react-toastify/dist/ReactToastify.css"

import { UserWrapper } from "./context/UserWrapper.js"

import App from "./App.js"

if (__DEV__) {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <UserWrapper>
            <App />
        </UserWrapper>
    )
} else {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <UserWrapper>
                <App />
            </UserWrapper>
        </React.StrictMode>
    )
}
