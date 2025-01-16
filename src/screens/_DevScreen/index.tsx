import { useState } from "react"
import { toast } from "react-toastify"
import { User } from "lucide-react"

import { toastOptions } from "../../config/toast"
import { customStyle, formatOption, formatOptions } from "../../utils/common"

import {
    BasicContainer,
    DetailLabel,
    Input,
    Modal,
    MuniSpinner,
    SelectSearch,
    Table,
    SubirArchivo
} from "../../components"

import { prioridades } from "./exampleData"
import { dataTable } from "./handlers"
import HookForm from "./HookForm"

const _DevScreen = () => {
    const [state, setState] = useState({
        showTable: false,
        hookForm: false,
        subirArchivo: false,
    })

    const showToast = () => {
        toast.success("success", toastOptions)
        toast.warning("warning", toastOptions)
        toast.error("error", toastOptions)
    }

    const archivoSeleccionado = (file: File | null) => {
        if (file) {
          console.log("Archivo seleccionado:", file);
        } else {
          console.log("No hay archivo seleccionado");
        }
      };

    return (
        <BasicContainer>
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
                <button
                    className='btn btn-primary'
                    onClick={() =>
                        setState((state) => ({ ...state, subirArchivo: true }))
                    }
                >
                    Subir Archivo
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

            <SelectSearch
                className={{
                    container: "col-12 col-lg-4 mb-3",
                }}
                id='prioridad'
                value={formatOption(prioridades[3])}
                onChange={console.log}
                label='Prioridad *'
                customStyles={customStyle}
                invalidMsg={"Error"}
                options={formatOptions(prioridades)}
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

            <Modal
                size='xl'
                show={state.subirArchivo}
                title={() => "Subir archivo ejemplo"}
                onHide={() =>
                    setState((state) => ({ ...state, subirArchivo: false }))
                }
            >
                <SubirArchivo 
                 label="Selecciona un archivo"
                 accept=".png, .jpg, .pdf"
                 onFileSelect={archivoSeleccionado}
                
                />
            </Modal>
        </BasicContainer>
    )
}

export default _DevScreen
