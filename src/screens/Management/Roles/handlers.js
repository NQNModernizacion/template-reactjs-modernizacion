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
      setRoles({ ...roles, loading: false, data: data });
      toast.success('Roles cargados', toastOptions);
    }

    if (!data && error) {
      setRoles({ ...roles, loading: false, error: error });
      toast.error(error, toastOptions);
    }
  } else {
    setRoles({ ...roles, loading: false, error: 'Hubo un error durante la consulta' });
  }
};

export const dataTableRoles = (data, setRol, setOpenAsignar, setOpenDesasignar) => {
  const columns = [
    { field: 'id', headerName: 'Identificador', width: 50, flex: 0.5 },
    {
      field: 'name',
      headerName: 'Nombre',
      width: 50,
      flex: 0.5,
      sorteable: true,
    },
    {
      field: 'accion',
      headerName: 'Acción',
      minWidth: 90,
      flex: 1.3,
      sorteable: false,
      renderCell: (p) => {
        return (
          <div className='d-flex justify-content-evenly w-100'>
            <button
              className='btn btn-sm btn-success'
              onClick={() => {
                setRol(p.value);
                setOpenAsignar(true);
              }}>
              Asignar
            </button>
            <button
              className='btn btn-sm btn-danger'
              onClick={() => {
                setRol(p.value);
                setOpenDesasignar(true);
              }}>
              Desasignar
            </button>
          </div>
        );
      },
    },
  ];

  const rows = data.map((d) => {
    return {
      id: d.id,
      name: d.name,
      accion: d.id,
    };
  });

  const filter = (d, value) => {
    value = value.toLowerCase();

    return d.id?.toString().toLowerCase().includes(value) || d.name?.toLowerCase().includes(value);
  };

  return { columns, rows, filter };
};

export const consultar_persona = async (persona, setPersona, setListado, listado) => {
  setListado({ ...listado, roles_asign: [], roles_no_asign: [], roles_select: [] });
  setPersona({ ...persona, loading: true, data: null });
  const response = await axios().post('/buscar_persona', { data: persona.values.data });

  if (!isAxiosError(response)) {
    const { data, error } = response.data;

    if (data && !error) {
      setPersona({ ...persona, loading: false, data: data });
    }

    if (!data && error) {
      setPersona({ ...persona, loading: false, error: error });
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

export const ver_role_en_persona = (rol, persona) => {
  let posee_rol = false;

  persona.data.roles.filter((item) => {
    if (rol.id === item.id) {
      posee_rol = true;
    }
  });

  return posee_rol;
};

export const roles_string = (roles) => {
  let string = '';
  let rol = [];

  roles.filter((item) => {
    rol.push(item.name);
  });
  string = rol.join(', ');

  return string;
};

const ver_role_en_select = (rol, listado) => {
  let posee_rol = false;

  listado.roles_select.filter((item) => {
    if (rol.id === item.id) {
      posee_rol = true;
    }
  });

  return posee_rol;
};

export const asignarRol = (listado, setListado, persona, setPersona, guardarRol, setGuardarRol) => {
  //meter los nuevos roles en el roles_asign
  /* let roles_asign = listado.roles_asign;
  listado.roles_select.filter(item => {
      roles_asign.push(item);
  })
  //sacar roles de roles_no_asign 
  let roles_no_asign = listado.roles_no_asign;
  let roles_no_asign_limpio = [];
  roles_no_asign_limpio = roles_no_asign.filter(item => {
      if (!ver_role_en_select(item, listado)) {
          return item;
      }
  }) */
  //setListado({ ...listado, roles_select: [], roles_asign: roles_asign, roles_no_asign: roles_no_asign_limpio });
  setRole(guardarRol, setGuardarRol, persona, listado.roles_select_asign, setPersona, listado, setListado);
};

export const setRole = async (guardarRol, setGuardarRol, persona, roles, setPersona, listado, setListado) => {
  setGuardarRol({ ...guardarRol, loading: true });
  let body = {
    user_id: persona.data.user.usuarioID,
    roles_id: roles.map((item) => {
      return item.id;
    }),
  };
  const response = await axios().post('/asignarRoles/', body);

  if (!isAxiosError(response)) {
    const { data, error } = response.data;

    if (data && !error) {
      consultar_persona(persona, setPersona, setListado, listado);
      setGuardarRol({ ...guardarRol, loading: false, data: data });
      toast.success('Rol guardado', toastOptions);
    }

    if (!data && error) {
      setGuardarRol({ ...guardarRol, loading: false, error: error });
      toast.error(error, toastOptions);
    }
  } else {
    setGuardarRol({ ...guardarRol, loading: false, error: 'Hubo un error durante la consulta' });
  }
};

export const desasignarRol = (listado, setListado, persona, setPersona, guardarRol, setGuardarRol) => {
  //meter los nuevos roles en el roles_asign
  /* let roles_asign = listado.roles_asign;
  listado.roles_select.filter(item => {
      roles_asign.push(item);
  })
  //sacar roles de roles_no_asign 
  let roles_no_asign = listado.roles_no_asign;
  let roles_no_asign_limpio = [];
  roles_no_asign_limpio = roles_no_asign.filter(item => {
      if (!ver_role_en_select(item, listado)) {
          return item;
      }
  }) */
  //setListado({ ...listado, roles_select: [], roles_asign: roles_asign, roles_no_asign: roles_no_asign_limpio });
  quitarRole(guardarRol, setGuardarRol, persona, listado.roles_select_no_asign, setPersona, listado, setListado);
};

export const quitarRole = async (guardarRol, setGuardarRol, persona, roles, setPersona, listado, setListado) => {
  setGuardarRol({ ...guardarRol, loading: true });
  let body = {
    user_id: persona.data.user.usuarioID,
    roles_id: roles.map((item) => {
      return item.id;
    }),
  };
  const response = await axios().post('/desasignarRoles/', body);

  if (!isAxiosError(response)) {
    const { data, error } = response.data;

    if (data && !error) {
      consultar_persona(persona, setPersona, setListado, listado);
      setGuardarRol({ ...guardarRol, loading: false, data: data });
      toast.success('Roles desasignados', toastOptions);
    }

    if (!data && error) {
      setGuardarRol({ ...guardarRol, loading: false, error: error });
      toast.error(error, toastOptions);
    }
  } else {
    setGuardarRol({ ...guardarRol, loading: false, error: 'Hubo un error durante la consulta' });
  }
};
