import React, { useState, useEffect } from "react";
import { axios } from "../utils/api";
import { getParams } from "../utils/common";

export const UserContext = React.createContext(null);

export const UserWrapper = ({ children }) => {

    const [store, setStore] = useState({
        loading: true,
        error: null,
        data: null,
    });

    useEffect(() => {
        const params = getParams()
        console.log(params);
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