import { LIM_CUIT } from "./charLimit";

const URL_BACK = process.env.REACT_APP_URL_BACK;
const WEBLOGIN_URL = process.env.REACT_APP_WEBLOGIN_URL;
const APP_NAME = process.env.REACT_APP_NAME;

const config = {
  LIM_CUIT: LIM_CUIT,
  URL_BACK: URL_BACK,
  WEBLOGIN_URL: WEBLOGIN_URL,
  APP_NAME: APP_NAME,
};

export const viewAllConfig = () => console.table(config);

export { LIM_CUIT, URL_BACK, WEBLOGIN_URL, APP_NAME };
