import { isCancel } from 'axios';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { axios } from '../../utils/api';

const getData = async (signal, state, setState) => {
    setState({
        ...state,
        loading: true,
    });
    const response = await axios('/ideaspropuestas?action=getAllContents', signal);

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

const effect = (current, state, setState) => () => {
    getData(current.signal, state, setState);
    return () => current.abort();
};

const Uno = () => {
    const [state, setState] = useState({
        loading: false,
        data: null,
    });

    const { current } = useRef(new AbortController());

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect(current, state, setState), []);

    return (
        <div>
            UNO
            <br />
            {state.loading && 'Loading'}
            <br />
            <button onClick={() => current.abort()}> Cancelar</button>
            <br />
            error: {state.error}
        </div>
    );
};

export default Uno;
