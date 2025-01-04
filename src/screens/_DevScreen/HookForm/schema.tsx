import { number, object, string } from "yup"

export const schema = object({
    asunto: string().required("Asunto es requerido"),
    /* estado_id: number(), */
    prioridad_id: number().typeError("Debe seleccionar prioridad"),
    tipo_id: number(),
})
