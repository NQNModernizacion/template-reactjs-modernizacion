import { default as a } from 'axios';
import { BEARER_TOKEN, URL_BACK } from '../config';
import { getParams } from './common';

const getFormData = (data) => {
    const body = new FormData();
    for (let key in data) {
        body.append(key, data[key]);
    }
    return body
}

export const axios = async (url, signal, method = 'GET', data) => {
    try {
        a.defaults.baseURL = URL_BACK;
        a.defaults.headers.common['Authorization'] = 'Bearer ' + BEARER_TOKEN + '%' + getParams().SESSIONKEY;
        a.defaults.headers.post['Accept'] = 'application/json';

        return await a({
            url,
            method,
            signal,
            data: data && getFormData(data)
        });
    } catch (error) {
        return error
    }
}
