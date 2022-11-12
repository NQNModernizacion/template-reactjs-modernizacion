const URL_GET_TOKEN = process.env.REACT_APP_URL_GET_TOKEN;
const APP_ID = parseInt(process.env.REACT_APP_APP_ID);
const ENV = process.env.REACT_APP_ENV;

const BEARER_TOKEN = process.env.REACT_APP_APP_BEARER_TOKEN;

const NO_AVAL = 'https://weblogin.muninqn.gov.ar/apps/css/assets/Imagen_no_disponible.svg';

let URL_BACK = process.env.REACT_APP_APP_URL_BACK_LOCAL;

export { ENV, URL_GET_TOKEN, APP_ID, BEARER_TOKEN, URL_BACK, NO_AVAL };


export {
    LIM_CUIT,
} from './charLimit'