import { UseFormSetValue } from "react-hook-form"

/**
 * Función `selectOptionSelect`
 *
 * Esta función selecciona un elemento de una colección en base al valor proporcionado,
 * actualiza el estado con el modelo seleccionado y establece un valor en el formulario
 * utilizando React Hook Form.
 *
 * @param data - Objeto que contiene el valor seleccionado, por ejemplo, `{ value: 123 }`. Puede ser `null`.
 * @param name - Nombre del campo a actualizar en el estado, por ejemplo, "usuario".
 * @param collection - Colección de datos en la que buscar el elemento correspondiente. Puede ser un arreglo, `null` o `undefined`.
 * @param setState - Función para actualizar el estado del componente.
 * @param setValue - Función de React Hook Form para establecer un valor en el formulario.
 */
export const selectOptionSelect = (
    data: any | null, // Valor seleccionado o null
    name: string, // Nombre del campo a actualizar
    collection: any[] | null | undefined, // Colección donde buscar el modelo
    setState: any, // Función para actualizar el estado
    setValue: UseFormSetValue<any> // Función de React Hook Form para actualizar valores
) => {
    if (!collection) return null

    // Buscamos el modelo dentro de la coleccion
    const _model = collection.find((col) => col.id === data?.value)

    // Actualiza el estado con el modelo encontrado o null si no hay coincidencia
    setState((state: any) => ({
        ...state,
        [name]: _model ? _model : null,
    }))

    // Si se encontró un modelo, establece su ID en el formulario; de lo contrario, establece null
    if (_model) {
        setValue(`${name}_id`, _model.id)
    } else {
        setValue(`${name}_id`, null)
    }
}
