import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, SelectSearch } from '../../../components';
import { UserContext } from '../../../context';
import { asignarRol, consultar_persona, desasignarRol, getRoles, ver_role_en_persona } from './handlers';

export default function Roles() {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedAction, setSelectedAction] = useState('');
  const [roles, setRoles] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const [persona, setPersona] = useState({
    data: null,
    error: null,
    loading: false,
    values: {
      data: '',
    },
  });

  const [listado, setListado] = useState({
    roles: [],
    roles_asign: [],
    roles_no_asign: [],
    roles_select_asign: [],
    roles_select_no_asign: [],
  });

  const [guardarRol, setGuardarRol] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const handleActionSelection = (action) => {
    setSelectedAction(action);
  };

  useEffect(() => {
    if (roles.data != null) {
      setListado({ ...listado, roles: roles.data });
    }
  }, [roles.data]);

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
      });
    }
  }, [persona.data]);

  useEffect(() => {
    if (actions.hasPermission('admin.role.view') && actions.isAdmin()) {
      getRoles(roles, setRoles);
    } else {
      if (actions.isAdmin()) {
        navigate('/administrador/roles-permisos');
      } else {
        navigate('/');
      }
    }
  }, []);

  return (
    <Container linkBack={'/administrador/roles-permisos'} titulo={'Administración de Roles'}>
      {roles.loading && roles.data === null && (
        <div className='d-flex justify-content-center'>
          <div className='spinner-border text-primary' role='status' />
        </div>
      )}
      {roles.data && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            consultar_persona(persona, setPersona, setListado, listado);
          }}>
          <label className='form-label'>Ingrese DNI, ID o Email</label>
          <div className='d-flex justify-content-between gap-2'>
            <input
              className='form-control'
              type='text'
              value={persona.values.data}
              onChange={(e) => {
                setPersona({ ...persona, values: { data: e.target.value } });
              }}
            />
            <button className='btn btn-primary' disabled={persona.loading} type='submit'>
              <span>Buscar</span>
            </button>
          </div>
          {persona.loading && (
            <div className='d-flex justify-content-center mt-3'>
              <div className='spinner-border text-primary' role='status' />
            </div>
          )}
          {persona.data && (
            <div className='mt-2'>
              <div className='card mb-2 shadow'>
                <div className='row g-0 align-items-center'>
                  <div className='col-12'>
                    <div className='card-body'>
                      <div className='row'>
                        <h5 className='card-title'>
                          <i className='bi bi-person-fill text-primary' /> {persona.data.user.nombre}
                        </h5>
                        <h6 className='card-subtitle mb-2 text-body-secondary'>
                          Correo: {persona.data.user.correoElectronico}
                        </h6>
                        <h6 className='card-subtitle mb-2 text-body-secondary'>
                          Documento: {persona.data.user.documento}
                        </h6>
                        <h6 className='card-subtitle mb-4 text-body-secondary'>
                          ¿Ha entrado a la aplicación?: {persona.data.in_app ? 'Sí' : 'No'}
                        </h6>
                        <h6 className='card-subtitle mb-2 text-body-secondary'>Roles:</h6>
                        <div className='d-flex flex-wrap gap-2'>
                          {persona.data.roles.length > 0 && (
                            <>
                              {persona.data.roles.map((rol, index) => {
                                return (
                                  <span key={index} className='badge text-bg-primary'>
                                    {rol.name}
                                  </span>
                                );
                              })}
                            </>
                          )}
                          {persona.data.roles.length === 0 && (
                            <h6 className='card-subtitle mb-2 text-body-secondary'>No posee roles</h6>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row d-flex justify-content-center my-2'>
                <div aria-label='Basic example' className='btn-group' role='group'>
                  <button
                    className={`btn btn-outline-primary ${selectedAction === 'asignar-rol' && 'active'}`}
                    type='button'
                    onClick={() => handleActionSelection('asignar-rol')}>
                    Asignar Rol
                  </button>
                  <button
                    className={`btn btn-outline-primary ${selectedAction === 'desasignar-rol' && 'active'}`}
                    type='button'
                    onClick={() => handleActionSelection('desasignar-rol')}>
                    Desasignar Rol
                  </button>
                </div>
              </div>

              {selectedAction === 'asignar-rol' && (
                <div className='mx-3'>
                  {listado.roles_no_asign.length > 0 && (
                    <SelectSearch
                      key={'asignar'}
                      isMulti={true}
                      label={'Roles sin Asignar'}
                      noData={() => {
                        return 'No hay mas Roles';
                      }}
                      options={listado.roles_no_asign}
                      placeholder={'Buscar Roles...'}
                      value={listado.roles_select_asign}
                      onChange={(e) => {
                        setListado({ ...listado, roles_select_asign: e });
                      }}
                    />
                  )}
                  {actions.hasPermission('admin.role.asign') && (
                    <button
                      className='btn btn-primary'
                      disabled={guardarRol.loading}
                      type='button'
                      onClick={() => {
                        asignarRol(listado, setListado, persona, setPersona, guardarRol, setGuardarRol);
                      }}>
                      Asignar Roles seleccionados
                    </button>
                  )}
                </div>
              )}

              {selectedAction === 'desasignar-rol' && (
                <div className='mx-3'>
                  {listado.roles_asign.length > 0 && (
                    <SelectSearch
                      key={'desasignar'}
                      isMulti={true}
                      label={'Roles a Desasignar'}
                      noData={() => {
                        return 'No hay mas Roles';
                      }}
                      options={listado.roles_asign}
                      placeholder={'Buscar Roles...'}
                      value={listado.roles_select_no_asign}
                      onChange={(e) => {
                        setListado({ ...listado, roles_select_no_asign: e });
                      }}
                    />
                  )}
                  {actions.hasPermission('admin.role.asign') && (
                    <button
                      className='btn btn-primary'
                      disabled={guardarRol.loading}
                      type='button'
                      onClick={() => {
                        desasignarRol(listado, setListado, persona, setPersona, guardarRol, setGuardarRol);
                      }}>
                      Desasignar Roles seleccionados
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </form>
      )}
    </Container>
  );
}
