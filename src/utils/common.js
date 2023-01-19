import { ENV } from "../config";

/** Obtiene los query params de la url */
export const getParams = () => {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    const keys = [...searchParams.keys()];

    return keys.reduce((obj, key) => ({ ...obj, [key]: searchParams.get(key) }), {});
};

/** Primera letra de todas las palabras de una string en mayusculas */
export const capitalizeFirst = (str) => {
    str = str.toLowerCase();
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
}

/** Retorna una fecha en formato dd/mm/yy */
export const formatDate = (date) => {
    const datePart = date.match(/\d+/g)

    const year = datePart[0]
    const month = datePart[1]
    const day = datePart[2];

    return day + '/' + month + '/' + year;
}

/** Verifica si un objeto se encuentra vacio */
export const isObjEmpty = (obj) => {
    return obj
        && Object.keys(obj).length === 0
        && Object.getPrototypeOf(obj) === Object.prototype
}

export const getAccessScreen = (role, screen, back) => {
    if (role === screen && ENV === 'production') {
        return true;
    }

    if (role !== screen && ENV === 'production') {
        back()
        return false;
    }

    if (role !== screen || ENV === 'dev') {
        return true;
    }
}

export const returnWebLogin = () => {
    window.location.replace("https://weblogin.muninqn.gov.ar/")
}

