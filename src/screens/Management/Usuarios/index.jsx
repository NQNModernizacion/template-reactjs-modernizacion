import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table } from '../../../components';
import { UserContext } from './../../../context';
import { dataTableUsuarios, getUsers } from './handlers';

export default function Usuarios() {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    if (!(actions.hasPermission('admin.users.view') && actions.isAdmin())) {
      if (actions.hasRole('admin')) {
        navigate('/administrador/roles-permisos');
      } else {
        navigate('/');
      }
    } else {
      getUsers(usuarios, setUsuarios);
    }
  }, []);

  return (
    <Container linkBack={'/administrador/roles-permisos'} titulo={'Usuarios que utilizaron la app'}>
      {usuarios.loading && (
        <div className='d-flex justify-content-center'>
          <div className='spinner-border text-primary' role='status' />
        </div>
      )}
      {usuarios.data && <Table data={dataTableUsuarios(usuarios.data)} height={500} />}
    </Container>
  );
}
