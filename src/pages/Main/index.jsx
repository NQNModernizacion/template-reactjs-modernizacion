import { useContext, useEffect } from "react";

import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";

import { Uno, Dos, Tres } from "../";

import { UserContext } from "../../context";
import { initApp } from "../../utils/common";
import { handlerGetUserData, showSpinner } from "./handlers";

initApp();

const Main = () => {
  const { actions, loading } = useContext(UserContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handlerGetUserData(actions), []);

  showSpinner(loading);

  const RenderLinks = () => {
    return (
      <div className="d-fles">
        <Link to="/" className="btn btn-primary me-2">
          Home
        </Link>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RenderLinks />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: "/uno",
          element: <Uno />,
        },
        {
          path: "/uno/cuatro",
          element: <Uno />,
        },
        {
          path: "/dos",
          element: <Dos />,
        },
        {
          path: "/tres/:id",
          element: <Tres />,
        },
      ],
    },
  ]);
  
  return <RouterProvider router={router} />;

  // return (
  //     <HashRouter>
  //         <Layout renderProp={() => <RenderLinks />}>
  //             <Switch>
  //                 <Route path="/" element={'asdasd'} />
  //                 <Route path="/uno" element={<Uno />} />
  //                 <Route path="/uno/cuatro" element={<Uno />} />
  //                 <Route path="/dos" element={<Dos />} />
  //                 <Route path="/tres/:id" element={<Tres />} />
  //             </Switch>
  //         </Layout>
  //     </HashRouter>
  // );
};

export default Main;
