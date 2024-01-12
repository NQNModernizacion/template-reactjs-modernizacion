import { Container, SelectSearch, Table } from "../../../components"
import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../../context"
import { useNavigate } from "react-router-dom";
import { getRoles, buscarRol, getPermisos, dataTablePermisos, guardarPermisos } from "./handlers";
export default function RolesPermisos() {

    const { actions } = useContext(UserContext);
    const navigate = useNavigate();

    const [roles, setRoles] = useState({
        data: null, error: null, loading: false
    })

    const [rol, setRol] = useState({
        data: null, error: null, loading: false, permisos_rol: [], rol: []
    })

    const [permisos, setPermisos] = useState({
        data: null, error: null, loading: false
    })

    const [guardar, setGuardar] = useState({
        data:null, error:null, loading:false
    })

    useEffect(() => {
        if (!actions.hasPermission('role-permission.view')) {
            if (actions.hasRole('admin')) {
                navigate('/administrador/roles-permisos')
            } else {
                navigate('/');
            }
        } else {
            getRoles(roles, setRoles);
        }

    }, [])

    useEffect(() => {
        if (rol.data != null) {
            getPermisos(permisos, setPermisos);
        }
    }, [rol.data])

    return (
        <Container linkBack={'/administrador/roles-permisos'} titulo={'Administración de Permisos de Roles'}>
            {roles.loading && <div className='d-flex justify-content-center mt-3'>
                <div className='spinner-border text-primary' role='status'>
                </div>
            </div>}
            {roles.data &&
                <SelectSearch
                    value={rol.rol}
                    key={'roles'}
                    isMulti={true}
                    options={roles.data}
                    label={'Listado de Roles'}
                    onChange={(e) => {
                        let obj = e
                        setRol({ ...rol, rol: obj })
                        setPermisos({...permisos, data:null})
                    }}
                    noData={() => { return 'No hay mas Roles' }}
                    placeholder={'Seleccione un Rol'}
                ></SelectSearch>
            }
            {rol.rol.length > 0 &&
                <button
                    className="btn btn-sm btn-primary"
                    onClick={() => buscarRol(rol, setRol, permisos, setPermisos)}
                    disabled={rol.loading}
                >Ver Permisos del Rol Seleccionado</button>
            }
            {(permisos.loading || rol.loading) && <div className='d-flex justify-content-center mt-3'>
                <div className='spinner-border text-primary' role='status'>
                </div>
            </div>}
            {rol.data && rol.rol.length > 0 && permisos.data &&
                <div className="mt-3">
                    <Table
                        data={dataTablePermisos(permisos.data, rol.permisos_rol, actions, rol, setRol)}
                        render={()=>(
                            <div className="d-flex justify-content-end w-100">
                                {actions.hasPermission('role-permission.asign') &&
                                <button 
                                    type="button"
                                    onClick={()=>{
                                        //console.log(rol.permisos_rol);
                                        guardarPermisos(guardar, setGuardar, rol);
                                    }}
                                    disabled={guardar.loading}
                                    className="btn btn-sm btn-primary my-auto mx-3"
                                >Sincronizar Permisos de Rol</button>
                                }
                            </div>
                        )}
                    >
                    </Table>
                </div>
            }
        </Container>
    )
}