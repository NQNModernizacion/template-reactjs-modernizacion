import { toast } from "react-toastify"
import { AxiosRequestConfig } from "axios"

import { toastOptions } from "../config/toast"
import { axios } from "../utils/axios"

export const getData = async (
    path: string,
    setLoading?: (b: boolean) => void,
    config?: AxiosRequestConfig
) => {
    setLoading && setLoading(true)
    const response = await axios().get(path, config)
    setLoading && setLoading(false)

    const { data, error } = response.data

    if (data) {
        return data
    }

    if (error) {
        toast.error(error, toastOptions)
        return null
    }
}
