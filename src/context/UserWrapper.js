import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';

import { hasRole, hasPermission } from './handlers';

export const UserContext = React.createContext(null);

export const UserWrapper = ({ children }) => {

    const [store, setStore] = useState({
        loading: true,
        data: null,
    });

    const actions = {
        setUser: (data) => setStore({ ...store, data, loading: false }),
        setLoading: (bool) => setStore({ ...store, loading: bool }),

        getPerfil: () => store.data,

        hasRole: (role) => hasRole(role, store.user),
        hasPermission: (permission) => hasPermission(permission, store.user),
    }

    return (
        <UserContext.Provider value={{ store, actions, loading: store.loading }}>
            {children}
            <ToastContainer />
        </UserContext.Provider>
    );
}