import { GroupBase, OptionsOrGroups } from "react-select"

export type RDSS<T> = React.Dispatch<React.SetStateAction<T>>
export type SelectSearchOptions = OptionsOrGroups<any, GroupBase<unknown>>

export interface Barrio {
    id: number
    name: string
}

export interface Provincia {
    id: number
    name: string
}

export interface AnyObject {
    [key: string]: any
}