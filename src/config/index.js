import { LIM_CUIT } from "./charLimit";

export const ENV = import.meta.env.VITE_ENV;

export const isDev = import.meta.env.NODE_ENV === "development";

export const URL_BACK = import.meta.env.VITE_URL_BACK

const config = {
  URL_BACKEND: URL_BACK,
  LIM_CUIT: LIM_CUIT,
};

export const viewAllConfig = () => console.table(config);

export { LIM_CUIT };

/* Limite de los caracteres */
