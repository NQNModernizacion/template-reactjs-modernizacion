import axios from 'axios';

import { URL_BACK } from '../config';
import { getParams } from './common';
import { getToken } from './sessionStorage';

export const validateStatus = (status) => true;

const Axios = axios;

Axios.defaults.baseURL = URL_BACK;
const token = getToken() ? getToken() : getParams().token
Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export default Axios