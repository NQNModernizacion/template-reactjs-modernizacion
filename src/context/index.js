import React, { useState } from "react";

import { hasRole, hasPermission } from './utils';

export const UserContext = React.createContext(null);

export const UserWrapper = ({ children }) => {

    const [store, setStore] = useState({
        loading: true,
        error: null,
        user: null,
    });

    const actions = {
        setUser: (user) => setStore({ ...store, user, loading: false }),
        setError: (error) => setStore({ ...store, user: null, error, loading: false }),

        /* Dat | */
        getPerfil: () => store.user?.datosUsuario.datosPersonales,
        getToken: () => store.user?.datosUsuario.securityToken,

        hasRole: (role) => hasRole(role, store.user),
        hasPermission: (role) => hasPermission(role, store.user),
    }

    return (
        <UserContext.Provider value={{ store, actions, loading: store.loading }}>
            {children}
        </UserContext.Provider>
    );
}