import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { getStorage, logout } from "../../utils/localStorage"

import { UserContext } from "../../context/UserWrapper"
import { initApp } from "../../handlers"

const UserLayout: React.FC = () => {
    const { actions: ua } = useContext(UserContext)

    const nav = useNavigate()
    useEffect(() => {
        initApp(ua)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const storedData = getStorage()
        if (storedData && storedData.token) {
            ua.setStore(storedData) // Sincroniza el store con los datos guardados
        } else {
            nav("/login") // Redirige si no hay token
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const perfil = ua.persona()

    return (
        <>
            <nav className='navbar d-flex justify-content-around flex-wrap gap-1'>
                <img
                    alt='Logo Neuquén Capital'
                    height='80%'
                    src='https://webservice.muninqn.gov.ar/cglobales/assets/banners/neuquen-2024.svg'
                />

                {perfil && (
                    <div className='d-flex align-items-center gap-3'>
                       
                        <div className='d-none d-md-block text-end'>
                            <span className='fw-bold text-primary'>
                                {perfil.nombre}
                            </span>
                            <br />
                            <small className='text-muted'>
                                {perfil.correoElectronico}
                            </small>
                        </div>

                        {/* Botón de logout */}
                        <button
                            className='btn btn-outline-primary btn-sm d-flex align-items-center'
                            onClick={logout}
                        >
                           
                            Salir
                        </button>
                    </div>
                )}
            </nav>

            <main>
                <Outlet />
            </main>
        </>
    )
}

export default UserLayout
