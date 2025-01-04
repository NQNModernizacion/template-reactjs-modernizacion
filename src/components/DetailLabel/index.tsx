import { isValidElement, ReactNode } from "react"

type RFC = React.FC<{
    className?: {
        container?: string
        label?: string
    }
    label: string
    value?: string | ReactNode
    renderValue?: () => ReactNode
    handlers?: {
        onContainerClick?: React.MouseEventHandler<HTMLDivElement>
        onLabelClick?: React.MouseEventHandler<HTMLLabelElement>
        onValueClick?: React.MouseEventHandler<HTMLSpanElement>
    }
}>

const DetailLabel: RFC = ({ className, label, value, handlers }) => {
    return (
        <div
            className={className?.container}
            onClick={handlers?.onContainerClick}
        >
            <label
                className={className?.label + " me-2"}
                style={{ fontWeight: 600 }}
                onClick={handlers?.onLabelClick}
            >
                {label}:
            </label>
            <span onClick={handlers?.onValueClick}>
                {value && typeof value === "string"
                    ? value
                    : isValidElement(value)
                    ? value
                    : ""}
            </span>
        </div>
    )
}

export default DetailLabel
