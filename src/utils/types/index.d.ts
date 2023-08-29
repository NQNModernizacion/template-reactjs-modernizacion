export {};

// Declaracion de variables globales
declare global {
  // Declaracion de variables de muni-spinner
  interface Window {
    cargarSpinner: () => void;
    eliminarSpinner: () => void;
  }
}
