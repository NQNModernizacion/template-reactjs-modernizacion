import { getSession, isValidSession } from "./utils/sessionStorage";
import { axios } from "./utils/axios";
import { getParams, removeURLParameter } from "./utils/common";

export const initApp = async (ua) => {
  const token = getParams().token;

  if (!token) {
    if (isValidSession()) {
      ua.setUser({ ...getSession() });
    } else {
      // retornamos a weblogin o al internal login
    }
  } else {
    const resp = await axios(token).get("get_user_info");
    const { data, error } = resp.data;

    if (data) {
      ua.setUser({ ...data, token: data.token });
    }

    if (error) {
      // retornamos a weblogin o al internal login
      console.log("ocurrio un error al iniciar la app", error);
    }

    const url = removeURLParameter(window.location.href, "token");
    window.history.pushState({}, null, url);
  }
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
