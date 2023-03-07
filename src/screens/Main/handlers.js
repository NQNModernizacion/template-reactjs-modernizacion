import { APP_ID, URL_GET_TOKEN } from '../../config';
import { getParams } from '../../utils/common';
import { getSessionKey, isTimeInvalid } from '../../utils/sessionStorage';

export const handlerGetUserData = (actions) => async () => {

    const token = getParams().token

    if (!isTimeInvalid()) {
        /* Obtenemos los datos del usuario de webLogin */
        const res = await fetch(URL_GET_TOKEN + getSessionKey());
        const datosUsuario = await res.json();

        if (datosUsuario.error === null) {
            /* Buscamos la aplicacion dentro del arreglo del usuario */
            const app = datosUsuario.apps.find(({ id }) => id === APP_ID);

            actions.setUser({
                datosUsuario,
                role: app && getArrayRoles(app.userProfiles),
                app
            });
        } else {
            actions.setError('Hubo un error al obtener los datos del usuario, vuelva a intentarlo mas tarde')
        }
    } else {
        console.log('Caduco la sesion');
    }
};

/** Definimos el rol del usuario en funcion del perfil en wapUsuariosPerfiles */
export const getArrayRoles = (userProfiles) => {
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

export const handlerBackToMenu = (state, setState) => {
    setState({
        ...state,
        view: {
            menu: null,
        },
    });
}

/** Enviamos un bool para mostrar el spinner principal */
export const showSpinner = (loading) => {
    if (loading) {
        window.cargarSpinner();
        return null;
    } else {
        window.eliminarSpinner();
    }
}
