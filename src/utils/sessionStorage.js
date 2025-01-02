import { axios } from "./axios";
import { APP_NAME, WEBLOGIN_URL } from "../config";

const KEY = window.location.origin + "/" + APP_NAME;

export const getSession = () => JSON.parse(sessionStorage.getItem(KEY));

export const getToken = () => getSession()?.token;

export const viewSession = () => console.log(getSession());

export const isTimeInvalid = () => new Date().getTime() > getSession()?.expiry;

export const setSession = (s) => {
  sessionStorage.setItem(KEY, JSON.stringify(s));
};

export const isValidSession = () => {
  const valid = new Date().getTime() < getSession()?.expires_in;

  if (!valid) {
    sessionStorage.removeItem(KEY);
  }

  return valid;
};

export const logout = async () => {
  await axios().post("logout", { token: getToken() });

  sessionStorage.removeItem(KEY);
  window.location.href = WEBLOGIN_URL;
};

/** Genera un intervalo para analizar la session */
export const intervalSession = (ua) => {
  const inter = setInterval(() => {
    const restante = getSession()?.expires_in - new Date().getTime();

    /* Cuando faltan 5 minutos */
    console.log(restante, "300000", restante - 300000);
    if (restante < 300000 && restante > 0 && !ua.sesionModal()) {
      ua.setSesionModal(true);
    }

    if (restante <= 0) {
      clearInterval(inter);
      ua.setSesionModal(false);
      logout();
    }
  }, 180000);
  /* Cada 3 minutos consultamos */
};
