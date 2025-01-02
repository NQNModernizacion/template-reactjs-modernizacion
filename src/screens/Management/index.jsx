import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from '../../components';
import { toastOptions } from '../../config/toast';
import { UserContext } from '../../context';

export default function Management() {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!actions.isAdmin()) {
      navigate('/');
      toast.error('No posee permisos para ingresar a esa sección', toastOptions);
    }
  }, []);

  return (
    <Container linkBack={'/'} titulo={'Panel de Administración de Roles y Permisos'}>
      <div className='w-100 d-flex flex-wrap justify-content-center gap-4'>
        {actions.hasPermission('admin.role.view') && (
          <Link className='btn btn-primary' to='/administrador/roles-permisos/roles'>
            Roles-Usuario
          </Link>
        )}
        {actions.hasPermission('admin.permission.view') && (
          <Link className='btn btn-primary' to='/administrador/roles-permisos/permisos'>
            Permisos-Usuario
          </Link>
        )}
        {actions.hasPermission('admin.role-permission.view') && (
          <Link className='btn btn-primary' to='/administrador/roles-permisos/role-permisos'>
            Roles-Permisos
          </Link>
        )}
        {actions.hasPermission('admin.activity.log') && (
          <Link className='btn btn-primary' to='/administrador/activity-log'>
            Activity Log
          </Link>
        )}
        {actions.hasPermission('admin.users.view') && (
          <Link className='btn btn-primary' to='/administrador/roles-permisos/usuarios'>
            Usuarios
          </Link>
        )}
      </div>
    </Container>
  );
}
