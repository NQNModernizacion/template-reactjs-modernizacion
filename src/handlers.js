import { getSession, isValidSession } from "./utils/auth/sessionStorage";
import { axios } from "./utils/axios";
import { getParams, removeURLParameter } from "./utils/common";

export const initApp = async (actions) => {
  const token = getParams().token;
  const windowLocation = window.location;
  // console.log(getSession())

  if (!token) {
    if (isValidSession()) {
      actions.setUser({ ...getSession() });
    } else {
      // retornamos a weblogin o al internal login
    }
  } else {
    const resp = await axios(token).get("get_user_info");
    const { data, error } = resp.data;

    if (data) {
      actions.setUser({ ...data, token });
    }

    if (error) {
      // retornamos a weblogin o al internal login
      console.log("ocurrio un error al iniciar la app", error);
    }

    const url = removeURLParameter(windowLocation.href, "token");
    //window.location.href = removeURLParameter(windowLocation.href, 'token')
    window.history.pushState({}, null, url);
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
