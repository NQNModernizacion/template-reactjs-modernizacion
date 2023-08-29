import { LIM_CUIT } from '../config';

/** Admite solo numeros */
export const onlyNumber = (n: string) => new RegExp('^[0-9]+$').test(n);

/** Admite solo correo electronico */
export const validateEmail = (email: string) =>
  new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);

/** Admite alfanumerico */
export const alfaNumeric = (str: string) => new RegExp(/^[a-z\d]+$/i).test(str);

/** Admite alfanumerico con espacios*/
export const alfaNumericWithSpace = (str: string) => new RegExp(/^[a-z \d]+$/i).test(str);

/** Solo numeros con una longitud predefinida */
export const onlyNumberWithLength = (n: string, l: number) =>
  (onlyNumber(n) || n === '') && n.length <= l;

/** Validacion de CUIT */
export const validateCuit = (cuit: string) => {
  if (cuit.length !== LIM_CUIT) return false;

  let rv = false;
  let resultado = 0;
  const codes = '6789456789';
  const verificador = parseInt(cuit[cuit.length - 1]);

  let x = 0;

  while (x < 10) {
    let digitoValidador = parseInt(codes.substring(x, x + 1));

    if (isNaN(digitoValidador)) digitoValidador = 0;
    let digito = parseInt(cuit.substring(x, x + 1));

    if (isNaN(digito)) digito = 0;
    const digitoValidacion = digitoValidador * digito;

    resultado += digitoValidacion;
    x++;
  }

  resultado = resultado % 11;
  rv = resultado === verificador;

  return rv;
};

export const addIsInvalidClass = (array: []) => {
  array.forEach((id) => {
    document.querySelector(id).classList.add('is-invalid');
  });
};

export const removeIsInvalidClass = (array: []) => {
  array.forEach((id) => {
    document.querySelector(id).classList.remove('is-invalid');
  });
};
