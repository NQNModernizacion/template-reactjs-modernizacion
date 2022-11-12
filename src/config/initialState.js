import { getNotasState } from "../utils";

const menuState = {
    /** Control de las vitas */
    view: {
        menu: null,
    },

    /** Rol del usuario */
    role: [],

    /** Datos personales de la persona que ingresa al sistema */
    datosPersonales: null,

    /** Carga general del sistema */
    loading: true,
};

const adminState = () => (
    {
        /* carga general del modulo */
        loading: false,

        solicitudes: {
            loading: false,
            screen: 'nuevas',
            data: [],
        },

        solicitud: {
            screen: 'datosPersonales',
            loading: false,
            loadingPut: false,
            successPut: null,
            obs: '',
            error: null,

            ...getNotasState()
        },

        /** Listado completo de rubros */
        rubrosOptions: [],

        rubros: [],

        /** Listado completo de documentos */
        documentosOptions: [],

        documentos: [],

        /* states para la confirmacion de cambio de estado */
        confirm: {
            show: false,
            title: '',
            body: '',
            accept: () => { },
            close: () => { },
        }
    }
)

export { menuState, adminState };
