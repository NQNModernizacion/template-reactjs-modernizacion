import { default as a } from "axios";
import { URL_BACK, WEBLOGIN_URL } from "../config";
import { getToken } from "./sessionStorage";

export const axios = (token = getToken()) => {
  a.defaults.baseURL = URL_BACK;
  a.defaults.headers.common["Authorization"] = "Bearer " + token;
  a.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  a.defaults.headers.post["Accept"] = "application/json";
  
  a.defaults.validateStatus = (status) => {
    if (status === 450) {
      window.location.href = WEBLOGIN_URL
    }
    return true;
  }

  return a;
};
