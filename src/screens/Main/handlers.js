import { axios } from "../../utils/axios";
import { getParams, removeURLParameter } from "../../utils/common";
import { getSession } from "../../utils/sessionStorage";
import { isValidSession } from "../../utils/sessionStorage";

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

/** Enviamos un bool para mostrar el spinner principal */
export const showSpinner = (loading) => {
  if (loading) {
    window.cargarSpinner();
    return null;
  } else {
    window.eliminarSpinner();
  }
};
