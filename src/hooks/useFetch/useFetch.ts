import { useState, useEffect } from "react";
import {
  BACK_HEADERS_OPTIONS,
  BACK_HEADERS,
  BACK_METHODS_OPTIONS,
} from "./config";

/**
 * En caso de querer modificar los tipos de headers o métodos, entrar a hooks/useFetch/config.ts
 * 
 * El retorno se puede modificar para también retornar los setters de los estados en caso de que se vuelvan a usar
 *
 * @param url endpoint url
 * @param method http method: GET | POST | PATCH
 * @param headerType headers para la aplicación seleccionada: PHP | LARAVEL | PUBLIC_PHP | PUBLIC_LARAVEL
 * @param body data to send | undefined
 * @returns Object {data, error, loading}
 */
export default function useFetch(
  url: string,
  method: keyof typeof BACK_METHODS_OPTIONS,
  headerType: keyof typeof BACK_HEADERS_OPTIONS,
  body: any | undefined
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = BACK_HEADERS[headerType];

  useEffect(() => {
    setLoading(true);
    fetch(url, {
      method,
      body,
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) setData(data.data);
        if (data.error) setError(data.error);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
