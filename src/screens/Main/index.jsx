import { useContext, useEffect } from "react";

import { HashRouter, Routes, Route } from "react-router-dom";

import { Layout, Tres } from "../";

import { UserContext } from "../../context/UserWrapper";
import { initApp } from "../../utils/common";
import { showSpinner } from "./handlers";
import LinkButtons from "../Layout/LinkButtons";

const Main = () => {
  const { actions, loading } = useContext(UserContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(handlerGetUserData(actions), []);
  useEffect(() => initApp(actions), []);

  showSpinner(loading);

  return (
    <HashRouter>
      {/* Contenedor de todas las rutas */}
      <Routes>
        {/* Layout con la navbar */}
        <Route element={<Layout />}>
          {/* Contenedor de los botones */}
          <Route element={<LinkButtons />}>
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
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
};

export default Main;
