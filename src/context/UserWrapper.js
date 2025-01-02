import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Modal } from "../components";
import { intervalSession, logout, setSession } from "../utils/sessionStorage";
import { getInitialState, hasPermission, hasRole, isAdmin, reloadSesion } from "./handlers";

export const UserContext = React.createContext(null);

export const UserWrapper = ({ children }) => {
  const [store, setStore] = useState({ ...getInitialState() });

  useEffect(() => {
    intervalSession(actions);
  }, []);

  const actions = {
    setLoading: (status) => setStore({ ...store, loading: status }),
    setUser: (user) => setStore({ ...store, user, loading: false }),
    setError: (error) => setStore({ ...store, data: null, error, loading: false }),

    /** Funciones de la sesion */
    sesionModal: () => store?.sesionModal,
    setSesionModal: (bool) => setStore((store) => ({ ...store, sesionModal: bool })),

    /* User Data */
    user: () => store.user,
    getPerfil: () => store.user,
    hasRole: (role) => hasRole(role, store.user),
    hasPermission: (permission) => hasPermission(permission, store.user),
    isAdmin: () => isAdmin(store.user),
  };

  /** Por cada update del state actualizamos la sesion */
  setSession(store.user);

  return (
    <UserContext.Provider value={{ store, actions, loading: store.loading }}>
      {children}
      <ToastContainer />

      <Modal
        size="md"
        show={store.sesionModal}
        onHide={() => logout()}
        title={() => "SU SESIÓN ESTA POR CADUCAR"}
      >
        <button className="btn btn-primary w-100" onClick={() => reloadSesion(setStore)}>
          RECARGAR SESIÓN
        </button>
      </Modal>
    </UserContext.Provider>
  );
};
