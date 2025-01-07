import { useContext, useEffect } from "react"
// import { HashRouter, Route, Routes } from "react-router-dom"

// import { NotFound } from "./components"

import { UserContext } from "./context/UserWrapper"
import  RouteProvider  from "./router/RouteProvider"
import { initApp } from "./handlers"

const App = () => {
    const { actions } = useContext(UserContext)

    useEffect(() => {
        initApp(actions)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(__DEV__)

    return (
        <RouteProvider/>
    )
}

export default App
