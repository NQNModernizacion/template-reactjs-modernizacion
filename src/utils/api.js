import axios from 'axios';
import { BEARER_TOKEN, URL_BACK } from '../config';
import { getParams } from './';

const getFormData = (data) => {
    const body = new FormData();
    for (let key in data) {
        body.append(key, data[key]);
    }
    return body
}

export const handlerAxios = async (url, signal, method = 'GET', data) => {
    try {
        axios.defaults.baseURL = URL_BACK;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + BEARER_TOKEN + '%' + getParams().SESSIONKEY;
        axios.defaults.headers.post['Accept'] = 'application/json';

        return await axios({
            url,
            method,
            signal,
            data: data && getFormData(data)
        });
    } catch (error) {
        return error
    }
}
