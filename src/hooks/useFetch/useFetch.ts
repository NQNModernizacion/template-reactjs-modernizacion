import { useState, useEffect } from "react";
import {
  BACK_HEADERS_OPTIONS,
  BACK_HEADERS,
  BACK_METHODS_OPTIONS,
} from "./config";

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

  return { data, loading, error, setData };
}
