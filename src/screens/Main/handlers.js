import axios, { validateStatus } from '../../utils/axios';

export const handlerGetUserData = (actions) => async () => {
    let response = await axios.get('api/get_usuario', { validateStatus: validateStatus });
    const { data, error } = response.data

    if (data) {
        actions.setUser(data)
    }

    if (error) {
        actions.setError(error)
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
