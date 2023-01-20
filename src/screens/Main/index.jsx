import { useContext, useEffect } from 'react';

import { HashRouter, Routes as Switch, Route, Link } from 'react-router-dom';

import { Layout, Uno, Dos } from '../';

import { UserContext } from '../../context';
import { setSession, viewSession } from '../../utils/sessionStorage';
import { handlerGetUserData, showSpinner } from './handlers';

setSession()

const Main = () => {
    const { actions, loading } = useContext(UserContext);

    viewSession();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(handlerGetUserData(actions), []);

    showSpinner(loading);

    const RenderLinks = () => {
        return (
            <div className="d-fles">
                <Link to="/" className="btn btn-primary me-2">
                    Home
                </Link>
                <Link to="/uno" className="btn btn-primary me-2">
                    uno
                </Link>
                <Link to="/uno/cuatro" className="btn btn-primary me-2">
                    uno
                </Link>
                <Link to="/dos" className="btn btn-primary me-2">
                    DOS
                </Link>
            </div>
        );
    };

    return (
        <HashRouter>
            <Layout renderProp={() => <RenderLinks />}>
                <Switch>
                    <Route path="/" element={'asdasd'} />
                    <Route path="/uno" element={<Uno />} />
                    <Route path="/uno/cuatro" element={<Uno />} />
                    <Route path="/dos" element={<Dos />} />
                </Switch>
            </Layout>
        </HashRouter>
    );
};

export default Main;
