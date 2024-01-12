import { useContext, useEffect } from 'react';

import { HashRouter, Routes, Route, Link } from 'react-router-dom';

import { Layout } from '../';

import { UserContext } from '../../context/UserWrapper';
import { initApp, showSpinner } from './handlers';
import Login from '../Login';
import Admin from '../Admin';
import Roles from '../Admin/Roles';
import Permisos from '../Admin/Permisos';
import RolesPermisos from '../Admin/RolesPermisos';


const Main = () => {
    const { actions, loading } = useContext(UserContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => initApp(actions), []);

    showSpinner(loading);

    return (
        <HashRouter>
            <Routes>
                <Route element={<Layout perfil={actions.getPerfil()} />}>
                    <Route path="/" element={<div><Link to="/administrador/roles-permisos">Panel</Link></div>} />
                    <Route path="/administrador/roles-permisos" element={<Admin/>} />
                    <Route path="/administrador/roles-permisos/roles" element={<Roles/>}/>
                    <Route path="/administrador/roles-permisos/permisos" element={<Permisos/>}/>
                    <Route path="/administrador/roles-permisos/role-permisos" element={<RolesPermisos/>}/>
                    <Route path="*" element={'404 - HAY QUE DEFINIR'} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </HashRouter>
    );
};

export default Main;
