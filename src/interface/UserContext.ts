import { Permission, Role, Person } from "."

export type FrontType = "backoffice" | "inspector"
export interface Store {
    user: User | null
    app_data: AppData | null
    front_types: FrontType[]
    token: string | null
}

export interface User {
    id: number
    persona: Person
    permissions: Permission[]
    roles: Role[]
}

export interface AppData {}

export interface Actions {
    setStore: (s: Store) => void

    setUser: (user: User) => void
    user: () => User | null
    persona: () => Person | null

    appData: () => AppData | null

    token: () => string | null
    frontType: () => FrontType

    hasRole: (role: string) => boolean
    hasPermission: (permission: string) => boolean

    setLoading: (loading: boolean) => void
}
