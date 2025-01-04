/* import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context" */

import { BasicContainer, Modal } from "../../components"

const Menu = () => {
    /* const { actions: ua } = useContext(UserContext)

    const nav = useNavigate()

    const permisos = ua.user().permissions
    const permisosOrigen = permisos.filter((permiso) =>
        permiso.name.startsWith("origen.")
    ) */

    return (
        <BasicContainer titulo='asd'>
            <button className='btn btn-primary'>Modal</button>
            "Revisar este componete me parece que se puede de hacer una mejor
            manera"
            <Modal
                show={true}
                size={"xl"}
                onHide={() => {}}
                title={() => "asd"}
            >
                asd
            </Modal>
        </BasicContainer>
    )
    return (
        <div className='container_menu p-3 rounded'>
            <div className='bg-body p-3 rounded'>
                <h2 className='text-center m-0'>Menú Principal</h2>
                <hr />
                <div className='d-grid gap-2 col-8 mx-auto justify-content-center'>
                    {/* Botones para ver certificados segun permisos de origen */}
                    {permisosOrigen.map((permiso) => {
                        const nombreOrigen = permiso.name.split(".")[1]
                        return (
                            <button
                                className='btn btn-primary w-100 btn-menu'
                                onClick={() =>
                                    nav(`/certificados/${nombreOrigen}`)
                                }
                                hidden={!ua.hasPermission(permiso.name)}
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
                        Origenes
                    </button>

                    {ua.hasRole("admin.permisos") && (
                        <button
                            className='btn btn-primary w-100  btn-menu'
                            onClick={() => nav("/administrador/roles-permisos")}
                        >
                            Administración
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Menu
