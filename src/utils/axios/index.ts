import { default as a } from 'axios';

import { getToken, logout } from '../auth/sessionStorage';
import { URL_BACK, WEBLOGIN_URL } from '../config';

export const validateStatus = (status) => true;

export const axios = (token = getToken()) => {
  a.defaults.baseURL = URL_BACK;
  a.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  a.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  a.defaults.headers.post['Accept'] = 'application/json';
  a.defaults.validateStatus = (status) => {
    switch (status) {
      case 450:
        window.location.href = WEBLOGIN_URL;
        break;
      case 403:
        logout();
        break;
      default:
        break;
    }

    return true;
  };

  return a;
};
