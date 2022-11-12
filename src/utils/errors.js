/** Manejo de errores de renaper */
const getErrorRenaper = (str) => {
    switch (str) {
        case 'No se encuentra ese número de documento':
            return str

        case 'No coincide el número de trámite del presente documento':
            return str

        case 'Debe especificar género (M, F, X)':
            return str

        default:
            return 'Hubo un problema, contáctese con soporte'
    }
}

export { getErrorRenaper }