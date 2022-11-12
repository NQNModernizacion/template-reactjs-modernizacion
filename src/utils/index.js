/* APIS */
export { getOptionsFetch, getLastSolByUser, getPersonaRenaper, getAllSolicitudes, getSolicitud, putData, getRubros, postData, getTiposDocumentos, getHistorial } from './api'

/* Funciones comunes */
export { getParams, capitalizeFirst, formatDate, isObjEmpty, getObjModal, getAccessScreen, returnWebLogin } from './common'

/* Documentos */
export { getDocumentsState, getDocumentsOptions, handlerChangeDocumentos, hanlderEvalDoc } from './documentsState'

/* Domicilio */
export {
    countDelimitadores,
    existDomicilio,
    getEmptyString,
    domicilioNull,
    stringToDesc,
    fildsToString,
    stringToObj
} from './domicilioState'

/* Manejo de errores */
export { getErrorRenaper } from './errors'

/* Estados */
export { getEstado, getEstadoHistorial, getEstadoUpdate, getRetornado, getEtapa, getUbicacion } from './estadosState'

/* Exportacion de información */
export { getCsvMain } from './exportData'

/* Archivos */
export {
    getArrayFiles,
    getMb,
    sliceFileName,
    getTypeFile, prevFile,
    getFormatInBase64,
    getAcceptFormat,
    labelFileInput,
    downloadFile
} from './files'

export { footerInfo, FooterBtns } from './footer'

/* notas */
export { getNotasState, setNotasState } from './notasState'

/* Validadores */
export {
    onlyNumber,
    onlyNumberWithLength,
    validateCuit,
    validateEmail,
    alfaNumeric,
    alfaNumericWithSpace,
    addIsInvalidClass,
    removeIsInvalidClass
} from './validations'


