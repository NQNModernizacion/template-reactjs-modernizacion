import { axios } from "../utils/axios";
import { getSession, logout } from "../utils/sessionStorage";

export const getInitialState = () => {
  const com = {
    loading: false,
    sesionModal: false,
  };

  const sesion = getSession();
  let initialState;

  if (sesion) {
    initialState = {
      ...com,
      data: { ...sesion },
    };
  } else {
    initialState = {
      ...com,
      data: null,
    };
  }

  return initialState;
};

/** Verifica si existe el rol en la coleccion del usuario */
export const hasRole = (role, user) => {
  if (!role) return false;
  if (!user) return false;

  return user.roles?.some((r) => r.name === role);
};

export const hasPermission = (permission, user) => {
  if (!permission) return false;
  if (!user) return false;

  if (user.permissions?.some((p) => p.name === permission)) {
    return true;
  }

  /* Generamos un arreglo nuevo de permisos de esos roles */
  const permissionsRoles = user.roles?.reduce((prev, curr) => {
    prev.push(...curr.permissions);
    return prev;
  }, []);

  return permissionsRoles?.some((p) => p.name === permission);
};

export const hasDirectPermission = (permission, user) => {
  if (!permission) return false;
  if (!user) return false;

  return user.permissions?.some((p) => p.name === permission);
};

export const isAdmin = (user) => {
  if (!user) return false;
  return user.permissions?.some((p) => {
    let name = p.name.split('.');
    if(name[0] === 'admin'){
      return true;
    }else{
      return false;
    }
  })
}

export const reloadSesion = async (setStore) => {
  setStore((store) => ({ ...store, loading: true }));

  const response = await axios().post("refresh");
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


