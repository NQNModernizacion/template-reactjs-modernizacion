import { ReactNode, isValidElement } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
    label?: string | ReactNode
    id?: string
    className?: {
        container?: string
        label?: string
        input?: string
    }
    invalid?: boolean
    register?: UseFormRegisterReturn
    invalidMsg?: string | null
}

type RFC = React.FC<InputProps>

const Input: RFC = ({
    id,
    label,
    type,
    min,
    value,
    accept,
    readOnly,
    className,
    placeholder,
    register,
    invalidMsg,
    /* El resto de los atributos que deben de ser de HTMLInputElement */
    ...rest
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

            <input
                {...register}
                id={_id}
                type={type}
                className={`
                    ${className?.input ? className?.input : ""} 
                    ${invalidMsg ? "invalid" : ""}
                `}
                readOnly={readOnly}
                min={min}
                value={value}
                accept={accept}
                placeholder={placeholder}
                {...rest}
            />

            {invalidMsg && <span className='ps-2 invalid'>{invalidMsg}</span>}
        </div>
    )
}

export default Input
