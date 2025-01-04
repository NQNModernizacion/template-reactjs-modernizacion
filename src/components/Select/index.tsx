import { CSSProperties, isValidElement, ReactNode } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface Option {
    label: string
    value: string | number
    styles?: CSSProperties
}

interface SelectProps
    extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> {
    label?: string | ReactNode
    id?: string
    options: Option[]
    className?: {
        container?: string
        label?: string
        select?: string
    }
    defaultValue?: string
    register: UseFormRegisterReturn
    invalidMsg?: string | null
}

const Select: React.FC<SelectProps> = ({
    id,
    label,
    options,
    className,
    register,
    value,
    invalidMsg,
    defaultValue = "Seleccione una opcion",
}) => {
    const _id = "input-" + register?.name ? register?.name : id

    return (
        <div className={className?.container ? className?.container : ""}>
            {label && typeof label === "string" ? (
                <label
                    htmlFor={_id}
                    className={`
                                    ${className?.label ? className?.label : ""} 
                                    ${invalidMsg ? "invalid" : ""}
                                `}
                >
                    {label}
                </label>
            ) : (
                isValidElement(label) && label
            )}

            <select
                {...register}
                id={_id}
                className={`
                    ${className?.select ? className?.select : ""} 
                    ${invalidMsg ? "invalid" : ""}
                `}
                style={
                    value ? options.find((e) => e.value === value)?.styles : {}
                }
                defaultValue={"DEFAULT"}
            >
                {defaultValue && (
                    <option value={"DEFAULT"} disabled>
                        {defaultValue}
                    </option>
                )}
                {options.map((op, key) => (
                    <option key={key} value={op.value} style={op.styles}>
                        <span> {op.label}</span>
                    </option>
                ))}
            </select>
            {invalidMsg && <span className='ps-2 invalid'>{invalidMsg}</span>}
        </div>
    )
}

export default Select
