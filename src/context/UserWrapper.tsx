import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Modal } from '../components';
import { intervalSession, logout, setSession } from '../utils/auth/sessionStorage';
import { getInitialState, hasPermission, hasRole, reloadSesion } from './handlers';
import { IActions, IRole } from './interfaces';

interface IUserWrapper {
  children: React.ReactNode;
}

type TContext = {
  actions: IActions;
  loading: boolean;
  store: object;
};

export const UserContext = React.createContext<TContext | null>(null);

export const UserWrapper: React.FC<IUserWrapper> = ({ children }) => {
  const [store, setStore] = useState({ ...getInitialState() });

  useEffect(() => intervalSession(actions), []);

  const actions: IActions = {
    /* User Data */
    getPerfil: () => store.data,
    hasPermission: (role: IRole) => hasPermission(role, store.data),
    hasRole: (role: IRole) => hasRole(role, store.data),

    /** Funciones de la sesion */
    sesionModal: () => store?.sesionModal,
    setSesionModal: (bool: boolean) => setStore((store) => ({ ...store, sesionModal: bool })),

    /** Funciones de la app */
    setError: (error) => setStore({ ...store, data: null, error, loading: false }),
    setLoading: (status) => setStore({ ...store, loading: status }),
    setUser: (data) => setStore({ ...store, data, loading: false }),
  };

  /** Por cada update del state actualizamos la sesion */
  setSession(store.data);

  return (
    <UserContext.Provider value={{ store, actions, loading: store.loading }}>
      {children}
      <ToastContainer />

      <Modal
        setShow={() => logout()}
        show={store.sesionModal}
        size={'lg'}
        style={{ header: { backgroundColor: '#1766ad', color: 'white' } }}
        title={() => 'SU SESIÓN ESTA POR CADUCAR'}
      >
        <button className='btn btn-primary w-100' onClick={() => reloadSesion(setStore)}>
          RECARGAR SESIÓN
        </button>
      </Modal>
    </UserContext.Provider>
  );
};
