import { ToastOptions, ToastPosition } from "react-toastify"

export const toastOptions: ToastOptions = {
    className: "toastContainer",
    progressClassName: "toastProgress",
    position: "bottom-right" as ToastPosition,
    closeOnClick: true,
}
