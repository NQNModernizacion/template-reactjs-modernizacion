import { axios } from '../utils/axios';
import { getSession, logout } from '../utils/auth/sessionStorage';
import { IRole, IPermission, IUser } from './interfaces';

export const getInitialState = () => {
  const commonAttributes = {
    loading: false,
    sesionModal: false,
    error: '',
  };

  const sesion = getSession();
  let initialState;

  if (sesion) {
    initialState = {
      ...commonAttributes,
      data: { ...sesion },
    };
  } else {
    initialState = {
      ...commonAttributes,
      data: null,
    };
  }

  return initialState;
};

/** Verifica si existe el rol en la coleccion del usuario */
export const hasRole = (role: IRole, user: IUser) => {
  if (!role) return false;
  if (!user) return false;

  return user.roles?.some((r) => r.name === role);
};

export const hasPermission = (permission: IPermission, user: IUser) => {
  if (!permission) return false;
  if (!user) return false;

  if (user.permissions?.some((p) => p.name === permission)) {
    return true;
  }

  /* Generamos un arreglo nuevo de permisos de esos roles */
  const permissionsRoles = user.roles?.reduce((prev: IRole[], curr) => {
    prev.push(...curr.permissions);

    return prev;
  }, []);

  return permissionsRoles?.some((p: IPermission) => p.name === permission);
};

export const hasDirectPermission = (permission: IPermission, user: IUser) => {
  if (!permission) return false;
  if (!user) return false;

  return user.permissions?.some((p) => p.name === permission);
};

export const reloadSesion = async (setStore) => {
  setStore((store) => ({ ...store, loading: true }));

  const response = await axios().post('refresh');
  const { data, error } = response.data;

  if (data) {
    setStore((store) => ({
      ...store,
      loading: false,
      sesionModal: false,
      data: {
        ...store.data,
        ...data,
      },
    }));
  }

  if (error) {
    logout();
  }
};
