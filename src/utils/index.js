/* APIS */
export {
    getOptionsFetch,
    getTest
} from './api'

/* Funciones comunes */
export { getParams, capitalizeFirst, formatDate, isObjEmpty, getAccessScreen, returnWebLogin } from './common'

/* Manejo de errores */
export { getErrorRenaper } from './errors'

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


