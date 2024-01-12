import Container from "../../components/Container"
import { useEffect, useContext } from "react"
import { UserContext } from "../../context";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { toastOptions } from '../../config/toast';

export default function Admin(){
    const { actions } = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(()=>{
        if(!actions.hasRole('admin')){
            navigate('/')
            toast.error('No posee permisos para ingresar a esa sección', toastOptions);
        }
    }, [])

    return (
        <Container linkBack={'/'} titulo={'Panel de Administración de Roles y Permisos'}>
            <div className="w-100 d-flex justify-content-center gap-4">
            {actions.hasPermission('role.view') && <Link className="btn btn-primary" to="/administrador/roles-permisos/roles">Roles-Usuario</Link>}
            {actions.hasPermission('permission.view') && <Link className="btn btn-primary" to="/administrador/roles-permisos/permisos">Permisos-Usuario</Link>}
            </div>
        </Container>
    )
}