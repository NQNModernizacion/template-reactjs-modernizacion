import { useContext, useEffect } from 'react';

import { HashRouter, Routes, Route } from 'react-router-dom';

import { Layout } from '../';

import { UserContext } from '../../context/UserWrapper';
import { initApp, showSpinner } from './handlers';
import Login from '../Login';

const Main = () => {
    const { actions, loading } = useContext(UserContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => initApp(actions), []);

    showSpinner(loading);

    return (
        <HashRouter>
            <Routes>
                <Route element={<Layout perfil={actions.getPerfil()} />}>
                    <Route path="/" element={'Prueba'} />

                    <Route path="*" element={'404 - HAY QUE DEFINIR'} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </HashRouter>
    );
};

export default Main;
