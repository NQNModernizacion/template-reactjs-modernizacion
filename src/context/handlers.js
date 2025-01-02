import { axios } from "../utils/axios";
import { getSession, logout } from "../utils/sessionStorage";

export const getInitialState = () => {
  const sesion = getSession();
  return {
    loading: false,
    sesionModal: false,
    user: sesion ? sesion : null,
    global_data: {},
  };
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
  if (!user.permissions) return false;
  if (!user.roles) return false;
  let perms = user.permissions?.some((p) => {
    let name = p.name.split(".");

    if (name[0] === "admin") {
      return true;
    }
  });

  const permissionsRoles = user.roles?.reduce((prev, curr) => {
    prev.push(...curr.permissions);

    return prev;
  }, []);

  let rolePerms = permissionsRoles?.some((p) => {
    let name = p.name.split(".");

    if (name[0] === "admin") {
      return true;
    }
  });

  if (perms || rolePerms) {
    return true;
  }
};

export const reloadSesion = async (setStore) => {
  setStore((store) => ({ ...store, loading: true }));

  const response = await axios().post("refresh");
  const { data, error } = response.data;

  if (data) {
    setStore((store) => ({
      ...store,
      loading: false,
      sesionModal: false,
      user: {
        ...store.user,
        ...data,
      },
    }));
  }

  if (error) {
    logout();
  }
};

/**
 * setea de forma pseudo-dinamica un valor de global data
 * @param store - The store object
 * @param setStore - This is the function that will be used to set the state of the store.
 * @param data - The data that you want to set
 * @param index - the index of the data you want to set
 */
export const setIndexInGlobal = (setStore, data, index) => {
  setStore((store) => {
    let newData = [...data];

    if (index in store.global_data) {
      newData = [...store.global_data[index]];
      newData.push(...data);

      newData = newData.filter((item, index, self) => {
        return self.findIndex((element) => element.id === item.id) === index;
      });

      newData = newData.sort((a, b) => b.id - a.id);
    }

    return {
      ...store,
      global_data: {
        ...store.global_data,
        [index]: newData,
      },
    };
  });
};

export const setGlobalData = (setStore, data) => {
  setStore((store) => ({
    ...store,
    global_data: {
      ...store.global_data,
      ...data,
    },
  }));
};

export const addGlobalValue = (store, setStore, index, value) => {
  const values = store.global_data[index] ? [...store.global_data[index]] : [];

  values.push(value);

  setStore((s) => ({
    ...s,
    global_data: {
      ...s.global_data,
      [index]: [...values],
    },
  }));
};

export const updateGlobalValue = (store, setStore, index, value) => {
  if (store.global_data[index]) {
    const newValues = store.global_data[index].map((val) => {
      if (val.id === value.id) {
        return value;
      } else {
        return val;
      }
    });

    setStore((s) => ({
      ...s,
      global_data: {
        ...s.global_data,
        [index]: [...newValues],
      },
    }));
  }
};
