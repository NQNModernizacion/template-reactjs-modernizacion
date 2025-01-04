import { useContext } from "react"
/* import { useNavigate } from "react-router-dom" */
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { UserContext } from "../../context/UserWrapper"
import { Input } from "../../components"

import { schema } from "./schema"
import { postForm } from "../../api"
import { setStorage } from "../../utils/localStorage"
import { showSpinner } from "../../handlers"

const Login = () => {
    const { actions: ua, loading } = useContext(UserContext)

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
    })

    /* const nav = useNavigate() */

    const login = async (form: any) => {
        const data = await postForm("internal_login", form, showSpinner)
        if (data) {
            ua.setStore(data)
            setStorage(data)
            /* nav(`/`) */
        }
    }

    return (
        <div className='container pt-5'>
            <div className='offset-md-3 col-md-6 offset-sm-1 col-sm-10 bg-body rounded p-2 my-auto'>
                <form onSubmit={handleSubmit(login)} className='p-4'>
                    <h3>Ingresar al sistema</h3>
                    <hr />
                    <Input
                        className={{
                            label: "form-label",
                            input: "form-control",
                        }}
                        invalidMsg={formState.errors.email?.message}
                        label={"Correo electronico / DNI *"}
                        register={{ ...register("email") }}
                    />
                    <Input
                        className={{
                            label: "form-label",
                            input: "form-control",
                        }}
                        invalidMsg={formState.errors.password?.message}
                        type='password'
                        label='Contraseña *'
                        register={{ ...register("password") }}
                    />
                    <div className='d-flex justify-content-center mt-3'>
                        <button
                            type='submit'
                            className='btn btn-primary w-100'
                            disabled={loading}
                        >
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
