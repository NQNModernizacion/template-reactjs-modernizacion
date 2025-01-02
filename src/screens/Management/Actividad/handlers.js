import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { toastOptions } from '../../../config/toast';
import { axios } from '../../../utils/axios';

export const getActivity = async (actividad, setActividad) => {
  setActividad({ ...actividad, loading: true });
  const response = await axios().get('/actividad');

  if (!isAxiosError(response)) {
    const { data, error } = response.data;

    if (data && !error) {
      setActividad({ ...actividad, loading: false, data: data });
      toast.success('Actividad cargada', toastOptions);
    }

    if (!data && error) {
      setActividad({ ...actividad, loading: false, error: error });
      toast.error(error, toastOptions);
    }
  } else {
    setActividad({ ...actividad, loading: false, error: 'Hubo un error durante la consulta' });
  }
};

export const dataTable = (data, setOpen, setData) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 50, flex: 0.5, hide: true },
    {
      field: 'log_name',
      headerName: 'Nombre',
      width: 50,
      flex: 0.5,
      sorteable: true,
      hide: true,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      width: 80,
      flex: 0.8,
      sorteable: true,
    },
    {
      field: 'objetivo',
      headerName: 'Modelo objetivo',
      width: 50,
      flex: 0.5,
      sorteable: true,
    },
    {
      field: 'objetivo_id',
      headerName: 'Id objetivo',
      width: 30,
      flex: 0.3,
      sorteable: true,
    },
    {
      field: 'evento',
      headerName: 'Evento',
      width: 40,
      flex: 0.3,
      sorteable: true,
    },
    {
      field: 'causante',
      headerName: 'Modelo Causante',
      width: 50,
      flex: 0.5,
      sorteable: true,
    },
    {
      field: 'causante_id',
      headerName: 'Id causante',
      width: 30,
      flex: 0.3,
      sorteable: true,
    },
    {
      field: 'propiedades',
      headerName: 'Propiedades',
      width: 50,
      flex: 0.5,
      sorteable: true,
      renderCell: (p) => {
        return (
          <button
            className='btn btn-sm btn-primary'
            type='button'
            onClick={() => {
              setOpen(true);
              setData(p.row.propiedades);
            }}>
            Ver cambios
          </button>
        );
      },
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      width: 50,
      flex: 0.5,
      sorteable: true,
      renderCell: (p) => {
        const date = new Date(p.row.fecha);

        return <p className='mb-0'>{date.toLocaleString()}</p>;
      },
    },
  ];

  const rows = data.map((d) => {
    return {
      id: d.id,
      name: d.log_name,
      descripcion: d.description,
      objetivo: d.subject_type,
      evento: d.event,
      objetivo_id: d.subject_id,
      causante: d.causer_type,
      causante_id: d.causer_id,
      propiedades: d.properties,
      fecha: d.created_at,
    };
  });

  const filter = (d, value) => {
    value = value.toLowerCase();

    return (
      d.name?.toLowerCase().includes(value) ||
      d.descripcion?.toLowerCase().includes(value) ||
      d.objetivo?.toLowerCase().includes(value) ||
      d.objetivo_id?.toString().toLowerCase().includes(value) ||
      d.evento?.toLowerCase().includes(value) ||
      d.causante?.toLowerCase().includes(value) ||
      d.causante_id?.toString().toLowerCase().includes(value)
    );
  };

  return { columns, rows, filter };
};
