import { 
    getRoles, 
    consultar_persona, 
    ver_role_en_persona,
    roles_string,
    asignarRol,
    desasignarRol 
} from "./handlers"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../../context"
import { useNavigate } from "react-router-dom";
import { Container, SelectSearch } from "../../../components";
import { Tabs, Tab } from 'react-bootstrap'

export default function Roles() {
    const { actions } = useContext(UserContext);
    const navigate = useNavigate();
    const [roles, setRoles] = useState({
        data: null, error: null, loading: false
    })

    const [persona, setPersona] = useState({
        data: null, error: null, loading: false, values: {
            data: ''
        }
    })

    const [listado, setListado] = useState({
        roles: [], roles_asign: [], roles_no_asign: [], roles_select_asign: [], roles_select_no_asign: []
    })

    const [guardarRol, setGuardarRol] = useState({
        data:null, error:null, loading:false
    })

    useEffect(() => {
        if (roles.data != null) {
            setListado({ ...listado, roles: roles.data });
        }
    }, [roles.data])

    useEffect(() => {
        if (persona.data != null && roles.data != null) {
            roles.data.map((item, index) => {
                if (ver_role_en_persona(item, persona)) {
                    let roles_asign = listado.roles_asign;
                    let it = item;
                    it.label = it.name;
                    roles_asign.push(it);
                    setListado({ ...listado, roles_asign: roles_asign });
                } else {
                    let roles_no_asign = listado.roles_no_asign;
                    let it = item;
                    it.label = it.name;
                    roles_no_asign.push(it);
                    setListado({ ...listado, roles_no_asign: roles_no_asign });
                }
            })
        }
        console.log(listado);
    }, [persona.data])

    useEffect(() => {
        if (actions.hasPermission('role.view')) {
            getRoles(roles, setRoles);
        } else {
            if (actions.hasRole('admin')) {
                navigate('/administrador/roles-permisos')
            } else {
                navigate('/');
            }
        }
    }, [])

    return (
        <Container linkBack={'/administrador/roles-permisos'} titulo={'Administración de Roles'}>
            {roles.loading && roles.data === null && <div className='d-flex justify-content-center'>
                <div className='spinner-border text-primary' role='status'>
                </div>
            </div>}
            {roles.data &&
                <form onSubmit={(e) => {e.preventDefault(); consultar_persona(persona, setPersona, setListado, listado)}}>
                    <label className="form-label">Ingrese DNI, ID o Email</label>
                    <div className="d-flex justify-content-between gap-2">
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
                            {persona.data.roles.length > 0 ?
                                <label className="form-control mt-2">Roles: {roles_string(persona.data.roles)}</label>
                                :
                                <label className="form-control mt-2">No posee roles</label>
                            }
                            {/* tabs de asignar y de desasignar rol */}
                            <Tabs defaultActiveKey='asignar' className='mt-3' fill>
                                <Tab eventKey='asignar' title='Asignar Rol'>
                                    <div className="mx-3">
                                        {listado.roles_no_asign.length > 0 &&
                                            
                                                
                                                <SelectSearch
                                                    value={listado.roles_select_asign}
                                                    key={'asignar'}
                                                    isMulti={true}
                                                    options={listado.roles_no_asign}
                                                    label={'Roles sin Asignar'}
                                                    onChange={(e) => {
                                                        setListado({ ...listado, roles_select_asing: e })
                                                        console.log(e)
                                                    }}
                                                    noData={() => { return 'No hay mas Roles' }}
                                                    placeholder={'Buscar Roles...'}
                                                ></SelectSearch>
                                            
                                        }
                                        {actions.hasPermission('role.asign') &&                                            
                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-primary" 
                                                onClick={() => { asignarRol(listado, setListado, persona, setPersona, guardarRol, setGuardarRol) }}
                                                disabled={guardarRol.loading}
                                            >Asignar Roles seleccionados</button>}
                                    </div>
                                </Tab>
                                <Tab eventKey='desasignar' title='Desasignar Rol'>
                                <div className="mx-3">
                                        {listado.roles_asign.length > 0 &&
                                                <SelectSearch
                                                    value={listado.roles_select_no_asign}
                                                    key={'desasignar'}
                                                    isMulti={true}
                                                    options={listado.roles_asign}
                                                    label={'Roles a Desasignar'}
                                                    onChange={(e) => {
                                                        setListado({ ...listado, roles_select_no_asign: e })
                                                        console.log(e)
                                                    }}
                                                    noData={() => { return 'No hay mas Roles' }}
                                                    placeholder={'Buscar Roles...'}
                                                ></SelectSearch>
                                            
                                        }
                                        {actions.hasPermission('role.asign') &&                                            
                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-primary" 
                                                onClick={() => { desasignarRol(listado, setListado, persona, setPersona, guardarRol, setGuardarRol) }}
                                                disabled={guardarRol.loading}
                                            >Desasignar Roles seleccionados</button>}
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    }
                </form>
            }

        </Container>
    )
}