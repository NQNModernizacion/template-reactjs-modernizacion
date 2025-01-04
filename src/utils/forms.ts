import { UseFormSetValue } from "react-hook-form"

export const selectOptionSelect = (
    data: any | null,
    name: string,
    collection: any[] | null | undefined,
    setState: any,
    setValue: UseFormSetValue<any>
) => {
    if (!collection) return null

    const _model = collection.find((col) => col.id === data?.value)

    setState((state: any) => ({
        ...state,
        [name]: _model ? _model : null,
    }))

    if (_model) {
        setValue(`${name}_id`, _model.id)
    } else {
        setValue(`${name}_id`, null)
    }
}