
import { LIM_CUIT } from './charLimit'

export const ENV = process.env.REACT_APP_ENV;

export const isDev = process.env.NODE_ENV === 'development'

/* Configuracion del backend URL */
let URL_BACK;
if (ENV === 'local') {
    URL_BACK = process.env.REACT_APP_URL_BACK_LOCAL;
} else {
    URL_BACK = process.env.REACT_APP_URL_BACK;
}

const config = {
    ENTORNO: ENV,
    URL_BACKEND: URL_BACK,
    LIM_CUIT: LIM_CUIT,
};

export const viewAllConfig = () => console.table(config)

export { URL_BACK, LIM_CUIT };

/* Limite de los caracteres */