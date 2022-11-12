import { BEARER_TOKEN, URL_BACK } from '../config';
import { EXAMPLE } from '../config/actionTypes';
import { getParams } from './';

/** Generan las opciones para el fetch */
const getOptionsFetch = (method, data = null) => {
    const sessionKey = getParams().SESSIONKEY;
    const auth = BEARER_TOKEN + '%' + sessionKey

    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + auth);

    /* Metodo POST */
    if (method === 'POST' && data) {
        headers.append('Accept', 'application/json');

        const body = new FormData();
        for (let key in data) {
            body.append(key, data[key]);
        }

        return {
            method,
            headers,
            body,
        };
    }

    /* Metodo GET */
    if (method === 'GET') {
        return {
            method,
            headers,
            redirect: 'follow',
        };
    }

    /* Metodo PUT */
    if (method === 'PUT' && data) {
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        const body = new URLSearchParams();
        for (let key in data) {
            body.append(key, data[key]);
        }

        return {
            method: 'PUT',
            headers,
            body,
            redirect: 'follow'
        };
    }

    /* Metodo DELETE */
    if (method === 'DELETE') {
        return {
            method,
            headers,
            redirect: 'follow',
        };
    }
};

const getTest = async (userId) => {
    const op = getOptionsFetch('GET');
    const URL = URL_BACK + 'END_POINT?action=' + EXAMPLE;

    const res = await fetch(URL, op);

    const data = await res.json();

    return data
}

export {
    getOptionsFetch,
    getTest
};
