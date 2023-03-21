import { getToken } from "../../utils/sessionStorage";

export const enum BACK_HEADERS_OPTIONS {
  PHP = "PHP",
  LARAVEL = "LARAVEL",
  PUBLIC_PHP = "PUBLIC_PHP",
  PUBLIC_LARAVEL = "PUBLIC_LARAVEL",
}

export const BACK_HEADERS: any = {
  PHP: {
    Authorization: `Bearer ${getToken()}`,
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
  LARAVEL: {
    Authorization: `Bearer ${getToken()}`,
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
  PUBLIC_PHP: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
  PUBLIC_LARAVEL: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
};

export const enum BACK_METHODS_OPTIONS {
  GET = "GET",
  POST = "GET",
  PATCH = "PATCH",
}
