import React from "react"

//La unica props requerida es children
type RFC = React.FC<{
    children: React.ReactNode
    titulo?: string
    className?: string
    containerClass?: string
    headerClass?: string
    tituloClass?: string
    actions?: React.ReactNode //Se me ocurre para agregar botones u otros elementos 
}>

const ContainerSecundario: RFC = ({
    children,
    titulo,
    className = "",
    containerClass = "container_menu p-3 rounded",
    headerClass = "bg-white p-3 rounded",
    tituloClass = "col-12 text-center p-3 m-0 fs-4",
    actions, // Renderiza botones u otros elementos adicionales
}) => {
    return (
        <section className={`col-12 mx-auto mb-5 px-1 ${className}`}>
            <div className={containerClass}>
                <div className={headerClass}>
                    {actions && (
                        <div className="d-flex justify-content-start mb-3">
                            {actions}
                        </div>
                    )}
                    {titulo && <h3 className={tituloClass}>{titulo}</h3>}
                    <hr className="m-0 mt-3" />
                    {children}
                </div>
            </div>
        </section>
    )
}

export default ContainerSecundario
