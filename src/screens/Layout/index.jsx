import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { HOME_SCREEN } from "../../config/types";
import { isValidSession } from "../../utils/sessionStorage";
import { getParams } from "../../utils/common";
import UserBanner from "./UserBanner";

const Layout = ({ children, renderProp }) => {
  const token = getParams().token
  const nav = useNavigate()

  useEffect(() => {
    if (!isValidSession() && !token) nav("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isValidSession()) return null;

  return (
    <>
      <nav className="navbar navbar-expand-lg d-flex justify-content-between">
        <span
          className="navbar-brand logo"
          type="button"
          name={HOME_SCREEN}
        ></span>
        <UserBanner nombre={"NOMBRE"} />
      </nav>
      <div className="container">
        {renderProp && renderProp()}

        <div className="row pt-3 m-0">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
