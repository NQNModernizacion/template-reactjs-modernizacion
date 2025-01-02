import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { toastOptions } from '../../../config/toast';
import { axios } from '../../../utils/axios';

export const getPermisos = async (permisos, setPermisos, listado, setListado, perms) => {
  setPermisos({ ...permisos, loading: true, data: null });
  const response = await axios().get('/permisos');

  if (!isAxiosError(response)) {
    const { data, error } = response.data;

    if (data && !error) {
      setPermisos({ ...permisos, loading: false, data: data });
      toast.success('Permisos cargados', toastOptions);
      /* let lista = perms.map(item=>{
              return item.id
            }) */
      setListado({ ...listado, permisos: data, permisos_select: perms });
    }

    if (!data && error) {
      setPermisos({ ...permisos, loading: false, error: error });
      toast.error(error, toastOptions);
    }
  } else {
    setPermisos({ ...permisos, loading: false, error: 'Hubo un error durante la consulta' });
  }
};

export const consultar_persona = async (e, persona, setPersona, setListado, listado, setPermisos, permisos) => {
  e.preventDefault();
  setListado({ ...listado, permisos_asign: [], permisos_no_asign: [], permisos_select: [] });
  setPersona({ ...persona, loading: true, data: null });
  const response = await axios().post('/buscar_persona', { data: persona.values.data });

  if (!isAxiosError(response)) {
    const { data, error } = response.data;

    if (data && !error) {
      setPersona({ ...persona, loading: false, data: data });
      let listado = data.permisos.map((item) => item.id);

      getPermisos(permisos, setPermisos, listado, setListado, listado);
    }

    if (!data && error) {
      setPersona({ ...persona, data: null, loading: false, error: error });
      if (error.general) {
        toast.error(error.general, toastOptions);
      } else {
        toast.error(error, toastOptions);
      }
    }
  } else {
    setPersona({ ...persona, loading: false, error: 'Hubo un error durante la consulta' });
  }
};

const seleccionar = (e, listado, setListado) => {
  if (e.target.checked) {
    let list = listado.permisos_select;

    list.push(parseInt(e.target.value));
    setListado({ ...listado, permisos_select: list });
  } else {
    let list = listado.permisos_select;
    let lista = list.filter((item) => {
      if (item != e.target.value) {
        return item;
      }
    });

    setListado({ ...listado, permisos_select: lista });
  }
};

const tiene_permiso = (nombre, persona, listado, setListado) => {
  let tiene = false;

  persona.data.permisos.map((item) => {
    if (item.name === nombre) {
      tiene = true;
    }
  });

  return tiene;
};

export const dataTablePermisos = (data, listado, setListado, persona, actions) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 10, flex: 0.5, hide: true },
    {
      field: 'accion',
      headerName: 'Acción',
      width: 50,
      flex: 0.2,
      sorteable: false,
      hide: !actions.hasPermission('admin.permission.asign'),
      renderCell: (p) => {
        return (
          <div className='d-flex justify-content-evenly w-100'>
            <input
              key={p.id}
              defaultChecked={tiene_permiso(p.row.name, persona, listado, setListado)}
              id={p.row.id}
              type='checkbox'
              value={p.row.id}
              onChange={(e) => {
                seleccionar(e, listado, setListado);
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

export const GuardarPermisos = async (
  persona,
  guardarPermisos,
  setGuardarPermisos,
  permisosSelect,
  permisos,
  setPermisos,
  listado,
  setListado
) => {
  setGuardarPermisos({ ...guardarPermisos, loading: true });
  const response = await axios().post('/sincronizarPermisos', {
    user_id: persona.data.user.usuarioID,
    permisos_id: permisosSelect,
  });

  if (!isAxiosError(response)) {
    const { data, error } = response.data;

    if (data && !error) {
      setGuardarPermisos({ ...guardarPermisos, loading: false, data: data });
      toast.success('Permisos actualizados', toastOptions);
    }

    if (!data && error) {
      setGuardarPermisos({ ...guardarPermisos, loading: false, error: error });
      toast.error(error, toastOptions);
    }
  } else {
    setGuardarPermisos({ ...guardarPermisos, loading: false, error: 'Hubo un error durante la consulta' });
  }
};
