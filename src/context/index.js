import React, { useState, useEffect } from "react";

export const UserContext = React.createContext(null);

export const UserWrapper = ({ children }) => {

    const [store, setStore] = useState({
        loading: true,
        error: null,
        data: null,
    });

    useEffect(() => {
        
    }, []);

    const actions = {
        setUser: (data) => setStore({ ...store, data, loading: false }),
        setError: (error) => setStore({ ...store, data: null, error, loading: false }),

        /* Dat | */
        getPerfil: () => store.data?.datosUsuario.datosPersonales,
        getToken: () => store.data?.datosUsuario.securityToken,
    }

    return (
        <UserContext.Provider value={{ store, actions, loading: store.loading }}>
            {children}
        </UserContext.Provider>
    );
}