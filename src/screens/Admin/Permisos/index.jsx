import { Container, Table } from "../../../components"
import { useState, useEffect, useContext } from "react"
import { getPermisos, dataTablePermisos, consultar_persona } from "./handlers"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../context"
export default function Permisos() {

    const navigate = useNavigate();
    const { actions } = useContext(UserContext);
    const [permisos, setPermisos] = useState({
        data: null, error: null, loading: false
    })

    const [listado, setListado] = useState({
        permisos: [], permisos_asign: [], permisos_no_asign: [], permisos_select: []
    })

    const [persona, setPersona] = useState({
        data: null, error: null, loading: false, values: {
            data: ''
        }
    })

    useEffect(() => {
        if (actions.hasPermission('permission.view')) {
            getPermisos(permisos, setPermisos, listado, setListado)
        } else {
            if (actions.hasRole('admin')) {
                navigate('/administrador/roles-permisos')
            } else {
                navigate('/');
            }
        }
    }, [])

    return (
        <Container linkBack={'/administrador/roles-permisos'} titulo={'Administración de Permisos'}>
            {permisos.loading && permisos.data === null && <div className='d-flex justify-content-center'>
                <div className='spinner-border text-primary' role='status'>
                </div>
            </div>}
            {permisos.data &&
                <form onSubmit={(e) => consultar_persona(e, persona, setPersona, setListado, listado)}>
                    <label className="form-label">Ingrese DNI, ID o Email</label>
                    <div className="d-flex justify-content-between">
                        <input
                            type="text"
                            value={persona.values.data}
                            onChange={(e) => {
                                setPersona({ ...persona, values: { data: e.target.value } })
                            }}
                            className="form-control"
                        />
                        <button
                            type="submit"
                            className="btn btn-sm btn-primary"
                            disabled={persona.loading} >
                            <span>Buscar</span>
                        </button>
                    </div>
                    {persona.loading && <div className='d-flex justify-content-center mt-3'>
                        <div className='spinner-border text-primary' role='status'>
                        </div>
                    </div>}
                    {persona.data &&
                        <div className="mt-2">
                            <label className="form-control mt-2">Nombre: {persona.data.user.nombre}</label>
                            <label className="form-control mt-2">Correo: {persona.data.user.correoElectronico}</label>
                            <label className="form-control mt-2">Documento: {persona.data.user.documento}</label>
                            <label className="form-control mt-2">¿Ha entrado a la aplicación?: {persona.data.in_app ? 'Si' : 'No'}</label>
                            {permisos.data &&
                                <div className="mt-2">
                                    <Table
                                        data={dataTablePermisos(permisos.data, listado, setListado)}
                                        render={() => (
                                            <div className="d-flex justify-content-end w-100">
                                                <button type="button" className="btn btn-sm btn-primary my-auto mx-3">Asignar Permisos seleccionados</button>
                                            </div>
                                        )}
                                    >
                                    </Table>

                                </div>
                            }
                        </div>
                    }
                </form>
            }

        </Container>
    )
}