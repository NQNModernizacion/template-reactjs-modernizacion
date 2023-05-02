import axios, { validateStatus } from "../../utils/axios";

/** Proceso inicial para el ingreso a la app */
export const initApp = async (actions) => {
  const token = getParams().token;
  const loc = window.location;

  if (!token) {
    if (isValidSession()) {
      actions.setUser({ ...getSession() });
    } else {
      /* 'retornamos webLogin' */
    }
  } else {
    const response = await axios(token).get("get_user_info");
    const { data, error } = response.data;

    if (data) {
      data.expires_in += new Date().getTime();
      setSession({ ...data, token });
      actions.setUser({ ...data, token });
    }

    if (error) {
      console.log("analizamos el error");
    }

    // const url = removeURLParameter(loc.href, 'token')
    window.location.href = removeURLParameter(loc.href, "token");
    // window.history.pushState({}, null, url);
  }
};

export const handlerGetUserData = (actions) => async () => {
  let response = await axios.get("api/get_usuario", {
    validateStatus: validateStatus,
  });
  const { data, error } = response.data;

  if (data) {
    actions.setUser(data);
  }

  if (error) {
    actions.setError(error);
  }
};

/** Definimos el rol del usuario en funcion del perfil en wapUsuariosPerfiles */
export const getArrayRoles = (userProfiles) => {
  if (!userProfiles) return "user";

  return userProfiles.split(",").map((id) => {
    switch (id) {
      case "1":
        return "PERMISO_1";

      default:
        return "user";
    }
  });
};

export const handlerBackToMenu = (state, setState) => {
  setState({
    ...state,
    view: {
      menu: null,
    },
  });
};

/** Enviamos un bool para mostrar el spinner principal */
export const showSpinner = (loading) => {
  if (loading) {
    window.cargarSpinner();
    return null;
  } else {
    window.eliminarSpinner();
  }
};
