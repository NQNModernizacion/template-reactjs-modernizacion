import { useContext, useEffect } from 'react';

import { Layout } from '../';

import { viewAllConfig } from '../../config';
import { UserContext } from '../../context';
import { handlerGetUserData, showSpinner } from './handlers';

const Main = () => {
    const { actions, loading } = useContext(UserContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(handlerGetUserData(actions), []);

    /* VEMOS LA CONFIG; */
    viewAllConfig();

    showSpinner(loading);

    return (
        <Layout>
            Cargamos los componentes de los screen, aca se realiza el routing basado en estados
        </Layout>
    );
};

export default Main;
