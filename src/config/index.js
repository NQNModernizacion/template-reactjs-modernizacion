
import { LIM_CUIT } from './charLimit'

const APP_ID = parseInt(process.env.REACT_APP_APP_ID);
const ENV = process.env.REACT_APP_ENV;

const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN;

const NO_AVAL = 'https://weblogin.muninqn.gov.ar/apps/css/assets/Imagen_no_disponible.svg';

/* Configuracion del backend URL */
let URL_BACK;
if (ENV === 'local') {
    URL_BACK = process.env.REACT_APP_URL_BACK_LOCAL;
} else {
    URL_BACK = process.env.REACT_APP_URL_BACK;
}

/* Configuracion del getToken URL */
let URL_GET_TOKEN;
if (ENV === 'producction') {
    URL_GET_TOKEN = process.env.REACT_APP_URL_GET_TOKEN_PROD;
} else {
    URL_GET_TOKEN = process.env.REACT_APP_URL_GET_TOKEN_REPLICA;
}

const config = {
    ENTORNO: ENV,
    URL_GET_TOKEN: URL_GET_TOKEN,
    APP_ID: APP_ID,
    BEARER_TOKEN: BEARER_TOKEN,
    URL_BACKEND: URL_BACK,
    URL_NO_AVAL: NO_AVAL,
    LIM_CUIT: LIM_CUIT,
};

const viewAllConfig = () => console.table(config)

export { ENV, URL_GET_TOKEN, APP_ID, BEARER_TOKEN, URL_BACK, NO_AVAL, LIM_CUIT, viewAllConfig };

/* Limite de los caracteres */