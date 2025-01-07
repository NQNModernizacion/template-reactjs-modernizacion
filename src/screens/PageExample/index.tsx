import { useNavigate } from "react-router-dom";
import { NavigateBeforeOutlined } from "@mui/icons-material"
import ContainerSecundario from "../../components/Containers/ContainerSecundario"


const PageExample = () => {
    const nav = useNavigate();
    return (
        <ContainerSecundario
        titulo="Contenedor de Ejemplo"
        className="custom-section"
        containerClass="container_custom p-4 rounded-lg"
        headerClass="bg-light p-4 rounded-lg shadow"
        tituloClass="col-12 text-center text-primary fs-3"
        actions={
            <div className="d-flex">
                <button
                    onClick={() => nav("/")}
                    className="btn btn-secondary btn-sm d-flex align-items-center"
                >
                    <NavigateBeforeOutlined /> Volver al Home
                </button>
            </div>
        }
    >
        <p>
            Este es un ejemplo de como usar el componente PageExample.Podes mostrar cualquier contenido que quieras dentro de este
            contenedor, como formularios, listas, etc.
        </p>
      
        </ContainerSecundario>
    )
}

export default PageExample
