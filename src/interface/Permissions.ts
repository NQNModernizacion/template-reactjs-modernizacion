export interface Permission {
    id: number
    name: string
    description: string
    roles?: Role[] | null
}

export interface Role {
    id: number
    name: string
    description: string
    permissions?: Permission[] | null
}
