import React from "react"
import ReactDOM from "react-dom/client"
import "./index.scss"

import "react-toastify/dist/ReactToastify.css"

import { UserWrapper } from "./context/UserWrapper.js"
import { ToastContainer } from "react-toastify"
import App from "./App.js"

if (__DEV__) {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <UserWrapper>
            <ToastContainer />
            <App />
        </UserWrapper>
    )
} else {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <UserWrapper>
                <ToastContainer />
                <App />
            </UserWrapper>
        </React.StrictMode>
    )
}
