import { useState, useEffect, useContext } from "react"
import { UserContext } from "./../../../context";
import { useNavigate, Link } from "react-router-dom";
import { getUsers, dataTableUsuarios } from "./handlers";
import { Table, Modal } from '../../../components'
import { NavigateBeforeOutlined } from '@mui/icons-material';

export default function Usuarios(){
    const { actions } = useContext(UserContext);
    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState({
        data: null, error: null, loading: false
    })

    useEffect(() => {
        if (!(actions.hasPermission('admin.users.view') && actions.isAdmin())) {
            if (actions.hasRole('admin')) {
                navigate('/administrador/roles-permisos')
            } else {
                navigate('/');
            }
        }else{
            getUsers(usuarios, setUsuarios);
        }
    }, [])

    return (
        <section className="col-12 col-md-12 col-xl-12 mx-auto mb-5">
            <div className="container_menu p-3 rounded">
                <div className="bg-white p-3 rounded">
                    <div className="d-flex ">
                        <Link to="/">
                            <button className="btn btn-primary btn-sm" size="sm">
                                <NavigateBeforeOutlined /> Volver
                            </button>
                        </Link>
                    </div>
                    <hr className="m-0 mt-3" />
                    <h3 className="col-12 text-center p-3 m-0 fs-4">Usuarios que utilizaron la app</h3>
                    {usuarios.loading && <div className='d-flex justify-content-center'>
                        <div className='spinner-border text-primary' role='status'>
                        </div>
                    </div>}
                    {usuarios.data && 
                    <Table data={dataTableUsuarios(usuarios.data)}>

                    </Table>
                    }
                </div>
            </div>
        </section>
    )
}