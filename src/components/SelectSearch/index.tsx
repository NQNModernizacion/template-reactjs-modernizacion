import { isValidElement } from "react"

import Select, {
    ActionMeta,
    GroupBase,
    OptionsOrGroups,
    StylesConfig,
} from "react-select"

import makeAnimated from "react-select/animated"

interface SelectSearchProps {
    id: string | undefined
    label?: string
    className?: {
        container?: string
        label?: string
        input?: string
    }
    isMulti?: boolean
    invalidMsg?: string | null
    value?: any
    defaultValue?: any
    options: OptionsOrGroups<any, GroupBase<unknown>> | undefined
    onChange: ((newValue: any, actionMeta: ActionMeta<any>) => void) | undefined
    disabled?: boolean
    loading?: boolean
    isClearable?: boolean
    isSearchable?: boolean
    customStyles?: StylesConfig<any, boolean, GroupBase<unknown>> | undefined
    buttonLabel?: () => React.ReactNode
}

const SelectSearch: React.FC<SelectSearchProps> = ({
    id,
    label,
    className,
    isMulti,
    value,
    defaultValue,
    options,
    onChange,
    disabled,
    loading,
    isClearable,
    isSearchable = false,
    customStyles,
    invalidMsg,
}) => {
    const animatedComponents = makeAnimated()

    return (
        <div className={className?.container ? className?.container : ""}>
            {label && typeof label === "string" ? (
                <label
                    htmlFor={"input-" + id}
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
            <Select
                /* className='react-select' */
                /* className={`
                    ${className?.input ? className?.input : ""} 
                    ${invalidMsg ? "invalid" : ""}
                `} */
                id={`select_${id}`}
                name={id}
                isSearchable={isSearchable}
                isLoading={loading}
                isDisabled={disabled || loading}
                defaultValue={defaultValue}
                isClearable={isClearable}
                isMulti={isMulti}
                value={value}
                components={animatedComponents}
                options={options}
                onChange={onChange}
                styles={customStyles}
            />

            {invalidMsg && <span className='ps-2 invalid'>{invalidMsg}</span>}
        </div>
    )
}

export default SelectSearch
