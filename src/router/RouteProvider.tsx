import { HashRouter, Routes, Route } from "react-router-dom"
import * as S from "../screens"
import * as L from "../Layouts"
import { NotFound } from "../components" // Si tienes este componente

const RouteProvider = () => {
    return (
        <HashRouter
            future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        >
            {/* Sacar atributo future cuando se actualice a react-router-dom v7 */}
            <Routes>
                <Route element={<L.UserLayout />}>
                    <Route path='/' element={<S.Menu />} />

                    {/* Rutas comentadas para el administrador
          <Route element={<S.Management />} path="/administrador/roles-permisos" />
          <Route element={<S.ManagementRoles />} path="/administrador/roles-permisos/roles" />
          <Route element={<S.ManagementPermisos />} path="/administrador/roles-permisos/permisos" />
          <Route element={<S.ManagementRolesPermisos />} path="/administrador/roles-permisos/role-permisos" />
          <Route element={<S.ManagementActividad />} path="/administrador/activity-log" />
          <Route element={<S.ManagementUsuarios />} path="/administrador/roles-permisos/usuarios" />
          */}

                    {__DEV__ && (
                        <Route path='/_viewcom' element={<S.DevScreen />} />
                    )}
                    <Route path='*' element={<NotFound />} />
                

                
                <Route path='/login' element={<S.Login />} />
                <Route path='/ejemplo' element={<S.PageExample />} />
                </Route>
            </Routes>
            
        </HashRouter>
    )
}

export default RouteProvider
