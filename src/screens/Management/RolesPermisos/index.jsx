import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, SelectSearch, Table } from '../../../components';
import { UserContext } from '../../../context';
import { buscarRol, dataTablePermisos, getPermisos, getRoles, guardarPermisos } from './handlers';

export default function RolesPermisos() {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();

  const [roles, setRoles] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const [rol, setRol] = useState({
    data: null,
    error: null,
    loading: false,
    permisos_rol: [],
    rol: [],
  });

  const [permisos, setPermisos] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const [guardar, setGuardar] = useState({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    if (!(actions.hasPermission('admin.role-permission.view') && actions.isAdmin())) {
      if (actions.isAdmin()) {
        navigate('/administrador/roles-permisos');
      } else {
        navigate('/');
      }
    } else {
      getRoles(roles, setRoles);
    }
  }, []);

  useEffect(() => {
    if (rol.data != null) {
      getPermisos(permisos, setPermisos);
    }
  }, [rol.data]);

  return (
    <Container linkBack={'/administrador/roles-permisos'} titulo={'Administración de Permisos de Roles'}>
      {roles.loading && (
        <div className='d-flex justify-content-center mt-3'>
          <div className='spinner-border text-primary' role='status' />
        </div>
      )}
      {roles.data && (
        <SelectSearch
          key={'roles'}
          isMulti={true}
          label={'Listado de Roles'}
          noData={() => {
            return 'No hay mas Roles';
          }}
          options={roles.data}
          placeholder={'Seleccione un Rol'}
          value={rol.rol}
          onChange={(e) => {
            let obj = e;

            setRol({ ...rol, rol: obj });
            setPermisos({ ...permisos, data: null });
          }}
        />
      )}
      {rol.rol.length > 0 && (
        <button
          className='btn btn-primary'
          disabled={rol.loading}
          onClick={() => buscarRol(rol, setRol, permisos, setPermisos)}>
          Ver Permisos del Rol Seleccionado
        </button>
      )}
      {(permisos.loading || rol.loading) && (
        <div className='d-flex justify-content-center mt-3'>
          <div className='spinner-border text-primary' role='status' />
        </div>
      )}
      {rol.data && rol.rol.length > 0 && permisos.data && (
        <div className='mt-3'>
          <Table
            data={dataTablePermisos(permisos.data, rol.permisos_rol, actions, rol, setRol)}
            height={500}
            render={() => (
              <div className='d-flex justify-content-end w-100'>
                {actions.hasPermission('admin.role-permission.asign') && (
                  <button
                    className='btn btn-primary my-auto mx-3'
                    disabled={guardar.loading}
                    type='button'
                    onClick={() => {
                      guardarPermisos(guardar, setGuardar, rol);
                    }}>
                    Sincronizar Permisos de Rol
                  </button>
                )}
              </div>
            )}
          />
        </div>
      )}
    </Container>
  );
}
