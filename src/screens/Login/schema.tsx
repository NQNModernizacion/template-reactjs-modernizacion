import { object, string } from "yup"

export const schema = object({
    _id: string().required("Correo electronico o dni es requerido"),
    password: string().required("Contraseña es requerida"),
})
