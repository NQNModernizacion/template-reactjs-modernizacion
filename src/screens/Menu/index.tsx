/* import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context" */

import { BasicContainer, /* , Modal */ } from "../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ModalPropio } from '../../components';


const Menu = () => {
    /* const { actions: ua } = useContext(UserContext)

    const nav = useNavigate()

    const permisos = ua.user().permissions
    const permisosOrigen = permisos.filter((permiso) =>
        permiso.name.startsWith("origen.")
    ) */

    /////////////
    // prueba <ModalPropio/>
    ///////////
    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false)

    const nav = useNavigate();

    const permisosOrigen = [
        // { name: "origen.prueba" },
        { name: "origen.login" },
    ];

    const hasPermission = (permisoName) => {
        return true;
    };

    return (
        <BasicContainer titulo='Componente Menu a traves de un modal'>
            
            <div className="p-4">
                <button
                    onClick={handleOpen}
                    className="btn btn-primary py-2"
                >
                    Abrir menu
                </button>
                <ModalPropio
                    show={showModal}
                    onHide={handleClose}
                    title={() => <h3 style={{ color: 'blue' }}>Modal sin bootstrap</h3>}
                    footer={() => (
                        <button
                            onClick={handleClose}
                            className="btn btn-danger"
                        >
                            Cerrar
                        </button>
                    )}
                >
                    <p>Este es un contenido de prueba para el componente Modal</p>
                    <div className='container_menu p-3 rounded'>
                        <div className='bg-body p-3 rounded'>
                            <h2 className='text-center m-0'>Menú Principal</h2>
                            <hr />
                            <div className='d-grid gap-2 col-8 mx-auto justify-content-center'>

                                {permisosOrigen.map((permiso) => {
                                    const nombreOrigen = permiso.name.split(".")[1]
                                    return (
                                       
                                        <button
                                            className='btn btn-primary w-100 btn-menu'
                                            onClick={() =>
                                                nav(`/${nombreOrigen}`)
                                            }
                                            hidden={!hasPermission(permiso.name)}
                                            key={permiso.name}
                                        >
                                            {nombreOrigen.toUpperCase()}
                                        </button>
                                    )
                                })}
                                <button
                                    className='btn btn-primary w-100 btn-menu'
                                    onClick={() => nav("/origenes")}
                                >
                                    404 notFound
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalPropio>
            </div>
          

        </BasicContainer>
    )

   