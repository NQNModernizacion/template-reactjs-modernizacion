import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Save } from "lucide-react"

import { formatOption, formatOptions } from "../../../utils/common"

import { Input, MuniSpinner, Select, SelectSearch } from "../../../components"
import { prioridades } from "../exampleData"
import { selectOptionSelect } from "../../../utils/forms"
import { HFState } from "./handlers"
import { schema } from "./schema"

type RFC = React.FC<{
    disabled?: boolean
    onSubmit: (data: any) => Promise<boolean> | boolean | void
}>

const HookForm: RFC = ({ disabled, onSubmit }) => {
    const { register, handleSubmit, formState, setValue } = useForm({
        resolver: yupResolver(schema),
    })

    const [state, setState] = useState<HFState>({ prioridad: null })
    const [loading, setLoading] = useState(false)

    const _onSubmit = async (form: any) => {
        setLoading(true)
        await onSubmit(form)
        setLoading(false)
    }

    const selectOption = (
        data: any,
        name: keyof HFState,
        collection: any[] | null | undefined
    ) => {
        selectOptionSelect(data, name, collection, setState, setValue)
        /* clearErrors(`${name}_id`) */
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(_onSubmit)}
                className='d-flex flex-column gap-1 p-2'
            >
                <Input
                    className={{
                        label: "form-label m-0",
                        input: "form-control form-control",
                    }}
                    invalidMsg={formState.errors.asunto?.message}
                    label='Asunto'
                    register={{
                        ...register("asunto", {
                            disabled: loading,
                        }),
                    }}
                />
                <Select
                    className={{ select: "form-select form-select" }}
                    options={formatOptions(prioridades)}
                    label='Prioridad'
                    invalidMsg={formState.errors.prioridad_id?.message}
                    register={{
                        ...register("prioridad_id"),
                        disabled: loading,
                    }}
                />

                {/* react-select con react hook form, revisar bien el parche */}
                <SelectSearch
                    invalidMsg={formState.errors.prioridad_id?.message}
                    isSearchable
                    id='prioridad'
                    onChange={(data: any) =>
                        selectOption(data, "prioridad", prioridades)
                    }
                    isClearable
                    value={formatOption(state.prioridad)}
                    label='Prioridad'
                    disabled={loading}
                    options={formatOptions(prioridades)}
                />

                <hr className='my-1' />

                {loading && <MuniSpinner file='bola.png' />}
                <button
                    className='btn btn-primary btn-sm ms-auto text-center'
                    disabled={disabled || loading}
                    hidden={loading}
                >
                    <Save className='me-1' width={15} />
                    Guardar
                </button>
            </form>
        </>
    )
}

export default HookForm
