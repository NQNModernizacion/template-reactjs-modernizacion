import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { toastOptions } from '../../../config/toast';
import { axios } from '../../utils/axios';

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

export const getPermisos = async (permisos, setPermisos) => {
  setPermisos({ ...permisos, loading: true });
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
