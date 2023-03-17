import { useContext, useEffect } from "react";

import {
  HashRouter,
  Routes as Switch,
  Route,
  Link,
  BrowserRouter,
  Outlet,
} from "react-router-dom";

import { Layout, Uno, Dos, Tres } from "../";

import { UserContext } from "../../context";
import { initApp } from "../../utils/common";
import { handlerGetUserData, showSpinner } from "./handlers";

initApp();

const Main = () => {
  const { actions, loading } = useContext(UserContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handlerGetUserData(actions), []);

  //   showSpinner(loading);

  const RenderLinks = () => {
    return (
      <>
        <div className="d-fles">
          <Link to="/" className="btn btn-primary me-2">
            Home
          </Link>
          <Link to="/uno" className="btn btn-primary me-2">
            uno
          </Link>
          <Link to="/dos" className="btn btn-primary me-2">
            DOS
          </Link>
          <Link to="/tres/1" className="btn btn-primary me-2">
            TRES/1
          </Link>
          <Link to="/cuatro" className="btn btn-primary me-2">
            RUTA S/ BOTONES
          </Link>
          <Link to="/cinco" className="btn btn-primary me-2">
            RUTA S/ LAYOUT
          </Link>
        </div>
        <div>
          <Outlet />
        </div>
      </>
    );
  };

  return (
    <BrowserRouter>
      {/* Contenedor de todas las rutas */}
      <Switch>
        {/* Layout con la navbar */}
        <Route element={<Layout />}>
          {/* Contenedor de los botones */}
          <Route element={<RenderLinks />}>
            {/* Rutas que van a tener layout y botones */}
            <Route path="/" element={<div className="bg-white">HOME</div>} />
            <Route
              path="uno"
              element={<div className="bg-white">UNA RUTA CON LAYOUT</div>}
            />
            <Route
              path="/dos"
              element={<div className="bg-white">UNA RUTA CON LAYOUT</div>}
            />
            <Route path="/tres/:id" element={<Tres />} />
          </Route>
          {/* Rutas que solo van a tener layout */}
          <Route
            path="/cuatro"
            element={
              <div className="bg-white">RUTA CON LAYOUT PERO SIN BOTONES</div>
            }
          />
        </Route>
        {/* Rutas que estan por fuera del layout */}
        <Route
          path="/cinco"
          element={<div className="bg-white">RUTA SIN LAYOUT NI BOTONES</div>}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
