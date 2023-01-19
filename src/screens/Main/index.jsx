import { isCancel } from 'axios';
import { useRef } from 'react';
import { useContext, useEffect, useState } from 'react';

import { Layout } from '../';

import { UserContext } from '../../context';
import { handlerAxios } from '../../utils';
import { handlerGetUserData, showSpinner } from './handlers';

const Main = () => {
    const { actions, loading } = useContext(UserContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(handlerGetUserData(actions), []);

    showSpinner(loading);

    /* TODO LO SIGUENTE ES DE MODO DE EJEMPLO - SE DEBE BORRAR */
    const [state, setState] = useState('main');
    const getData = async (signal, state, setState) => {
        setState({
            ...state,
            loading: true,
        });
        const response = await handlerAxios('/ideaspropuestas?action=getAllContents', signal);

        let stateTemp;

        if (isCancel(response)) {
            stateTemp = {
                ...state,
                loading: false,
                error: 'cancelado',
            };
        } else if (response.data.data) {
            stateTemp = {
                ...state,
                data: response.data.data,
                loading: false,
            };
        } else if (response.data.error) {
            stateTemp = {
                ...state,
                error: response.data.error,
                loading: false,
            };
        }

        setState(stateTemp);
    };

    const setData = async (signal, state, setState) => {
        setState({
            ...state,
            loading: true,
        });
        const response = await handlerAxios(
            '/ideaspropuestas?action=getAllContents',
            signal,
            'POST',
            { content: 'asdad', action: 'saveContent' }
        );

        let stateTemp;

        if (isCancel(response)) {
            stateTemp = {
                ...state,
                loading: false,
                error: 'cancelado',
            };
        } else if (response.data.data) {
            stateTemp = {
                ...state,
                data: response.data.data,
                loading: false,
            };
        } else if (response.data.error) {
            stateTemp = {
                ...state,
                error: response.data.error,
                loading: false,
            };
        }

        setState(stateTemp);
    };

    const Uno = () => {
        const [state, setState] = useState({
            loading: false,
            data: null,
        });

        const { current } = useRef(new AbortController());

        useEffect(() => {
            getData(current.signal, state, setState);
            return () => current.abort();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <div>
                'UNO'
                <br />
                {state.loading && 'Loading'}
                <br />
                <button onClick={() => current.abort()}> Cancelar</button>
                <br />
                error: {state.error}
            </div>
        );
    };

    const Dos = () => {
        const [state, setState] = useState({
            loading: false,
            data: null,
        });

        const { current } = useRef(new AbortController());

        useEffect(() => {
            setData(current.signal, state, setState);
            return () => current.abort();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <div>
                'DOS'
                <br />
                {state.loading && 'Loading'}
                <br />
                <button onClick={() => current.abort()}> Cancelar</button>
                <br />
                error: {state.error}
            </div>
        );
    };
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
