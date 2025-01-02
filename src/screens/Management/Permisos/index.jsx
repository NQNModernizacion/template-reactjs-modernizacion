import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table } from '../../../components';
import { UserContext } from '../../../context';
import { GuardarPermisos, consultar_persona, dataTablePermisos } from './handlers';

export default function Permisos() {
  const navigate = useNavigate();
  const { actions } = useContext(UserContext);
  const [permisos, setPermisos] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const [listado, setListado] = useState({
    permisos: [],
    permisos_asign: [],
    permisos_no_asign: [],
    permisos_select: [],
  });

  const [guardarPermisos, setGuardarPermisos] = useState({
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

  useEffect(() => {
    if (!(actions.hasPermission('admin.permission.view') && actions.isAdmin())) {
      if (actions.isAdmin()) {
        navigate('/administrador/roles-permisos');
      } else {
        navigate('/');
      }
    }
  }, []);

  return (
    <Container linkBack={'/administrador/roles-permisos'} titulo={'Administración de Permisos'}>
      {
        <form onSubmit={(e) => consultar_persona(e, persona, setPersona, setListado, listado, setPermisos, permisos)}>
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
              Buscar
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
                        <h6 className='card-subtitle mb-0 text-body-secondary'>
                          ¿Ha entrado a la aplicación?: {persona.data.in_app ? 'Sí' : 'No'}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {permisos.loading && permisos.data === null && (
                <div className='d-flex justify-content-center mt-3'>
                  <div className='spinner-border text-primary' role='status' />
                </div>
              )}

              {permisos.data && (
                <div className='mt-2'>
                  <Table
                    data={dataTablePermisos(permisos.data, listado, setListado, persona, actions)}
                    height={500}
                    render={() => (
                      <div className='d-flex justify-content-end w-100'>
                        {actions.hasPermission('admin.permission.asign') && (
                          <button
                            className='btn btn-primary my-auto mx-3'
                            disabled={guardarPermisos.loading}
                            type='button'
                            onClick={() => {
                              GuardarPermisos(
                                persona,
                                guardarPermisos,
                                setGuardarPermisos,
                                listado.permisos_select,
                                permisos,
                                setPermisos,
                                listado,
                                setListado
                              );
                            }}>
                            Sincronizar Permisos seleccionados
                          </button>
                        )}
                      </div>
                    )}
                  />
                </div>
              )}
            </div>
          )}
        </form>
      }
    </Container>
  );
}
