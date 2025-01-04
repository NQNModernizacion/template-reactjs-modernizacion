import { GroupBase, StylesConfig } from "react-select"

/** Obtiene los query params de la url */
export const getParams = () => {
    const url = new URL(window.location.href)
    const searchParams = url.searchParams
    const keys = [...searchParams.keys()]

    return keys.reduce(
        (obj, key) => ({ ...obj, [key]: searchParams.get(key) }),
        {}
    ) as any
}

/** Remueve un parametro de la URL */
export const removeURLParameter = (url: string, parameter: string) => {
    //prefer to use l.search if you have a location/link object
    const urlparts = url.split("?")
    if (urlparts.length >= 2) {
        const prefix = encodeURIComponent(parameter) + "="
        const pars = urlparts[1].split(/[&;]/g)

        //reverse iteration as may be destructive
        for (let i = pars.length; i-- > 0; ) {
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1)
            }
        }

        return urlparts[0] + (pars.length > 0 ? "?" + pars.join("&") : "")
    }
    return url
}

/** Primera letra de todas las palabras de una string en mayusculas */
export const capitalizeFirst = (str: string) => {
    str = str.toLowerCase()
    const arr = str.split(" ")

    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    }
    return arr.join(" ")
}

/** Retorna una fecha en formato dd/mm/yy */
export const formatDate = (date: string) => {
    const datePart = date.match(/\d+/g)

    if (!datePart) {
        return null
    }

    const year = datePart[0]
    const month = datePart[1]
    const day = datePart[2]

    return day + "/" + month + "/" + year
}

/** Verifica si un objeto se encuentra vacio */
export const isObjectEmpty = (obj: any) => {
    return (
        obj &&
        Object.keys(obj).length === 0 &&
        Object.getPrototypeOf(obj) === Object.prototype
    )
}

export const capitalizeFirstLetterEachWord = (str: string | null) => {
    if (!str) {
        return ""
    }

    return str
        .toLowerCase()
        .split(/[\s,]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}

export const formatOption = (
    item: any,
    valueKey = "id",
    labelKey = "label"
) => {
    if (item) {
        return {
            value: item[valueKey],
            label: item[labelKey],

            styles: item.styles,
        }
    }

    return null
}

export const formatOptions = (
    items: any,
    valueKey = "id",
    labelKey = "label"
) => {
    if (!items) {
        return []
    }
    return items.map((item: any) => formatOption(item, valueKey, labelKey))
}

export const customStyle: StylesConfig<any, boolean, GroupBase<unknown>> = {
    control: (provided, { selectProps }) => ({
        ...provided,
        ...selectProps.value?.styles,
    }),
    singleValue: (provided, { selectProps }) => ({
        ...provided,
        ...selectProps.value?.styles,
    }),
}
