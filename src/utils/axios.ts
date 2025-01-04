import { default as a } from "axios"

import { URL_BACK /* , WEBLOGIN_URL */ } from "../config"
import { getToken, logout } from "./localStorage"

export const axios = (token = getToken()) => {
    a.defaults.baseURL = URL_BACK
    a.defaults.headers.common["Authorization"] = "Bearer " + token
    a.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
    a.defaults.headers.post["Accept"] = "application/json"
    a.defaults.validateStatus = (status) => {
        __DEV__ && console.log("Codigo: " + status)

        switch (status) {
            /*  case 450:
                window.location.href = WEBLOGIN_URL
                break */
            case 403:
                logout()
                break
            case 503:
                logout()
                break
            default:
                break
        }

        return true
    }

    if (__DEV__) {
        a.interceptors.request.use(
            (config) => {
                console.log(
                    `Iniciando petición a: ${config.baseURL} con método: ${config.method}`
                )
                return config
            },
            (error) => {
                console.error("Error al iniciar la petición:", error)
            }
        )
    }

    return a
}
