import { getStorage, setStorage } from "./utils/localStorage"
import { getParams, removeURLParameter } from "./utils/common"
import { Actions } from "./interface"
import { postForm } from "./api"
/* import { MODE } from "./config" */

export const initApp = async (ua: Actions) => {
    ua.setLoading(true)

    const token = getParams().token

    const storage = getStorage()

    let method, config

    if (storage?.token) {
        method = "refresh_data"
    } else if (token) {
        method = "app_login"
        config = { headers: { Authorization: "Bearer " + token } }
    } else {
        /*  No hay token en storage,
            No hay token por params
        Lo mandamos a la pagina de la cudad */
    }

    const data = await postForm("auth", { method }, null, config)
    if (data) {
        ua.setStore(data)
        setStorage(data)
        /* location.href = `/apps/${APP_NAME}/#/` */
    }
    /*  if (!data) {
        location.href = `/apps/${APP_NAME}/#/login`
    } */

    ua.setLoading(false)
}

/** Enviamos un bool para mostrar el spinner principal */
export const showSpinner = (loading: boolean) => {
    if (/* MODE === "production" */ true) {
        if (loading) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            window.cargarSpinner()
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            window.eliminarSpinner()
        }
    }
}
