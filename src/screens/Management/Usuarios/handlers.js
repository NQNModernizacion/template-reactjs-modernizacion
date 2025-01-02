import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { toastOptions } from '../../../config/toast';
import { axios } from '../../../utils/axios';

export const getUsers = async (usuarios, setUsuarios) => {
  setUsuarios({ ...usuarios, loading: true });
  const response = await axios().get('/usersList');

  if (!isAxiosError(response)) {
    const { data, error } = response.data;

    if (data && !error) {
      setUsuarios({ ...usuarios, loading: false, data: data });
      toast.success('Usuarios cargados', toastOptions);
    }

    if (!data && error) {
      setUsuarios({ ...usuarios, loading: false, error: error });
      toast.error(error, toastOptions);
    }
  } else {
    setUsuarios({ ...usuarios, loading: false, error: 'Hubo un error durante la consulta' });
  }
};

export const dataTableUsuarios = (data) => {
  const columns = [{ field: 'id', headerName: 'ID', width: 10, flex: 0.5, sorteabled: true }];

  const rows = data.map((d) => {
    return {
      id: d.id,
    };
  });

  const filter = (d, value) => {
    value = value.toLowerCase();

    return d.id?.toString().toLowerCase().includes(value);
  };

  return { columns, rows, filter };
};
