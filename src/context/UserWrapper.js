import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { getInitialState, hasRole, hasPermission, reloadSesion } from "./handlers";
import { Modal } from "../components";
import { intervalSession, logout, setSession } from "../utils/auth/sessionStorage";

export const UserContext = React.createContext(null);

export const UserWrapper = ({ children }) => {
  const [store, setStore] = useState({ ...getInitialState() });

  useEffect(() => intervalSession(actions), []);

  const actions = {
    setLoading: (status) => setStore({ ...store, loading: status }),
    setUser: (data) => setStore({ ...store, data, loading: false }),
    setError: (error) => setStore({ ...store, data: null, error, loading: false }),

    /** Funciones de la sesion */
    sesionModal: () => store?.sesionModal,
    setSesionModal: (bool) => setStore((store) => ({ ...store, sesionModal: bool })),

    /* User Data */
    getPerfil: () => store.data,
    hasRole: (role) => hasRole(role, store.data),
    hasPermission: (role) => hasPermission(role, store.data),
  };

  /** Por cada update del state actualizamos la sesion */
  setSession(store.data);

  return (
    <UserContext.Provider value={{ store, actions, loading: store.loading }}>
      {children}
      <ToastContainer />

      <Modal
        styles={{ header: { backgroundColor: "#1766ad", color: "white" } }}
        size={"md"}
        show={store.sesionModal}
        setShow={() => logout()}
        title={() => "SU SESIÓN ESTA POR CADUCAR"}
      >
        <button className="btn btn-primary w-100" onClick={() => reloadSesion(setStore)}>
          RECARGAR SESIÓN
        </button>
      </Modal>
    </UserContext.Provider>
  );
};
