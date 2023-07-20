import VistaAdministrador from "../../Administrador";
import VistaContribuyente from "../../Contribuyente";
import VistaSolicitudes from "../../Solicitudes";
import PrivateRoute from "./PrivateRoute";

export const pages = [
  {
    path: "/contribuyente",
    element: <VistaContribuyente />,
  },
  {
    path: "/contribuyente/solicitud/:id",
    element: <VistaSolicitudes />,
  },
  {
    path: "/administrador",
    element: (
      <PrivateRoute rol="admin">
        <VistaAdministrador />
      </PrivateRoute>
    ),
  },
  {
    path: "/administrador/solicitud/:id",
    element: (
      <PrivateRoute rol="admin">
        <VistaSolicitudes />
      </PrivateRoute>
    ),
  },
  {
    path: "/test",
    element: <h1>Test</h1>,
  },
];
