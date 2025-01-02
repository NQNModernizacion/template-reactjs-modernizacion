import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { toastOptions } from '../../../config/toast';
import { axios } from '../../../utils/axios';

export const getRoles = async (roles, setRoles) => {
  setRoles({ ...roles, loading: true });
  const response = await axios().get('/roles');

  if (!isAxiosError(response)) {
    const { data, error } = response.data;

    if (data && !error) {
      toast.success('Roles cargados', toastOptions);
      let listado = data.map((item) => {
        let obj = item;

        obj.label = item.name;

        return obj;
      });

      setRoles({ ...roles, loading: false, data: listado });
    }

    if (!data && error) {
      setRoles({ ...roles, loading: false, error: error });
      toast.error(error, toastOptions);
    }
  } else {
    setRoles({ ...roles, loading: false, error: 'Hubo un error durante la consulta' });
  }
};

export const buscarRol = async (rol, setRol, permisos, setPermisos) => {
  setPermisos({ ...permisos, data: null });
  setRol({ ...rol, loading: true });
  const response = await axios().get('/roles/' + rol.rol[0].id);

  if (!isAxiosError(response)) {
    const { data, error } = response.data;

    if (data && !error) {
      toast.success('Rol encontrado', toastOptions);
      let list = data.permissions.map((item) => {
        return item.id;
      });

      setRol({ ...rol, loading: false, data: data, permisos_rol: list });
    }

    if (!data && error) {
      setRol({ ...rol, loading: false, error: error });
      toast.error(error, toastOptions);
    }
  } else {
    setRol({ ...rol, loading: false, error: 'Hubo un error durante la consulta' });
  }
};

export const getPermisos = async (permisos, setPermisos) => {
  setPermisos({ ...permisos, loading: true, data: null });
  const response = await axios().get('/permisos');

  if (!isAxiosError(response)) {
    const { data, error } = response.data;

    if (data && !error) {
      setPermisos({ ...permisos, loading: false, data: data });
      toast.success('Permisos cargados', toastOptions);
    }

    if (!data && error) {
      setPermisos({ ...permisos, loading: false, error: error });
      toast.error(error, toastOptions);
    }
  } else {
    setPermisos({ ...permisos, loading: false, error: 'Hubo un error durante la consulta' });
  }
};

const tiene_permiso = (nombre, permisosRol) => {
  let tiene = false;

  permisosRol.map((item) => {
    if (item == nombre) {
      tiene = true;
    }
  });

  return tiene;
};

const asignarPermiso = (e, rol, setRol) => {
  if (e.target.checked) {
    let lista = rol.permisos_rol;

    lista.push(parseInt(e.target.value));
    setRol({ ...rol, permisos_rol: lista });
  } else {
    let list = rol.permisos_rol;
    let lista = list.filter((item) => {
      if (item != e.target.value) {
        return item;
      }
    });

    setRol({ ...rol, permisos_rol: lista });
  }
};

export const dataTablePermisos = (data, permisosRol, actions, rol, setRol) => {
  const columns = [
    { field: 'id', headerName: 'Identificador', width: 10, flex: 0.5, hide: true },
    {
      field: 'accion',
      headerName: 'Acción',
      width: 50,
      flex: 0.2,
      sorteable: false,
      hide: !actions.hasPermission('role-permission.asign'),
      renderCell: (p) => {
        return (
          <div className='d-flex justify-content-evenly w-100'>
            <input
              key={p.id}
              defaultChecked={tiene_permiso(p.row.id, rol.permisos_rol)}
              id={p.row.id}
              type='checkbox'
              value={p.row.id}
              onChange={(e) => {
                asignarPermiso(e, rol, setRol);
              }}
            />
          </div>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Nombre',
      width: 60,
      flex: 1,
      sorteable: true,
    },
    {
      field: 'description',
      headerName: 'Descripción',
      width: 150,
      flex: 1.3,
      sorteable: true,
    },
  ];

  const rows = data.map((d) => {
    return {
      id: d.id,
      name: d.name,
      description: d.description,
    };
  });

  const filter = (d, value) => {
    value = value.toLowerCase();

    return (
      d.id?.toString().toLowerCase().includes(value) ||
      d.name?.toLowerCase().includes(value) ||
      d.descripcion?.toLowerCase().includes(value)
    );
  };

  return { columns, rows, filter };
};

export const guardarPermisos = async (guardar, setGuardar, rol) => {
  setGuardar({ ...guardar, loading: true });
  const response = await axios().post('/guardarPermisosRol', {
    permisos_id: rol.permisos_rol,
    rol_id: rol.data.id,
  });

  if (!isAxiosError(response)) {
    const { data, error } = response.data;

    if (data && !error) {
      setGuardar({ ...guardar, loading: false, data: data });
      toast.success('Permisos sincronizados', toastOptions);
    }

    if (!data && error) {
      setGuardar({ ...guardar, loading: false, error: error });
      toast.error(error, toastOptions);
    }
  } else {
    setGuardar({ ...guardar, loading: false, error: 'Hubo un error durante la consulta' });
  }
};
