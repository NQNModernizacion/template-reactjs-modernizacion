import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';

import { hasRole, hasPermission, reloadSesion } from './handlers';

import { Modal } from '../components'
import { intervalSession, logout, setSession } from "../utils/sessionStorage";
import { useEffect } from "react";

export const UserContext = React.createContext(null);

export const UserWrapper = ({ children }) => {

    const [store, setStore] = useState({
        loading: true,
        sesionModal: false,
        data: null,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => intervalSession(actions), [])

    const actions = {
        setUser: (data) => setStore({ ...store, data, loading: false }),
        setLoading: (bool) => setStore({ ...store, loading: bool }),

        getPerfil: () => store.data,

        hasRole: (role) => hasRole(role, store.data),
        hasPermission: (permission) => hasPermission(permission, store.data),
    }

    /** Por cada update del state actualizamos la sesion */
    setSession(store.data);

    return (
        <UserContext.Provider value={{ store, actions, loading: store.loading }}>
            {children}
            <ToastContainer />

            <Modal
                styles={{ header: { backgroundColor: '#1766ad', color: 'white' } }}
                size={'md'}
                show={store.sesionModal}
                setShow={() => logout()}
                title={() => 'SU SESION ESTA POR CADUCAR'}
            >
                <button className="btn btn-primary w-100" onClick={() => reloadSesion(setStore)}>RECARGAR SESION</button>
            </Modal>

        </UserContext.Provider>
    );
}