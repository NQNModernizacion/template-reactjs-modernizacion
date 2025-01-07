import { useContext, useEffect } from "react"
import { HashRouter, Route, Routes } from "react-router-dom"

import { NotFound } from "./components"

import { UserContext } from "./context/UserWrapper"

import * as L from "./Layouts"
import * as S from "./screens"

import { initApp } from "./handlers"

const App = () => {
    const { actions } = useContext(UserContext)

    useEffect(() => {
        initApp(actions)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(__DEV__)

    return (
        <HashRouter>
            <Routes>
                <Route element={<L.UserLayout />}>
                    <Route path='/' element={<S.Menu />} />

                    {/*  <Route element={<Management />} path="/administrador/roles-permisos" />
          <Route element={<ManagementRoles />} path="/administrador/roles-permisos/roles" />
          <Route element={<ManagementPermisos />} path="/administrador/roles-permisos/permisos" />
          <Route
            element={<ManagementRolesPermisos />}
            path="/administrador/roles-permisos/role-permisos"
          />
          <Route element={<ManagementActividad />} path="/administrador/activity-log" />
          <Route element={<ManagementUsuarios />} path="/administrador/roles-permisos/usuarios" />
 */}
                    {__DEV__ && (
                        /* Esto solo se visualiza en desarrollo */
                        <Route path='/_viewcom' element={<S.DevScreen />} />
                    )}

                    <Route path='*' element={<NotFound />} />
                </Route>
                <Route path='/login' element={<S.Login />} />
            </Routes>
        </HashRouter>
    )
}

export default App
