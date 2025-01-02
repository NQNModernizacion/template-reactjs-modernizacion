import { isObjEmpty } from "../config";

export const getArrayFiles = (files) => {
  const keysArray = Object.keys(files);
  return keysArray.map((el) => {
    files[el].key = el;
    return files[el];
  });
};

/** Obtiene el peso en Mb de un archivo */
export const getMb = (size) => (size / 1048576).toFixed(2);

/** Obtiene el tipo de archivo */
export const getTypeFile = (type, simbol = "/") => {
  const index = type.lastIndexOf(simbol) + 1;
  return type.slice(index);
};

export const sliceFileName = (name) => {
  const index = name.lastIndexOf(".");
  const string = name.slice(0, index);
  if (string.length >= 15) {
    return name.slice(0, 15) + "...";
  }
  return string;
};

/** Encargado de mostrar el prev del archivo, sin render inecesario */
export const prevFile = (file) => {
  const url = !isObjEmpty(file) ? URL.createObjectURL(file) : undefined;
  return url;
};

/** Genera un formato en base64 */
export const getFormatInBase64 = (base64) => base64.split(";")[0].split(":")[1];

/** Indica el formato de archivo aceptable */
export const getAcceptFormat = (str) => {
  if (str === "img") {
    return "application/pdf, image/jpeg, image/png, image/jpg";
  }
  if (str === "pdf") {
    return "application/pdf";
  }
};

/** Mustra informacion en funcion del tipo de archivo */
export const labelFileInput = (str) => {
  if (str === "img") {
    return "Puede ser imagen o PDF que no supere los 8mb";
  }
  if (str === "pdf") {
    return "Puede ser PDF que no supere los 8mb";
  }
};

/** Genera una descarga de un archivo en base64 */
export const downloadFile = (contentType, base64Data, fileName) => {
  const linkSource = `data:${contentType};base64,${base64Data}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};
