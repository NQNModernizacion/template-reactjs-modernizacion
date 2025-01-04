export const APP_NAME = import.meta.env.VITE_APP_NAME
export const URL_BACK = import.meta.env.VITE_URL_BACK
export const WEBLOGIN_URL = import.meta.env.VITE_WEBLOGIN_URL
export const ASSETS_URL = import.meta.env.VITE_ASSETS_URL

/* Revisar esto!! lo defini sin saber como lo tienen */
export const MODE = import.meta.env.MODE as "replica" | "production" | "local"

const config = {
    URL_BACK: URL_BACK,
    WEBLOGIN_URL: WEBLOGIN_URL,
    APP_NAME: APP_NAME,
    MODE: MODE,
}

export const viewAllConfig = () => console.table(config)
