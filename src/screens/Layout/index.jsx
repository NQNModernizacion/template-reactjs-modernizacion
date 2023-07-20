import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { Navbar } from "../../components";
import { getParams } from "../../utils/common";
import { isValidSession } from "../../utils/sessionStorage";

const Layout = ({ children, renderProp }) => {
  const token = getParams().token;
  const nav = useNavigate();

  useEffect(() => {
    if (!isValidSession() && !token) nav("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isValidSession()) return null;

  return (
    <>
      <Navbar />
      <div className="container">
        {renderProp && renderProp()}
        <div className="row">
          <Link className="btn btn-primary col-3" to="/administrador">
            Admin
          </Link>
          <Link className="btn btn-primary col-3" to="/contribuyente">
            Contribuyente
          </Link>
          <Link className="btn btn-primary col-3" to="/administrador/solicitud/1">
            Admin Sol 1
          </Link>
          <Link className="btn btn-primary col-3" to="/contribuyente/solicitud/1">
            Contribuyente Sol 1
          </Link>
        </div>
        <div className="row pt-3 m-0">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
