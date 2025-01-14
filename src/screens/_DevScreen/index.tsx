import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { User } from "lucide-react"

import { toastOptions } from "../../config/toast"

import {
    BasicContainer,
    DetailLabel,
    Input,
    Modal,
    MuniSpinner,
    Table,
    ContainerSecundario,
} from "../../components"

import { prioridades } from "./exampleData"
import { dataTable } from "./handlers"
import HookForm from "./HookForm"
import { NavigateBeforeOutlined } from "@mui/icons-material"

const _DevScreen = () => {
    const nav = useNavigate()

    const [state, setState] = useState({
        showTable: false,
        hookForm: false,
    })

    const showToast = () => {
        toast.success("success", toastOptions)
        toast.warning("warning", toastOptions)
        toast.error("error", toastOptions)
    }

    return (
        <>
            <BasicContainer>
                <hr />
                <div className='d-flex flex-wrap gap-1'>
                    <button className='btn btn-primary' onClick={showToast}>
                        Mostrar Toasts
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={() =>
                            setState((state) => ({ ...state, showTable: true }))
                        }
                    >
                        Ejemplo Tabla
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={() =>
                            setState((state) => ({ ...state, hookForm: true }))
                        }
                    >
                        Ejemplo Form Hook
                    </button>
                </div>
                <hr />
                <MuniSpinner textoSpinner='Spinner' />
                <hr />
                <DetailLabel label='DetailLabel' value={"Valor DetailLabel"} />
                <DetailLabel
                    label='DetailLabel - RenderValue'
                    value={<User />}
                    handlers={{
                        onContainerClick: () => console.log(),
                        onLabelClick: () => console.log("onLabelClick"),
                        onValueClick: () => console.log("onValueClick"),
                    }}
                />
                <hr />
                <Input
                    id='input_test'
                    className={{
                        label: "form-label mb-2",
                        input: "form-control",
                    }}
                    label='Input normal, sin el register de HookForm'
                    onChange={console.log}
                />

                <Modal
                    size='xl'
                    show={state.showTable}
                    title={() => "Tabla ejemplo"}
                    onHide={() =>
                        setState((state) => ({ ...state, showTable: false }))
                    }
                >
                    <Table
                        height={600}
                        search
                        getRowHeight={() => "auto"}
                        data={dataTable(prioridades /* dispach */)}
                    />
                </Modal>

                <Modal
                    size='xl'
                    show={state.hookForm}
                    title={() => "Ejemplo react-hook-form"}
                    onHide={() =>
                        setState((state) => ({ ...state, hookForm: false }))
                    }
                >
                    <HookForm onSubmit={console.log} />
                </Modal>
            </BasicContainer>
            <ContainerSecundario
                titulo='Contenedor de Ejemplo'
                className='custom-section'
                containerClass='container_custom p-4 rounded-lg'
                headerClass='bg-light p-4 rounded-lg shadow'
                tituloClass='col-12 text-center text-primary fs-3'
                actions={
                    <div className='d-flex'>
                        <button
                            onClick={() => nav("/")}
                            className='btn btn-secondary btn-sm d-flex align-items-center'
                        >
                            <NavigateBeforeOutlined /> Volver al Home
                        </button>
                    </div>
                }
            >
                <p>
                    Este es un ejemplo de como usar el componente
                    PageExample.Podes mostrar cualquier contenido que quieras
                    dentro de este contenedor, como formularios, listas, etc.
                </p>
            </ContainerSecundario>
        </>
    )
}

export default _DevScreen
