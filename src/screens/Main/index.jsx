import { useEffect, useState } from 'react';

import { Layout } from '../';

import { viewAllConfig } from '../../config';
import { menuState } from '../../config/initialState';
import { handlerGetUserData } from './handlers';

const Main = () => {
    const [state, setState] = useState(menuState);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(handlerGetUserData(state, setState), []);

    /* VEMOS LA CONFIG; */
    viewAllConfig();

    return (
        <Layout state={state} setState={setState}>
            Cargamos los componentes de los screen, aca se realiza el routing basado en estados
        </Layout>
    );
};

export default Main;
