import { getToken } from "../../utils/sessionStorage";

/**
 * En caso de crear más endpoints definirlos en BACK_HEADERS_OPTIONS
 * y después agregar los headers que se enviarán en una nueva clave del objeto.
 *
 * Ex:
 * Nuevo endpoint a backend en nestjs
 *
 * Se agrega NEST = "NEST" en BACK_HEADERS_OPTIONS
 *
 * Luego se agrega
 * NEST: {
 *  ...Options
 * }
 */

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

/**
 * En caso de agregar métodos, definirlos como esá a continuación y asegurarse que fetch los soporta
 */

export const enum BACK_METHODS_OPTIONS {
  GET = "GET",
  POST = "GET",
  PATCH = "PATCH",
}
