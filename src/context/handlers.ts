import { Permission, Role, Store } from "../interface"

export const initialState: Store = {
    user: null,
    app_data: null,
    front_types: [],
    token: null,
}

export type SetStore = React.Dispatch<React.SetStateAction<Store>>

/** Roles y permisos */
export const hasRole = (role: string, store: Store | null) => {
    if (!role) return false
    if (!store) return false

    return !!store.user?.roles?.some((r) => r.name === role)
}

export const hasPermission = (permission: string, store: Store | null) => {
    if (!permission) return false
    if (!store) return false

    if (store.user?.permissions?.some((p) => p.name === permission)) {
        return true
    }

    /* Generamos un arreglo nuevo de permisos de esos roles */
    const permissionsRoles = store.user?.roles?.reduce(
        (prev: Permission[], curr: Role) => {
            if (curr.permissions) {
                prev.push(...curr.permissions)
            }
            return prev
        },
        []
    )

    return !!permissionsRoles?.some((p) => p.name === permission)
}

export const hasDirectPermission = (permission: string, store: Store) => {
    if (!permission) return false
    if (!store) return false

    return !!store.user?.permissions?.some((p) => p.name === permission)
}
