import { LIM_CUIT } from "./charLimit";

const URL_BACK = import.meta.env.VITE_URL_BACK;
const WEBLOGIN_URL = import.meta.env.VITE_WEBLOGIN_URL;
const APP_NAME = import.meta.env.VITE_APP_NAME;

const config = {
  LIM_CUIT: LIM_CUIT,
  URL_BACK: URL_BACK,
  WEBLOGIN_URL: WEBLOGIN_URL,
  APP_NAME: APP_NAME,
};

export const viewAllConfig = () => console.table(config);

export { URL_BACK, LIM_CUIT, WEBLOGIN_URL, APP_NAME };

/* Limite de los caracteres */
