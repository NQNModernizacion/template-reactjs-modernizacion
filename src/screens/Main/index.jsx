import { useContext, useEffect, useState } from 'react';

import { Layout, Uno, Dos } from '../';

import { UserContext } from '../../context';
import { handlerGetUserData, showSpinner } from './handlers';

const Main = () => {
    const { actions, loading } = useContext(UserContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(handlerGetUserData(actions), []);

    showSpinner(loading);

    /* TODO LO SIGUENTE ES DE MODO DE EJEMPLO - SE DEBE BORRAR */
    const [state, setState] = useState('main');
    /* FIN DE MODO DE EJEMPLO - SE DEBE BORRAR */

    return (
        <Layout>
            {/* TODO LO SIGUENTE ES DE MODO DE EJEMPLO - SE DEBE BORRAR */}
            <div className="d-flex">
                <button className="btn btn-primary me-2" onClick={() => setState('uno')}>
                    UNO
                </button>
                <button className="btn btn-primary me-2" onClick={() => setState('dos')}>
                    DOS
                </button>
                <button className="btn btn-primary me-2" onClick={() => setState('main')}>
                    VOLVER
                </button>
            </div>

            {state === 'uno' && <Uno />}
            {state === 'dos' && <Dos />}
            {/* FIN DE MODO DE EJEMPLO - SE DEBE BORRAR */}
        </Layout>
    );
};

export default Main;
