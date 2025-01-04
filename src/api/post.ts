import { toast } from "react-toastify"
import { toastOptions } from "../config/toast"

import { axios } from "../utils/axios"

export const postForm = async (
    path: string,
    form?: any,
    setLoading?: (b: boolean) => void
) => {
    setLoading && setLoading(true)
    const response = await axios().post(path, form)
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
