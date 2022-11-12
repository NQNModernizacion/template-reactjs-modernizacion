import { APP_ID, URL_GET_TOKEN } from '../../config';
import { getParams } from '../../utils';

const handlerGetUserData = (state, setState) => async () => {
    /* Obtenemos los datos del usuario de webLogin */
    const sessionKey = getParams().SESSIONKEY;
    const res = await fetch(URL_GET_TOKEN + sessionKey);
    const datosUsuario = await res.json();

    console.log(datosUsuario);

    if (datosUsuario.error === null) {
        /* Buscamos la aplicacion dentro del arreglo del usuario*/
        const app = datosUsuario.apps.find(({ id }) => id === APP_ID);

        /* Guardamos la referencia ID del usuario en los datos personales */
        datosUsuario.datosPersonales.userId = datosUsuario.referenciaID;

        setState({
            ...state,
            role: getArrayRoles(app.userProfiles),
            datosPersonales: datosUsuario.datosPersonales,
            loading: false,
        });
    } else {
        setState({
            ...state,
            datosPersonales: 'error',
            loading: false,
        });
    }
};

const getArrayRoles = (userProfiles) => {
    if (!userProfiles) return 'user'

    return userProfiles.split(',').map((id) => {
        switch (id) {
            case '1':
                return 'PERMISO_1'

            default:
                return 'user'
        }
    })
}

const handlerBackToMenu = (state, setState) => {
    setState({
        ...state,
        view: {
            menu: null,
        },
    });
}

export { handlerGetUserData, handlerBackToMenu };
