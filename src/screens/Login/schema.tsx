import { object, string } from "yup"

export const schema = object({
    email: string().required("Correo electronico es requerido"),
    password: string().required("Contraseña es requerida"),
})
