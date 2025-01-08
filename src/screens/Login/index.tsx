import { useContext } from "react"
import { useNavigate } from "react-router-dom"
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

    const nav = useNavigate()

    const login = async (form: any) => {
        const data = await postForm("internal_login", form, showSpinner)
        if (data) {
            setStorage(data)
            ua.setStore(data)
            nav(`/`)
        }
    }

    return (
        <div className='container pt-5'>
            <div className='offset-md-3 col-md-6 offset-sm-1 col-sm-10 bg-white rounded my-auto shadow-lg'>
                <div className='container pt-5 d-flex justify-content-center'>
                    <div className='col-md-6 col-sm-10 text-center'>
                        <img
                            alt='Logo Neuquén Capital'
                            className='img-fluid'
                            src='https://webservice.muninqn.gov.ar/cglobales/assets/banners/neuquen-2024.svg'
                        />
                    </div>
                </div>

                <form onSubmit={handleSubmit(login)} className='p-3'>
                    <h2 className='text-center mb-4'>Ingresar al sistema</h2>
                    <hr />
                    <Input
                        className={{
                            container: "mb-3",
                            label: "form-label text-muted",
                            input: "form-control form-control shadow-sm",
                        }}
                        invalidMsg={formState.errors.email?.message}
                        label={"Correo electronico / DNI *"}
                        register={{ ...register("email") }}
                        placeholder='usuario@gmail.com / 99.999.999'
                    />
                    <Input
                        className={{
                            label: "form-label text-muted",
                            input: "form-control form-control shadow-sm",
                        }}
                        invalidMsg={formState.errors.password?.message}
                        type='password'
                        label='Contraseña *'
                        register={{ ...register("password") }}
                        placeholder='********'
                    />
                    <div className='d-flex justify-content-center mt-3'>
                        <button
                            type='submit'
                            className='btn btn-primary w-100 py-2'
                            disabled={loading}
                            style={{ fontSize: "1.1rem", fontWeight: "500" }}
                        >
                            {loading ? "Cargando..." : "Ingresar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
