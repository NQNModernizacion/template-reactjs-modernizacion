import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

import {
    getInitialState,
    hasPermission,
    hasRole,
    reloadSesion,
} from "./handlers";

import { useEffect } from "react";
import { Modal } from "../components";
import { intervalSession, logout, setSession } from "../utils/sessionStorage";

export const UserContext = React.createContext(null);

export const UserWrapper = ({ children }) => {
    const [store, setStore] = useState({ ...getInitialState() });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => intervalSession(actions), []);

    const actions = {
        setUser: (data) => setStore((store) => ({ ...store, data, loading: false })),
        setLoading: (bool) => setStore((store) => ({ ...store, loading: bool })),

        setSesionModal: (bool) => setStore((store) => ({ ...store, sesionModal: bool })),
        sesionModal: () => store?.sesionModal,
        getPerfil: () => store.data,

        hasRole: (role) => hasRole(role, store.data),
        hasPermission: (permission) => hasPermission(permission, store.data),
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
                title={() => "SU SESION ESTA POR CADUCAR"}
            >
                <button
                    className="btn btn-primary w-100"
                    onClick={() => reloadSesion(setStore)}
                >
                    RECARGAR SESION
                </button>
            </Modal>
        </UserContext.Provider>
    );
};
