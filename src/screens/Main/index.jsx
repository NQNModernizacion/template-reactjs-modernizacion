import { useContext, useEffect } from "react";

import { HashRouter, Route, Routes } from "react-router-dom";

import { Layout } from "../";

import { UserContext } from "../../context/UserWrapper";
import Login from "../Login";
import NotFoundPage from "../NotFound";
import { initApp, showSpinner } from "./handlers";
import { pages } from "./routes/pages";

const Main = () => {
  const { actions, loading } = useContext(UserContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => initApp(actions), []);

  showSpinner(loading);

  // if (isValidSession() && routes.length === 0) window.location.reload();

  //   console.log(actions.getPerfil());
  //   if (actions.getPerfil()) {
  //     const filteredRoutes = pages.filter((page) =>
  //       actions.getPerfil().routes.find((route) => route.path === page.path)
  //     );
  //   }

  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout perfil={actions.getPerfil()} />}>
          {pages
            .filter((page) =>
              actions
                .getPerfil()
                ?.routes?.find((route) => route.path === page.path)
            )
            .map((route, i) => (
              <Route key={i} path={route.path} element={route.element} />
            ))}
          {/* {actions.getPerfil()?.routes?.map((route, i) => {
          })} */}
          <Route path="/" element={"Prueba"} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
};

export default Main;
