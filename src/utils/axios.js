import { default as a } from 'axios';

import { URL_BACK } from '../config';
import { getParams } from './common';
import { getToken } from './sessionStorage';

export const validateStatus = (status) => true;

const axios = a;

axios.defaults.baseURL = URL_BACK;
const token = getToken() ? getToken() : getParams().token
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export default axios