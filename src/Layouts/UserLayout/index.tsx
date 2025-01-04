import { useContext } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { logout } from "../../utils/localStorage"

import { UserContext } from "../../context/UserWrapper"
import { Settings, TicketIcon } from "lucide-react"

const UserLayout: React.FC = () => {
    const { actions } = useContext(UserContext)

    const nav = useNavigate()

    const perfil = actions.persona()

    return (
        <>
            <nav className='navbar d-flex  flex-wrap p-2 gap-1'>
                <img
                    alt='Logo Neuquén Capital'
                    height='80%'
                    src='https://webservice.muninqn.gov.ar/cglobales/assets/banners/neuquen-2024.svg'
                />

                {perfil && (
                    <div className='d-flex align-items-center gap-sm-2 pe-3'>
                        {/*  <img
                            alt='imágen perfil'
                            className='imagen-usuario-navbar'
                            src={perfil.imagenUrl}
                        /> */}
                        <button
                            className='btn btn-primary btn-sm'
                            onClick={() => nav("/tickets")}
                        >
                            <TicketIcon className='me-1' width={15} />
                            Tickets
                        </button>
                        <button
                            className='btn btn-primary btn-sm'
                            onClick={() => nav("/configuraciones")}
                        >
                            <Settings className='me-1' width={15} />
                            Configuraciones
                        </button>
                        <div className='vr d-none d-sm-block'></div>
                        <div className='d-none d-sm-block text-start'>
                            <small className='nombre-usuario-navbar'>
                                {perfil.nombre}
                            </small>
                            <br />
                            <small className='email-usuario-navbar'>
                                {perfil.correoElectronico}
                            </small>
                        </div>
                        <div className='vr d-none d-sm-block'></div>
                        <div
                            className='ms-2 ms-sm-none text-primary'
                            onClick={() => logout()}
                            role='button'
                        >
                            <i className='fa-solid fa-arrow-right-from-bracket me-2'></i>
                            Salir
                        </div>
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
