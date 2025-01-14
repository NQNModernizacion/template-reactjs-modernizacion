import { toast } from "react-toastify"
import { toastOptions } from "../config/toast"

import { axios } from "../utils/axios"
import { AxiosRequestConfig } from "axios"

export const postForm = async (
    path: string,
    form?: any,
    setLoading?: ((b: boolean) => void) | null,
    config?: AxiosRequestConfig
) => {
    setLoading && setLoading(true)
    const response = await axios().post(path, form, config)
    setLoading && setLoading(false)

    const { data, error } = response.data

    if (data) {
        // console.log("Data:", data)
        return data
    }

    if (error) {
        // console.log("Error:", error)
        toast.error(error, toastOptions)
        return null
    }
}
