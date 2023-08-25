import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "..";
import { isValidSession } from "../../utils/auth/sessionStorage";
import { getParams } from "../../utils/common";

const Layout = ({ renderProp, perfil }) => {
  const token = getParams().token;
  const nav = useNavigate();

  useEffect(() => {
    if (!isValidSession() && !token) nav("/login");
  }, []);

  if (!isValidSession()) return null;

  return (
    <>
      <Navbar data={perfil} />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
