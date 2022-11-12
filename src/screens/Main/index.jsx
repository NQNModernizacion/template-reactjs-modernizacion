import { useEffect, useState } from 'react';

import { Layout } from '../';

const Main = () => {
    const [state, setState] = useState({});

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => {}, []);

    return (
        <Layout state={state} setState={setState}>
            Cargamos los componentes de los screen, aca se realiza el routing basado en estados
        </Layout>
    );
};

export default Main;
