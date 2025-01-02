import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { isValidSession, logout } from "../../utils/sessionStorage";
import { getParams } from "../../utils/common";

import { UserContext } from "../../context";

const UserLayout = () => {
  const { actions } = useContext(UserContext);

  const token = getParams().token;
  const nav = useNavigate();

  const perfil = actions.getPerfil();

  useEffect(() => {
    if (!isValidSession() && !token) nav("/login");
  }, []);

  if (!isValidSession()) return null;

  return (
    <>
      <nav className="navbar d-flex justify-content-around flex-wrap p-2 gap-1">
        <img
          alt="Logo Neuquén Capital"
          height="80%"
          src="https://webservice.muninqn.gov.ar/cglobales/assets/banners/neuquen-2024.svg"
        />

        <div className="d-flex align-items-center gap-sm-2">
          <img alt="imágen perfil" className="imagen-usuario-navbar" src={perfil.imagenUrl} />

          <div className="d-none d-sm-block text-start">
            <small className="nombre-usuario-navbar">{perfil.nombre}</small>
            <br />
            <small className="email-usuario-navbar">{perfil.correoElectronico}</small>
          </div>

          <div className="vr d-none d-sm-block"></div>

          <div className="ms-2 ms-sm-none text-primary" onClick={() => logout()} role="button">
            <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
            Salir
          </div>
        </div>
      </nav>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
