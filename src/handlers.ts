import { setStorage } from "./utils/localStorage"
import { axios } from "./utils/axios"
import { getParams, removeURLParameter } from "./utils/common"
import { Actions } from "./interface"
import { postForm } from "./api"
import { MODE } from "./config"

export const initApp = async (ua: Actions) => {
    const token = getParams().token

    if (!token) {
        const data = await postForm("refresh", null, showSpinner)
        if (data) {
            ua.setStore(data)
            setStorage(data)
        }

        // retornamos a weblogin o al internal login
    } else {
        const resp = await axios(token).get("get_user_info")
        const { data, error } = resp.data

        if (data) {
            ua.setUser({ ...data, token: data.token })
        }

        if (error) {
            // retornamos a weblogin o al internal login
            console.log("ocurrio un error al iniciar la app", error)
        }

        const url = removeURLParameter(window.location.href, "token")
        window.history.pushState({}, '', url)
    }
    ua.setLoading(false)
}

/** Enviamos un bool para mostrar el spinner principal */
export const showSpinner = (loading: boolean) => {
    if (MODE === "production") {
        if (loading) {
            //@ts-ignore
            window.cargarSpinner()
        } else {
            //@ts-ignore
            window.eliminarSpinner()
        }
    }
}
