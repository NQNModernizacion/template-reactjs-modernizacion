import { useContext, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import * as Layouts from "./Layouts";
import { UserContext } from "./context";
import { initApp, showSpinner } from "./handlers";
import {
  Login,
  Management,
  ManagementActividad,
  ManagementPermisos,
  ManagementRoles,
  ManagementRolesPermisos,
  ManagementUsuarios,
  Menu,
} from "./screens";

const App = () => {
  const { actions, loading } = useContext(UserContext);

  useEffect(() => {
    initApp(actions);
  }, []);

  showSpinner(loading);

  const NotFound = () => 404;

  return (
    <HashRouter>
      <Routes>
        <Route element={<Layouts.UserLayout />}>
          <Route path="/" element={<Menu />} />

          <Route element={<Management />} path="/administrador/roles-permisos" />
          <Route element={<ManagementRoles />} path="/administrador/roles-permisos/roles" />
          <Route element={<ManagementPermisos />} path="/administrador/roles-permisos/permisos" />
          <Route
            element={<ManagementRolesPermisos />}
            path="/administrador/roles-permisos/role-permisos"
          />
          <Route element={<ManagementActividad />} path="/administrador/activity-log" />
          <Route element={<ManagementUsuarios />} path="/administrador/roles-permisos/usuarios" />

          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
