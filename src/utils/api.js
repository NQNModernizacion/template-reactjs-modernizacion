import { default as a } from 'axios';
import { URL_BACK } from '../config';
import { getToken } from './sessionStorage';

export const axios = async () => {

    a.defaults.baseURL = URL_BACK;
    a.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();
    a.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    a.defaults.headers.post['Accept'] = 'application/json';

    return a
}
